const fs = require('fs');
const path = require('path');

const pagesDir = 'src/pages';
const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.tsx'));

const replacements = [
  // Padding Y
  { from: /py-32/g, to: 'py-12' },
  { from: /py-24/g, to: 'py-8' },
  { from: /py-20/g, to: 'py-8' },
  { from: /py-16/g, to: 'py-6' },
  { from: /py-12/g, to: 'py-4' },
  { from: /py-10/g, to: 'py-3' },
  { from: /py-8/g, to: 'py-2' },
  
  // Padding Top
  { from: /pt-32/g, to: 'pt-12' },
  { from: /pt-24/g, to: 'pt-10' },
  { from: /pt-20/g, to: 'pt-8' },
  { from: /pt-16/g, to: 'pt-6' },
  { from: /pt-12/g, to: 'pt-4' },
  { from: /pt-10/g, to: 'pt-3' },
  
  // Padding Bottom
  { from: /pb-32/g, to: 'pb-12' },
  { from: /pb-24/g, to: 'pb-10' },
  { from: /pb-20/g, to: 'pb-8' },
  { from: /pb-16/g, to: 'pb-6' },
  { from: /pb-12/g, to: 'pb-4' },
  { from: /pb-10/g, to: 'pb-3' },
  
  // Margin Bottom
  { from: /mb-32/g, to: 'mb-12' },
  { from: /mb-24/g, to: 'mb-8' },
  { from: /mb-20/g, to: 'mb-6' },
  { from: /mb-16/g, to: 'mb-4' },
  { from: /mb-12/g, to: 'mb-3' },
  { from: /mb-10/g, to: 'mb-2' },
  
  // Margin Top
  { from: /mt-32/g, to: 'mt-12' },
  { from: /mt-24/g, to: 'mt-10' },
  { from: /mt-20/g, to: 'mt-8' },
  { from: /mt-16/g, to: 'mt-6' },
  { from: /mt-12/g, to: 'mt-4' },
];

files.forEach(file => {
  const filePath = path.join(pagesDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;
  
  replacements.forEach(r => {
    content = content.replace(r.from, r.to);
  });
  
  if (content !== original) {
    fs.writeFileSync(filePath, content);
    console.log(`Updated spacing in ${file}`);
  }
});
