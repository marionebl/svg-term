import rgb from "ansi-to-rgb";

export type ColorTuple = [number, number, number];

export interface ColorTheme {
  [name: string]: ColorTuple;
}

export type ColorInput<T> =
  | ColorTuple
  | keyof T
  | string
  | undefined;

export function color<T extends ColorTheme>(input: ColorInput<T>, theme?: T, fallback?: ColorTuple): string | null {
  if (!input) {
    return null;
  }

  if (Array.isArray(input)) {
    return `rgb(${input.join(", ")})`;
  }

  const c = theme ? theme[input] : null;

  if (c) {
    return `rgb(${c.join(", ")})`;
  }

  const r = rgb[Number(input)];

  if (r) {
    return `rgb(${r.join(", ")})`;
  }

  if (!fallback) {
    throw new TypeError(`color: Unknown ANSI color ${input}`);
  }

  return color(fallback, theme);
}
