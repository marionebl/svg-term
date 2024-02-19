import * as React from "react";
import styled from "@emotion/styled";
import { Background } from "./Background";
import { Document } from "./Document";
import { Frame } from "./Frame";
import { Reel } from "./Reel";
import { Registry } from "./Registry";
import { Window } from "./Window";
import { Word } from "./Word";
import { toViewModel } from "./to-view-model";
import { from, to } from "./util";
import { LoadedCast } from "./load-cast";
import { Theme } from "./default-theme";

export interface SvgTermProps {
  cast: LoadedCast;
  theme: Theme;
  paddingX: number;
  paddingY: number;
  decorations: boolean;
  from?: number;
  to?: number;
  at?: number;
  cursor: boolean;
}

const StyledContainer = styled.g`
  font-family: ${(props: any) => props.fontFamily};
`;

export const SvgTerm: React.FunctionComponent<SvgTermProps> = props => {
  const bound = { from: props.from, to: props.to, at: props.at, cast: props.cast };

  const data = toViewModel({
    cast: props.cast,
    cursor: props.cursor,
    theme: props.theme,
    from: from(bound),
    to: to(bound)
  });

  return (
    <Window
      decorations={props.decorations}
      width={data.displayWidth}
      height={data.displayHeight}
      background={props.theme.background}
      paddingX={props.paddingX}
      paddingY={props.paddingY}
    >
      <Document
        width={data.displayWidth}
        height={data.displayHeight}
        x={props.decorations ? 15 + props.paddingX : props.paddingX}
        y={props.decorations ? 50 + props.paddingY : props.paddingY}
      >
        <StyledContainer
          fontFamily={props.theme.fontFamily}
          fontSize={props.theme.fontSize}
        >
          <Registry
            frameHeight={props.cast.height}
            frameWidth={props.cast.width}
            hasCursors={data.frames.some((frame: any) => frame.cursor.visible)}
            hasFrames={data.frames.length > 0}
            items={data.registry}
            theme={props.theme}
          />
          <Background
            width={data.displayWidth}
            height={data.displayHeight}
            fill={props.theme.background}
          />
          <Reel
            duration={data.duration}
            frameWidth={props.cast.width}
            stamps={data.stamps}
            width={data.frames.length * props.cast.width}
          >
            {data.frames.map((frame: any, index: number) => {
              return (
                <Frame key={frame.stamp} offset={index} width={data.displayWidth} height={data.displayHeight}>
                  {frame.cursor.visible && (
                    <use
                      xlinkHref="#b"
                      x={frame.cursor.x - props.theme.fontSize * 1.2}
                      y={
                        frame.cursor.y === 0
                          ? 0
                          : frame.cursor.y + props.theme.lineHeight * 0.75
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
                          theme={props.theme}
                          underline={word.attr.underline}
                          x={word.x}
                          y={line.y + props.theme.fontSize}
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
};
