const React = require('react');
const styled = require('styled-components').default;

module.exports = Viewbox;

function Viewbox(props) {
  return (
    <StyledViewbox>
      {props.children}
    </StyledViewbox>
  );
}

const StyledViewbox = styled.g`

`;
