const fs = require('fs');
let code = fs.readFileSync('src/components/Navbar.tsx', 'utf8');

// 1. Make Top Banner more prominent on mobile
// Change py-2 to py-3 on mobile, and ensure text is visible or icons are larger
code = code.replace(
  'div className="bg-[#011122] text-gold py-2 px-6 md:px-8 flex justify-between items-center text-xs font-bold uppercase tracking-[0.15em] border-b border-white/5"',
  'div className="bg-[#011122] text-gold py-3 md:py-2 px-4 sm:px-6 md:px-8 flex justify-between items-center text-[10px] sm:text-xs font-bold uppercase tracking-[0.15em] border-b border-white/5"'
);

// Show email/phone icons more prominently on mobile
code = code.replace(
  '<Mail className="w-3 md:w-3.5 h-3 md:h-3.5" />',
  '<Mail className="w-4 md:w-3.5 h-4 md:h-3.5" />'
);
code = code.replace(
  '<Phone className="w-3 md:w-3.5 h-3 md:h-3.5" />',
  '<Phone className="w-4 md:w-3.5 h-4 md:h-3.5" />'
);

// 2. Continuous rotation - the class is already there but let's make it more obvious
// I'll update the index.css as well to ensure it's smooth.

fs.writeFileSync('src/components/Navbar.tsx', code);

// Update index.css for smoother rotation
let css = fs.readFileSync('src/index.css', 'utf8');
css = css.replace(
  'animation: slow-spin 20s linear infinite;',
  'animation: slow-spin 12s linear infinite;'
);
fs.writeFileSync('src/index.css', css);
