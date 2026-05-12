const fs = require('fs');
const path = require('path');

const pagesDir = 'src/pages';
const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.tsx'));

files.forEach(file => {
  const filePath = path.join(pagesDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Replace the first occurrence of pt-* in the file which is likely the hero/container pt
  // Most pages have <div ... pt-3 ...> or <section ... pt-4 ...>
  
  // For Contact.tsx specifically first
  if (file === 'Contact.tsx') {
    content = content.replace('pt-3', 'pt-24 md:pt-32');
  } else {
    // Generic fix for others that I might have broken
    content = content.replace('pt-8', 'pt-24 md:pt-32');
    content = content.replace('pt-6', 'pt-24 md:pt-32');
    content = content.replace('pt-4', 'pt-24 md:pt-32');
    content = content.replace('pt-3', 'pt-24 md:pt-32');
  }
  
  fs.writeFileSync(filePath, content);
  console.log(`Updated top padding in ${file}`);
});
