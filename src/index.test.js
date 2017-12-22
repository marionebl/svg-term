const {render} = require('.');
const {example, fixture} = require('./test/utils');

test('throws for missing input', () => {
  expect(() => render()).toThrow();
});

test('throws for empty input', () => {
  expect(() => render('')).toThrow();
});

test('does not throw for v0', async () => {
  const input = await fixture('v0.json');
  expect(() => render(input)).not.toThrow();;
});

test('does not throw for v1', async () => {
  expect.assertions(1);
  const input = await fixture('v1.json');
  expect(() => render(input)).not.toThrow();
});

test('does not throw for v2', async () => {
  expect.assertions(1);
  const input = await fixture('v2.json');
  expect(() => render(input)).not.toThrow();
});
