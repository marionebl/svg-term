interface NearestOptions {
  cast: any;
  max?: number;
  min?: number;
}

interface ClampOptions {
  cast: any;
  at?: number;
  from?: number;
  to?: number;
}

const NOOP = () => true;
const MAX = (max: number) => ([f]: any) => f <= max;
const MIN = (min: number) => ([f]: any) => f >= min;

function nearest(stamp: number, { cast, max, min }: NearestOptions) {
  return cast.frames
    .filter(typeof max === "number" && !isNaN(max) ? MAX(max) : NOOP)
    .filter(typeof min === "number" && !isNaN(min) ? MIN(min) : NOOP)
    .sort(
      ([a]: any, [b]: any) => Math.abs(stamp - a) - Math.abs(stamp - b)
    )[0][0];
}

export function from(options: ClampOptions) {
  const { at, from, cast } = options;
  if (typeof at === "number") {
    return nearest(at / 1000, { cast });
  }
  return typeof from === "number" && !isNaN(from)
    ? nearest(from / 1000, { cast, min: from / 1000 })
    : 0;
}

export function to(options: ClampOptions) {
  const { at, from, to, cast } = options;
  if (typeof at === "number") {
    return nearest(at / 1000, { cast });
  }
  return typeof to === "number" && !isNaN(from)
    ? nearest(to / 1000, { cast, max: to / 1000 })
    : cast.duration;
}
