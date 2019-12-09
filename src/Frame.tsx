import * as React from 'react';

export interface FrameProps {
  offset: number;
  width: number;
}

export const Frame: React.FunctionComponent<FrameProps> = (props) => {
  return (
    <svg x={props.offset * props.width}>
      <use xlinkHref="#a"/>
      {props.children}
    </svg>
  );
}
