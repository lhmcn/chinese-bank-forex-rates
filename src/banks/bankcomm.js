const { fetchText } = require('../lib/fetch');
const { loadHtml } = require('../lib/html');
const { extractDateTimeFromText, normalizeTimestamp } = require('../lib/time');
const { selectPreferredCashSplit } = require('../lib/prices');
const { resolveSourceCurrency } = require('../normalization/currencies');
const { cleanText } = require('../lib/text');

module.exports = {
  id: 'bankcomm',
  displayName: '交通银行',
  aliases: ['交行'],
  sourceUrl: 'https://www.bankcomm.com/SITE/queryExchangeResult.do',
  sourceType: 'json-text',
  capabilities: {
    supportsPreferredCashSplit: true,
    updateTimeMode: 'page',
  },
  async fetch() {
    return fetchText(this.sourceUrl);
  },
  parse(raw) {
    const payload = typeof raw === 'string' && raw.trim().startsWith('{') ? JSON.parse(raw) : null;
    const fragment = payload && payload.RSP_BODY && payload.RSP_BODY.fileContent ? payload.RSP_BODY.fileContent : raw;
    const $ = loadHtml(fragment);
    const pageText = cleanText($.text());
    const pageTime = extractDateTimeFromText(pageText);
    let rows = $('tr').toArray()
      .map((row) => $(row).find('td').toArray().map((cell) => cleanText($(cell).text())))
      .filter((cells) => cells.length >= 6)
      .map((cells) => ({
        rawName: cells[0],
        spotBuy: cells[2],
        spotSell: cells[3],
        cashBuy: cells[4],
        cashSell: cells[5],
      }));

    if (rows.length === 0) {
      const rowPattern = /([\u4e00-\u9fa5]+\([A-Z]{3}\/CNY\))\s*100\s*([\d.-]*)\s*([\d.-]*)\s*([\d.-]*)\s*([\d.-]*)/g;
      rows = [];
      let match;
      while ((match = rowPattern.exec(pageText)) !== null) {
        rows.push({
          rawName: cleanText(match[1]),
          spotBuy: match[2],
          spotSell: match[3],
          cashBuy: match[4],
          cashSell: match[5],
        });
      }
    }
    return { pageTime, rows };
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
      updateTime: normalizeTimestamp(parsed.pageTime || ''),
      rates,
    };
  },
};
