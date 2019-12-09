import React from "react";
import { color, ColorInput } from "./color";

export interface WindowProps {
  decorations: boolean;
  paddingY: number;
  paddingX: number;
  width: number;
  height: number;
  background: ColorInput<never>;
}

export const Window: React.FunctionComponent<WindowProps> = props => {
  const paddingTop = props.decorations ? props.paddingY + 40 : props.paddingY;
  const paddingBottom = props.decorations
    ? props.paddingY + 20
    : props.paddingY;
  const paddingX = props.decorations ? props.paddingX + 20 : props.paddingX;

  const width = props.width * 10 + paddingX * 2;
  const height = props.height * 10 + paddingTop + paddingBottom;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width={width}
      height={height}
    >
      <rect
        key="bg"
        width={width}
        height={height}
        rx={props.decorations ? 5 : 0}
        ry={props.decorations ? 5 : 0}
        fill={color(props.background)!}
      />
      {props.decorations && (
        <svg y="0%" x="0%">
          <circle key="red" cx={20} cy={20} r={6} fill="#ff5f58" />
          <circle key="yellow" cx={40} cy={20} r={6} fill="#ffbd2e" />
          <circle key="green" cx={60} cy={20} r={6} fill="#18c132" />
        </svg>
      )}
      {props.children}
    </svg>
  );
};
