const fs = require('fs');

const mappings = [
  { 
    file: 'src/pages/About.tsx', 
    parentFrom: 'pt-28 md:pt-36', parentTo: '', 
    sectionFrom: 'pt-6 md:pt-3', sectionTo: 'pt-28 md:pt-36' 
  },
  { 
    file: 'src/pages/CaseStudies.tsx', 
    parentFrom: 'pt-28 md:pt-36', parentTo: '', 
    sectionFrom: 'pt-4 pb-3 md:pt-6 md:pb-3', sectionTo: 'pt-28 md:pt-36 pb-3' 
  },
  { 
    file: 'src/pages/Services.tsx', 
    parentFrom: 'pt-28 md:pt-36', parentTo: 'pt-0', 
    sectionFrom: 'px-6 py-2 sm:px-8 sm:py-3 md:pb-3', sectionTo: 'px-6 sm:px-8 pt-28 md:pt-36 pb-3' 
  },
  { 
    file: 'src/pages/FirstHomeBuyers.tsx', 
    parentFrom: 'pt-28 md:pt-36', parentTo: '', 
    sectionFrom: 'pt-4 pb-4 md:pt-10 md:pb-6', sectionTo: 'pt-28 md:pt-36 pb-6' 
  },
  { 
    file: 'src/pages/PropertyInvestors.tsx', 
    parentFrom: 'pt-28 md:pt-36', parentTo: '', 
    sectionFrom: 'pt-4 pb-4 md:pt-10 md:pb-6', sectionTo: 'pt-28 md:pt-36 pb-6' 
  },
  { 
    file: 'src/pages/SmsfProperty.tsx', 
    parentFrom: 'pt-28 md:pt-36', parentTo: '', 
    sectionFrom: 'pt-4 pb-4 md:pt-10 md:pb-6', sectionTo: 'pt-28 md:pt-36 pb-6' 
  },
  { 
    file: 'src/pages/CommercialProperty.tsx', 
    parentFrom: 'pt-28 md:pt-36', parentTo: '', 
    sectionFrom: 'pt-4 pb-4 md:pt-10 md:pb-6', sectionTo: 'pt-28 md:pt-36 pb-6' 
  },
  { 
    file: 'src/pages/Blog.tsx', 
    parentFrom: 'pt-28 md:pt-36', parentTo: '', 
    sectionFrom: 'pt-6 pb-4 md:pt-8 md:pb-3', sectionTo: 'pt-28 md:pt-36 pb-3' 
  },
  { 
    file: 'src/pages/Contact.tsx', 
    parentFrom: 'pt-28 md:pt-36', parentTo: 'pt-0', 
    sectionFrom: 'pt-24 md:pt-32 pb-8 md:pt-8 md:pb-3', sectionTo: 'pt-28 md:pt-36 pb-3' 
  }
];

mappings.forEach(m => {
  if (fs.existsSync(m.file)) {
    let content = fs.readFileSync(m.file, 'utf8');
    content = content.replace(m.parentFrom, m.parentTo);
    content = content.replace(m.sectionFrom, m.sectionTo);
    fs.writeFileSync(m.file, content);
    console.log(`Fixed white gap in ${m.file}`);
  }
});
