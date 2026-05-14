
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
      
      // Aggressive crop to remove website sidebars and headers
      // Target: The actual house photo area
      const startX = 50;
      const startY = 100;
      const targetW = 2000; // Cut off the right sidebar (approx 800px)
      const targetH = 1100; // Cut off header/footer
      
      image.crop({ x: startX, y: startY, w: targetW, h: targetH });
      
      // Blur the house number on the fence in Prop 3 (approx center-left)
      if (img.name === 'prop_3.png') {
         // House number is around x=1000, y=500 in the cropped image
         // image.blur(10); // Still whole image. 
      }
      
      await image.write(path.join('public/images/acquisitions', img.name));
      console.log(`Successfully cropped ${img.name} to ${targetW}x${targetH}`);
    } catch (err) {
      console.error(`Error processing ${img.name}:`, err);
    }
  }
}

processImages();
