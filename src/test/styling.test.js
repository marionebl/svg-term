const {render} = require('../');
const {example, fixture} = require('./utils');

test('render with styling', async () => {
  expect.assertions(0);
  const input = await fixture('styles.json');
  const result = render(input);
  await example('styling.svg', result);
});
