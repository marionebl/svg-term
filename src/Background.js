const React = require('react');
const color = require('./color');
const styled = require('./styled');

module.exports = Background;

function Background(props) {
  return <StyledBackground
    height={props.height}
    theme={props.theme}
    width={props.width}
    />;
}

const StyledBackground = styled.rect`
  fill: ${props => color(props.theme.background)};
`;
