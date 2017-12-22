const {render} = require('../');
const {example, fixture} = require('./utils');

jest.setTimeout(10000);

test('render vim', async () => {
  expect.assertions(0);
  const input = await fixture('vim.json');
  const result = render(input);
  await example('vim.svg', result);
});
