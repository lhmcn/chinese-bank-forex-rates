const { fetchJson } = require('../lib/fetch');
const { normalizeTimestamp } = require('../lib/time');
const { selectPreferredCashSplit } = require('../lib/prices');
const { resolveSourceCurrency } = require('../normalization/currencies');

module.exports = {
  id: 'abchina',
  displayName: '中国农业银行',
  aliases: ['农业银行', '农行'],
  sourceUrl: 'https://ewealth.abchina.com/app/data/api/DataService/ExchangeRateV2',
  sourceType: 'json',
  capabilities: {
    supportsPreferredCashSplit: true,
    updateTimeMode: 'row',
  },
  async fetch() {
    return fetchJson(this.sourceUrl);
  },
  parse(payload) {
    const rows = (((payload || {}).Data || {}).Table || []).map((row) => ({
      rawName: row.CurrName || '',
      spotBuy: row.BuyingPrice || '',
      cashBuy: row.CashBuyingPrice || '',
      spotSell: row.SellPrice || '',
      cashSell: row.CashSellPrice || '',
      publishTime: row.PublishTime || '',
    }));
    return { rows };
  },
  mapRates(parsed) {
    const rates = parsed.rows.map((row) => {
      const currency = resolveSourceCurrency({ name: row.rawName });
      const prices = selectPreferredCashSplit(row);
      return {
        currencyCode: currency.code,
        currencyName: currency.name,
        buyPrice: prices.buyPrice,
        sellPrice: prices.sellPrice,
      };
    });

    return {
      updateTime: normalizeTimestamp(parsed.rows[0]?.publishTime || ''),
      rates,
    };
  },
};
