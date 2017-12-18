const React = require('react');
const {renderToStaticMarkup} = require('react-dom/server');

module.exports = Document;

function Document(props) {
  return (
    <svg
      data-name="Document"
      height={props.height * 10}
      viewBox={[0, 0, props.width, props.height].join(' ')}
      width={props.width * 10}
      x={props.x}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      y={props.y}
      >
     {props.children}
    </svg>
  );
}
