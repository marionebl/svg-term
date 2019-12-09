import React from "react";
import { color, ColorInput } from "./color";
import styled from "@emotion/styled";

type RectProps = React.SVGProps<"rect">;

export interface CursorProps {
  height: RectProps["height"];
  width: RectProps["height"];
  x?: RectProps["x"];
  y?: RectProps["y"];
  fill: ColorInput<never>;
}

export const Cursor: React.FunctionComponent<CursorProps> = props => {
  return (
    <StyledCursor
      height={props.height}
      width={props.width}
      x={props.x}
      y={props.y}
      fill={color(props.fill)!}
    />
  );
};

const StyledCursor = styled.rect``;
