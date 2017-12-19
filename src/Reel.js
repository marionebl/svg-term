const React = require('react');

module.exports = Reel;

function Reel(props) {
  const dp = props.duration / 100;
  const sp = 100 / props.stamps.length;

  const p = s => s / dp;

  const animation = `
    @keyframes play {
      ${props.stamps.map((stamp, i) => `
        ${p(stamp)}% {
          transform: translateX(-${props.frameWidth * i}px);
        }
      `).join('\n')}
    }
  `;

  return (
    <g
      data-name="Reel"
      style={{
        animationName: 'play',
        animationDuration: `${props.duration}s`,
        animationIterationCount: 'infinite',
        animationTimingFunction: 'steps(1, end)'
      }}
      >
      <svg
        x="0"
        y="0"
        width={props.width}
        >
        {props.children}
        <style type="text/css">
          {animation}
        </style>
      </svg>
    </g>
  );
}
