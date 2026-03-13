function createUnsupportedBankError(input, supportedBanks) {
  return new Error(`Unsupported bank: ${input}. Supported banks: ${supportedBanks.join(', ')}`);
}

function createUnsupportedCurrencyError(input, supportedCurrencies) {
  return new Error(`Unsupported currency: ${input}. Supported currencies: ${supportedCurrencies.join(', ')}`);
}

module.exports = {
  createUnsupportedBankError,
  createUnsupportedCurrencyError,
};
