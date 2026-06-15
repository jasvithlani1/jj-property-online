/**
 * Uploads frontend fallback images to Sanity and patches the servicePage
 * documents so the CMS shows the same images as the frontend.
 *
 * Run: node scripts/sync_sanity_images.cjs
 * Requires VITE_SANITY_WRITE_TOKEN in .env
 */

require('dotenv').config();
const { createClient } = require('@sanity/client');
const fs = require('fs');
const path = require('path');

const client = createClient({
  projectId: '7c1xj4wj',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-03-12',
  token: process.env.VITE_SANITY_WRITE_TOKEN,
});

const BASE = 'public/images/acquisitions/';

// Upload cache: filePath → Sanity image reference object
const cache = {};

async function getImageRef(filePath) {
  if (cache[filePath]) return cache[filePath];
  if (!fs.existsSync(filePath)) {
    console.warn(`    ⚠  File not found, skipping: ${filePath}`);
    return null;
  }
  const ext = path.extname(filePath).slice(1).toLowerCase();
  const mimeType = (ext === 'jpg' || ext === 'jpeg') ? 'image/jpeg' : 'image/png';
  const buffer = fs.readFileSync(filePath);
  const asset = await client.assets.upload('image', buffer, {
    filename: path.basename(filePath),
    contentType: mimeType,
  });
  const ref = { _type: 'image', asset: { _type: 'reference', _ref: asset._id } };
  cache[filePath] = ref;
  console.log(`    ✓  Uploaded ${path.basename(filePath)}`);
  return ref;
}

// ── Service page image mappings ──────────────────────────────────────────────

const pages = [
  {
    docId: 'servicePage-first-home-buyers',
    introImage: BASE + 'first_home_hero.jpg',
    pillarImages: [
      BASE + 'user_prop_4.png',
      BASE + 'fhb_pillar_2.png',
      BASE + 'user_prop_6.png',
    ],
    stepImages: [
      BASE + 'user_prop_7.png',
      BASE + 'user_prop_8.png',
      BASE + 'off_market_house.png',
      BASE + 'user_prop_10.png',
      BASE + 'user_img_4.png',
      BASE + 'user_prop_14.jpg',
    ],
  },
  {
    docId: 'servicePage-property-investors',
    introImage: BASE + 'aus_house_2.png',
    pillarImages: [
      BASE + 'user_img_5.png',
      BASE + 'user_prop_17.png',
      BASE + 'user_img_6.png',
    ],
    stepImages: [
      BASE + 'aus_house_3.png',
      BASE + 'user_prop_20.png',
      BASE + 'aus_house_4.png',
      BASE + 'modern_beige.png',
      BASE + 'modern_grey.png',
      BASE + 'modern_grey.png',
    ],
  },
  {
    docId: 'servicePage-smsf-property',
    introImage: BASE + 'aus_house_3.png',
    pillarImages: [
      BASE + 'user_prop_16.png',
      BASE + 'aus_house_4.png',
      BASE + 'prop_1.png',
    ],
    stepImages: [], // SMSF step cards don't render images
  },
  {
    docId: 'service-commercial-property',
    introImage: BASE + 'commercial_property_aus.png',
    pillarImages: [
      BASE + 'user_prop_4.png',
      BASE + 'user_prop_5.png',
      BASE + 'user_prop_6.png',
    ],
    stepImages: [
      BASE + 'comm_1.png',
      BASE + 'comm_2.png',
      BASE + 'comm_3.png',
      BASE + 'comm_4.png',
      BASE + 'comm_5.png',
    ],
  },
];

// ── Patch a single service page ──────────────────────────────────────────────

async function syncPage(page) {
  console.log(`\n📄  ${page.docId}`);

  const sets = {};

  // intro.image
  if (page.introImage) {
    const ref = await getImageRef(page.introImage);
    if (ref) sets['intro.image'] = ref;
  }

  // pillars[n].image
  for (let i = 0; i < page.pillarImages.length; i++) {
    const ref = await getImageRef(page.pillarImages[i]);
    if (ref) sets[`pillars[${i}].image`] = ref;
  }

  // process.steps[n].image
  for (let i = 0; i < page.stepImages.length; i++) {
    const ref = await getImageRef(page.stepImages[i]);
    if (ref) sets[`process.steps[${i}].image`] = ref;
  }

  if (Object.keys(sets).length === 0) {
    console.log('    Nothing to patch.');
    return;
  }

  await client.patch(page.docId).set(sets).commit();
  console.log(`    ✓  Patched ${Object.keys(sets).length} image field(s)`);
}

// ── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  if (!process.env.VITE_SANITY_WRITE_TOKEN) {
    console.error('ERROR: VITE_SANITY_WRITE_TOKEN missing from .env');
    process.exit(1);
  }

  console.log('🚀  Syncing service page images to Sanity CMS...');

  for (const page of pages) {
    await syncPage(page);
  }

  console.log('\n✅  All done!');
}

main().catch(err => {
  console.error('Fatal:', err.message || err);
  process.exit(1);
});
