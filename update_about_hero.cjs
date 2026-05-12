const fs = require('fs');
let code = fs.readFileSync('src/pages/About.tsx', 'utf8');

// 1. Update the section and container to be centered
code = code.replace(
  '<div className="max-w-7xl mx-auto px-8 relative z-10">',
  '<div className="max-w-7xl mx-auto px-8 relative z-10 text-center">'
);
code = code.replace(
  '<div className="max-w-4xl">',
  '<div className="max-w-5xl mx-auto flex flex-col items-center">'
);

// 2. Remove br from h1 and make it single line / stretched
const oldH1 = `<motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-5xl sm:text-6xl md:text-8xl font-serif text-white leading-[1.05] mb-2"
            >
              {aboutData?.hero?.heading ? (
                <>
                  {aboutData.hero.heading.split(' ').slice(0, -2).join(' ')} <br />
                  <span className="text-gold italic">{aboutData.hero.heading.split(' ').slice(-2).join(' ')}</span>
                </>
              ) : (
                <>Buy Property <br /> With <span className="text-gold italic">Absolute Confidence.</span></>
              )}
            </motion.h1>`;

const newH1 = `<motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-[6.5vw] sm:text-6xl md:text-8xl font-serif text-white leading-[1.05] mb-6 !whitespace-nowrap w-full"
            >
              {aboutData?.hero?.heading ? (
                <>
                  {aboutData.hero.heading.replace('<br />', '').replace('<br>', '')}
                </>
              ) : (
                <>Buy Property With <span className="text-gold italic">Absolute Confidence.</span></>}
            </motion.h1>`;

code = code.replace(oldH1, newH1);

// 3. Center the subheading div
code = code.replace(
  'className="flex flex-col md:flex-row gap-8 items-start md:items-center"',
  'className="flex flex-col items-center text-center gap-6"'
);
code = code.replace(
  '<div className="h-px w-24 bg-gold/40 hidden md:block" />',
  '<div className="h-px w-24 bg-gold/40" />'
);

fs.writeFileSync('src/pages/About.tsx', code);
