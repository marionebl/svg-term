const React = require('react');
const {renderToStaticMarkup} = require('react-dom/server');
const {ServerStyleSheet, ThemeProvider} = require('styled-components');

module.exports = Document;

function Document(props) {
  const sheet = new ServerStyleSheet()
  const content = render(props, {sheet});
  const css = sheet.getStyleTags();
  const __html = `${css}${content}`;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      dangerouslySetInnerHTML={{__html}}
      viewBox={[0, 0, props.width, props.height].join(' ')}
      width={props.width * 10}
      height={props.height * 10}
      >
    </svg>
  );
}

function render(props, {sheet}) {
  return renderToStaticMarkup(
    sheet.collectStyles(
      <ThemeProvider theme={props.theme}>
        {React.Children.only(props.children)}
      </ThemeProvider>
    )
  );
}
