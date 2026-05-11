const fs = require('fs');
let code = fs.readFileSync('src/pages/Home.tsx', 'utf8');

// Replace all occurrences of `index !== 1` with `index % 2 === 0`
code = code.replace(/index !== 1/g, 'index % 2 === 0');

fs.writeFileSync('src/pages/Home.tsx', code);
