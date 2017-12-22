const React = require('react');
const tag = require('tag-hoc').default;

module.exports = Frame;

function Frame(props) {
  return (
    <svg x={props.offset * props.width}>
      <use xlinkHref="#a"/>
      {props.children}
    </svg>
  );
}
