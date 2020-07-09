const assert = require('assert');
const {resolve} = require('path');
const {readFileSync, readdirSync} = require('fs');

const countLines = require('../count-lines');

const txt = '.txt';

function fixture(fileName) {
  return resolve(__dirname, 'fixtures', fileName);
}

function testFixture(name) {
  it(`${name.split('.')[0].replace(/-/g, ' ')}`, () => {
    const source = readFileSync(fixture(`${name}.txt`)).toString();

    const expected = parseInt(name.split('.')[1]);

    assert.equal(countLines(source), expected);
  });
}

readdirSync(fixture(''))
  .sort()
  .filter(_ => _.endsWith(txt))
  .map(_ => _.slice(0, -1 * txt.length))
  .forEach(_ => testFixture(_));
