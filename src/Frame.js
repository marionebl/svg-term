const React = require('react');

module.exports = Frame;

function Frame(props) {
  return (
    <svg x={props.offset * props.width}>
      <use xlinkHref="#a"/>
      {props.children}
    </svg>
  );
}
