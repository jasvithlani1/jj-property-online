const fs = require('fs');
let code = fs.readFileSync('src/pages/Home.tsx', 'utf8');

// Section paddings
code = code.replace(/py-6 md:py-8/g, 'py-2 md:py-3');
code = code.replace(/py-12 md:py-20/g, 'py-4 md:py-6');
code = code.replace(/py-10 md:py-12/g, 'py-3 md:py-4');
code = code.replace(/pt-10 pb-6 md:pt-12 md:pb-8/g, 'pt-3 pb-2 md:pt-4 md:pb-3');
code = code.replace(/pt-6 pb-12 md:pt-8 md:pb-16/g, 'pt-2 pb-4 md:pt-3 md:pb-6');

// Margins
code = code.replace(/mb-20/g, 'mb-6');
code = code.replace(/mb-16/g, 'mb-4');
code = code.replace(/mb-12/g, 'mb-3');
code = code.replace(/mb-10 md:mb-16/g, 'mb-4 md:mb-6');
code = code.replace(/mt-16/g, 'mt-4');
code = code.replace(/mt-12/g, 'mt-4');

fs.writeFileSync('src/pages/Home.tsx', code);
