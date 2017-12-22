const pkgDir = require('pkg-dir');
const sander = require('@marionebl/sander');

const fixture = async name => String(await sander.readFile(await pkgDir(__dirname), 'fixtures', name));
const example = async (name, content) => sander.writeFile(await pkgDir(__dirname), 'examples', name, content);

module.exports.fixture = fixture;
module.exports.example = example;
