const {render} = require('../');
const {example, fixture} = require('./utils');

jest.setTimeout(20000);

test('render lolcat', async () => {
  expect.assertions(0);
  const input = await fixture('lolcat.json');
  const result = render(input);
  await example('lolcat.svg', result);
});

