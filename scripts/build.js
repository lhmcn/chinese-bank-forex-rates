const path = require('node:path');
const { rm, writeFile } = require('node:fs/promises');

const ncc = require('@vercel/ncc');

async function build() {
    const rootDir = path.resolve(__dirname, '..');
    const entryFile = path.join(rootDir, 'src', 'index.js');
    const releaseDir = path.join(rootDir, 'release');
    const outputFile = path.join(releaseDir, 'index.js');

    await rm(outputFile, { force: true });

    const { code, assets } = await ncc(entryFile, {
        cache: false,
        sourceMap: false,
    });

    const emittedAssets = Object.keys(assets);

    if (emittedAssets.length > 0) {
        throw new Error(`Build emitted unexpected extra assets: ${emittedAssets.join(', ')}`);
    }

    await writeFile(outputFile, code, 'utf8');
    process.stdout.write(`Built ${path.relative(rootDir, outputFile)}\n`);
}

build().catch((error) => {
    process.stderr.write(`${error.stack || error.message}\n`);
    process.exitCode = 1;
});