function buildResponse({ bankName, updateTime, rates }) {
  return {
    bankName,
    updateTime: updateTime || '',
    rates: rates || [],
  };
}

function formatRatesForResponse(rates, options = {}) {
  const multiplier = Number.isFinite(options.rateMultiplier) ? options.rateMultiplier : 1;
  return (rates || []).map((rate) => ({
    ...rate,
    buyPrice: formatPrice(rate.buyPrice, multiplier),
    sellPrice: formatPrice(rate.sellPrice, multiplier),
  }));
}

function formatPrice(value, multiplier) {
  if (typeof value !== 'string') {
    return '';
  }

  const trimmed = value.trim();
  if (!trimmed) {
    return '';
  }

  const numericValue = Number(trimmed);
  if (!Number.isFinite(numericValue)) {
    return trimmed;
  }

  return (numericValue * multiplier).toFixed(2);
}

function validateResponse(response) {
  if (!response || typeof response !== 'object') {
    throw new Error('Response must be an object');
  }
  if (typeof response.bankName !== 'string') {
    throw new Error('Response bankName must be a string');
  }
  if (typeof response.updateTime !== 'string') {
    throw new Error('Response updateTime must be a string');
  }
  if (!Array.isArray(response.rates)) {
    throw new Error('Response rates must be an array');
  }
  for (const rate of response.rates) {
    if (typeof rate.currencyName !== 'string') {
      throw new Error('Rate currencyName must be a string');
    }
    if (typeof rate.buyPrice !== 'string') {
      throw new Error('Rate buyPrice must be a string');
    }
    if (typeof rate.sellPrice !== 'string') {
      throw new Error('Rate sellPrice must be a string');
    }
  }
}

module.exports = {
  buildResponse,
  formatRatesForResponse,
  validateResponse,
};
