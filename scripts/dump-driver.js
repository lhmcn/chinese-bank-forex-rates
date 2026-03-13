const fs = require('node:fs');
const path = require('node:path');

const { resolveBankDriver } = require('../src/banks/registry');

async function main() {
  const [, , bankInput, outputFile] = process.argv;
  if (!bankInput) {
    throw new Error('Usage: node scripts/dump-driver.js <bank> [output-file]');
  }

  const driver = resolveBankDriver(bankInput);
  if (!driver) {
    throw new Error(`Unknown bank: ${bankInput}`);
  }

  const raw = await driver.fetch();
  const content = typeof raw === 'string' ? raw : JSON.stringify(raw, null, 2);
  const outputPath = outputFile
    ? path.resolve(process.cwd(), outputFile)
    : path.resolve(process.cwd(), 'debug', 'dumps', `${driver.id}.dump.txt`);
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, content, 'utf8');
  process.stdout.write(`${outputPath}\n`);
}

main().catch((error) => {
  process.stderr.write(`${error.message}\n`);
  process.exitCode = 1;
});