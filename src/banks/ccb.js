const { fetchText } = require('../lib/fetch');
const { loadXml } = require('../lib/html');
const { normalizeTimestamp } = require('../lib/time');
const { selectPreferredCashSplit } = require('../lib/prices');

const CCB_CURRENCY_CODES = {
  '840': { code: 'USD', name: '美元' },
  '978': { code: 'EUR', name: '欧元' },
  '826': { code: 'GBP', name: '英镑' },
  '392': { code: 'JPY', name: '日元' },
  '344': { code: 'HKD', name: '港币' },
  '036': { code: 'AUD', name: '澳大利亚元' },
  '124': { code: 'CAD', name: '加拿大元' },
  '756': { code: 'CHF', name: '瑞士法郎' },
  '446': { code: 'MOP', name: '澳门元' },
  '702': { code: 'SGD', name: '新加坡元' },
  '410': { code: 'KRW', name: '韩元' },
  '554': { code: 'NZD', name: '新西兰元' },
  '208': { code: 'DKK', name: '丹麦克朗' },
  '752': { code: 'SEK', name: '瑞典克朗' },
  '578': { code: 'NOK', name: '挪威克朗' },
  '764': { code: 'THB', name: '泰铢' },
  '643': { code: 'RUB', name: '卢布' },
  '398': { code: 'KZT', name: '哈萨克斯坦坚戈' },
  '710': { code: 'ZAR', name: '南非兰特' },
  '784': { code: 'AED', name: '阿联酋迪拉姆' },
  '682': { code: 'SAR', name: '沙特里亚尔' },
  '348': { code: 'HUF', name: '匈牙利福林' },
  '484': { code: 'MXN', name: '墨西哥比索' },
  '985': { code: 'PLN', name: '波兰兹罗提' },
  '949': { code: 'TRY', name: '土耳其里拉' },
  '203': { code: 'CZK', name: '捷克克朗' },
  '376': { code: 'ILS', name: '以色列新谢客尔' },
  '496': { code: 'MNT', name: '蒙古图格里克' },
  '458': { code: 'MYR', name: '林吉特' },
  '586': { code: 'PKR', name: '巴基斯坦卢比' },
  '360': { code: 'IDR', name: '印尼卢比' },
};

module.exports = {
  id: 'ccb',
  displayName: '中国建设银行',
  aliases: ['建设银行', '建行'],
  sourceUrl: 'https://www1.ccb.com/cn/home/news/jshckpj_new2.xml',
  sourceType: 'xml',
  capabilities: {
    supportsPreferredCashSplit: true,
    updateTimeMode: 'row',
  },
  async fetch() {
    return fetchText(this.sourceUrl);
  },
  parse(xml) {
    const $ = loadXml(xml);
    const rows = $('ReferencePriceSettlement').toArray().map((node) => {
      const offeredCode = $(node).find('Ofrd_Ccy_CcyCd').text();
      const quotedCode = $(node).find('Ofr_Ccy_CcyCd').text();
      const selectedCode = offeredCode === '156' ? quotedCode : offeredCode;
      const currency = CCB_CURRENCY_CODES[selectedCode];
      return {
        currencyCode: currency ? currency.code : selectedCode,
        currencyName: currency ? currency.name : selectedCode,
        spotBuy: $(node).find('BidRateOfCcy').text(),
        cashBuy: $(node).find('BidRateOfCash').text(),
        spotSell: $(node).find('OfrRateOfCcy').text(),
        cashSell: $(node).find('OfrRateOfCash').text(),
        dateText: $(node).find('LstPr_Dt').text(),
        timeText: $(node).find('LstPr_Tm').text(),
      };
    });
    return { rows };
  },
  mapRates(parsed) {
    const rates = parsed.rows.map((row) => {
      const prices = selectPreferredCashSplit(row);
      return {
        currencyCode: row.currencyCode,
        currencyName: row.currencyName,
        buyPrice: prices.buyPrice,
        sellPrice: prices.sellPrice,
      };
    });
    return {
      updateTime: parsed.rows[0] ? normalizeTimestamp(`${parsed.rows[0].dateText} ${parsed.rows[0].timeText}`) : '',
      rates,
    };
  },
};
