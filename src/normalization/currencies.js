const { createUnsupportedCurrencyError } = require('../lib/errors');
const { cleanText, normalizeKey } = require('../lib/text');

const CURRENCIES = [
  { code: 'USD', name: '美元', aliases: ['usd', 'us dollar', '美金'] },
  { code: 'EUR', name: '欧元', aliases: ['eur', 'euro'] },
  { code: 'GBP', name: '英镑', aliases: ['gbp', 'pound sterling'] },
  { code: 'HKD', name: '港币', aliases: ['港元', 'hkd'] },
  { code: 'JPY', name: '日元', aliases: ['jpy', '日圆'] },
  { code: 'AUD', name: '澳大利亚元', aliases: ['澳元', 'aud'] },
  { code: 'NZD', name: '新西兰元', aliases: ['nzd'] },
  { code: 'CAD', name: '加拿大元', aliases: ['加元', 'cad'] },
  { code: 'CHF', name: '瑞士法郎', aliases: ['瑞郎', 'chf'] },
  { code: 'SGD', name: '新加坡元', aliases: ['新元', 'sgd'] },
  { code: 'THB', name: '泰国铢', aliases: ['泰铢', 'thb'] },
  { code: 'KRW', name: '韩元', aliases: ['韩国元', 'krw'] },
  { code: 'MOP', name: '澳门元', aliases: ['澳门币', '葡币', 'mop'] },
  { code: 'SEK', name: '瑞典克朗', aliases: ['sek'] },
  { code: 'NOK', name: '挪威克朗', aliases: ['nok'] },
  { code: 'DKK', name: '丹麦克朗', aliases: ['丹麦克郎', 'dkk'] },
  { code: 'ZAR', name: '南非兰特', aliases: ['zar'] },
  { code: 'AED', name: '阿联酋迪拉姆', aliases: ['aed'] },
  { code: 'SAR', name: '沙特里亚尔', aliases: ['sar'] },
  { code: 'RUB', name: '俄罗斯卢布', aliases: ['卢布', 'rub'] },
  { code: 'MYR', name: '马来西亚林吉特', aliases: ['林吉特', '马币', 'myr'] },
  { code: 'BRL', name: '巴西雷亚尔', aliases: ['brl'] },
  { code: 'INR', name: '印度卢比', aliases: ['inr'] },
  { code: 'PHP', name: '菲律宾比索', aliases: ['php'] },
  { code: 'TWD', name: '新台币', aliases: ['twd'] },
  { code: 'VND', name: '越南盾', aliases: ['vnd'] },
  { code: 'HUF', name: '匈牙利福林', aliases: ['huf'] },
  { code: 'MXN', name: '墨西哥比索', aliases: ['mxn'] },
  { code: 'PLN', name: '波兰兹罗提', aliases: ['pln'] },
  { code: 'TRY', name: '土耳其里拉', aliases: ['try'] },
  { code: 'CZK', name: '捷克克朗', aliases: ['czk'] },
  { code: 'ILS', name: '以色列新谢客尔', aliases: ['以色列谢克尔', 'ils'] },
  { code: 'MNT', name: '蒙古图格里克', aliases: ['mnt'] },
  { code: 'PKR', name: '巴基斯坦卢比', aliases: ['pkr'] },
  { code: 'KZT', name: '哈萨克斯坦坚戈', aliases: ['kzt'] },
  { code: 'IDR', name: '印尼盾', aliases: ['idr'] },
];

const currencyByKey = new Map();

for (const currency of CURRENCIES) {
  for (const alias of [currency.code, currency.name, ...(currency.aliases || [])]) {
    currencyByKey.set(normalizeKey(alias), currency);
  }
}

function resolveCurrencyInput(input) {
  const key = normalizeKey(input);
  return currencyByKey.get(key) || null;
}

function resolveSourceCurrency({ name }) {
  const cleaned = cleanText(name);
  const codeMatch = cleaned.match(/[（(]([A-Z]{3})(?:\/[A-Z]{3})?[)）]/i);
  if (codeMatch) {
    const byCode = resolveCurrencyInput(codeMatch[1].toUpperCase());
    if (byCode) {
      return byCode;
    }
  }

  const baseName = cleaned.replace(/[（(][A-Z]{3}(?:\/[A-Z]{3})?[)）]/gi, '').trim();
  return resolveCurrencyInput(baseName) || {
    code: codeMatch ? codeMatch[1].toUpperCase() : normalizeKey(baseName).toUpperCase(),
    name: baseName || cleaned,
  };
}

function filterRatesByRequestedCurrencies(rates, inputs) {
  if (!inputs || inputs.length === 0) {
    return rates.map(stripInternalFields);
  }

  const requested = inputs.map((input) => {
    const currency = resolveCurrencyInput(input);
    if (!currency) {
      throw createUnsupportedCurrencyError(input, CURRENCIES.map((item) => item.name));
    }
    return currency.code;
  });

  return rates
    .filter((rate) => requested.includes(rate.currencyCode))
    .map(stripInternalFields);
}

function stripInternalFields(rate) {
  return {
    currencyName: rate.currencyName,
    buyPrice: rate.buyPrice,
    sellPrice: rate.sellPrice,
  };
}

module.exports = {
  filterRatesByRequestedCurrencies,
  resolveCurrencyInput,
  resolveSourceCurrency,
};
