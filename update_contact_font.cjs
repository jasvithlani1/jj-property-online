const fs = require('fs');
let code = fs.readFileSync('src/pages/Contact.tsx', 'utf8');

// Update H1 to match logo font (Sans Black, Tracking Widest, Uppercase)
code = code.replace(
  "text-5xl md:text-8xl font-serif text-black leading-tight mb-6",
  "text-4xl sm:text-6xl md:text-7xl font-sans font-black text-black leading-[1.1] mb-8 uppercase tracking-[0.05em]"
);

// Ensure the gold span also follows the new style but remains gold
code = code.replace(
  "font-semibold text-gold",
  "text-gold"
);

// Add a more aesthetic badge style
code = code.replace(
  "inline-block px-7 py-3 rounded-full border border-black/10 bg-white text-sm font-bold uppercase tracking-[0.2em] text-black mb-8 shadow-sm scale-110 origin-center translate-y-[-4px]",
  "inline-block px-8 py-3 rounded-full border border-gold/30 bg-gold/5 text-gold text-xs font-black uppercase tracking-[0.3em] mb-10 shadow-sm"
);

fs.writeFileSync('src/pages/Contact.tsx', code);
