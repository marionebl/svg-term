const React = require("react");
const tag = require("tag-hoc").default;
const color = require("./color");
const styled = require("./styled");

module.exports = Window;

function Window(props) {
  const paddingTop = props.decorations ? props.paddingY + 40 : props.paddingY;
  const paddingBottom = props.decorations ? props.paddingY + 20 : props.paddingY;
  const paddingX = props.decorations ? props.paddingX + 20 : props.paddingX;

  const width = props.width * 10 + paddingX*2;
  const height = props.height * 10 + paddingTop + paddingBottom;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      >
      <StyledBackground
        key="bg"
        width={width}
        height={height}
        rx={props.decorations ? 5 : 0}
        ry={props.decorations ? 5 : 0}
        theme={props.theme}
        />
      {props.decorations &&
        <svg y="0%" x="0%">
          <StyledDot key="red" cx={20} cy={20} r={6} bgColor="#ff5f58" />
          <StyledDot key="yellow" cx={40} cy={20} r={6} bgColor="#ffbd2e" />
          <StyledDot key="green" cx={60} cy={20} r={6} bgColor="#18c132" />
        </svg>
      }
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
