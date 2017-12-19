const React = require('react');
const tag = require('tag-hoc').default;
const color = require('./color');

module.exports = Word;

function Word(props) {
  return [
    (props.inverse || props.bg) &&
      <rect data-name="WordBackground"
        height={props.theme.fontSize * props.theme.lineHeight}
        style={{fill: props.inverse ? fg(props, props.theme) : bg(props, props.theme)}}
        width={props.children.length > 0 ? props.children.length : 0}
        x={props.x * props.theme.fontSize * 0.6}
        y={props.y - props.theme.fontSize}
      />,
    <text
      data-name="Word"
      style={{
        fontFamily: 'Monaco, Consolas, Menlo, \'Bitstream Vera Sans Mono\', monospace, \'Powerline Symbols\'',
        fill: props.inverse ? bg(props, props.theme) : fg(props, props.theme),
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

function bg(props, theme) {
  const b = typeof props.bg === 'undefined' ? theme.background : props.bg;
  return color(b, theme, theme.background);
}

function fg(props, theme) {
  const d = props.bold ? theme.bold : theme.text;
  const f = typeof props.fg === 'undefined' ? d : props.fg;
  return color(f, theme, d);
}
