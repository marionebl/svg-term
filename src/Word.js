const React = require('react');
const styled = require('styled-components').default;
const tag = require('tag-hoc').default;
const color = require('./color');

module.exports = Word;

function Word(props) {
  return [
    typeof props.bg !== 'undefined' && (
      <StyledTextBackground
        bg={props.bg}
        x={props.x ? `${props.x + 0.75}ch` : null}
        y={props.y - 1}
        height={1.3}
        width={`${props.children.length + 2.75}ch`}
        fontSize="1"
        />
    ),
    <StyledText
      bold={props.bold}
      fg={props.fg}
      fontSize="1"
      underline={props.underline}
      x={props.x ? `${props.x}ch` : null}
      y={props.y}
      >
      {props.children}
    </StyledText>
  ];
}

const Text = tag(['fg', 'bg', 'underline', 'bold'])('text');

const StyledText = styled(styled(styled(styled(Text)`
  font-family: Monaco, Consolas, Menlo, 'Bitstream Vera Sans Mono', monospace, 'Powerline Symbols';
`)`
  fill: ${props => fg(props, props.theme)};
`)`
  text-decoration: ${props => props.underline ? 'underline' : 'none'};
`)`
  font-weight: ${props => props.bold ? 'bold': 'normal'};
`;

const StyledTextBackground = styled.rect`
  fill: ${props => color(props.bg, props.theme)};
`;

function fg(props, theme) {
  const d = props.bold ? theme.bold : theme.text;
  return color(props.fg || d, theme);
}
