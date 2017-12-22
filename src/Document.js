const React = require('react');
const {renderToStaticMarkup} = require('react-dom/server');
const {ServerStyleSheet} = require('@stiligita/stylesheets');

module.exports = Document;

function Document(props) {
  const sheet = new ServerStyleSheet()
  const content = render(props);
  const css = sheet.getStyleTag();
  const __html = `${css}${content}`;

  return (
    <svg
      dangerouslySetInnerHTML={{__html}}
      data-name="Document"
      height={props.height * 10}
      viewBox={[0, 0, props.width, props.height].join(' ')}
      width={props.width * 10}
      x={props.x}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      y={props.y}
      />
  );
}

function render(props) {
  return renderToStaticMarkup(React.Children.only(props.children));
}
