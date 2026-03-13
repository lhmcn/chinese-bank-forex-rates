const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const driver = require('../../src/banks/bankcomm');

test('bankcomm parser honors preferred cash split with fallback', () => {
  const fixture = fs.readFileSync(path.join(__dirname, '../fixtures/bankcomm-forex.html'), 'utf8');
  const mapped = driver.mapRates(driver.parse(fixture));
  assert.equal(mapped.updateTime, '2026-03-13T22:55:00+08:00');
  assert.deepEqual(mapped.rates[0], {
    currencyCode: 'AED',
    currencyName: '阿联酋迪拉姆',
    buyPrice: '186.9796',
    sellPrice: '188.4814',
  });
  assert.deepEqual(mapped.rates[1], {
    currencyCode: 'BRL',
    currencyName: '巴西雷亚尔',
    buyPrice: '125.98',
    sellPrice: '136.20',
  });
});
