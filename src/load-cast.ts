import { load, Cast, LoadOptions } from "load-asciicast";

export { LoadOptions as LoadCastOptions };
export { Cast as LoadedCast, Frame as LoadedFrame } from "load-asciicast";;

export function loadCast(input: string, options: LoadOptions = {}): Cast {
  if (!input) {
    throw new TypeError(`svg-term.reder: missing input`);
  }

  const { width, height, idle, fps } = options;
  return load(input, {
    width,
    height: height ? height + 1 : undefined,
    idle: idle ? idle / 1000 : undefined,
    fps
  });
}
