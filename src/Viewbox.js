const React = require('react');

module.exports = Viewbox;

function Viewbox(props) {
  return (
    <g data-name="Viewbox">
      {props.children}
    </g>
  );
}
