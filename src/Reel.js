const React = require('react');
const styled = require('styled-components').default;
const {keyframes} = require('styled-components');

module.exports = Reel;

function Reel(props) {
  const dp = props.duration / 100;
  const sp = 100 / props.stamps.length;

  const p = s => s / dp;
  const t = i => i * sp;

  const animation = keyframes`
    ${props.stamps.map((stamp, i) => `
      ${p(stamp)}% {
        transform: translateX(-${t(i)}%);
      }
    `)}
  `;

  return (
    <StyleAnimationStage
      animation={animation}
      duration={props.duration}
      count={props.stamps.length}
      >
      <svg
        x="0"
        y="0"
        width={props.width}
        data-name="reel"
        >
        {props.children}
      </svg>
    </StyleAnimationStage>
  );
}

const StyleAnimationStage = styled.g`
  animation-name: ${props => props.animation};
  animation-duration: ${props => props.duration}s;
  animation-iteration-count: infinite;
  animation-timing-function: steps(1, end);
`
