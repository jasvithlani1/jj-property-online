/**
 * patch_home_sections.js
 * Patches BOTH the published 'homePage' AND draft 'drafts.homePage' documents
 * to add serviceBannerSection and workHighlightsSection fields.
 * Run with: node cms/patch_home_sections.js
 */

const https = require('https');

const PROJECT_ID = '7c1xj4wj';
const DATASET = 'production';
const TOKEN = 'skVrQu4bvr34yHxnCtdwvV9YoIpMIxxLbjYJZZWRX9mT74LyGlEM6TcdNEoy5AxQSjq9uD7NOoxNJ4EdwpSSWDacZpjMSHhmxE93J87shckzh4qxXNYeJYTesauKVHuKlIvnSmPqqN9eMpdSjZ6vdD7WIMsDnCXFdRCi0OyxDUyX9t4ru5PJ';

// ─── Data to push ──────────────────────────────────────────────────────────────

const serviceBannerSection = {
  eyebrow: 'HOW WE CAN SERVE YOU?',
  heading: 'Tailored Solutions For Every Buyer.',
  subheading: 'Whether you\'re a first home buyer, a seasoned investor, or purchasing through your SMSF, we have a proven strategy to suit your goals.',
  items: [
    {
      _key: 'sbs1',
      title: 'First Home Buyers',
      description: 'Buying your first home is a major milestone, and having the right guidance makes all the difference. We help you clarify your budget, assess borrowing capacity, find the right property, and negotiate strongly so you can buy with confidence.',
      anchor: 'first-home-buyers',
    },
    {
      _key: 'sbs2',
      title: 'Property Investors',
      description: 'Building a strong property portfolio takes strategy, not guesswork. At JJ Property Partner, we use data-led research to identify high-growth, high-yield opportunities across Australia, helping you secure investments that match your income goals, plans, and risk profile.',
      anchor: 'property-investors',
    },
    {
      _key: 'sbs3',
      title: 'SMSF Property',
      description: 'Buying property through an SMSF comes with strict Australian rules, and getting it right matters. We work closely with your adviser, accountant, and SMSF auditor to secure compliant, investment-grade properties that align with your clear long-term retirement goals and wealth strategy.',
      anchor: 'smsf-property',
    },
    {
      _key: 'sbs4',
      title: 'Commercial Property',
      description: 'Navigate the commercial property market with expert guidance. We help you identify, negotiate, and secure high-performing commercial assets that offer strong yields and long-term capital growth, perfectly aligned with your investment strategy.',
      anchor: 'commercial-property',
    },
  ],
};

const workHighlightsSection = {
  eyebrow: 'WORK HIGHLIGHTS',
  heading: 'Standout Projects, Real Results.',
  subheading: 'Explore a selection of standout projects delivered by our team, showcasing strategic thinking, creative excellence, and results-driven execution.',
  items: [
    {
      _key: 'wh1',
      title: 'The Forever Home — Sydney\'s North-West',
      description: 'A growing family secured their dream home in Sydney\'s north-west corridor, with walkability to the Metro Northwest station and quality schools — exactly as briefed.',
      result: '$190,000 Capital Growth',
      location: 'Sydney Metro North-West, NSW',
      tag: 'Owner Occupied — Home Buyer',
    },
    {
      _key: 'wh2',
      title: 'The Mackay Coastal Acquisition',
      description: 'Premium beachside investment in Mackay\'s most sought-after coastal suburb, secured for a resources sector investor targeting high-yield returns.',
      result: '$119,000 Capital Growth · 6.18% Yield',
      location: 'Mackay Coastal Precinct, QLD',
      tag: 'Property Investor',
    },
    {
      _key: 'wh3',
      title: 'The Melbourne Growth Corridor Entry',
      description: 'Affordable Victorian investment in a high-growth western suburb, providing geographic diversification and consistent rental income.',
      result: '$63,000 Capital Growth · 4.21% Yield',
      location: 'Melbourne Western Corridor, VIC',
      tag: 'Property Investor',
    },
    {
      _key: 'wh4',
      title: 'The Perth Growth Story',
      description: 'Exceptional total return from Perth\'s eastern corridor — a rare combination of near-7% yield and extraordinary capital growth in under two years.',
      result: '$285,000 Capital Growth · 6.99% Yield',
      location: 'Perth Eastern Corridor, WA',
      tag: 'Property Investor',
    },
  ],
};

// ─── Sanity API helper ─────────────────────────────────────────────────────────

function sanityMutate(mutations) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({ mutations });
    const options = {
      hostname: `${PROJECT_ID}.api.sanity.io`,
      path: `/v2021-06-07/data/mutate/${DATASET}`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${TOKEN}`,
        'Content-Length': Buffer.byteLength(body),
      },
    };
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          if (res.statusCode >= 200 && res.statusCode < 300) {
            resolve(parsed);
          } else {
            reject(new Error(`HTTP ${res.statusCode}: ${data}`));
          }
        } catch (e) {
          reject(e);
        }
      });
    });
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

async function patchDocument(docId) {
  console.log(`\n  Patching: ${docId}`);
  const result = await sanityMutate([
    {
      patch: {
        id: docId,
        set: {
          serviceBannerSection,
          workHighlightsSection,
        },
      },
    },
  ]);

  if (result.results && result.results[0]) {
    console.log(`  ✅  ${docId} → ${result.results[0].operation || 'patched'}`);
  } else {
    console.log(`  ⚠️  ${docId} response:`, JSON.stringify(result));
  }
  return result;
}

async function run() {
  console.log('╔══════════════════════════════════════════════════╗');
  console.log('║  Patching Home Page sections in Sanity CMS       ║');
  console.log('╚══════════════════════════════════════════════════╝');

  // Patch published document
  await patchDocument('homePage');

  // CRITICAL: Also patch the draft — Sanity Studio shows the draft version
  await patchDocument('drafts.homePage');

  console.log('\n✅  Done! Both published and draft home page documents have been updated.');
  console.log('\n📋  New sections added:');
  console.log('   • serviceBannerSection  (HOW WE CAN SERVE YOU?)');
  console.log('   • workHighlightsSection (WORK HIGHLIGHTS)');
  console.log('\n💡  Now rebuild/redeploy the Sanity Studio to see the new schema fields.');
  console.log('   cd cms && npm run build && npm run deploy');
}

run().catch(err => {
  console.error('\n❌  Error:', err.message);
  process.exit(1);
});
