const fs = require('fs');
let code = fs.readFileSync('src/pages/Home.tsx', 'utf8');

// Update tag visibility in Home.tsx case studies section
code = code.replace(
  'text-sm font-bold text-gold bg-gold/10 inline-block px-3 py-1 rounded-full',
  'text-[10px] font-black uppercase tracking-widest text-white bg-gold inline-block px-4 py-2 rounded-full shadow-lg shadow-gold/20'
);

fs.writeFileSync('src/pages/Home.tsx', code);
