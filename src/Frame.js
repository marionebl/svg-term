const React = require('react');
const styled = require('styled-components').default;
const tag = require('tag-hoc').default;

module.exports = Frame;

function Frame(props) {
  return (
    <svg data-name="frame" x={props.offset * props.width}>
      <StyledBackground
        x="0"
        y="0"
        width={props.width}
        height={(props.height + 1) * 1.3}
        />
      {props.children}
    </svg>
  );
}

const StyledFrame = styled(tag(['width', 'height'])('svg'))`
  width: ${props => props.width};
  height: ${props => props.height};
`;

const StyledBackground = styled.rect`
  fill: transparent;
`;
