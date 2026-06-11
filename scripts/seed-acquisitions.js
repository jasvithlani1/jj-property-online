import fs from 'fs';
import path from 'path';
import { createClient } from '@sanity/client';
import dotenv from 'dotenv';

dotenv.config();

const client = createClient({
  projectId: process.env.VITE_SANITY_PROJECT_ID || '7c1xj4wj',
  dataset: process.env.VITE_SANITY_DATASET || 'production',
  token: process.env.VITE_SANITY_WRITE_TOKEN,
  useCdn: false,
  apiVersion: '2024-03-12',
});

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

async function run() {
  console.log('Reading acquisitions data...');
  const tsPath = path.resolve('src/data/acquisitions.ts');
  let content = fs.readFileSync(tsPath, 'utf8');

  // Strip TypeScript interfaces and type declarations to make it valid JS
  content = content.replace(/export interface Acquisition[\s\S]*?}/g, '');
  content = content.replace(/: Acquisition\[]/g, '');

  const tempJsPath = path.resolve('scripts/temp-acquisitions.js');
  fs.writeFileSync(tempJsPath, content, 'utf8');

  try {
    // Dynamically import the cleaned acquisitions module
    const moduleUrl = `file://${tempJsPath}`;
    const { acquisitions } = await import(moduleUrl);

    console.log(`Loaded ${acquisitions.length} acquisitions. Syncing to Sanity...`);

    for (let i = 0; i < acquisitions.length; i++) {
      const acq = acquisitions[i];
      const { city, state, price, config, month, rental, value, size, growth, image } = acq;
      const yieldVal = acq.yield; // avoid yield keyword collision

      console.log(`[${i+1}/${acquisitions.length}] Processing ${city}, ${state} (${month})...`);

      let sanityImage = null;
      if (image && typeof image === 'string') {
        const imageRelativePath = image.replace(/^\//, '');
        const absoluteImagePath = path.resolve('public', imageRelativePath);

        if (fs.existsSync(absoluteImagePath)) {
          console.log(`  Uploading image: ${image}`);
          try {
            const fileStream = fs.createReadStream(absoluteImagePath);
            const asset = await client.assets.upload('image', fileStream, {
              filename: path.basename(absoluteImagePath),
            });
            sanityImage = {
              _type: 'image',
              asset: {
                _type: 'reference',
                _ref: asset._id,
              },
              alt: `${city} property acquisition`,
            };
            console.log(`  Image uploaded successfully. Asset ID: ${asset._id}`);
          } catch (err) {
            console.error(`  ❌ Failed to upload image for ${city}:`, err);
          }
        } else {
          console.warn(`  ⚠️ Image file not found: ${absoluteImagePath}`);
        }
      }

      // Generate a stable unique ID based on city, state, month, config
      const docId = `acquisition-${slugify(`${city}-${state}-${month}-${config.replace(/\s*\/\s*/g, '-')}`)}`;

      const doc = {
        _type: 'acquisition',
        _id: docId,
        city,
        state,
        dealDone: true,
        price,
        config,
        month,
        rental,
        value,
        size,
        growth,
        yield: yieldVal,
      };

      if (sanityImage) {
        doc.image = sanityImage;
      }

      await client.createOrReplace(doc);
      console.log(`  ✅ Synced: ${docId}`);
    }

    console.log('Migration completed successfully!');
  } catch (error) {
    console.error('Migration failed:', error);
  } finally {
    if (fs.existsSync(tempJsPath)) {
      fs.unlinkSync(tempJsPath);
    }
  }
}

run();
