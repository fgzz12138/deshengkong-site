'use strict';
// Local renderer only. No browser, server, account, or network is used.
const fs = require('node:fs');
const path = require('node:path');
const sharp = require('sharp');

async function main() {
  const [input, output] = process.argv.slice(2);
  if (!input || !output) throw new Error('Usage: node render_svg.cjs input.svg output.png');
  fs.mkdirSync(path.dirname(output), { recursive: true });
  const svg = fs.readFileSync(input);
  const metadata = await sharp(svg, { density: 72, limitInputPixels: 50000000 }).metadata();
  await sharp(svg, { density: 72, limitInputPixels: 50000000 }).png().toFile(output);
  console.log(JSON.stringify({ input, output, width: metadata.width, height: metadata.height,
    engine: 'sharp/librsvg', versions: sharp.versions }));
}
main().catch(error => { console.error(error.stack || String(error)); process.exitCode = 1; });
