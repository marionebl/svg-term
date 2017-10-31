const {uniq} = require('lodash');
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
`;

const magnitude = x => {
  const m = Math.floor(Math.log(x) / Math.log(10));
  if (m < 0) {
    return -m;
  }
  return 0;
}

const round = (x, n) => {
  return Math.round(x * Math.pow(10, n)) / Math.pow(10, n);
}
