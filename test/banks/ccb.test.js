const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const driver = require('../../src/banks/ccb');

test('ccb parser uses published pair directly', () => {
  const fixture = fs.readFileSync(path.join(__dirname, '../fixtures/ccb-forex.html'), 'utf8');
  const mapped = driver.mapRates(driver.parse(fixture));
  assert.equal(mapped.updateTime, '2026-03-14T03:00:00+08:00');
  assert.deepEqual(mapped.rates[0], {
    currencyCode: 'USD',
    currencyName: '美元',
    buyPrice: '6.8987',
    sellPrice: '6.9263',
  });
});
