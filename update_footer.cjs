const fs = require('fs');
let code = fs.readFileSync('src/components/Footer.tsx', 'utf8');

// 1. Left-align content and minimize spacing on mobile
code = code.replace(/items-center md:items-start/g, 'items-start');
code = code.replace(/text-center md:text-left/g, 'text-left');
code = code.replace('flex-col md:flex-row items-center justify-between gap-12', 'flex flex-col md:flex-row items-start md:items-center justify-between gap-8 md:gap-12');
code = code.replace('flex flex-col md:flex-row items-center justify-between text-xs text-white/40 font-sans gap-4 text-center md:text-left', 'flex flex-col md:flex-row items-start md:items-center justify-between text-xs text-white/40 font-sans gap-4 text-left');

// Update Logo Column alignment
code = code.replace(
  'className="group flex flex-col md:flex-row items-center gap-6 mb-8"',
  'className="group flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 mb-6 md:mb-8"'
);

// Reduce gap in main grid
code = code.replace('gap-12 lg:gap-8', 'gap-8 md:gap-12 lg:gap-8');

// Reduce spacing in headers and lists
code = code.replace(/mb-8 border-b/g, 'mb-4 md:mb-8 border-b');
code = code.replace('mt-8 border-t border-white/5 pt-8', 'mt-4 border-t border-white/5 pt-6 md:pt-8');
code = code.replace('pt-8', 'pt-6 md:pt-8');
code = code.replace('pt-6 pb-6', 'pt-4 pb-4 md:pt-6 md:pb-6');

// 2. Optimize Back to Top
// It already uses smooth scroll, but I'll make the button position more standard on mobile if needed.
// Actually, I'll add a check to make sure it's always clickable.
code = code.replace(
  'onClick={() => window.scrollTo({ top: 0, behavior: \'smooth\' })}',
  'onClick={() => { window.scrollTo({ top: 0, behavior: \'smooth\' }); if (window.scrollY === 0) window.scrollTo(0,0); }}'
);

fs.writeFileSync('src/components/Footer.tsx', code);
