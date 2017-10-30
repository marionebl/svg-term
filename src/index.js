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
const Viewbox = require('./Viewbox');
const Word = require('./Word');
const toViewModel = require('./to-view-model');

module.exports.render = render;

const DEFAULT_THEME = {
  '0': [40, 45, 53], // Black
  '1': [232, 131, 136], // Red
  '2': [168, 204, 140], // Green
  '3': [219, 171, 121], // Yellow
  '4': [113, 190, 242], // Blue
  '5': [210, 144, 228], // Magenta
  '6': [102, 194, 205], // Cyan
  '7': [185, 191, 202], // White
  '8': [111, 119, 131], // Light Black
  '9': [232, 131, 136], // Light Red
  '10': [168, 204, 140], // Light Green
  '11': [219, 171, 121], // Light Yellow
  '12': [115, 190, 243], // Light Blue
  '13': [210, 144, 227], // Light Magenta
  '14': [102, 194, 205], // Light Cyan
  '15': [255, 255, 255], // Light White
  background: [40, 45, 53], // background color
  bold: [185, 192, 203], // Default bold text color
  cursor: [111, 118, 131], // Cursor color
  text: [185, 192, 203], // Default text color
};

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
