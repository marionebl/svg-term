const React = require('react');
const keyframes = require('@stiligita/keyframes').default;
const styled = require('./styled');

module.exports = Reel;

const PERCEPTIBLE = 1 / 60;

function magnitude(x) {
  const y = Math.abs(x);

  if (y > 1) {
    return 0;
  }

  const result = Math.floor(Math.log(y) / Math.log(10) + 1);
  return result === 0 ? result : -1 * result;
}

function Reel(props) {
  if (props.duration === 0) {
    return (
      <svg
      x="0"
      y="0"
      width={props.width}
      >
        {props.children}
      </svg>
    );
  }

  const factor = Math.pow(10, magnitude(PERCEPTIBLE / (props.duration / 100)) + 1);
  const p = s => Math.round((s / (props.duration / 100)) * factor) / factor;

  const animation = keyframes`
    ${props.stamps.map((stamp, i) => `
      ${p(stamp)}% {
        transform: translateX(-${props.frameWidth * i}px);
      }
    `).join('\n')}
  `;

  return (
    <StyledAnimationStage
      animation={animation}
      duration={props.duration}
      >
      <svg
        x="0"
        y="0"
        width={props.width}
        >
        {props.children}
      </svg>
    </StyledAnimationStage>
  );
}

const StyledAnimationStage = styled.g`
  animation-name: ${props => props.animation};
  animation-duration: ${props => props.duration}s;
  animation-iteration-count: infinite;
  animation-timing-function: steps(1, end);
`;
