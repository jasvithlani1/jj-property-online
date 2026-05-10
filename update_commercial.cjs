const fs = require('fs');

const path = './src/pages/CommercialProperty.tsx';
let content = fs.readFileSync(path, 'utf8');

// Replace standard exports and names
content = content.replace(/PropertyInvestors/g, 'CommercialProperty');
content = content.replace(/Property Investors/g, 'Commercial Property');
content = content.replace(/Property Investment/g, 'Commercial Property Investment');
content = content.replace(/investorFaqs/g, 'commercialFaqs');
content = content.replace(/property-investors/g, 'commercial-property');

// Update text
content = content.replace(/investors/g, 'businesses and commercial investors');

fs.writeFileSync(path, content);
