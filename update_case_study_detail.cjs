const fs = require('fs');
let code = fs.readFileSync('src/pages/CaseStudyDetail.tsx', 'utf8');

// 1. Import local caseStudies
code = code.replace(
  "import Link from '../components/Link';",
  "import Link from '../components/Link';\nimport { caseStudies as localCaseStudies } from '../data/caseStudies';"
);

// 2. Update fetchStudy to check local data if Sanity fails
const fetchStudyRegex = /const data = await client\.fetch\(query, \{ slug: id \}\);\s*setStudy\(data\);/;
const fetchStudyReplace = `
        let data = await client.fetch(query, { slug: id });
        
        if (!data) {
          // Check local data
          const localStudy = localCaseStudies.find(s => s.id === id);
          if (localStudy) {
            data = {
              _id: localStudy.id,
              title: localStudy.title,
              slug: { current: localStudy.id },
              resultText: localStudy.result,
              location: localStudy.location,
              shortQuote: localStudy.shortQuote,
              mainImage: { asset: { _ref: localStudy.image }, isLocal: true },
              tag: localStudy.tag,
              tagColor: localStudy.tagColor,
              client: localStudy.client,
              challenge: localStudy.challenge,
              strategy: localStudy.strategy,
              outcome: localStudy.outcome,
              stats: localStudy.stats
            };
          }
        }
        setStudy(data);`;
code = code.replace(fetchStudyRegex, fetchStudyReplace);

// 3. Update Image rendering to handle local images in Hero
const heroImgRegex = /\{study\.mainImage \?\s*\(\s*<img\s+src=\{urlFor\(study\.mainImage\)\.url\(\)\}\s+alt=\{study\.mainImage\?\.alt \|\| study\.title\}/;
const heroImgReplace = `{study.mainImage && !study.mainImage.isLocal ? (
          <img
            src={urlFor(study.mainImage).url()}
            alt={study.mainImage?.alt || study.title}`;
code = code.replace(heroImgRegex, heroImgReplace);

// Add else-if for local images in Hero
const heroLocalImgRegex = /<img\s+src=\{`https:\/\/images\.unsplash\.com\/photo-\$\{study\.title\.length % 2 === 0 \? '1512917774080-9991f1c4c750' : '1600585154340-be6161a56a0c'\}\?auto=format&fit=crop&q=80&w=1200`\}\s+alt=\{study\.title\}\s+className="w-full h-full object-cover"\s*\/>/;

const heroLocalImgReplace = `study.mainImage && study.mainImage.isLocal ? (
          <img
            src={study.mainImage.asset._ref}
            alt={study.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <img
            src={\`https://images.unsplash.com/photo-\${study.title.length % 2 === 0 ? '1512917774080-9991f1c4c750' : '1600585154340-be6161a56a0c'}?auto=format&fit=crop&q=80&w=1200\`}
            alt={study.title}
            className="w-full h-full object-cover"
          />
        )`;
code = code.replace(heroLocalImgRegex, heroLocalImgReplace);

// 4. Update tags color for visibility
code = code.replace(
  /bg-gold\/10 text-gold/g,
  "bg-gold text-white shadow-lg shadow-gold/20 font-black border-none"
);

fs.writeFileSync('src/pages/CaseStudyDetail.tsx', code);
