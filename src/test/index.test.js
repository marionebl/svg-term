const {load} = require('load-asciicast');
const {render} = require('../index');
const {fixture} = require('./utils');

test('throws for missing input', () => {
  expect(() => render()).toThrow();
});

test('throws for empty input', () => {
  expect(() => render('')).toThrow();
});

for (const options of [undefined, {idle: 1000, fps: 24}]) {
  test('does not throw for v0', async () => {
    const input = await fixture('v0.json');
    expect(() => render(input, options)).not.toThrow();;
  });

  test('does not throw for v1', async () => {
    expect.assertions(1);
    const input = await fixture('v1.json');
    expect(() => render(input, options)).not.toThrow();
  });

  test('does not throw for v2', async () => {
    expect.assertions(1);
    const input = await fixture('v2.json');
    expect(() => render(input, options)).not.toThrow();
  });

  test('does not throw for loaded cast', async () => {
    expect.assertions(1);
    const input = await fixture('v2.json');
    const cast = await load(input);
    expect(() => render(cast, options)).not.toThrow();
  });
}
