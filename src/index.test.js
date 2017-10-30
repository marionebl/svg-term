const {promisify} = require('util');
const test = require('ava');
const copyPaste = require('copy-paste');
const DOMParser = require('xmldom').DOMParser;
const pkgDir = require('pkg-dir');
const sander = require('@marionebl/sander');
const {render} = require('.');

const copy = promisify(copyPaste.copy.bind(copyPaste));

const parser = new DOMParser({
  locator: {},
  errorHandler: {
    warning: console.warn.bind(console),
    fatalError(err) {
      throw err;
    },
    error(err) {
      throw err;
    }
  }
});

const fixture = async name => String(await sander.readFile(await pkgDir(__dirname), 'fixtures', name));
const example = async (name, content) => sander.writeFile(await pkgDir(__dirname), 'examples', name, content);

const doc = input => {
  const svg = parser.parseFromString(input, 'image/svg+xml');
  return Array.from(svg.childNodes)
    .find(c => c.tagName.toLowerCase() === 'svg');
};

test('throws for missing input', t => {
  t.throws(() => render());
});

test('throws for empty input', t => {
  t.throws(() => render(''));
});

test('does not throw for v0', async t => {
  const input = await fixture('v0.json');
  t.notThrows(() => render(input));
});

test('does not throw for v1', async t => {
  const input = await fixture('v1.json');
  t.notThrows(() => render(input));
});

test('does not throw for v2', async t => {
  const input = await fixture('v2.json');
  t.notThrows(() => render(input));
});

test('return valid svg string', async t => {
  const input = await fixture('empty.json');
  const result = render(input);
  t.notThrows(() => parser.parseFromString(result, 'image/svg+xml', {}));
});

test('render expected number of frames', async t => {
  const input = await fixture('v2.json');
  const [, frames] = JSON.parse(input);
  const result = render(input);
  const svg = doc(result);

  const groups = Array.from(svg.getElementsByTagName('svg'));
  const els = groups.filter(group => group.getAttribute('data-name') === 'frame');
  // await copy(`data:image/svg+xml,${result}`);
  t.is(els.length, frames.length);
});

test('render with styling', async t => {
  const input = await fixture('styles.json');
  const result = render(input);
  // await copy(`data:image/svg+xml,${result}`);
  await example('styling.svg', result);
  t.pass();
});

test('render with correct spacing', async t => {
  const input = await fixture('spacing.json');
  const result = render(input);
  // await copy(`data:image/svg+xml,${result}`);
  await example('spacing.svg', result);
  t.pass();
});

test('render example', async t => {
  const input = await fixture('example.json');
  const result = render(input);
  await example('commitlint.svg', result);
  t.pass();
});
