const { normalizeBankKey } = require('../normalization/banks');
const { assertBankDriver } = require('../models/bank-driver');

const drivers = [
  require('./cmbchina'),
  require('./boc'),
  require('./abchina'),
  require('./icbc'),
  require('./ccb'),
  require('./bankcomm'),
].map((driver) => {
  assertBankDriver(driver);
  return driver;
});

const driverByAlias = new Map();

for (const driver of drivers) {
  for (const alias of [driver.id, driver.displayName, ...(driver.aliases || [])]) {
    driverByAlias.set(normalizeBankKey(alias), driver);
  }
}

function listSupportedBanks() {
  return drivers.map((driver) => driver.displayName);
}

function resolveBankDriver(input) {
  return driverByAlias.get(normalizeBankKey(input || '')) || null;
}

function listDrivers() {
  return drivers.slice();
}

module.exports = {
  listDrivers,
  listSupportedBanks,
  resolveBankDriver,
};
