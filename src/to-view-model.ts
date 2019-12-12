import {flatMap, entries, groupBy, isEqual} from 'lodash';
import hash from 'object-hash';
import { LoadedCast, LoadedFrame } from './load-cast';
import { Theme } from './default-theme';
import { VersionOneFrame, VersionZeroFrame, Line, Cursor, Attributes } from 'load-asciicast';

export interface ViewModelOptions {
  cursor?: boolean;
  cast: LoadedCast;
  from: number;
  to: number;
  theme: Theme;
  height?: number;
}

export interface ViewModel {
  displayHeight: number;
  displayWidth: number;
  duration: number;
  frames: ViewFrame[];
  height: number;
  registry: RegistryItem[];
  stamps: number[];
  width: number;
}

export interface ViewFrame {
  cursor: Cursor;
  lines: {
      y: number;
      words: Word[];
      hash: string;
      ref: null;
  }[];
  stamp: number;
}

export interface RegistryItem {
  type: string;
  words: Word[];
  id: number;
}

type AnyFrame = LoadedFrame<VersionOneFrame | VersionZeroFrame>;

export function toViewModel(options: ViewModelOptions): ViewModel {
  const {cursor: cursorOption, cast, theme, from, to} = options;
  const loadedFrames: AnyFrame[] = cast.frames;
  const stamps = loadedFrames
    .filter(([stamp]) => stamp >= from && stamp <= to)
    .map(([stamp]) => stamp - from);
  const fontSize = theme.fontSize;
  const lineHeight = theme.lineHeight;
  const height = typeof options.height === 'number' ? options.height : cast.height;

  const frames = loadedFrames
    .filter(([stamp]) => stamp >= from && stamp <= to)
    .map(([delta, data]) => [delta, data, liner(data)] as const)
    .map(([stamp, data, l]) => {
      const lines = l
        .map((chars, y) => {
          const words = toWords(chars);

          return {
            y: y * fontSize * lineHeight,
            words,
            hash: hash(words),
            ref: null
          };
        });

      const cursor = getCursor(data);
      const cl = lines[cursor.y] || {y: 0};

      cursor.x = cursor.x + 2;
      cursor.y = Math.max(0, cl.y - 1);
      cursor.visible = cursorOption === false ? false : cursor.visible;

      return {
        cursor,
        lines,
        stamp: (Math.round(stamp * 100) / 100) - from
      };
    });

  const candidates: (typeof frames[0])["lines"] = flatMap(frames, 'lines').filter(line => line.words.length > 0);
  const hashes = groupBy(candidates, 'hash');

  const registry = entries(hashes)
    .filter(([_, lines]) => lines.length > 1)
    .map(([hash, [line]], index) => {
      const id = index + 1;
      const words = line.words.slice(0);

      frames.forEach(frame => {
        frame.lines
          .filter(line => line.hash === hash)
          .forEach(l => {
            l.words = [];
            (l as any).id = id;
          });
      });

      return {type: 'line', words, id};
    });

  return {
    width: cast.width,
    displayWidth: cast.width,
    height: cast.height,
    displayHeight: height * fontSize * lineHeight,
    duration: to - from,
    registry,
    stamps,
    frames
  };
}

function getCursor(data: VersionOneFrame | VersionZeroFrame): Cursor {
  if (data.hasOwnProperty('cursor')) {
    const frame = data as VersionZeroFrame;
    return frame.cursor;
  }

  const frame = data as VersionOneFrame;
  return frame.screen.cursor;
}

function liner(data: VersionZeroFrame | VersionOneFrame): Line[] {
  if (data.hasOwnProperty('lines')) {
    const frame = data as VersionZeroFrame;
    return toOne(frame.lines);
  }

  const frame = data as VersionOneFrame;
  return frame.screen.lines;
}

interface Word {
  attr: Attributes;
  x: number;
  children: string;
  offset: number;
}

function toWords(chars: Line): Word[] {
  return chars
    .reduce<Word[]>((words, [point, attr]) => {
      if (words.length === 0) {
        words.push({
          attr,
          x: 0,
          children: '',
          offset: 0
        });
      }

      const word = words[words.length - 1];
      const children = String.fromCodePoint(point);

      if (children === ' ' && !('bg' in attr) && !attr.inverse) {
        word.offset = word.offset + 1;
        return words;
      }

      if (isEqual(word.attr, attr) && word.offset === 0) {
        word.children += children;
      } else {
        words.push({
          attr,
          x: word.x + word.children.length + word.offset,
          children,
          offset: 0
        });
      }

      return words;
    }, [])
    .filter((word) => {
      if ('bg' in word.attr || word.attr.inverse) {
        return true;
      }

      const trimmed = word.children.trim();

      if ((trimmed === '' || trimmed === '⏎')) {
        return false;
      }

      return true;
    });
}

function toOne(arrayLike: any): any {
  return Object.entries(arrayLike)
    .sort((a: any, b: any) => a[0] - b[0])
    .map(e => e[1])
    .map((words: any) => words.reduce((chars: any, word: any) => {
      const [content, attr] = word;
      chars.push(...content.split('').map((char: any) => [char.codePointAt(0), attr]));
      return chars;
    }, []), []);
}
