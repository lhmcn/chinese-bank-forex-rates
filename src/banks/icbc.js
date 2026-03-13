const { fetchText } = require('../lib/fetch');
const { normalizeTimestamp } = require('../lib/time');
const { selectPreferredCashSplit } = require('../lib/prices');
const { resolveSourceCurrency } = require('../normalization/currencies');

const API_URL = 'https://papi.icbc.com.cn/exchanges/ns/getLatest';

module.exports = {
  id: 'icbc',
  displayName: '中国工商银行',
  aliases: ['工商银行', '工行'],
  sourceUrl: API_URL,
  sourceType: 'json',
  capabilities: {
    supportsPreferredCashSplit: true,
    updateTimeMode: 'row',
  },
  async fetch() {
    return fetchText(this.sourceUrl, {
      method: 'POST',
      body: '{}',
      contentType: 'application/json',
      headers: {
        accept: 'application/json, text/plain, */*',
      },
    });
  },
  parse(payload) {
    const parsed = JSON.parse(payload);
    return {
      rows: Array.isArray(parsed.data) ? parsed.data : [],
    };
  },
  mapRates(parsed) {
    const rates = parsed.rows.map((row) => {
      const currency = resolveSourceCurrency({
        name: `${row.currencyCHName || ''}(${row.currencyENName || ''})`,
      });
      const prices = selectPreferredCashSplit({
        spotBuy: row.foreignBuy,
        cashBuy: row.cashBuy,
        spotSell: row.foreignSell,
        cashSell: row.cashSell,
      });
      return {
        currencyCode: currency.code,
        currencyName: currency.name,
        buyPrice: prices.buyPrice,
        sellPrice: prices.sellPrice,
      };
    });
    return {
      updateTime: parsed.rows
        .map((row) => normalizeTimestamp(`${row.publishDate || ''} ${row.publishTime || ''}`))
        .filter(Boolean)
        .sort()
        .at(-1) || '',
      rates,
    };
  },
};
