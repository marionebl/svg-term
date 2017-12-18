const React = require('react');

module.exports = Reel;

function Reel(props) {
  const dp = props.duration / 100;
  const sp = 100 / props.stamps.length;

  const p = s => s / dp;
  const t = i => i * sp;

  const animation = `
    @keyframes play {
      ${props.stamps.map((stamp, i) => `
        ${p(stamp)}% {
          transform: translateX(-${t(i)}%);
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
      <style>
        {animation}
      </style>
      <svg
        x="0"
        y="0"
        width={props.width}
        >
        {props.children}
      </svg>
    </g>
  );
}

/* const magnitude = x => {
  const m = Math.floor(Math.log(x) / Math.log(10));
  if (m < 0) {
    return -m;
  }
  return 0;
}

const round = (x, n) => {
  return Math.round(x * Math.pow(10, n)) / Math.pow(10, n);
} */
