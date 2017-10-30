const React = require('react');
const styled = require('styled-components').default;
const color = require('./color');

module.exports = Background;

function Background(props) {
  return <StyledBackground {...props}/>;
}

const StyledBackground = styled.rect`
  fill: ${props => color(props.theme.background)};
`
