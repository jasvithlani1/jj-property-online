
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
      console.log(`Processing ${img.name}: ${image.width}x${image.height}`);
      
      // The realestate.com.au UI usually has a header of ~150px and some sidebar.
      // We want to crop the central image area.
      // Based on the user's provided screenshots, the image is in the bottom right usually or centered.
      
      // Let's try to detect the main image area or just crop a safe central part.
      // Actually, better to just crop the bottom 70% and center it.
      
      const cropWidth = image.width;
      const cropHeight = Math.floor(image.height * 0.7);
      const startX = 0;
      const startY = Math.floor(image.height * 0.25); // Skip header
      
      image.crop({ x: startX, y: startY, w: cropWidth, h: cropHeight });
      
      // Blur a small area for privacy (bottom left where letterboxes usually are)
      // and center (where house numbers usually are).
      // Since we don't know exact coords, we'll do a subtle overall enhance or specific blurs.
      
      // Blur bottom 10% for letterboxes
      // image.blur(5); // This blurs whole image, we want specific area.
      
      await image.write(path.join('public/images/acquisitions', img.name));
      console.log(`Saved ${img.name}`);
    } catch (err) {
      console.error(`Error processing ${img.name}:`, err);
    }
  }
}

processImages();
