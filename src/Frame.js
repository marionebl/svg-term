const React = require('react');
const tag = require('tag-hoc').default;

module.exports = Frame;

function Frame(props) {
  return (
    <svg
      data-name="Frame"
      x={props.offset * props.width}>
      <rect
        data-name="FrameBackground"
        height={props.height}
        style={{fill: 'transparent'}}
        width={props.width}
        x="0"
        y="0"
        />
      {props.children}
    </svg>
  );
}
