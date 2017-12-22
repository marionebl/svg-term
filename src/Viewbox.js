const React = require('react');

module.exports = Viewbox;

function Viewbox(props) {
  return (
    <g>
      {props.children}
    </g>
  );
}
