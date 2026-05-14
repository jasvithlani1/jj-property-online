
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
      
      // Exact left edge of the photo in the gallery is around 700px.
      // Top edge is around 250px.
      // Photo width is usually 1100px. Height is usually 733px (3:2 ratio).
      
      const cropX = 700;
      const cropY = 250;
      const cropW = 1100;
      const cropH = 733;
      
      image.crop({ x: cropX, y: cropY, w: cropW, h: cropH });
      
      await image.write(path.join('public/images/acquisitions', img.name));
      console.log(`Successfully precision cropped ${img.name} to ${cropW}x${cropH} at x:${cropX}, y:${cropY}`);
    } catch (err) {
      console.error(`Error processing ${img.name}:`, err);
    }
  }
}

processImages();
