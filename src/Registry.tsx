import * as React from "react";
import styled from "@emotion/styled";
import { Cursor } from "./Cursor";
import { Word } from "./Word";
import { Attributes } from "load-asciicast";
import { RGBTuple } from "./default-theme";

export interface RegistryWord {
  attr: Attributes;
  x: number;
  children: string;
  offset: number;
}

export interface RegistryItem {
  type: "line" | string;
  id: string | number;
  words: RegistryWord[];
}

export interface RegistryProps {
  items: RegistryItem[];
  theme: {
    fontSize: number;
    lineHeight: number;
    cursor: RGBTuple;
  };
  hasFrames: boolean;
  frameHeight: number;
  frameWidth: number;
  hasCursors: boolean;
}

export const Registry: React.FunctionComponent<RegistryProps> = props => {
  return (
    <defs>
      {props.items.map(item => {
        switch (item.type) {
          case "line":
            return <LineSymbol key={item.id} theme={props.theme} {...item} />;
          default:
            throw new TypeError(`Unknown Registry item of type ${item.type}`);
        }
      })}
      {props.hasFrames && [
        <symbol id="a" key="a">
          <StyledBackground
            height={props.frameHeight}
            width={props.frameWidth}
            x="0"
            y="0"
          />
        </symbol>,
        props.hasCursors && (
          <symbol id="b" key="b">
            <Cursor
              height={props.theme.fontSize * props.theme.lineHeight}
              fill={props.theme.cursor}
              width={props.theme.fontSize * 0.66}
            />
          </symbol>
        )
      ]}
    </defs>
  );
};

export interface LineWordProps {
  attr: {
    inverse?: boolean;
    bg?: boolean;
    bold?: boolean;
    underline?: boolean;
    fg?: number | string;
  };
  children: string;
  x: number;
  // y: number;
  // theme: {
  //   lineHeight: number;
  // };
}

export interface LineSymbolProps {
  id: string | number;
  words: LineWordProps[];
  theme: {
    fontSize: number;
    lineHeight: number;
  };
}

const LineSymbol: React.FunctionComponent<LineSymbolProps> = props => {
  return (
    <symbol id={String(props.id)}>
      {props.words.map((word, index) => (
        <Word
          bg={word.attr.bg}
          bold={word.attr.bold}
          fg={word.attr.fg}
          inverse={word.attr.inverse}
          key={index}
          theme={props.theme}
          underline={word.attr.underline}
          x={word.x}
          y={props.theme.fontSize}
        >
          {word.children}
        </Word>
      ))}
    </symbol>
  );
};

const StyledBackground = styled.rect`
  fill: transparent;
`;
