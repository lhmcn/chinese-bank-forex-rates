function assertBankDriver(driver) {
  const required = ['id', 'displayName', 'sourceUrl', 'sourceType', 'capabilities', 'fetch', 'parse', 'mapRates'];
  for (const field of required) {
    if (!driver[field]) {
      throw new Error(`Bank driver is missing required field: ${field}`);
    }
  }
}

module.exports = {
  assertBankDriver,
};
