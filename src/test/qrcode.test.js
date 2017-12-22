const {render} = require('../');
const {example, fixture} = require('./utils');

test('render qrcode', async () => {
  expect.assertions(0);
  const input = await fixture('qrcode.json');
  const result = render(input);
  await example('qrcode.svg', result);
});
