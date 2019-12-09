import * as React from "react";

export const Viewbox: React.FunctionComponent = props => {
  return <g>{props.children}</g>;
};
