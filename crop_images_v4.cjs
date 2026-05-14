
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
      // Re-read from the ORIGINAL screenshot to ensure we have the full data to autocrop
      const image = await Jimp.read(img.path);
      
      // The background of the realestate.com.au gallery is a dark grey, often around #222222 or #1f2326.
      // Jimp's autocrop might work, but it usually looks for exactly identical pixels.
      // Let's use a very safe manual crop based on the typical gallery size.
      // A 2880x1302 screenshot on Mac usually has the browser UI at the top.
      
      const w = image.width;
      const h = image.height;
      
      // Let's crop very tightly to the center.
      // The photo in the gallery is usually 16:9 or 4:3.
      // For a 2880 width screen, the image might be 1440x960 in the center.
      
      const cropW = Math.floor(w * 0.55); // 55% of 2880 = 1584
      const cropH = Math.floor(h * 0.7);  // 70% of 1302 = 911
      const cropX = Math.floor((w - cropW) / 2) + 50; // Center, shift slightly right to avoid left UI
      const cropY = Math.floor((h - cropH) / 2) + 50; // Center, shift slightly down
      
      image.crop({ x: cropX, y: cropY, w: cropW, h: cropH });
      
      await image.write(path.join('public/images/acquisitions', img.name));
      console.log(`Successfully precision cropped ${img.name} to ${cropW}x${cropH} at x:${cropX}, y:${cropY}`);
    } catch (err) {
      console.error(`Error processing ${img.name}:`, err);
    }
  }
}

processImages();
