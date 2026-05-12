const fs = require('fs');

const files = [
  'src/pages/Contact.tsx',
  'src/pages/CaseStudies.tsx',
  'src/pages/Services.tsx',
  'src/pages/Blog.tsx',
  'src/pages/FirstHomeBuyers.tsx',
  'src/pages/PropertyInvestors.tsx',
  'src/pages/SmsfProperty.tsx',
  'src/pages/CommercialProperty.tsx'
];

files.forEach(file => {
  if (!fs.existsSync(file)) return;
  let content = fs.readFileSync(file, 'utf8');
  
  // Clean up any remaining pt- on the parent div if it's there
  content = content.replace(/<div className="w-full bg-white selection:bg-gold\/20 pt-\d+ md:pt-\d+/, '<div className="w-full bg-white selection:bg-gold/20 pt-0');
  
  // Find the first section and ensure it has the padding
  // This is more robust
  const sectionMatch = content.match(/<section[^>]*className="([^"]*)"/);
  if (sectionMatch) {
    let classes = sectionMatch[1];
    if (!classes.includes('pt-28')) {
      // Remove any existing small pt- classes
      classes = classes.replace(/pt-(?:2|3|4|6|8|10|12|16|20|24|32)/g, '');
      classes = 'pt-28 md:pt-36 ' + classes;
      content = content.replace(sectionMatch[0], sectionMatch[0].replace(sectionMatch[1], classes));
    }
  }

  fs.writeFileSync(file, content);
  console.log(`Updated ${file}`);
});
