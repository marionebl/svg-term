import * as React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import styled from "@emotion/styled";
import { LoadCastOptions, loadCast, LoadedCast } from "./load-cast";
import { defaultTheme, Theme } from "./default-theme";
import { SvgTerm } from "./svg-term";

export interface SvgTermOptions extends LoadCastOptions {
  at?: number;
  from?: number;
  to?: number;

  paddingX: number;
  paddingY: number;

  theme?: Theme;
  window?: boolean;
  cursor?: boolean;
}

export type SvgTermColor = [number, number, number];

export function render(
  input: string | LoadedCast,
  options: SvgTermOptions
): string {
  const cast = typeof input === "string" ? loadCast(input, options) : input;

  const theme = {...(options.theme || defaultTheme)};
  theme.fontFamily =
    "fontFamily" in theme ? theme.fontFamily : defaultTheme.fontFamily;
  theme.fontSize = "fontSize" in theme ? theme.fontSize : defaultTheme.fontSize;
  theme.lineHeight =
    "lineHeight" in theme ? theme.lineHeight : defaultTheme.lineHeight;

  const paddingX = typeof options.paddingX === "number" ? options.paddingX : 0;
  const paddingY = typeof options.paddingY === "number" ? options.paddingY : 0;
  const decorations =
    typeof options.window === "boolean" ? options.window : false;

  const cursor = typeof options.cursor === "boolean" ? options.cursor : false;

  return renderToStaticMarkup(
    <SvgTerm
      cast={cast}
      theme={theme}
      paddingX={paddingX}
      paddingY={paddingY}
      decorations={decorations}
      cursor={cursor}
    />
  );
}
