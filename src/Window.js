const React = require("react");
const tag = require("tag-hoc").default;
const color = require("./color");
const styled = require("./styled");

module.exports = Window;

function Window(props) {
  const paddingTop = props.paddingY;
  const paddingBottom = props.decorations ? 12.5 : props.paddingY;

  const width = props.width * 10 + props.paddingX*2;
  const height = props.height * 10 + paddingTop + paddingBottom;

  const d = Math.round(width / 50);
  const gap = Math.round(width / 80);
  const r = d / 2;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width={width}
      height={height}
      >
      <StyledBackground
        key="bg"
        width={width}
        height={height}
        rx={props.decorations ? 5 : 0}
        ry={props.decorations ? 5 : 0}
        theme={props.theme}
        />
      {props.decorations && [
        <StyledDot key="red" cx="20" cy="20" r={r} bgColor="#ff5f58" />,
        <StyledDot key="yellow" cx={20 + gap + d} cy="20" r={r} bgColor="#ffbd2e" />,
        <StyledDot key="green" cx={20 + gap*2 + d*2} cy="20" r={r} bgColor="#18c132" />
      ]}
      {props.children}
    </svg>
  );
}

const StyledBackground = styled.rect`
  fill: ${props => color(props.theme.background)};
`;

const StyledDot = styled.circle`
  fill: ${props => props.bgColor};
`;
