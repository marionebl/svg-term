const React = require('react');
const tag = require('tag-hoc').default;
const color = require('./color');

module.exports = Word;

function Word(props) {
  return [
    (typeof props.bg !== 'undefined' && props.bg !== props.theme.background) && (
      <rect data-name="WordBackground"
        height={props.theme.fontSize * props.theme.lineHeight}
        style={{fill: color(props.bg, props.theme)}}
        width={props.children.length > 0 ? props.children.length : 0}
        x={props.x ? props.children.length + 1 : null}
        y={props.y - props.theme.fontSize}
        />
    ),
    <text
      data-name="WordBackground"
      style={{
        fontFamily: 'Monaco, Consolas, Menlo, \'Bitstream Vera Sans Mono\', monospace, \'Powerline Symbols\'',
        fill: fg(props, props.theme),
        textDecoration: props.underline ? 'underline' : 'none',
        fontWeight: props.bold ? 'bold' : 'normal'
      }}
      x={props.x * props.theme.fontSize * 0.6}
      y={props.y}
      >
      {props.children}
    </text>
  ];
}

function fg(props, theme) {
  const d = props.bold ? theme.bold : theme.text;
  return color(props.fg || d, theme);
}
