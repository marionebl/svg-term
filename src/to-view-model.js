const {flatMap, entries, groupBy, isEqual} = require('lodash');
const hash = require('object-hash');

module.exports = toViewModel;

function toViewModel({cast, theme, from, to}) {
  const liner = getLiner(cast);
  const stamps = cast.frames
    .filter(([stamp], i, fs) => stamp >= from && stamp <= to)
    .map(([stamp], i) => stamp - from);
  const fontSize = theme.fontSize;
  const lineHeight = theme.lineHeight;

  const frames = cast.frames
    .filter(([stamp], i, fs) => stamp >= from && stamp <= to)
    .map(([delta, data], i) => [delta, data, liner(data)])
    .map(([stamp, data, l], index) => {
      const lines = l
        .map((chars, y) => {
          const words = toWords(chars);

          return {
            y: y * fontSize * lineHeight,
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
        stamp: (Math.round(stamp * 100) / 100) - from
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
    displayHeight: (cast.height + 1) * fontSize * lineHeight,
    duration: to - from,
    registry,
    stamps,
    frames
  };
}

function getLiner(cast) {
  switch (cast.version) {
    case 0:
      return (data) => toOne(data.lines);
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
          children: '',
          offset: 0
        });
      }

      const word = words[words.length - 1];
      const children = String.fromCodePoint(point);

      if (children === ' ' && !('bg' in attr) && !attr.inverse) {
        word.offset = word.offset + 1;
        return words;
      }

      if (isEqual(word.attr, attr) && word.offset === 0) {
        word.children += children;
      } else {
        words.push({
          attr,
          x: word.x + word.children.length + word.offset,
          children,
          offset: 0
        });
      }

      return words;
    }, [])
    .filter((word, i, words) => {
      if ('bg' in word.attr || word.attr.inverse) {
        return true;
      }

      const trimmed = word.children.trim();
      const after = words.slice(i + 1);

      if ((trimmed === '' || trimmed === '⏎')) {
        return false;
      }

      return true;
    });
}

function toOne(arrayLike) {
  return Object.entries(arrayLike)
    .sort((a, b) => a[0] - b[0])
    .map(e => e[1])
    .map(words => words.reduce((chars, word) => {
      const [content, attr] = word;
      chars.push(...content.split('').map(char => [char.codePointAt(0), attr]));
      return chars;
    }, []), []);
}
