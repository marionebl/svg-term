const React = require('react');
const {renderToStaticMarkup} = require('react-dom/server');
const {load} = require('load-asciicast');
const {ThemeProvider} = require('styled-components');

const color = require('./color');
const Background = require('./Background');
const Cursor = require('./Cursor');
const Document = require('./Document');
const Frame = require('./Frame');
const Reel = require('./Reel');
const Registry = require('./Registry');
const Viewbox = require('./Viewbox');
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

  const json = toJSON(raw);
  const cast = load(json, width, height);
  const data = toViewModel(cast);

  const theme = options.theme || DEFAULT_THEME;

  return renderToStaticMarkup(
    <Document
      width={data.width}
      height={data.displayHeight}
      theme={theme}
      >
      <g>
        <Registry items={data.registry}/>
        <Background
          width={data.width}
          height={data.displayHeight}
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
                  height={data.height}
                  >
                  {
                    frame.cursor.visible &&
                      <Cursor
                        fontSize="1"
                        x={`${frame.cursor.x}ch`}
                        y={frame.cursor.y + 1}
                        height="1.3"
                        width="1ch"
                        />
                  }
                  {
                    frame.lines.map(line => {
                      if (typeof line.id === 'number') {
                        return <use xlinkHref={`#${line.id}`} y={line.y}/>;
                      }

                      return line.words.map(word => {
                        return (
                          <Word
                            bg={word.attr.bg}
                            bold={word.attr.bold}
                            fg={word.attr.fg}
                            underline={word.attr.underline}
                            x={word.x}
                            y={line.y + 1}
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
}

function toJSON(raw) {
  if (typeof raw === 'string') {
    return raw;
  }
  return JSON.stringify(raw);
}
