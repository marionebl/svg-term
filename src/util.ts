type Frame = readonly [number, unknown];

interface NearestOptions {
  cast: { frames: Frame[] };
  max?: number;
  min?: number;
}

interface ClampOptions {
  cast: { frames: Frame[]; duration: number };
  at?: number;
  from?: number;
  to?: number;
}

type NoopPredicate = (frame: unknown) => boolean;
type FramePredicate = (frame: Frame) => boolean;

const NOOP = (_: unknown): NoopPredicate => () => true;
const MAX = (max: number): FramePredicate => ([f]: Frame) => f <= max;
const MIN = (min: number): FramePredicate => ([f]: Frame) => f >= min;

function nearest(stamp: number, { cast, max, min }: NearestOptions): number {
  return cast.frames
    .filter(typeof max === "number" && !isNaN(max) ? MAX(max) : NOOP)
    .filter(typeof min === "number" && !isNaN(min) ? MIN(min) : NOOP)
    .sort(
      ([a]: any, [b]: any) => Math.abs(stamp - a) - Math.abs(stamp - b)
    )[0][0];
}

export function from(options: ClampOptions): number {
  const { at, from, cast } = options;
  if (typeof at === "number") {
    return nearest(at / 1000, { cast });
  }
  return typeof from === "number" && !isNaN(from)
    ? nearest(from / 1000, { cast, min: from / 1000 })
    : 0;
}

export function to(options: ClampOptions): number {
  const { at, to, cast } = options;
  if (typeof at === "number") {
    return nearest(at / 1000, { cast });
  }
  return typeof to === "number" && !isNaN(to)
    ? nearest(to / 1000, { cast, max: to / 1000 })
    : cast.duration;
}
