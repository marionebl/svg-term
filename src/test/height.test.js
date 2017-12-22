const {render} = require('../');
const {example, fixture} = require('./utils');

test('render height', async () => {
  expect.assertions(0);
  const input = await fixture('height.json');
  const result = render(input);
  await example('height.svg', result);
});
