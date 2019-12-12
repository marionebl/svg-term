import * as React from "react";
import styled from '@emotion/styled';
import { color, ColorInput } from "./color";
import { Theme } from "./default-theme";

export interface WordProps {
  inverse?: boolean;
  bg?: boolean;
  bold?: boolean;
  underline?: boolean;
  fg?: string | number;
  children: string;
  x: number;
  y: number;
  theme: {
    fontSize: number;
    lineHeight: number;
  };
}

export const Word: React.FunctionComponent<WordProps> = props => {
  return (
    <>
      {(props.inverse || props.bg) && (
        <StyledWordBackground
          bg={props.bg}
          fg={props.fg}
          height={props.theme.fontSize * props.theme.lineHeight}
          inverse={props.inverse}
          width={props.children.length > 0 ? props.children.length : 0}
          x={props.x * props.theme.fontSize * 0.6}
          y={props.y - props.theme.fontSize}
        />
      )}
      <StyledWord
        bg={props.bg}
        bold={props.bold}
        fg={props.fg}
        inverse={props.inverse}
        theme={props.theme}
        underline={props.underline}
        x={props.x * props.theme.fontSize * 0.6}
        y={props.y}
      >
        {props.children}
      </StyledWord>
    </>
  );
};

const BG_FILL = (props: any) =>
  props.inverse ? fg(props, props.theme) : bg(props, props.theme);
const TEXT_FILL = (props: any) =>
  props.inverse ? bg(props, props.theme) : fg(props, props.theme);
const DECORATION = (props: any) => (props.underline ? "underline" : null);
const FONT_WEIGHT = (props: any) => (props.bold ? "bold" : null);

const StyledWordBackground = styled.rect<any>`
  fill: ${BG_FILL};
`;

const StyledWord = styled.text<any>`
  fill: ${TEXT_FILL};
  text-decoration: ${DECORATION};
  font-weight: ${FONT_WEIGHT};
  white-space: pre;
`;

function bg(props: any, theme: any) {
  const b = typeof props.bg === "undefined" ? theme.background : props.bg;
  return color(b, theme, theme.background);
}

function fg(props: any, theme: any) {
  const d = props.bold ? theme.bold : theme.text;

  // Bold takes precedence if fg is undefined or 0
  if (props.bold && !props.fg) {
    return color(theme.bold, theme);
  }

  const f = typeof props.fg === "undefined" ? d : props.fg;
  return color(f, theme, d);
}
