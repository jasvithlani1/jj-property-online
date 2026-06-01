const fs = require('fs');
const path = require('path');
const { createClient } = require('@sanity/client');

require('dotenv').config();

const client = createClient({
  projectId: process.env.VITE_SANITY_PROJECT_ID || '7c1xj4wj',
  dataset: process.env.VITE_SANITY_DATASET || 'production',
  useCdn: false,
  apiVersion: '2024-03-12',
  token: process.env.VITE_SANITY_WRITE_TOKEN,
});

async function run() {
  console.log('Fetching existing case studies...');
  const existing = await client.fetch(`*[_type == "caseStudy"]`);
  console.log(`Found ${existing.length} existing case studies. Deleting...`);

  for (const doc of existing) {
    await client.delete(doc._id);
    console.log(`Deleted ${doc._id}`);
  }

  console.log('Reading local case studies data...');
  const tsContent = fs.readFileSync('src/data/caseStudies.ts', 'utf8');
  
  // Extract the array using regex and eval
  const match = tsContent.match(/export const caseStudies: CaseStudy\[\] = (\[[\s\S]*\]);/);
  if (!match) {
    throw new Error("Could not find caseStudies array in the TS file");
  }
  
  let caseStudies = [];
  // Use Function to safely evaluate the JS object literal
  try {
    caseStudies = new Function(`return ${match[1]}`)();
  } catch (e) {
    console.error("Error parsing case studies array:", e);
    return;
  }

  console.log(`Found ${caseStudies.length} local case studies to upload.`);

  for (const study of caseStudies) {
    console.log(`Uploading: ${study.title}`);
    
    // 1. Upload image
    let imageAssetId = null;
    if (study.image) {
      const imagePath = path.join(__dirname, 'public', study.image);
      if (fs.existsSync(imagePath)) {
        console.log(`  Uploading image: ${study.image}`);
        const imageFile = fs.readFileSync(imagePath);
        const asset = await client.assets.upload('image', imageFile, {
          filename: path.basename(study.image)
        });
        imageAssetId = asset._id;
      } else {
        console.warn(`  Warning: Image not found at ${imagePath}`);
      }
    }

    // 2. Create document
    const doc = {
      _type: 'caseStudy',
      _id: `cs-${study.id}`,
      title: study.title,
      slug: { _type: 'slug', current: study.id },
      resultText: study.result,
      location: study.location,
      shortQuote: study.shortQuote,
      tag: study.tag,
      tagColor: study.tagColor,
      client: study.client,
      challenge: study.challenge,
      strategy: study.strategy,
      outcome: study.outcome,
      stats: study.stats?.map(s => ({ _key: Math.random().toString(36).substring(7), ...s })),
      propertyDetails: study.propertyDetails?.map(p => ({ _key: Math.random().toString(36).substring(7), ...p })),
      strategicAdvantages: study.strategicAdvantages?.map(sa => ({ _key: Math.random().toString(36).substring(7), ...sa })),
      caseNumber: study.caseNumber
    };

    if (imageAssetId) {
      doc.mainImage = {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: imageAssetId
        }
      };
    }

    await client.createOrReplace(doc);
    console.log(`  Created/Updated document: ${doc._id}`);
  }

  console.log('Sync complete!');
}

run().catch(console.error);
