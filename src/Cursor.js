const React = require('react');
const color = require('./color');

module.exports = Cursor;

function Cursor(props) {
  return <rect
    data-name="Cursor"
    height={props.height}
    style={{fill: color(props.theme.cursor)}}
    width={props.width}
    x={props.x}
    y={props.y}
    />;
}
