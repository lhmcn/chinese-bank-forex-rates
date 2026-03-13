const { fetchText } = require('../lib/fetch');
const { normalizeTimestamp } = require('../lib/time');
const { selectPreferredCashSplit } = require('../lib/prices');
const { resolveSourceCurrency } = require('../normalization/currencies');

const API_URL = 'https://fx.cmbchina.com/api/v1/fx/rate';

module.exports = {
  id: 'cmbchina',
  displayName: '招商银行',
  aliases: ['招行', '招商'],
  sourceUrl: API_URL,
  sourceType: 'json',
  capabilities: {
    supportsPreferredCashSplit: true,
    updateTimeMode: 'row',
  },
  async fetch() {
    return fetchText(this.sourceUrl, { allowPowerShellFallback: false });
  },
  parse(payload) {
    const parsed = JSON.parse(payload);
    return {
      rows: Array.isArray(parsed.body) ? parsed.body : [],
    };
  },
  mapRates(parsed) {
    const rates = parsed.rows.map((row) => {
      const codeMatch = String(row.ccyNbrEng || '').match(/([A-Z]{3})\s*$/);
      const currency = resolveSourceCurrency({
        name: codeMatch ? `${row.ccyNbr}(${codeMatch[1]})` : row.ccyNbr,
      });
      const prices = selectPreferredCashSplit({
        spotBuy: row.rthBid,
        cashBuy: row.rtcBid,
        spotSell: row.rthOfr,
        cashSell: row.rtcOfr,
      });
      return {
        currencyCode: currency.code,
        currencyName: currency.name,
        buyPrice: prices.buyPrice,
        sellPrice: prices.sellPrice,
      };
    });

    const updateTime = parsed.rows
      .map((row) => normalizeTimestamp(`${row.ratDat || ''} ${row.ratTim || ''}`))
      .filter(Boolean)
      .sort()
      .at(-1) || '';
    return { updateTime, rates };
  },
};
