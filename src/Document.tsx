import * as React from 'react';

export interface DocumentProps {
  height: number;
  width: number;
  x: number;
  y: number;
  children: React.ReactElement;
}

export const Document: React.FunctionComponent<DocumentProps> = (props) => {
  return (
    <svg
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
