const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const driver = require('../../src/banks/abchina');

test('abchina mapper falls back to cash buy when needed', () => {
  const fixture = JSON.parse(fs.readFileSync(path.join(__dirname, '../fixtures/abchina-exchange-rate.json'), 'utf8'));
  const mapped = driver.mapRates(driver.parse(fixture));
  assert.equal(mapped.updateTime, '2026-03-14T04:03:11+08:00');
  assert.deepEqual(mapped.rates[0], {
    currencyCode: 'USD',
    currencyName: '美元',
    buyPrice: '689.09600000',
    sellPrice: '691.85600000',
  });
});
