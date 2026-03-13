const { cleanText } = require('./text');

function normalizePrice(value) {
  const cleaned = cleanText(value);
  return cleaned === '-' || cleaned === '--' ? '' : cleaned;
}

function firstValue(...values) {
  for (const value of values) {
    const cleaned = normalizePrice(value);
    if (cleaned) {
      return cleaned;
    }
  }
  return '';
}

function selectPreferredCashSplit({ spotBuy, cashBuy, spotSell, cashSell }) {
  return {
    buyPrice: firstValue(spotBuy, cashBuy),
    sellPrice: firstValue(spotSell, cashSell),
  };
}

function selectPublishedPair({ pairBuy, pairSell, spotBuy, cashBuy, spotSell, cashSell }) {
  return {
    buyPrice: firstValue(pairBuy, spotBuy, cashBuy),
    sellPrice: firstValue(pairSell, spotSell, cashSell),
  };
}

module.exports = {
  selectPreferredCashSplit,
  selectPublishedPair,
};
