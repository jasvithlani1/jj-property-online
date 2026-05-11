const fs = require('fs');
let code = fs.readFileSync('src/pages/Contact.tsx', 'utf8');

// 1. Update Section Padding
code = code.replace(/px-8/g, 'px-4 sm:px-8');

// 2. Update H1 scaling for mobile
code = code.replace(
  "text-4xl sm:text-5xl md:text-7xl",
  "text-3xl sm:text-5xl md:text-7xl"
);

// 3. Update Card Border Radius and Padding
code = code.replace(
  "rounded-[3rem]",
  "rounded-[1.5rem] sm:rounded-[3rem]"
);
code = code.replace(
  "p-8 md:p-12 lg:p-16",
  "p-6 sm:p-12 lg:p-16"
);

// 4. Update Form Card Padding and Border Radius
code = code.replace(
  "p-8 md:p-10 rounded-[2.5rem]",
  "p-6 sm:p-10 rounded-[1.5rem] sm:rounded-[2.5rem]"
);

// 5. Update Input Padding
code = code.replace(
  /px-5 py-4/g,
  "px-4 py-3.5 sm:px-5 sm:py-4"
);

// 6. Update Gap in grid for better mobile stacking
code = code.replace(
  "gap-16 lg:gap-24",
  "gap-12 lg:gap-24"
);

// 7. Fix contact item text size on mobile
code = code.replace(
  "text-xl font-sans",
  "text-lg sm:text-xl font-sans"
);

// 8. Fix Badge scale/position for mobile
code = code.replace(
  "inline-block px-8 py-3 rounded-full border border-gold/30 bg-gold/5 text-gold text-xs font-black uppercase tracking-[0.3em] mb-10 shadow-sm",
  "inline-block px-6 sm:px-8 py-2.5 sm:py-3 rounded-full border border-gold/30 bg-gold/5 text-[10px] sm:text-xs font-black uppercase tracking-[0.3em] mb-6 sm:mb-10 shadow-sm"
);

fs.writeFileSync('src/pages/Contact.tsx', code);
