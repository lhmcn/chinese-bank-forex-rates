const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const driver = require('../../src/banks/cmbchina');

test('cmbchina parser maps preferred sell and buy columns', () => {
  const fixture = fs.readFileSync(path.join(__dirname, '../fixtures/cmbchina-rate.json'), 'utf8');
  const mapped = driver.mapRates(driver.parse(fixture));
  assert.equal(mapped.updateTime, '2026-03-13T03:34:10+08:00');
  assert.deepEqual(mapped.rates[0], {
    currencyCode: 'USD',
    currencyName: '美元',
    buyPrice: '688.41',
    sellPrice: '692.80',
  });
});
