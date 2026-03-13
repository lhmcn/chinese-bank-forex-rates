function buildResponse({ bankName, updateTime, rates }) {
  return {
    bankName,
    updateTime: updateTime || '',
    rates: rates || [],
  };
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
  validateResponse,
};
