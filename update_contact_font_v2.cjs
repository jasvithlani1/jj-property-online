const fs = require('fs');
let code = fs.readFileSync('src/pages/Contact.tsx', 'utf8');

// Update H1 to match logo font EXACTLY (Sans Black, Tracking Widest, Uppercase, Navy color)
code = code.replace(
  /text-4xl sm:text-6xl md:text-7xl font-sans font-black text-black leading-\[1.1\] mb-8 uppercase tracking-\[0.05em\]/g,
  "text-4xl sm:text-5xl md:text-7xl font-sans font-black text-[#011122] leading-[1.1] mb-8 uppercase tracking-widest"
);

// Ensure gold text also matches the font weight/style
code = code.replace(
  /<span className="text-gold">/g,
  '<span className="text-gold font-black">'
);

fs.writeFileSync('src/pages/Contact.tsx', code);
