const {render} = require('..');
const {example, fixture} = require('./utils');

jest.setTimeout(10000);

test('render commitlint', async () => {
  expect.assertions(0);
  const input = await fixture('example.json');
  const result = render(input, {window: true});
  await example('commitlint.svg', result);
});

test('render commitlint 1 to 5', async () => {
  expect.assertions(0);
  const input = await fixture('example.json');
  const result = render(input, {window: true, from: 1000, to: 2000});
  await example('commitlint-1-to-5.svg', result);
});

test('render commitlint 5', async () => {
  expect.assertions(0);
  const input = await fixture('example.json');
  const result = render(input, {window: true, at: 5000});
  await example('commitlint-at-5.svg', result);
});
