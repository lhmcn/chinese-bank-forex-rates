const test = require('node:test');
const assert = require('node:assert/strict');

const { formatRatesForResponse } = require('../../src/models/response');

test('formatRatesForResponse rounds non-CCB prices to 2 decimals', () => {
    const formatted = formatRatesForResponse([
        {
            currencyName: '美元',
            buyPrice: '689.09600000',
            sellPrice: '691.85600000',
        },
        {
            currencyName: '欧元',
            buyPrice: '',
            sellPrice: '8',
        },
    ], { rateMultiplier: 1 });

    assert.deepEqual(formatted, [
        {
            currencyName: '美元',
            buyPrice: '689.10',
            sellPrice: '691.86',
        },
        {
            currencyName: '欧元',
            buyPrice: '',
            sellPrice: '8.00',
        },
    ]);
});

test('formatRatesForResponse multiplies CCB prices by 100 before rounding', () => {
    const formatted = formatRatesForResponse([
        {
            currencyName: '美元',
            buyPrice: '6.8987',
            sellPrice: '6.9263',
        },
    ], { rateMultiplier: 100 });

    assert.deepEqual(formatted, [
        {
            currencyName: '美元',
            buyPrice: '689.87',
            sellPrice: '692.63',
        },
    ]);
});