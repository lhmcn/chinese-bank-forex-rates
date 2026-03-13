const { normalizeKey } = require('../lib/text');

function normalizeBankKey(value) {
  return normalizeKey(value);
}

module.exports = {
  normalizeBankKey,
};
