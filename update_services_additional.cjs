const fs = require('fs');
let code = fs.readFileSync('src/pages/Services.tsx', 'utf8');

// Update non-featured Learn More text color to gold
code = code.replace(
  "text-[#011122] opacity-40 group-hover:opacity-100",
  "text-gold group-hover:text-gold-hover"
);

// Update non-featured Arrow icon background and text to gold theme
code = code.replace(
  "bg-[#011122]/5 group-hover:bg-[#011122] group-hover:text-white",
  "bg-gold/10 group-hover:bg-gold group-hover:text-white text-gold"
);

fs.writeFileSync('src/pages/Services.tsx', code);
