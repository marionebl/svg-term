const {render} = require('../');
const {example, fixture} = require('./utils');

test('render width', async () => {
  expect.assertions(0);
  const input = await fixture('width.json');
  const result = render(input);
  await example('width.svg', result);
});
