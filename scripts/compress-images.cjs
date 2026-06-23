/**
 * Converts large photo PNGs in /public to JPEG at 85% quality.
 * Run once: node scripts/compress-images.cjs
 */
const { Jimp } = require('jimp');
const path = require('path');
const fs = require('fs');

const PUBLIC_DIR = path.join(__dirname, '../public');

// Photo PNGs to convert (logo.png excluded — needs transparency support)
const TARGETS = [
  'buyers-agent-showing.png',
  'advisor-parramatta.png',
  'broker-handing-keys.png',
  'case-study-2.png',
  'case-study-3.png',
  'negotiation_meeting.png',
  'advisor-man.png',
  'advisor-strategy.png',
  'author-profile.png',
];

const MAX_WIDTH = 1400;

async function convert(filename) {
  const inputPath = path.join(PUBLIC_DIR, filename);
  const outputFilename = filename.replace('.png', '.jpg');
  const outputPath = path.join(PUBLIC_DIR, outputFilename);

  if (!fs.existsSync(inputPath)) {
    console.log(`  SKIP  ${filename} (not found)`);
    return;
  }
  if (fs.existsSync(outputPath)) {
    console.log(`  SKIP  ${filename} (${outputFilename} already exists)`);
    return;
  }

  const before = Math.round(fs.statSync(inputPath).size / 1024);
  const image = await Jimp.read(inputPath);

  if (image.width > MAX_WIDTH) {
    image.resize({ w: MAX_WIDTH });
  }

  await image.write(outputPath, { quality: 85 });

  const after = Math.round(fs.statSync(outputPath).size / 1024);
  console.log(`  OK    ${filename} → ${outputFilename}  (${before} KB → ${after} KB)`);
  fs.unlinkSync(inputPath);
}

(async () => {
  console.log('Converting photo PNGs → JPEG...');
  for (const f of TARGETS) {
    try {
      await convert(f);
    } catch (err) {
      console.error(`  ERR   ${f}: ${err.message}`);
    }
  }
  console.log('Done.');
})();
