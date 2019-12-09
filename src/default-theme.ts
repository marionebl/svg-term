export type RGBTuple = [number, number, number];

export interface Theme {
  0: RGBTuple;
  1: RGBTuple;
  2: RGBTuple;
  3: RGBTuple;
  4: RGBTuple;
  5: RGBTuple;
  6: RGBTuple;
  7: RGBTuple;
  8: RGBTuple;
  9: RGBTuple;
  10: RGBTuple;
  11: RGBTuple;
  12: RGBTuple;
  13: RGBTuple;
  14: RGBTuple;
  15: RGBTuple;
  background: RGBTuple;
  bold: RGBTuple;
  cursor: RGBTuple;
  text: RGBTuple;
  fontSize: number;
  lineHeight: number;
  fontFamily: string;
}

export const defaultTheme: Theme = {
  0: [40, 45, 53], // Black
  1: [232, 131, 136], // Red
  2: [168, 204, 140], // Green
  3: [219, 171, 121], // Yellow
  4: [113, 190, 242], // Blue
  5: [210, 144, 228], // Magenta
  6: [102, 194, 205], // Cyan
  7: [185, 191, 202], // White
  8: [111, 119, 131], // Light Black
  9: [232, 131, 136], // Light Red
  10: [168, 204, 140], // Light Green
  11: [219, 171, 121], // Light Yellow
  12: [115, 190, 243], // Light Blue
  13: [210, 144, 227], // Light Magenta
  14: [102, 194, 205], // Light Cyan
  15: [255, 255, 255], // Light White
  background: [40, 45, 53], // background color
  bold: [185, 192, 203], // Default bold text color
  cursor: [111, 118, 131], // Cursor color
  text: [185, 192, 203], // Default text color,
  fontSize: 1.67,
  lineHeight: 1.3,
  fontFamily: 'Monaco, Consolas, Menlo, \'Bitstream Vera Sans Mono\', \'Powerline Symbols\', monospace'
};
