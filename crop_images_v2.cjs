
const { Jimp } = require('jimp');
const path = require('path');

async function processImages() {
  const images = [
    { name: 'prop_3.png', path: '/Users/jas/.gemini/antigravity/brain/3d5cd253-28db-4a4c-8a3a-0b34ce92a01e/edmonton_front_on_1778737261707.png' },
    { name: 'prop_4.png', path: '/Users/jas/.gemini/antigravity/brain/3d5cd253-28db-4a4c-8a3a-0b34ce92a01e/blackstone_front_on_1778737303819.png' },
    { name: 'prop_5.png', path: '/Users/jas/.gemini/antigravity/brain/3d5cd253-28db-4a4c-8a3a-0b34ce92a01e/port_kennedy_front_on_1778737336575.png' }
  ];

  for (const img of images) {
    try {
      const image = await Jimp.read(img.path);
      
      // Target the main photo area
      const w = image.width;
      const h = image.height;
      
      // Based on realestate.com.au desktop layout:
      // Header is ~150px
      // Main photo is centered but large
      const cropX = Math.floor(w * 0.1);
      const cropY = Math.floor(h * 0.15);
      const cropW = Math.floor(w * 0.8);
      const cropH = Math.floor(h * 0.7);
      
      image.crop({ x: cropX, y: cropY, w: cropW, h: cropH });
      
      // Subtle blur on common number locations (center and bottom right)
      // Actually, just informed clean crop is better than random blurs.
      
      await image.write(path.join('public/images/acquisitions', img.name));
      console.log(`Saved ${img.name} (${cropW}x${cropH})`);
    } catch (err) {
      console.error(`Error processing ${img.name}:`, err);
    }
  }
}

processImages();
