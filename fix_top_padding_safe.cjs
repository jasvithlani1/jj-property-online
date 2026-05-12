const fs = require('fs');
const path = require('path');

const pagesDir = 'src/pages';
const files = ['About.tsx', 'Blog.tsx', 'BlogDetail.tsx', 'CaseStudies.tsx', 'CaseStudyDetail.tsx', 'CommercialProperty.tsx', 'Contact.tsx', 'FirstHomeBuyers.tsx', 'PropertyInvestors.tsx', 'Services.tsx', 'SmsfProperty.tsx'];

files.forEach(file => {
  const filePath = path.join(pagesDir, file);
  if (!fs.existsSync(filePath)) return;
  
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Replace the messed up ones
  content = content.replace(/pt-24 md:pt-24 md:pt-322/g, 'pt-24 md:pt-32');
  content = content.replace(/pt-24 md:pt-322/g, 'pt-24 md:pt-32');
  content = content.replace(/pt-24 md:pt-32 lg:pt-24 md:pt-32/g, 'pt-24 md:pt-32');
  
  // Ensure the main container has enough padding
  // This is usually in the first <div> or <section> after return (
  const parts = content.split('return (');
  if (parts.length > 1) {
    let body = parts[1];
    // Find the first occurrence of a class string that contains pt-
    body = body.replace(/pt-(?:3|4|6|8)(?!\d)/, 'pt-24 md:pt-32');
    content = parts[0] + 'return (' + body;
  }

  fs.writeFileSync(filePath, content);
  console.log(`Cleaned up and fixed top padding in ${file}`);
});
