const React = require('react');
const styled = require('styled-components').default;
const color = require('./color');

module.exports = Cursor;

function Cursor(props) {
  return <StyledCursor {...props}/>;
}

const StyledCursor = styled.rect`
  fill: ${props => color(props.theme.cursor)};
`
