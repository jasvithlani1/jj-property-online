const fs = require('fs');

const files = ['src/pages/CaseStudies.tsx', 'src/pages/CaseStudyDetail.tsx'];

files.forEach(file => {
  let code = fs.readFileSync(file, 'utf8');
  
  // Force consistent solid gold tag style
  code = code.replace(
    /\$\{study\.tagColor \|\| 'bg-gold text-white shadow-lg shadow-gold\/20 font-black'\}/g,
    "bg-gold text-white shadow-lg shadow-gold/20 font-black"
  );
  
  code = code.replace(
    /\$\{other\.tagColor \|\| 'bg-gold text-white shadow-lg shadow-gold\/20 font-black border-none'\}/g,
    "bg-gold text-white shadow-lg shadow-gold/20 font-black border-none"
  );

  // For CaseStudyDetail specific line
  code = code.replace(
    /\$\{study\.tagColor \|\| 'bg-gold text-white shadow-lg shadow-gold\/20 font-black border-none'\}/g,
    "bg-gold text-white shadow-lg shadow-gold/20 font-black border-none"
  );

  fs.writeFileSync(file, code);
  console.log(`Updated tag style in ${file}`);
});
