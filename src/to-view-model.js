const {flatMap, entries, groupBy, isEqual} = require('lodash');
const hash = require('object-hash');

module.exports = toViewModel;

function toViewModel(cast, theme) {
  const liner = getLiner(cast);
  const stamps = cast.frames.map(([delta], i) => delta);

  const frames = cast.frames
    .map(([delta, data], i) => [delta, data, liner(data)])
    .map(([stamp, data, l], index) => {
      const lines = l
        .map((chars, y) => {
          const words = toWords(chars);

          return {
            y: y * theme.fontSize * theme.lineHeight,
            words,
            hash: hash(words),
            ref: null
          };
        });

      const cursor = data.cursor || data.screen.cursor;
      const cl = lines[cursor.y] || {y: 0};

      cursor.x = cursor.x + 2;
      cursor.y = Math.max(0, cl.y - 1);

      return {
        cursor,
        lines,
        stamp: Math.round(stamp * 100) / 100
      };
    });

  const candidates = flatMap(frames, 'lines').filter(line => line.words.length > 0);
  const hashes = groupBy(candidates, 'hash');

  const registry = entries(hashes)
    .filter(([_, lines]) => lines.length > 1)
    .map(([hash, [line]], index) => {
      const id = index + 1;
      const words = line.words.slice(0);

      frames.forEach(frame => {
        frame.lines
          .filter(line => line.hash === hash)
          .forEach(l => {
            l.words = [];
            l.id = id;
          });
      });

      return {type: 'line', words, id};
    });

  return {
    width: cast.width,
    displayWidth: cast.witdh,
    height: cast.height,
    displayHeight: (cast.height + 1) * theme.fontSize * theme.lineHeight,
    duration: cast.duration,
    registry,
    stamps,
    frames
  };
}

function getLiner(cast) {
  switch (cast.version) {
    case 0:
      return (data) => Array.from(data.lines);
    default:
      return (data) => data.screen.lines;
  }
}

function toWords(chars) {
  return chars
    .reduce((words, [point, attr]) => {
      if (words.length === 0) {
        words.push({
          attr,
          x: 0,
          children: ''
        })
      }

      const word = words[words.length - 1];

      if (isEqual(word.attr, attr)) {
        word.children += String.fromCodePoint(point);
      } else {
        words.push({
          attr,
          x: word.x + word.children.length,
          children: String.fromCodePoint(point)
        });
      }

      return words;
    }, [])
    .filter((word, i, words) => {
      const trimmed = word.children.trim();

      if (trimmed === '' || trimmed === '⏎') {
        return false;
      }

      return true;
    })
    .map((word) => {
      // Trim leading whitespace from words and
      // and add to x offset of the same word
      const trimmed = word.children.trimLeft();
      const delta = word.children.length - trimmed.length;
      if (delta === 0) {
        return word;
      }
      word.children = trimmed;
      word.x += delta;
      return word;
    })
}
