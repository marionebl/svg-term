const React = require('react');
const color = require('./color');

module.exports = Background;

function Background(props) {
  const fill = color(props.theme.background);
  return <rect
    style={{fill}}
    width={props.width}
    height={props.height}
    data-name="Background"
    />;
}
