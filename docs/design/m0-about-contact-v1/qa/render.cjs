'use strict';
const fs = require('node:fs');
const path = require('node:path');
const sharp = require('sharp');
async function main() {
  const [input, output] = process.argv.slice(2);
  fs.mkdirSync(path.dirname(output), { recursive: true });
  const data = fs.readFileSync(input);
  const metadata = await sharp(data, { density: 72, limitInputPixels: 50000000 }).metadata();
  await sharp(data, { density: 72, limitInputPixels: 50000000 }).png().toFile(output);
  console.log(JSON.stringify({ width: metadata.width, height: metadata.height,
    renderer: 'sharp/librsvg', sharp: sharp.versions.sharp, librsvg: sharp.versions.rsvg }));
}
main().catch(error => { console.error(error.stack); process.exitCode = 1; });
