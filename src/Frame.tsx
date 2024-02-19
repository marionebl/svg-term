import * as React from 'react';

export interface FrameProps {
  offset: number;
  width: number;
  height: number;
}

export const Frame: React.FunctionComponent<FrameProps> = (props) => {
  return (
    <svg x={props.offset * props.width} width={props.width} viewBox={`0 0 ${props.width} ${props.height}`}>
      <use xlinkHref="#a"/>
      {props.children}
    </svg>
  );
}
