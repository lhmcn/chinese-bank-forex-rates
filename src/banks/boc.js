const { fetchText } = require('../lib/fetch');
const { loadHtml, findTableByHeaders, tableRowsAsArrays } = require('../lib/html');
const { normalizeTimestamp } = require('../lib/time');
const { selectPreferredCashSplit } = require('../lib/prices');
const { resolveSourceCurrency } = require('../normalization/currencies');
const { cleanText } = require('../lib/text');

const HEADERS = ['货币名称', '现汇买入价', '现钞买入价', '现汇卖出价', '现钞卖出价', '中行折算价', '发布日期', '发布时间'];

module.exports = {
  id: 'boc',
  displayName: '中国银行',
  aliases: ['中行'],
  sourceUrl: 'https://www.boc.cn/sourcedb/whpj/',
  sourceType: 'html',
  capabilities: {
    supportsPreferredCashSplit: true,
    updateTimeMode: 'row',
  },
  async fetch() {
    return fetchText(this.sourceUrl);
  },
  parse(html) {
    const $ = loadHtml(html);
    const table = findTableByHeaders($, HEADERS) || $('table').first();
    const rows = tableRowsAsArrays($, table)
      .filter((row) => row.length >= 8)
      .map((row) => ({
        rawName: cleanText(row[0]),
        spotBuy: row[1],
        cashBuy: row[2],
        spotSell: row[3],
        cashSell: row[4],
        dateText: row[6],
        timeText: row[7],
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

    const first = parsed.rows[0];
    return {
      updateTime: first ? normalizeTimestamp(`${first.dateText} ${first.timeText}`) : '',
      rates,
    };
  },
};
