const {render} = require('../');
const {example, fixture} = require('./utils');

test('render with correct spacing', async () => {
  expect.assertions(0);
  const input = await fixture('spacing.json');
  const result = render(input);
  await example('spacing.svg', result);
});
