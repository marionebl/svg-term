const {load} = require('load-asciicast');
const React = require('react');
const {renderToStaticMarkup} = require('react-dom/server');

const color = require('./color');
const Background = require('./Background');
const Cursor = require('./Cursor');
const Document = require('./Document');
const Frame = require('./Frame');
const Reel = require('./Reel');
const Registry = require('./Registry');
const Viewbox = require('./Viewbox');
const Window = require('./Window');
const Word = require('./Word');
const styled = require('./styled');
const toViewModel = require('./to-view-model');

const DEFAULT_THEME = require('./default-theme');

module.exports.render = render;

const StyledContainer = styled.g`
  font-family: Monaco, Consolas, Menlo, 'Bitstream Vera Sans Mono', 'Powerline Symbols', monospace;
`;

function render(raw, options = {}) {
  if (!raw) {
    throw new TypeEror(`svg-term.reder: missing data`);
  }

  const width = options.width;
  const height = options.height;

  const theme = options.theme || DEFAULT_THEME;
  theme.fontSize = 'fontSize' in theme ? theme.fontSize : DEFAULT_THEME.fontSize;
  theme.lineHeight = 'lineHeight' in theme ? theme.lineHeight : DEFAULT_THEME.lineHeight;

  const json = toJSON(raw);
  const cast = load(json, width, height);

  const data = toViewModel(cast, {
    theme,
    from: from(options, {cast}),
    to: to(options, {cast})
  });

  const result = (
    <Document
      width={data.width}
      height={data.displayHeight}
      theme={theme}
      x={options.window ? 15 : 0}
      y={options.window ? 50 : 0}
      >
      <StyledContainer fontSize={theme.fontSize}>
        <Registry
          frameHeight={cast.height}
          frameWidth={cast.width}
          hasFrames={data.frames.length > 0}
          items={data.registry}
          theme={theme}
          />
        <Background
          width={data.width}
          height={data.displayHeight}
          theme={theme}
          />
        <Reel
          duration={data.duration}
          frameWidth={cast.width}
          stamps={data.stamps}
          width={data.frames.length * cast.width}
          >
          {data.frames
            .map((frame, index) => {
              return (
                <Frame
                  key={frame.stamp}
                  stamp={frame.stamp}
                  offset={index}
                  width={data.width}
                  height={data.displayHeight}
                  >
                  {
                    frame.cursor.visible &&
                      <Cursor
                        height={theme.fontSize * theme.lineHeight}
                        theme={theme}
                        width={theme.fontSize * 0.66}
                        x={frame.cursor.x - theme.fontSize * 1.2}
                        y={frame.cursor.y === 0 ? 0 : frame.cursor.y + theme.lineHeight * 0.75}
                        />
                  }
                  {
                    frame.lines.map((line, index) => {
                      if (typeof line.id === 'number') {
                        return (
                          <use
                            key={`${line.id}-${index}`}
                            xlinkHref={`#${line.id}`}
                            y={line.y}
                            />
                        );
                      }
                      return line.words.map(word => {
                        return (
                          <Word
                            bg={word.attr.bg}
                            bold={word.attr.bold}
                            fg={word.attr.fg}
                            inverse={word.attr.inverse}
                            theme={theme}
                            underline={word.attr.underline}
                            x={word.x}
                            y={line.y + theme.fontSize}
                            >
                            {word.children}
                          </Word>
                        );
                      })
                    })
                  }
                </Frame>
              );
            })
          }
        </Reel>
      </StyledContainer>
    </Document>
  );

  return options.window
    ? renderToStaticMarkup(
        <Window
          width={data.width}
          height={data.displayHeight}
          theme={theme}
          >
          {result}
        </Window>
      )
    : renderToStaticMarkup(result);
}

function toJSON(raw) {
  if (typeof raw === 'string') {
    return raw;
  }
  return JSON.stringify(raw);
}

const NOOP = () => true;
const MAX = max => ([f]) => f <= max;
const MIN = min => ([f]) => f >= min;

function nearest(stamp, {cast, max, min}) {
  return cast.frames
    .filter(typeof max === 'number' ? MAX(max) : NOOP)
    .filter(typeof min === 'number' ? MIN(min) : NOOP)
    .sort(([a], [b]) => Math.abs((stamp - a)) - Math.abs((stamp - b)))[0][0];
}

function from(options, {cast}) {
  if (typeof options.at === 'number') {
    return nearest(options.at / 1000, {cast});
  }
  return 'from' in options ? nearest(options.from / 1000, {cast, min: options.from / 1000}) : 0;
}

function to(options, {cast}) {
  if (typeof options.at === 'number') {
    return nearest(options.at / 1000, {cast});
  }
  return 'to' in options ? nearest(options.to / 1000, {cast, max: options.to / 1000}) : cast.duration;
}
