function assertBankDriver(driver) {
  const required = ['id', 'displayName', 'sourceUrl', 'sourceType', 'capabilities', 'fetch', 'parse', 'mapRates'];
  for (const field of required) {
    if (!driver[field]) {
      throw new Error(`Bank driver is missing required field: ${field}`);
    }
  }

  if (driver.rateMultiplier != null && !Number.isFinite(driver.rateMultiplier)) {
    throw new Error('Bank driver rateMultiplier must be a finite number when provided');
  }
}

module.exports = {
  assertBankDriver,
};
