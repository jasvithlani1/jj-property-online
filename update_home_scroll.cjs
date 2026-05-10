const fs = require('fs');
let code = fs.readFileSync('src/pages/Home.tsx', 'utf8');

// 1. Import ArrowLeft
code = code.replace(/ArrowRight, Plus/, 'ArrowLeft, ArrowRight, Plus');

// 2. Add servicesScrollRef and scrollServices function inside Home component
const homeFnMatch = 'export default function Home() {';
const homeFnReplace = `export default function Home() {
  const servicesScrollRef = useRef<HTMLDivElement>(null);
  const scrollServices = (direction: 'left' | 'right') => {
    if (servicesScrollRef.current) {
      const scrollAmount = servicesScrollRef.current.clientWidth / 1.5;
      servicesScrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };`;
code = code.replace(homeFnMatch, homeFnReplace);

// 3. Update the header to include arrows next to "View Full Spectrum"
const viewFullSpectrumRegex = /<Link\s+href="\/services"\s+className="group flex items-center gap-3 shrink-0 text-sm font-bold uppercase tracking-widest text-black border-2 border-black\/5 rounded-full px-8 py-4 hover:bg-black hover:text-white transition-all duration-500 shadow-sm"\s*>\s*View Full Spectrum\s*<ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" \/>\s*<\/Link>/;

const newButtons = `<div className="flex flex-col sm:flex-row items-center gap-4 shrink-0 z-20">
                <div className="flex items-center gap-2 hidden md:flex">
                  <button onClick={() => scrollServices('left')} className="p-4 rounded-full border-2 border-black/5 hover:bg-black hover:text-white transition-colors group">
                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                  </button>
                  <button onClick={() => scrollServices('right')} className="p-4 rounded-full border-2 border-black/5 hover:bg-black hover:text-white transition-colors group">
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
                <Link
                  href="/services"
                  className="group flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-black border-2 border-black/5 rounded-full px-8 py-4 hover:bg-black hover:text-white transition-all duration-500 shadow-sm"
                >
                  View Full Spectrum
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </Link>
              </div>`;

code = code.replace(viewFullSpectrumRegex, newButtons);

// 4. Replace grid with scroll container
code = code.replace(
  '<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">',
  '<div ref={servicesScrollRef} className="flex gap-10 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-8 pt-4 -mx-4 px-4 md:-mx-8 md:px-8">'
);

// 5. Update Link wrapper class inside the map to be flex-shrink-0 and 1/3 width
// Instead of grid classes, it needs explicit widths to scroll.
const linkStartOld = /<Link\s+key={service.title}\s+href={`\/services#\${service.anchor}`}\s+className={`group relative p-12 rounded-\[3\.5rem\] border transition-all duration-700 cursor-pointer flex flex-col items-start \${index !== 1\s*\?\s*'bg-\[#011122\] border-white\/10 shadow-2xl shadow-gold\/10 md:z-20'\s*:\s*'bg-white border-black\/5 hover:border-gold\/20 hover:shadow-2xl hover:shadow-gold\/10'\s*}`}/;

const linkStartNew = `<Link
                  key={service.title}
                  href={\`/services#\${service.anchor}\`}
                  className={\`group shrink-0 snap-start w-[85vw] md:w-[calc(50%-1.25rem)] lg:w-[calc(33.333%-1.66rem)] relative p-12 rounded-[3.5rem] border transition-all duration-700 cursor-pointer flex flex-col items-start \${index !== 1
                    ? 'bg-[#011122] border-white/10 shadow-2xl shadow-gold/10 md:z-20'
                    : 'bg-white border-black/5 hover:border-gold/20 hover:shadow-2xl hover:shadow-gold/10'
                    }\`}`;

code = code.replace(linkStartOld, linkStartNew);

fs.writeFileSync('src/pages/Home.tsx', code);
