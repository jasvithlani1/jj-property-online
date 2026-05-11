const fs = require('fs');
const path = require('path');

const pagesDir = 'src/pages';
const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.tsx'));

const replacements = [
  { from: /space-y-12/g, to: 'space-y-4' },
  { from: /space-y-10/g, to: 'space-y-3' },
  { from: /space-y-8/g, to: 'space-y-3' },
  { from: /space-y-6/g, to: 'space-y-2' },
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
    console.log(`Updated space-y in ${file}`);
  }
});
