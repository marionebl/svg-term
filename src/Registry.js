const React = require('react');
const Cursor = require('./Cursor');
const Word = require('./Word');
const styled = require('./styled');

module.exports = Registry;

function Registry(props) {
  return (
    <defs data-name="Registry">
      {props.items.map(item => {
        switch(item.type) {
          case 'line':
            return <LineSymbol key={item.id} theme={props.theme} {...item}/>;
          default:
            throw new TypeEror(`Unknown Registry item of type ${item.type}`);
        }
      })}
      {props.hasFrames && [
        <symbol id="a" key="a">
          <StyledBackground
            data-name="FrameBackground"
            height={props.frameHeight}
            width={props.frameWidth}
            x="0"
            y="0"
            />
        </symbol>,
        <symbol id="b" key="b">
          <Cursor
            height={props.height}
            width={props.width}
            theme={props.theme}
            />
        </symbol>
        ]
      }
    </defs>
  );
}

function LineSymbol(props) {
  return (
    <symbol data-name="LineSymbol" id={props.id}>
      {props.words.map((word, index) => (
        <Word
          bg={word.attr.bg}
          bold={word.attr.bold}
          fg={word.attr.fg}
          inverse={word.attr.inverse}
          key={index}
          theme={props.theme}
          underline={word.attr.underline}
          x={word.x}
          y={props.theme.fontSize}
          >
          {word.children}
        </Word>
      ))}
    </symbol>
  );
}

const StyledBackground = styled.rect`
  fill: transparent;
`;
