const fs = require('fs');

const file = 'src/data/acquisitions.ts';
let content = fs.readFileSync(file, 'utf8');

const images = [
  'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1576941089067-2de3c901e126?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1513584684374-8bab748fbf90?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1505843513577-22bb7abd5eb1?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1588880331179-bc9b93a8cb78?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1605276374104-aa237a7ce372?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1628624747186-a941c476b7ef?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1572120360610-d971b9d7767c?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&q=80&w=800'
];

let imgIndex = 0;

let currentAcquisitionIndex = -1;

const updatedContent = content.replace(/"image": "(.*?)"/g, (match, p1) => {
  currentAcquisitionIndex++;
  // skip 0, 1, 2, 5
  if (currentAcquisitionIndex === 0 || currentAcquisitionIndex === 1 || currentAcquisitionIndex === 2 || currentAcquisitionIndex === 5) {
    return match;
  } else {
    const newImage = images[imgIndex++];
    return `"image": "${newImage}"`;
  }
});

fs.writeFileSync(file, updatedContent);
console.log('Updated images in acquisitions.ts successfully.');
