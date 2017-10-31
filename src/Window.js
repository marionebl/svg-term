const React = require('react');
const color = require('./color');

module.exports = Window;

function Window(props) {
  const width = (props.width * 10) + 30;
  const height = (props.height * 10) + 50 + 15;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width={width}
      height={height}
      data-name="window"
      >
      <rect
        width={width}
        height={height}
        rx={5}
        ry={5}
        fill={color(props.theme.background)}
        />
      <circle cx="20" cy="20" r="7.5" fill="#ff5f58"/>
      <circle cx="45" cy="20" r="7.5" fill="#ffbd2e"/>
      <circle cx="70" cy="20" r="7.5" fill="#18c132"/>
      <g dangerouslySetInnerHTML={{__html: props.children}}/>
    </svg>
  );
}
