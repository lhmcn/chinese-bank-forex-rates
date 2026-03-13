const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const driver = require('../../src/banks/boc');

test('boc parser uses explicit spot columns first', () => {
  const fixture = fs.readFileSync(path.join(__dirname, '../fixtures/boc-whpj.html'), 'utf8');
  const mapped = driver.mapRates(driver.parse(fixture));
  assert.equal(mapped.updateTime, '2026-03-14T02:51:45+08:00');
  assert.deepEqual(mapped.rates[0], {
    currencyCode: 'USD',
    currencyName: '美元',
    buyPrice: '689.5',
    sellPrice: '692.4',
  });
});
