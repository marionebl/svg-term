> Share terminal sessions via SVG and CSS

# svg-term

* Render [asciinema][asciinema] asciicast to animated SVG
* Use custom themes
* Share asciicast everywhere

```sh
npm install svg-term
```

## Usage

```js
const fs = require('fs');
const {promisify} = require('util');
const readFile = promisify(fs.readFile);
const {render} = require('svg-term');

(async () => {
  const data = String(await readFile('./asciicast.json'));
  const svg = render(data);
  // => <svg>...</svg>
})()
```

## API

```ts
// `input` can be string/object of v1 or v2:
// https://github.com/asciinema/asciinema/blob/develop/doc
// or an already loaded cast:
// https://github.com/marionebl/load-asciicast
//
// `options` won't take effect if `input` is an already loaded cast.
render(input: string, options?: Options): string

interface Options {
  /**
   * ANSI theme to use
   * - has to contain all keys if specified
   * - defaults to Atom One theme if omitted
   **/
  theme?: Theme;
  /** Render with a framing window, defaults to false */
  window?: boolean;
  /** Idle time limit in milliseconds */
  idle?: number,
  /** Frames per second limit, see https://github.com/marionebl/svg-term/issues/13 */
  fps?: number,
  /** Lower bound of timeline to render in milliseconds */
  from?: number;
  /** Upper bound of timeline to render in milliseconds */
  to?: number;
  /** Timestamp of single frame to render in milliseconds **/
  at?: number;
}

interface Theme {
  /** ANSI Black */
  0: RGBColor;
  /** ANSI Red */
  1: RGBColor;
  /** ANSI Green */
  2: RGBColor;
  /** ANSI Yellow */
  3: RGBColor;
  /** ANSI Blue */
  4: RGBColor;
  /** ANSI Magenta */
  5: RGBColor;
  /** ANSI Cyan */
  6: RGBColor;
  /** ANSI White */
  7: RGBColor;
  /** ANSI Light Black */
  8: RGBColor;
  /** ANSI Light Red */
  9: RGBColor;
  /** ANSI Light Green */
  10: RGBColor;
  /** ANSI Light Yellow */
  11: RGBColor;
  /** ANSI Light Blue */
  12: RGBColor;
  /** ANSI Light Magenta */
  13: RGBColor;
  /** ANSI Light Cyan */
  14: RGBColor;
  /** ANSI Light White */
  15: RGBColor;
  /** Default background color */
  background: RGBColor;
  /** Default color for bold text */
  bold: RGBColor;
  /** Cursor color */
  cursor: RGBColor;
  /** Default text color */
  text: RGBColor
  /** Default font size */
  fontSize: number;
  /** Default line height */
  lineHeight: number;
  /** Default font family */
  fontFamily: string;
}

type RGBColor = [number, number, number];
```

---

[asciinema]: https://asciinema.org/
