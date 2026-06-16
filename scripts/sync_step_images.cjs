/**
 * Syncs step images for:
 *   - SMSF: 6 steps — uploads local property images
 *   - Commercial: 5 steps — downloads the Unsplash images the frontend
 *     uses as fallback and replaces the wrong comm_*.png in Sanity
 *
 * Run: node scripts/sync_step_images.cjs
 */

require('dotenv').config();
const { createClient } = require('@sanity/client');
const fs = require('fs');
const path = require('path');
const https = require('https');
const os = require('os');

const client = createClient({
  projectId: '7c1xj4wj',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-03-12',
  token: process.env.VITE_SANITY_WRITE_TOKEN,
});

const BASE = 'public/images/acquisitions/';

// ── Helpers ──────────────────────────────────────────────────────────────────

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, res => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        file.close();
        fs.unlinkSync(dest);
        return downloadFile(res.headers.location, dest).then(resolve).catch(reject);
      }
      res.pipe(file);
      file.on('finish', () => file.close(resolve));
    }).on('error', err => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

const uploadCache = {};

async function uploadLocal(filePath) {
  if (uploadCache[filePath]) return uploadCache[filePath];
  if (!fs.existsSync(filePath)) throw new Error('File not found: ' + filePath);
  const ext = path.extname(filePath).slice(1).toLowerCase();
  const mime = (ext === 'jpg' || ext === 'jpeg') ? 'image/jpeg' : 'image/png';
  const buf = fs.readFileSync(filePath);
  const asset = await client.assets.upload('image', buf, {
    filename: path.basename(filePath),
    contentType: mime,
  });
  const ref = { _type: 'image', asset: { _type: 'reference', _ref: asset._id } };
  uploadCache[filePath] = ref;
  console.log(`    ✓  Uploaded ${path.basename(filePath)}`);
  return ref;
}

async function uploadFromUrl(url, label) {
  if (uploadCache[url]) return uploadCache[url];
  const tmpFile = path.join(os.tmpdir(), label + '.jpg');
  process.stdout.write(`    ↓  Downloading ${label}...`);
  await downloadFile(url, tmpFile);
  process.stdout.write(' uploading...');
  const buf = fs.readFileSync(tmpFile);
  const asset = await client.assets.upload('image', buf, {
    filename: label + '.jpg',
    contentType: 'image/jpeg',
  });
  fs.unlinkSync(tmpFile);
  const ref = { _type: 'image', asset: { _type: 'reference', _ref: asset._id } };
  uploadCache[url] = ref;
  console.log(' ✓');
  return ref;
}

// ── SMSF step images (6 local files) ─────────────────────────────────────────

const smsfStepImages = [
  BASE + 'user_prop_19.png',   // Step 1 — SMSF Readiness Assessment
  BASE + 'user_prop_20.png',   // Step 2 — Compliance Framework Setup
  BASE + 'user_prop_21.png',   // Step 3 — Property Research & Sourcing
  BASE + 'prop_4.png',         // Step 4 — Due Diligence & Compliance Check
  BASE + 'prop_5.png',         // Step 5 — Negotiation & Acquisition
  BASE + 'aus_prop_kawana.png',// Step 6 — Settlement Coordination
];

// ── Commercial step images (5 Unsplash URLs from the frontend fallback) ───────

const commercialStepUrls = [
  { url: 'https://images.unsplash.com/photo-1766323106404-acf83acd8a95?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080', label: 'comm_step_1' },
  { url: 'https://images.unsplash.com/photo-1777632495227-3b3ea1bd46f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080', label: 'comm_step_2' },
  { url: 'https://images.unsplash.com/photo-1759871291279-b9b01f89e5d3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080', label: 'comm_step_3' },
  { url: 'https://images.unsplash.com/photo-1760782444083-0f2665436e96?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080', label: 'comm_step_4' },
  { url: 'https://images.unsplash.com/photo-1778218499974-a286da5c97fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080', label: 'comm_step_5' },
];

// ── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  if (!process.env.VITE_SANITY_WRITE_TOKEN) {
    console.error('ERROR: VITE_SANITY_WRITE_TOKEN missing from .env');
    process.exit(1);
  }

  // ── 1. SMSF step images ────────────────────────────────────────────────────
  console.log('\n📄  servicePage-smsf-property — step images');
  const smsfSets = {};
  for (let i = 0; i < smsfStepImages.length; i++) {
    const ref = await uploadLocal(smsfStepImages[i]);
    smsfSets[`process.steps[${i}].image`] = ref;
  }
  await client.patch('servicePage-smsf-property').set(smsfSets).commit();
  console.log(`    ✓  Patched ${Object.keys(smsfSets).length} SMSF step image(s)`);

  // ── 2. Commercial step images (replace wrong comm_*.png) ───────────────────
  console.log('\n📄  service-commercial-property — step images (replacing with frontend images)');
  const commSets = {};
  for (let i = 0; i < commercialStepUrls.length; i++) {
    const { url, label } = commercialStepUrls[i];
    const ref = await uploadFromUrl(url, label);
    commSets[`process.steps[${i}].image`] = ref;
  }
  await client.patch('service-commercial-property').set(commSets).commit();
  console.log(`    ✓  Patched ${Object.keys(commSets).length} Commercial step image(s)`);

  console.log('\n✅  Done!');
}

main().catch(err => {
  console.error('Fatal:', err.message || err);
  process.exit(1);
});
