import * as React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import styled from "@emotion/styled";
import { from, to } from "./util";
import { LoadCastOptions, loadCast, LoadedCast } from "./load-cast";

import { Background } from "./Background";
import { Document } from "./Document";
import { Frame } from "./Frame";
import { Reel } from "./Reel";
import { Registry } from "./Registry";
import { Window } from "./Window";
import { Word } from "./Word";
import { toViewModel } from "./to-view-model";

import { defaultTheme } from "./default-theme";

const StyledContainer = styled.g`
  font-family: ${(props: any) => props.fontFamily};
`;

export interface SvgTermOptions extends LoadCastOptions {
  at?: number;
  from?: number;
  to?: number;

  paddingX: number;
  paddingY: number;

  theme?: SvgTermTheme;
  window?: boolean;
  cursor?: boolean;
}

export type SvgTermColor = [number, number, number];

export interface SvgTermTheme {
  0: SvgTermColor;
  1: SvgTermColor;
  2: SvgTermColor;
  3: SvgTermColor;
  4: SvgTermColor;
  5: SvgTermColor;
  6: SvgTermColor;
  7: SvgTermColor;
  8: SvgTermColor;
  9: SvgTermColor;
  10: SvgTermColor;
  11: SvgTermColor;
  12: SvgTermColor;
  13: SvgTermColor;
  14: SvgTermColor;
  15: SvgTermColor;
  background: SvgTermColor;
  bold: SvgTermColor;
  cursor: SvgTermColor;
  text: SvgTermColor;
  fontSize: number;
  lineHeight: number;
  fontFamily: string;
}

export function render(
  input: string | LoadedCast,
  options: SvgTermOptions
): string {
  const cast = typeof input === "string" ? loadCast(input, options) : input;

  const paddingX = typeof options.paddingX === "number" ? options.paddingX : 0;
  const paddingY = typeof options.paddingY === "number" ? options.paddingY : 0;

  const theme = options.theme || defaultTheme;
  theme.fontFamily =
    "fontFamily" in theme ? theme.fontFamily : defaultTheme.fontFamily;
  theme.fontSize = "fontSize" in theme ? theme.fontSize : defaultTheme.fontSize;
  theme.lineHeight =
    "lineHeight" in theme ? theme.lineHeight : defaultTheme.lineHeight;

  const bound = { from: options.from, to: options.to, at: options.at, cast };
  const decorations = typeof options.window === 'boolean' ? options.window : false;

  const data = toViewModel({
    cast,
    cursor: options.cursor,
    height: options.height,
    theme,
    from: from(bound),
    to: to(bound)
  });

  return renderToStaticMarkup(
    <Window
      decorations={decorations}
      width={data.width}
      height={data.displayHeight}
      background={theme.background}
      paddingX={paddingX}
      paddingY={paddingY}
    >
      <Document
        width={data.width}
        height={data.displayHeight}
        x={options.window ? 15 + paddingX : options.paddingX}
        y={options.window ? 50 + paddingY : options.paddingY}
      >
        <StyledContainer
          fontFamily={theme.fontFamily}
          fontSize={theme.fontSize}
        >
          <Registry
            frameHeight={cast.height}
            frameWidth={cast.width}
            hasCursors={data.frames.some((frame: any) => frame.cursor.visible)}
            hasFrames={data.frames.length > 0}
            items={data.registry}
          />
          <Background
            width={data.width}
            height={data.displayHeight}
            fill={theme.background}
          />
          <Reel
            duration={data.duration}
            frameWidth={cast.width}
            stamps={data.stamps}
            width={data.frames.length * cast.width}
          >
            {data.frames.map((frame: any, index: number) => {
              return (
                <Frame
                  key={frame.stamp}
                  stamp={frame.stamp}
                  offset={index}
                  width={data.width}
                  height={data.displayHeight}
                >
                  {frame.cursor.visible && (
                    <use
                      xlinkHref="#b"
                      x={frame.cursor.x - theme.fontSize * 1.2}
                      y={
                        frame.cursor.y === 0
                          ? 0
                          : frame.cursor.y + theme.lineHeight * 0.75
                      }
                    />
                  )}
                  {frame.lines.map((line: any, index: number) => {
                    if (typeof line.id === "number") {
                      return (
                        <use
                          key={`${line.id}-${index}`}
                          xlinkHref={`#${line.id}`}
                          y={line.y}
                        />
                      );
                    }
                    return line.words.map((word: any) => {
                      return (
                        <Word
                          bg={word.attr.bg}
                          bold={word.attr.bold}
                          fg={word.attr.fg}
                          inverse={word.attr.inverse}
                          theme={theme}
                          underline={word.attr.underline}
                          x={word.x}
                          y={line.y + theme.fontSize}
                        >
                          {word.children}
                        </Word>
                      );
                    });
                  })}
                </Frame>
              );
            })}
          </Reel>
        </StyledContainer>
      </Document>
    </Window>
  );
}
