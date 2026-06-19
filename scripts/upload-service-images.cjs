/**
 * Uploads the 4 service images to Sanity and patches each serviceList item
 * with the uploaded asset reference and alt text.
 */
const { createClient } = require('@sanity/client');
const fs = require('fs');
const path = require('path');

const env = fs.readFileSync(path.join(__dirname, '../.env'), 'utf8');
const token = env.match(/VITE_SANITY_WRITE_TOKEN=(.+)/)[1].trim();

const client = createClient({
  projectId: '7c1xj4wj',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token,
});

const IMAGE_DIR = path.join(__dirname, '../public/images/acquisitions');

const serviceImages = [
  {
    id: 'first-home-buyers',
    file: 'first_home_buyers_acquisitions.jpg',
    alt: 'First home buyers property acquisition in Australia',
  },
  {
    id: 'property-investors',
    file: 'user_img_2.png',
    alt: 'Investment property acquisition across Australia',
  },
  {
    id: 'smsf-property',
    file: 'user_img_3.png',
    alt: 'SMSF property investment and superannuation fund acquisition',
  },
  {
    id: 'commercial-property',
    file: 'commercial_property_aus.png',
    alt: 'Commercial property acquisition in Australia',
  },
];

async function uploadImage(filePath) {
  const buffer = fs.readFileSync(filePath);
  const ext = path.extname(filePath).slice(1).replace('jpg', 'jpeg');
  const asset = await client.assets.upload('image', buffer, {
    filename: path.basename(filePath),
    contentType: `image/${ext}`,
  });
  return asset._id;
}

async function run() {
  // Fetch the servicesPage document to get the current serviceList with _keys
  const doc = await client.fetch('*[_type == "servicesPage"][0]{ _id, serviceList[] }');
  if (!doc) { console.error('servicesPage document not found'); process.exit(1); }

  for (const svc of serviceImages) {
    const item = doc.serviceList?.find(s => s.id === svc.id);
    if (!item) { console.warn(`⚠ No serviceList item found for id="${svc.id}" — skipping`); continue; }

    const filePath = path.join(IMAGE_DIR, svc.file);
    if (!fs.existsSync(filePath)) { console.warn(`⚠ File not found: ${filePath} — skipping`); continue; }

    console.log(`  Uploading ${svc.file}...`);
    const assetId = await uploadImage(filePath);

    // Patch by _key using the array item's _key
    await client
      .patch(doc._id)
      .set({
        [`serviceList[_key=="${item._key}"].image`]: {
          _type: 'image',
          asset: { _type: 'reference', _ref: assetId },
          alt: svc.alt,
        },
      })
      .commit();

    console.log(`✓ ${svc.id} — image uploaded and alt set`);
  }
}

run().catch(e => { console.error(e); process.exit(1); });
