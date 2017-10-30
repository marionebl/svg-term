> Share terminal sessions via SVG and CSS

# svg-term

* Render [asciinema][asciinema] asciicast to animated SVG
* Use custom themes
* Share asciicast everywhere

```
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

---

[asciinema]: https://asciinema.org/
