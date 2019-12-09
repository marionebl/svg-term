declare module "ansi-to-rgb" {
  type RGBTuple = [number, number, number];

  interface AnsiColors {
    [key: number]: RGBTuple;
  }

  var colors: AnsiColors;
  export = colors
}
