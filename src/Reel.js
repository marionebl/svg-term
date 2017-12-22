const React = require('react');
const keyframes = require('@stiligita/keyframes').default;
const styled = require('./styled');

module.exports = Reel;

function Reel(props) {
  const dp = props.duration / 100;
  const sp = 100 / props.stamps.length;
  const p = s => s / dp;

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
