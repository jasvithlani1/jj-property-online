const fs = require('fs');
let code = fs.readFileSync('src/pages/CaseStudyDetail.tsx', 'utf8');

// 1. Fix SEO image passing
code = code.replace(
  "image={study.seo?.ogImage || study.mainImage}",
  "image={study.seo?.ogImage || (study.mainImage?.isLocal ? study.mainImage.asset._ref : study.mainImage)}"
);

// 2. Add safety to outcome substring in case it's missing (though it shouldn't be)
code = code.replace(
  "description={study.seo?.metaDescription || study.outcome.substring(0, 160)}",
  "description={study.seo?.metaDescription || study.outcome?.substring(0, 160)}"
);

fs.writeFileSync('src/pages/CaseStudyDetail.tsx', code);
