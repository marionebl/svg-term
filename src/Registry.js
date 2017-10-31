const React = require('react');
const Word = require('./Word');

module.exports = Registry;

function Registry(props) {
  return (
    <defs>
      {props.items.map(item => {
        switch(item.type) {
          case 'line':
            return <LineSymbol key={item.id} theme={props.theme} {...item}/>;
          default:
            throw new TypeEror(`Unknown Registry item of type ${item.type}`);
        }
      })}
    </defs>
  );
}

function LineSymbol(props) {
  return (
    <symbol id={props.id}>
      {props.words.map(word => (
        <Word
          bg={word.attr.bg}
          bold={word.attr.bold}
          fg={word.attr.fg}
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
