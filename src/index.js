const React = require('react');
const {renderToStaticMarkup} = require('react-dom/server');
const {load} = require('load-asciicast');

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
const toViewModel = require('./to-view-model');

const DEFAULT_THEME = require('./default-theme');

module.exports.render = render;

function render(raw, options = {}) {
  if (!raw) {
    throw new TypeEror(`svg-term.reder: missing data`);
  }

  const width = options.width;
  const height = options.height;
  const theme = options.theme || DEFAULT_THEME;

  const json = toJSON(raw);
  const cast = load(json, width, height);
  const data = toViewModel(cast, theme);

  const result = (
    <Document
      width={data.width}
      height={data.displayHeight}
      theme={theme}
      x={options.window ? 15 : 0}
      y={options.window ? 50 : 0}
      >
      <g fontSize={theme.fontSize}>
        <Registry items={data.registry} theme={theme}/>
        <Background
          width={data.width}
          height={data.displayHeight}
          theme={theme}
          />
        <Reel
          duration={data.duration}
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
                        width="1ch"
                        x={`${frame.cursor.x}ch`}
                        y={frame.cursor.y + theme.lineHeight}
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
      </g>
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
