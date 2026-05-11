const fs = require('fs');
let code = fs.readFileSync('src/pages/CaseStudies.tsx', 'utf8');

// 1. Import local caseStudies
code = code.replace(
  "import Link from '../components/Link';",
  "import Link from '../components/Link';\nimport { caseStudies as localCaseStudies } from '../data/caseStudies';"
);

// 2. Merge local data with fetched data in fetchStudies
const fetchStudiesRegex = /setStudies\(studiesData\);/;
const fetchStudiesReplace = `
        // Map local case studies to match Sanity format
        const formattedLocalStudies = localCaseStudies.map(local => ({
          _id: local.id,
          title: local.title,
          slug: { current: local.id },
          resultText: local.result,
          location: local.location,
          shortQuote: local.shortQuote,
          mainImage: { asset: { _ref: local.image }, isLocal: true }, // Mark as local for conditional rendering
          tag: local.tag,
          tagColor: local.tagColor,
          stats: local.stats
        }));

        setStudies([...studiesData, ...formattedLocalStudies]);`;
code = code.replace(fetchStudiesRegex, fetchStudiesReplace);

// 3. Update Image rendering to handle local images
const imgRegex = /\{study\.mainImage \?\s*\(\s*<img\s+src=\{urlFor\(study\.mainImage\)\.width\(800\)\.height\(600\)\.url\(\)\}\s+alt=\{study\.mainImage\?\.alt \|\| study\.title\}/;
const imgReplace = `{study.mainImage && !study.mainImage.isLocal ? (
                        <img
                          src={urlFor(study.mainImage).width(800).height(600).url()}
                          alt={study.mainImage?.alt || study.title}`;
code = code.replace(imgRegex, imgReplace);

// Add else-if for local images
const localImgRegex = /<img\s+src=\{`https:\/\/images\.unsplash\.com\/photo-\$\{index % 2 === 0 \? '1512917774080-9991f1c4c750' : '1600585154340-be6161a56a0c'\}\?auto=format&fit=crop&q=80&w=800`\}\s+alt=\{study\.title\}\s+className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"\s*\/>/;

const localImgReplace = `study.mainImage && study.mainImage.isLocal ? (
                        <img
                          src={study.mainImage.asset._ref}
                          alt={study.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                      ) : (
                        <img
                          src={\`https://images.unsplash.com/photo-\${index % 2 === 0 ? '1512917774080-9991f1c4c750' : '1600585154340-be6161a56a0c'}?auto=format&fit=crop&q=80&w=800\`}
                          alt={study.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                      )`;
code = code.replace(localImgRegex, localImgReplace);

// 4. Fix tag visibility - make it bold with stronger background
code = code.replace(
  "bg-gold/10 text-gold",
  "bg-gold text-white shadow-lg shadow-gold/20 font-black"
);
// Apply to more occurrences if any
code = code.replace(
  /bg-gold\/10 text-gold/g,
  "bg-gold text-white shadow-lg shadow-gold/20 font-black"
);

fs.writeFileSync('src/pages/CaseStudies.tsx', code);
