const fs = require('fs');
let code = fs.readFileSync('src/pages/Home.tsx', 'utf8');

// 1. Add a ref for the calendly section
code = code.replace(
  'const carouselRef = useRef<HTMLDivElement>(null);',
  'const carouselRef = useRef<HTMLDivElement>(null);\n  const calendlySectionRef = useRef<HTMLDivElement>(null);'
);

// 2. Replace the mount-based init with observer-based init
const oldEffect = `  useEffect(() => {
    initInlineCalendly('calendly-inline-widget');
  }, []);`;

const newEffect = `  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          initInlineCalendly('calendly-inline-widget');
          observer.disconnect(); // Only load once
        }
      },
      { rootMargin: '800px' } // Start loading 800px before it enters the viewport
    );

    if (calendlySectionRef.current) {
      observer.observe(calendlySectionRef.current);
    }

    return () => observer.disconnect();
  }, []);`;

code = code.replace(oldEffect, newEffect);

// 3. Attach the ref to the section
code = code.replace(
  '<section className="relative py-3 md:py-4 bg-neutral-50 px-8 overflow-hidden">',
  '<section ref={calendlySectionRef} className="relative py-3 md:py-4 bg-neutral-50 px-8 overflow-hidden">'
);

fs.writeFileSync('src/pages/Home.tsx', code);
