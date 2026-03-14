const { parseArgs } = require('node:util');

const { resolveBankDriver, listSupportedBanks } = require('./banks/registry');
const { filterRatesByRequestedCurrencies } = require('./normalization/currencies');
const { buildResponse, formatRatesForResponse, validateResponse } = require('./models/response');
const { createUnsupportedBankError } = require('./lib/errors');

async function runSkill({ bank, currencies = [] }) {
  const driver = resolveBankDriver(bank);

  if (!driver) {
    throw createUnsupportedBankError(bank, listSupportedBanks());
  }

  const raw = await driver.fetch();
  const parsed = driver.parse(raw);
  const mapped = driver.mapRates(parsed);
  const filtered = filterRatesByRequestedCurrencies(mapped.rates, currencies);
  const formattedRates = formatRatesForResponse(filtered, { rateMultiplier: driver.rateMultiplier });

  const response = buildResponse({
    bankName: driver.displayName,
    updateTime: mapped.updateTime,
    rates: formattedRates,
  });

  validateResponse(response);
  return response;
}

function parseCliArguments(argv = process.argv.slice(2)) {
  const { values, positionals } = parseArgs({
    args: argv,
    options: {
      bank: { type: 'string', short: 'b' },
      currencies: { type: 'string', multiple: true, short: 'c' },
    },
    allowPositionals: true,
  });

  const bank = values.bank || positionals[0] || '';
  const rawCurrencies = values.currencies || positionals.slice(1);
  const currencies = rawCurrencies
    .flatMap((value) => String(value).split(','))
    .map((value) => value.trim())
    .filter(Boolean);

  return { bank, currencies };
}

async function main() {
  const input = parseCliArguments();
  const response = await runSkill(input);
  process.stdout.write(`${JSON.stringify(response, null, 2)}\n`);
}

if (require.main === module) {
  main().catch((error) => {
    process.stderr.write(`${error.message}\n`);
    process.exitCode = 1;
  });
}

module.exports = {
  main,
  parseCliArguments,
  runSkill,
};
