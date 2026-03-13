const test = require('node:test');
const assert = require('node:assert/strict');

const { listDrivers } = require('../../src/banks/registry');

test('every bank driver exposes required metadata and methods', () => {
  for (const driver of listDrivers()) {
    assert.equal(typeof driver.id, 'string');
    assert.equal(typeof driver.displayName, 'string');
    assert.equal(typeof driver.sourceUrl, 'string');
    assert.equal(typeof driver.fetch, 'function');
    assert.equal(typeof driver.parse, 'function');
    assert.equal(typeof driver.mapRates, 'function');
    assert.equal(typeof driver.capabilities, 'object');
  }
});
