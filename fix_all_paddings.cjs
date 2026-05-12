const fs = require('fs');

const mappings = [
  { file: 'src/pages/Contact.tsx', from: 'pt-3 pb-8 md:pb-4', to: 'pt-28 md:pt-36 pb-8 md:pb-4' },
  { file: 'src/pages/About.tsx', from: 'pt-8', to: 'pt-28 md:pt-36' },
  { file: 'src/pages/Services.tsx', from: 'pt-24 md:pt-32', to: 'pt-28 md:pt-36' },
  { file: 'src/pages/CaseStudies.tsx', from: 'pt-8', to: 'pt-28 md:pt-36' },
  { file: 'src/pages/Blog.tsx', from: 'pt-8', to: 'pt-28 md:pt-36' },
  { file: 'src/pages/FirstHomeBuyers.tsx', from: 'pt-8', to: 'pt-28 md:pt-36' },
  { file: 'src/pages/PropertyInvestors.tsx', from: 'pt-8', to: 'pt-28 md:pt-36' },
  { file: 'src/pages/SmsfProperty.tsx', from: 'pt-8', to: 'pt-28 md:pt-36' },
  { file: 'src/pages/CommercialProperty.tsx', from: 'pt-8', to: 'pt-28 md:pt-36' }
];

mappings.forEach(m => {
  if (fs.existsSync(m.file)) {
    let content = fs.readFileSync(m.file, 'utf8');
    content = content.replace(m.from, m.to);
    fs.writeFileSync(m.file, content);
    console.log(`Fixed ${m.file}`);
  }
});
