const {render} = require('../');
const {example, fixture} = require('./utils');

test('render cursor', async () => {
  expect.assertions(0);
  const input = await fixture('cursor.json');
  const result = render(input);
  await example('cursor.svg', result);
});

