/**
 * JJ Property Partner — Full Sanity CMS Content Sync
 * Syncs all website content (hardcoded fallbacks) to Sanity CMS.
 * Run with: node sync_all_content.js
 */

const https = require('https');

const PROJECT_ID = '7c1xj4wj';
const DATASET = 'production';
const TOKEN = 'skVrQu4bvr34yHxnCtdwvV9YoIpMIxxLbjYJZZWRX9mT74LyGlEM6TcdNEoy5AxQSjq9uD7NOoxNJ4EdwpSSWDacZpjMSHhmxE93J87shckzh4qxXNYeJYTesauKVHuKlIvnSmPqqN9eMpdSjZ6vdD7WIMsDnCXFdRCi0OyxDUyX9t4ru5PJ';

function sanityRequest(mutations) {
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
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        const parsed = JSON.parse(data);
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(parsed);
        } else {
          reject(new Error(`HTTP ${res.statusCode}: ${data}`));
        }
      });
    });
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

async function upsert(doc) {
  console.log(`  Upserting: [${doc._type}] ${doc._id}`);
  const result = await sanityRequest([{ createOrReplace: doc }]);
  if (result.results) {
    console.log(`  ✅ Done: ${result.results[0]?.operation || 'ok'}`);
  }
  return result;
}

// ─────────────────────────────────────────────────────────────────────────────
// 1. HOME PAGE
// ─────────────────────────────────────────────────────────────────────────────
const homePage = {
  _id: 'homePage',
  _type: 'homePage',
  title: 'Home Page',
  seo: {
    metaTitle: 'JJ Property Partner | Australia\'s Premier Buyer\'s Agent',
    metaDescription: 'JJ Property Partner — Your Trusted Buyers Agent in Australia. Bridging the gap between real estate and technology with a data-backed approach to your next property acquisition.',
    keywords: ['buyers agent australia', 'property investment', 'first home buyer', 'smsf property', 'off-market property'],
  },
  hero: {
    slides: [
      {
        _key: 'slide1',
        heading: 'Strategist. <span className="text-gold font-sans font-black">Insider.</span> <br className="hidden md:block" /> Your <span className="text-gold font-sans font-black">Dedicated</span> Advocate.',
        subheading: 'JJ Property Partner - Your Trusted Buyers Agent in Australia. Bridging the gap between real estate and technology with a data-backed approach to your next property acquisition.',
      },
      {
        _key: 'slide2',
        heading: 'Independent <span className="text-gold font-sans font-black">Advice.</span> <br className="hidden md:block" /> Better Buying <span className="text-gold font-sans font-black">Outcomes.</span>',
        subheading: 'We work only for buyers, giving you transparent guidance, data-backed research, and strong negotiation support to secure the right property on the right terms.',
      },
      {
        _key: 'slide3',
        heading: 'Smart <span className="text-gold font-sans font-black">Investments</span> <br className="hidden md:block" /> Stronger <span className="text-gold font-sans font-black">Returns.</span>',
        subheading: 'Maximize your wealth with data-driven property strategies and high-performing real estate acquisitions tailored to your long-term goals.',
      },
      {
        _key: 'slide4',
        heading: 'From <span className="text-gold font-sans font-black">Search</span> <br className="hidden md:block" /> to <span className="text-gold font-sans font-black">Settlement.</span>',
        subheading: 'Your property journey deserves expert support at every step. We simplify the process with research, inspections, negotiation, due diligence, and settlement coordination.',
      }
    ],
    ctaText: 'Book Free Strategy Session',
  },
  servicesPreview: [
    {
      _key: 'sp1',
      title: 'First Home Buyers',
      description: 'Buying your first home is a major milestone, and having the right guidance makes all the difference. We help you clarify your budget, assess borrowing capacity, find the right property, and negotiate strongly so you can buy with confidence.',
      anchor: 'first-home-buyers',
    },
    {
      _key: 'sp2',
      title: 'Property Investors',
      description: 'Building a strong property portfolio takes strategy, not guesswork. At JJ Property Partner, we use data-led research to identify high-growth, high-yield opportunities across Australia, helping you secure investments that match your income goals, plans, and risk profile.',
      anchor: 'property-investors',
    },
    {
      _key: 'sp3',
      title: 'SMSF Property',
      description: 'Buying property through an SMSF comes with strict Australian rules, and getting it right matters. We work closely with your adviser, accountant, and SMSF auditor to secure compliant, investment-grade properties that align with your clear long-term retirement goals and wealth strategy.',
      anchor: 'smsf-property',
    },
    {
      _key: 'sp4',
      title: 'Commercial Property',
      description: 'Navigate the commercial property market with expert guidance. We help you identify, negotiate, and secure high-performing commercial assets that offer strong yields and long-term capital growth, perfectly aligned with your investment strategy.',
      anchor: 'commercial-property',
    },
  ],
  aboutPreview: {
    heading: 'A Smarter Way to Buy Property',
    subheading: 'Founded on Data. Built on Trust.',
    description: 'JJ Property Partner was founded by Alex, a licensed buyer\'s agent with 20+ years of IT and property experience and a $6M+ personal portfolio. We combine technology-driven research with genuine buyer advocacy to help you secure the right property at the right price.',
    ctaText: 'Meet Alex',
  },
  differenceSection: {
    heading: 'The JJ Property Partner Difference',
    subheading: 'We are not just a search service. We are your strategic partner from first conversation to final settlement.',
    points: [
      'Independent advice — we work only for buyers, never sellers',
      'Off-market access through our trusted nationwide agent network',
      'Data-driven suburb and property research powered by 20+ years of analytical experience',
      'Direct access to Alex — no junior staff, no handovers',
      'Proven track record with a $6M+ personal investment portfolio',
      'Specialised SMSF property acquisition expertise',
    ],
  },
  processSection: {
    heading: 'How We Work',
    subheading: 'A structured, transparent process from strategy to settlement.',
    steps: [
      { _key: 'ps1', title: 'Discovery Call', desc: 'We start with a free 30-minute strategy session to understand your goals, budget, and timeline.' },
      { _key: 'ps2', title: 'Property Strategy', desc: 'We create a tailored acquisition strategy based on your financial position and long-term goals.' },
      { _key: 'ps3', title: 'Research & Sourcing', desc: 'We conduct suburb research and source on-market and off-market properties that match your brief.' },
      { _key: 'ps4', title: 'Due Diligence', desc: 'We manage inspections, contract reviews, and all due diligence to protect your interests.' },
      { _key: 'ps5', title: 'Negotiation', desc: 'We negotiate on your behalf using market data and strategy to secure the best price and terms.' },
      { _key: 'ps6', title: 'Settlement', desc: 'We coordinate with your solicitor and broker to ensure a smooth, stress-free settlement.' },
    ],
  },
  serviceBannerSection: {
    eyebrow: 'HOW WE CAN SERVE YOU?',
    heading: 'Tailored Solutions For Every Buyer.',
    subheading: 'Whether you\'re a first home buyer, a seasoned investor, or purchasing through your SMSF, we have a proven strategy to suit your goals.',
    items: [
      { _key: 'sbs1', title: 'First Home Buyers', description: 'Buying your first home is a major milestone, and having the right guidance makes all the difference. We help you clarify your budget, assess borrowing capacity, find the right property, and negotiate strongly so you can buy with confidence.', anchor: 'first-home-buyers' },
      { _key: 'sbs2', title: 'Property Investors', description: 'Building a strong property portfolio takes strategy, not guesswork. At JJ Property Partner, we use data-led research to identify high-growth, high-yield opportunities across Australia, helping you secure investments that match your income goals, plans, and risk profile.', anchor: 'property-investors' },
      { _key: 'sbs3', title: 'SMSF Property', description: 'Buying property through an SMSF comes with strict Australian rules, and getting it right matters. We work closely with your adviser, accountant, and SMSF auditor to secure compliant, investment-grade properties that align with your clear long-term retirement goals and wealth strategy.', anchor: 'smsf-property' },
      { _key: 'sbs4', title: 'Commercial Property', description: 'Navigate the commercial property market with expert guidance. We help you identify, negotiate, and secure high-performing commercial assets that offer strong yields and long-term capital growth, perfectly aligned with your investment strategy.', anchor: 'commercial-property' },
    ],
  },
  workHighlightsSection: {
    eyebrow: 'WORK HIGHLIGHTS',
    heading: 'Standout Projects, Real Results.',
    subheading: 'Explore a selection of standout projects delivered by our team, showcasing strategic thinking, creative excellence, and results-driven execution.',
    items: [
      { _key: 'wh1', title: 'The Forever Home — Sydney\'s North-West', description: 'A growing family secured their dream home in Sydney\'s north-west corridor, with walkability to the Metro Northwest station and quality schools — exactly as briefed.', result: '$190,000 Capital Growth', location: 'Sydney Metro North-West, NSW', tag: 'Owner Occupied — Home Buyer' },
      { _key: 'wh2', title: 'The Mackay Coastal Acquisition', description: 'Premium beachside investment in Mackay\'s most sought-after coastal suburb, secured for a resources sector investor targeting high-yield returns.', result: '$119,000 Capital Growth · 6.18% Yield', location: 'Mackay Coastal Precinct, QLD', tag: 'Property Investor' },
      { _key: 'wh3', title: 'The Melbourne Growth Corridor Entry', description: 'Affordable Victorian investment in a high-growth western suburb, providing geographic diversification and consistent rental income.', result: '$63,000 Capital Growth · 4.21% Yield', location: 'Melbourne Western Corridor, VIC', tag: 'Property Investor' },
      { _key: 'wh4', title: 'The Perth Growth Story', description: 'Exceptional total return from Perth\'s eastern corridor — a rare combination of near-7% yield and extraordinary capital growth in under two years.', result: '$285,000 Capital Growth · 6.99% Yield', location: 'Perth Eastern Corridor, WA', tag: 'Property Investor' },
    ],
  },
  faqs: [
    { _key: 'faq1', question: 'Do you help clients buy property across Australia?', answer: 'Yes. JJ Property Partner works with buyers across Australia. We take a strategy-first approach, identifying the right locations based on growth potential, rental returns, and your long-term property goals, rather than limiting your search to one city or state.' },
    { _key: 'faq2', question: 'What does a buyer\'s agent actually do?', answer: 'A buyer\'s agent works solely for you, not the seller. They handle the full buying process, including strategy, property research, shortlist creation, inspections, negotiations, and settlement support, while protecting your interests and helping you buy with greater confidence.' },
    { _key: 'faq3', question: 'Who do you work with?', answer: 'We work with first home buyers, owner-occupiers, property investors, and SMSF buyers across Australia. Whether you need guidance in a competitive market or a clear long-term buying strategy, our advice is tailored to your goals, budget, and risk profile.' },
    { _key: 'faq4', question: 'How do you find the right property for me?', answer: 'We combine local market insight with data-backed research to shortlist properties that match your goals. We assess suburb performance, rental demand, vacancy levels, future infrastructure, and comparable sales to help you buy with clarity and confidence.' },
    { _key: 'faq5', question: 'Can you help us access off-market property opportunities?', answer: 'Yes. We regularly source off-market and pre-market properties through our trusted industry network. This gives our clients early access to quality opportunities, less competition from other buyers, and a stronger position when it comes to negotiating with confidence.' },
    { _key: 'faq6', question: 'How quickly can you help me secure the right property?', answer: 'Most buyers secure a suitable property within 30 to 60 days of getting started. The timeframe depends on your brief, market conditions, and property type, but our focus is always on securing the right property, not rushing the process.' },
    { _key: 'faq7', question: 'How are your buyer\'s agent fees structured?', answer: 'Our fees are straightforward and clearly explained from the start. Depending on the level of support you need, we offer fixed-fee or percentage-based options, with a focus on securing better property outcomes, stronger negotiations, and long-term value.' },
    { _key: 'faq8', question: 'Why do buyers choose JJ Property Partner over other buyer\'s agents?', answer: 'JJ Property Partner offers a more personal, strategy-led service. You deal directly with Alex, who combines 20+ years of IT and property experience, a $6M+ personal portfolio, and specialised SMSF knowledge, with no handovers to junior staff.' },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// 2. ABOUT PAGE
// ─────────────────────────────────────────────────────────────────────────────
const aboutPage = {
  _id: 'aboutPage',
  _type: 'aboutPage',
  title: 'About Us Page',
  seo: {
    metaTitle: 'About Us - Trusted Buyers Agent Australia | JJ Property Partner',
    metaDescription: 'JJ Property Partner offers expert, data-driven property buying across Australia with off-market access, smart negotiation, and personalized investment strategies.',
    keywords: ['buyers agent australia', 'property investment advisor', 'alex property partner', 'jj property partner'],
  },
  hero: {
    badge: 'About JJ Property Partner',
    heading: 'A Smarter Way to Buy, Built on Experience.',
    subheading: 'We combine 20+ years of technology and property expertise with genuine buyer advocacy to help you secure the right property at the right price.',
  },
  profile: {
    badge: 'Meet the Founder',
    heading: 'A Smarter Way to Buy, Built on Experience.',
    quote: '"JJ Property Partner was founded on a simple belief: every buyer deserves professional representation backed by deep analytical rigor."',
    description: 'Alex brings more than 20 years of experience in technology and real estate to the table. As a licensed buyers agent and seasoned property investor, he bridges the gap between traditional market knowledge and modern data analytics. Based in Sydney and working with clients nationwide, he ensures that every acquisition is treated with the same precision as his own personal portfolio.\n\nThe name "JJ" reflects the family values at the heart of our firm. Named after Alex\'s daughters, Jessica and Jennifer, the business is a testament to long-term legacy and genuine care. We don\'t just find houses; we secure the right foundations for your future.',
    stats: [
      { _key: 'st1', label: 'IT & Real Estate', value: '20+ Years' },
      { _key: 'st2', label: 'Personal Portfolio', value: '$6M+' },
      { _key: 'st3', label: 'Service Area', value: 'Nationwide' },
    ],
  },
  purpose: {
    heading: 'A name with purpose. A promise with heart.',
    description: 'The initials JJ carry deep personal meaning. They represent the two people who inspired Alex to build something lasting - his daughters Jessica and Jennifer.\n\nEvery property acquisition, every negotiation, every piece of advice is delivered with the same dedication he puts into building their future.',
    ctaText: 'Start Your Journey',
  },
  trackRecord: {
    title: 'Alex\'s Personal Track Record',
    content: 'Alex has personally built a property portfolio valued at more than $6 million across multiple Australian states. That experience is grounded in real purchasing decisions made through changing market conditions, interest rate movements, and economic cycles. Every recommendation he gives clients is shaped by the same disciplined research, due diligence, and long-term thinking he applies to his own property strategy.',
  },
  techAdvantage: {
    title: 'The Technology Advantage',
    content: 'Alex\'s IT background shapes the way JJ Property Partner approaches every property purchase. With more than 20 years in information technology, he brings analytical thinking, data modelling, and a systems-led process to identifying opportunities across Australia. This helps buyers make informed decisions backed by research, market evidence, and a clear understanding of long-term property potential, rather than relying on guesswork or emotion.',
  },
  values: [
    { _key: 'v1', title: 'Truly Independent, Always Buyer-Focused', description: 'JJ Property Partner is a dedicated buyers-only agency, acting solely in the interests of the buyer at every stage of the property journey. We do not represent sellers, developers, or third parties, so there is never a conflict of interest. Our advice remains completely independent, transparent, and focused on securing the right outcome for you.' },
    { _key: 'v2', title: 'Clear Advice, Every Step', description: 'We believe property decisions should be backed by clear communication and honest guidance. We are upfront about our fees, research process, market insights, and recommendations from day one. You will always know where you stand and what risks or opportunities exist, so you can move forward with complete confidence.' },
    { _key: 'v3', title: 'Direct Access, Personal Guidance', description: 'At JJ Property Partner, every client works directly with Alex from the initial strategy session through to settlement. You are not passed between team members or treated like a number. This hands-on approach ensures clear communication, consistent guidance, and a personalized buying experience built on trust, accountability, and genuine attention to your goals.' },
    { _key: 'v4', title: 'Building Wealth for the Long Run', description: 'Every purchase is guided by a long-term strategy built to support financial growth, portfolio strength, and lasting security. We work with buyers who want more than a quick transaction, helping them make confident decisions today while planning for tomorrow. That is why many clients return for their second, third, and even fourth property as their goals continue to grow.' },
  ],
  pillarsSection: {
    heading: 'Three Pillars of Our Service',
    subheading: 'Our unyielding commitment to precision, integrity, and market-beating results.',
    pillars: [
      { _key: 'pl1', title: 'Data-Driven Precision', text: 'Backed by over 20 years of analytical experience, we use advanced suburb research and property assessment to guide every recommendation. Our approach is grounded in evidence, not emotion, helping identify true value and long-term growth potential.' },
      { _key: 'pl2', title: 'Off-Market Access', text: 'Through strong relationships with selling agents and industry professionals across Australia, we help clients access off-market and pre-market opportunities, reducing competition and creating conditions for smarter buying decisions.' },
      { _key: 'pl3', title: 'Executive Representation', text: 'We act solely in your best interests, managing negotiations with discretion, protecting your privacy, and representing you throughout the purchase process with a strategic, data-led approach designed to secure the right terms.' },
    ],
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// 3. SERVICE PAGE — FIRST HOME BUYERS
// ─────────────────────────────────────────────────────────────────────────────
const firstHomeBuyersPage = {
  _id: 'servicePage-first-home-buyers',
  _type: 'servicePage',
  title: 'First Home Buyers',
  slug: { _type: 'slug', current: 'first-home-buyers' },
  seo: {
    metaTitle: 'First Home Buyer Specialist | JJ Property Partner',
    metaDescription: 'Expert guidance for first home buyers in Australia. From deposit strategy to final settlement, we help you secure your first home with confidence.',
    keywords: ['first home buyer australia', 'first home buyer agent sydney', 'first home owner grant', 'first home buyer guide'],
  },
  hero: {
    badge: 'First Home Buyers',
    heading: 'Your Journey to Home Ownership, Simplified & Strategic.',
    subheading: 'Stop guessing and start moving. We provide the data, strategy, and negotiation power to help you secure your first home without the stress of overpaying.',
  },
  intro: {
    heading: 'Stop Searching, Start Finding',
    content: 'Most first home buyers spend months scrolling through real estate portals, only to be outbid at auction or find themselves discouraged by rising prices. At JJ Property Partner, we flip the script.',
    benefits: [
      'Access to off-market properties before they reach the public',
      'Data-backed suburb research to ensure you buy in a growth area',
      'Professional negotiation to secure the lowest possible price',
      'Expert guidance on grants, stamp duty, and borrowing capacity',
      'Complete peace of mind through managed due diligence',
    ],
  },
  pillars: [
    {
      _key: 'fhb_p1',
      title: 'Financial Clarity & Buying Power',
      description: 'The first step to a successful purchase is knowing exactly where you stand. We help you coordinate with specialist brokers to understand your borrowing capacity, deposit requirements, and eligibility for all available government grants and stamp duty concessions.\n\n• Borrowing capacity assessment\n• Deposit strategy planning\n• Government grant eligibility checks\n• Stamp duty savings analysis',
    },
    {
      _key: 'fhb_p2',
      title: 'Suburb Research & Strategy',
      description: 'We don\'t just look at houses; we look at markets. Using data-driven research, we identify suburbs across Australia that offer the best value, growth potential, and lifestyle fit for your specific budget.\n\n• Suburb performance data\n• Infrastructure & growth analysis\n• Market demand tracking\n• Location-specific risk assessment',
    },
    {
      _key: 'fhb_p3',
      title: 'Due Diligence & Expert Negotiation',
      description: 'Buying your first home shouldn\'t be a gamble. We manage every aspect of the search and negotiation, ensuring you avoid costly mistakes and secure the property on the best possible terms.\n\n• Contract review coordination\n• Building & pest management\n• Strategic auction representation\n• Private treaty negotiation',
    },
  ],
  process: {
    heading: 'The First Home Journey',
    description: 'From financial clarity to final settlement, JJ Property Partner manages every step of your first home purchase - so you can move forward with confidence, not guesswork.',
    steps: [
      { _key: 'fhbs1', stepNumber: '01', title: 'Step 1 - Strategy & Financial Clarity', body: 'We start by getting a clear picture of where you stand financially, including borrowing capacity, deposit, and eligibility for first home buyer incentives and stamp duty savings.' },
      { _key: 'fhbs2', stepNumber: '02', title: 'Step 2 - Suburb Research & Targeting', body: 'Using data-led research, we assess price growth, market demand, and local infrastructure to identify the right locations across Australia that fit your lifestyle and budget.' },
      { _key: 'fhbs3', stepNumber: '03', title: 'Step 3 - Off-Market Property Sourcing', body: 'We tap into our industry network to find properties before they appear on Real Estate or Domain - giving you access to quality homes ahead of the public competition.' },
      { _key: 'fhbs4', stepNumber: '04', title: 'Step 4 - Due Diligence & Checks', body: 'Every shortlist property is carefully assessed through detailed research, coordination of building and pest inspections, and contract review with your solicitor.' },
      { _key: 'fhbs5', stepNumber: '05', title: 'Step 5 - Negotiation & Securing the Deal', body: 'We represent you at auction or in private treaty negotiations, using market data and discipline to secure the property on the best possible terms.' },
      { _key: 'fhbs6', stepNumber: '06', title: 'Step 6 - Settlement & Keys', body: 'We work with your solicitor and mortgage broker through to final settlement, ensuring a smooth handover so you can celebrate your new home.' },
    ],
  },
  readiness: {
    badge: 'Eligibility Criteria',
    heading: 'Are You Ready for Your First Home?',
    description: 'Buying your first home is a huge milestone. We help you identify if you\'re ready to make the leap and what steps you need to take to get there.',
    items: [
      { _key: 'fhbr1', title: 'Stable Income', description: 'A consistent employment history helps secure a mortgage and build buying power.' },
      { _key: 'fhbr2', title: 'Deposit Ready', description: 'Having a 5-10% deposit saved, or access to a family guarantee, is a great starting point.' },
      { _key: 'fhbr3', title: 'Grant Eligibility', description: 'You may qualify for FHOG or stamp duty exemptions that can save you thousands.' },
      { _key: 'fhbr4', title: 'Primary Residence', description: 'You plan to live in the home for at least the first 6-12 months after purchase.' },
      { _key: 'fhbr5', title: 'Borrowing Capacity', description: 'You have a clear understanding of your budget and pre-approval status.' },
      { _key: 'fhbr6', title: 'Goal Clarity', description: 'You have a clear idea of your lifestyle needs and preferred locations.' },
    ],
    cta: {
      title: 'Not sure if you\'re ready? Let\'s talk.',
      description: 'Book a free 30-minute strategy call. We\'ll assess your position honestly and map out a clear path forward.',
      buttonText: 'Book Free Strategy Call',
    },
  },
  whyJJ: {
    heading: 'Why First Home Buyers Choose JJ Property Partner',
    reasons: [
      { _key: 'wjj1', title: 'We Only Work for Buyers', description: 'Unlike many agents, we never represent sellers. Our sole focus is getting you the best outcome — always.' },
      { _key: 'wjj2', title: 'Off-Market Access', description: 'Our extensive agent network gives you access to properties most buyers never see — before they hit the market.' },
      { _key: 'wjj3', title: 'Data-Led Research', description: 'Every suburb shortlist is backed by data — vacancy rates, growth trends, infrastructure plans, and comparable sales.' },
      { _key: 'wjj4', title: 'Expert Negotiation', description: 'We use professional techniques and market insight to negotiate the lowest possible price on your behalf.' },
      { _key: 'wjj5', title: 'Grant Guidance', description: 'We help identify all available first home buyer grants and stamp duty concessions to maximise your savings.' },
    ],
  },
  faqs: [
    { _key: 'fhbfaq1', question: 'How does a buyer\'s agent help a first home buyer?', answer: 'We provide end-to-end support - from identifying the right suburbs and properties to handling inspections, due diligence, and skilled negotiation. Our goal is to save you time, reduce stress, and ensure you don\'t overpay for your first home.' },
    { _key: 'fhbfaq2', question: 'Can you help with off-market properties?', answer: 'Yes. We use our extensive network of agents and industry contacts to access properties before they hit the open market, giving you a significant advantage over other buyers.' },
    { _key: 'fhbfaq3', question: 'What grants and incentives are available for first home buyers?', answer: 'Depending on your state and purchase price, you may be eligible for the First Home Owner Grant (FHOG), stamp duty concessions, or the First Home Guarantee scheme. We help you understand these options as part of our strategy session.' },
    { _key: 'fhbfaq4', question: 'How do you determine the right price for a property?', answer: 'We use professional data tools and comparable sales analysis to determine the true market value of a property, ensuring you make a confident offer based on facts, not emotion.' },
    { _key: 'fhbfaq5', question: 'What is the cost of your service for first home buyers?', answer: 'We offer flexible fee structures tailored to your budget and the level of service required. We discuss this transparently during our initial discovery call.' },
  ],
  finalCta: {
    heading: 'Ready to buy your first home with confidence?',
    description: 'Book a free 30-minute strategy session with Alex. No pressure, just honest advice about how we can help you secure your first home.',
    primaryButtonText: 'Book Free Strategy Session',
    secondaryButtonText: 'View Our Services',
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// 4. SERVICE PAGE — PROPERTY INVESTORS
// ─────────────────────────────────────────────────────────────────────────────
const propertyInvestorsPage = {
  _id: 'servicePage-property-investors',
  _type: 'servicePage',
  title: 'Property Investors',
  slug: { _type: 'slug', current: 'property-investors' },
  seo: {
    metaTitle: 'Property Investment Buyers Agent AU | JJ Property Partner',
    metaDescription: 'Strategic property acquisition for serious investors. Use data-driven research and off-market access to build a high-performing property portfolio.',
    keywords: ['property investment buyers agent', 'investment property australia', 'buyers agent investors', 'property portfolio australia'],
  },
  hero: {
    badge: 'Property Investors',
    heading: 'Acquisition Strategies Engineered for Investment Precision.',
    subheading: 'Building a high-performing property portfolio requires more than guesswork. It demands systematic research, strategic timing, and professional execution.',
  },
  intro: {
    heading: 'Build a Portfolio That Performs',
    content: 'Building a profitable investment portfolio demands systematic research, strategic timing, and access to the right opportunities. JJ Property Partner uses advanced data modelling and national market intelligence to identify high-growth, cash-flow positive properties across Australia.',
    benefits: [
      'National market exposure to identify the best investment opportunities',
      'Suburb-specific growth drivers and detailed yield & vacancy analysis',
      'Off-market and pre-market property access with reduced competition',
      'Portfolio strategy aligned to 5-10 year wealth creation goals',
      'Coordinated support with your broker, accountant, and financial adviser',
    ],
  },
  pillars: [
    {
      _key: 'pi_p1',
      title: 'Data-Led Research & Selection',
      description: 'We use professional analysis tools to identify high-performing suburbs nationwide. Our research focuses on areas with confirmed infrastructure projects, low vacancy rates, and strong population growth.\n\n• National market exposure\n• Suburb-specific growth drivers\n• Detailed yield & vacancy analysis\n• Infrastructure & development tracking',
    },
    {
      _key: 'pi_p2',
      title: 'Off-Market Property Sourcing',
      description: 'Access properties that never reach the public portals. We use our deep industry network to uncover high-quality investment opportunities with less competition and better buying terms.\n\n• Early access to pre-market deals\n• Exclusive off-market opportunities\n• Direct relationships with sales agents\n• Reduced competition on quality assets',
    },
    {
      _key: 'pi_p3',
      title: 'Strategic Portfolio Execution',
      description: 'We don\'t just buy a house; we execute an acquisition strategy. Every purchase is carefully assessed for its role in your 5-10 year wealth creation plan, equity growth, and future borrowing capacity.\n\n• Professional negotiation representation\n• Managed due diligence & inspections\n• Strategic auction representation\n• Settlement coordination & support',
    },
  ],
  process: {
    heading: 'The Investment Journey',
    description: 'From strategy development to portfolio execution, JJ Property Partner manages every step of your investment property acquisition with precision and market intelligence.',
    steps: [
      { _key: 'pis1', stepNumber: '01', title: 'Step 1 - Investment Strategy Session', body: 'We start with a comprehensive strategy session to understand your financial position, investment goals, risk appetite, and 5-10 year portfolio vision.' },
      { _key: 'pis2', stepNumber: '02', title: 'Step 2 - Market Research & Suburb Targeting', body: 'Using data-led tools, we identify high-growth suburbs across Australia based on vacancy rates, rental yields, infrastructure investment, and population growth.' },
      { _key: 'pis3', stepNumber: '03', title: 'Step 3 - Property Sourcing & Off-Market Access', body: 'We leverage our nationwide agent network to source both on-market and exclusive off-market investment opportunities before they reach the public.' },
      { _key: 'pis4', stepNumber: '04', title: 'Step 4 - Due Diligence & Property Assessment', body: 'Every property is assessed for rental yield, capital growth potential, structural integrity, and investment suitability through thorough due diligence.' },
      { _key: 'pis5', stepNumber: '05', title: 'Step 5 - Negotiation & Acquisition', body: 'We represent you in all negotiations, using comparable sales data and market insight to secure the strongest possible price and contract terms.' },
      { _key: 'pis6', stepNumber: '06', title: 'Step 6 - Settlement & Portfolio Planning', body: 'After settlement, we review your portfolio position and map out a clear roadmap for your next strategic acquisition.' },
    ],
  },
  readiness: {
    badge: 'Investor Readiness',
    heading: 'Are You Ready to Build a Property Portfolio?',
    description: 'Successful property investment requires financial preparation, strategic thinking, and the right team. Here\'s what we look for in a strong investment candidate.',
    items: [
      { _key: 'pir1', title: 'Clear Investment Goals', description: 'You have defined income targets, capital growth ambitions, or a specific retirement wealth strategy.' },
      { _key: 'pir2', title: 'Strong Borrowing Position', description: 'You have accessible equity, deposit funds, or pre-approval for an investment loan.' },
      { _key: 'pir3', title: 'Long-Term Mindset', description: 'You\'re planning a 5-10+ year hold strategy focused on sustainable wealth creation.' },
      { _key: 'pir4', title: 'Risk Awareness', description: 'You understand market cycles and are comfortable with the natural fluctuations of property investment.' },
      { _key: 'pir5', title: 'Professional Team', description: 'You have or are building a team including a mortgage broker, accountant, and financial adviser.' },
      { _key: 'pir6', title: 'National Mindset', description: 'You\'re open to investing in high-growth markets across Australia, not just locally.' },
    ],
    cta: {
      title: 'Ready to grow your property portfolio?',
      description: 'Book a free 30-minute strategy session to discuss your investment goals and how we can help you achieve them.',
      buttonText: 'Book Free Strategy Call',
    },
  },
  whyJJ: {
    heading: 'Why Investors Choose JJ Property Partner',
    reasons: [
      { _key: 'wjji1', title: 'National Market Coverage', description: 'We research and source investment properties across all major Australian markets, not just one state or city.' },
      { _key: 'wjji2', title: 'Data-Led Approach', description: 'Every suburb and property recommendation is backed by rigorous data analysis — vacancy rates, growth trends, yields, and infrastructure pipelines.' },
      { _key: 'wjji3', title: 'Off-Market Access', description: 'Our deep agent network provides early access to investment-grade properties before public listing.' },
      { _key: 'wjji4', title: '$6M+ Personal Portfolio', description: 'Alex\'s personal investment experience across multiple states means our advice is grounded in real-world decisions, not theory.' },
      { _key: 'wjji5', title: 'Portfolio Thinking', description: 'We plan acquisitions with your next purchase in mind — always thinking about equity, borrowing capacity, and long-term strategy.' },
    ],
  },
  faqs: [
    { _key: 'pifaq1', question: 'How do you identify high-growth suburbs for investors?', answer: 'We use a data-driven framework that analyses vacancy rates, yield trends, infrastructure investment, and population growth drivers across Australia to identify areas with strong capital growth potential.' },
    { _key: 'pifaq2', question: 'Can you help with off-market investment properties?', answer: 'Yes. We have an extensive network of sales agents across Australia, giving our clients access to properties before they are listed on major portals like realestate.com.au or Domain.' },
    { _key: 'pifaq3', question: 'What types of properties do you recommend for long-term growth?', answer: 'We typically focus on well-located residential houses and dual-occupancy properties in established or high-growth corridors that offer a balance of capital upside and sustainable rental yield.' },
    { _key: 'pifaq4', question: 'How do you manage the due diligence process?', answer: 'We coordinate everything from building and pest inspections to contract reviews with your solicitor, ensuring every purchase is backed by thorough research and professional scrutiny.' },
    { _key: 'pifaq5', question: 'What is your fee structure for property investors?', answer: 'We offer transparent, fixed or percentage-based fee structures tailored to the complexity of your search and acquisition strategy. We discuss this clearly during our initial discovery call.' },
  ],
  finalCta: {
    heading: 'Ready to grow your investment portfolio?',
    description: 'Book a free 30-minute strategy session. We\'ll review your goals and map out a clear path to your next high-performing investment.',
    primaryButtonText: 'Book Free Strategy Session',
    secondaryButtonText: 'View Case Studies',
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// 5. SERVICE PAGE — SMSF PROPERTY
// ─────────────────────────────────────────────────────────────────────────────
const smsfPropertyPage = {
  _id: 'servicePage-smsf-property',
  _type: 'servicePage',
  title: 'SMSF Property Investment',
  slug: { _type: 'slug', current: 'smsf-property' },
  seo: {
    metaTitle: 'SMSF Property Buyers Agent AU | JJ Property Partner',
    metaDescription: 'Specialist property acquisition for Self-Managed Super Funds. We find high-performing, compliant residential assets to help grow your retirement wealth.',
    keywords: ['smsf property investment', 'smsf buyers agent australia', 'self managed super fund property', 'smsf property buyers agent'],
  },
  hero: {
    badge: 'SMSF Property',
    heading: 'Strategic Acquisitions for your Self-Managed Super Fund.',
    subheading: 'Unlock the power of your super with residential property. We help you identify and secure high-performing, compliant assets nationwide.',
  },
  intro: {
    heading: 'Secure Your Retirement with Smart SMSF Property Choices',
    content: 'Investing in residential property through an SMSF is a powerful way to build retirement wealth, but it requires a specialized approach that prioritizes compliance and long-term stability.',
    benefits: [
      'Selection of properties that meet strict SMSF lending and compliance criteria',
      'Nationwide research to find the best growth and yield opportunities for your fund',
      'Strategic off-market access to secure quality assets with less competition',
      'Coordination with your accountant, broker, and solicitor for a seamless purchase',
      'Expert negotiation to ensure you secure the best possible terms for your fund',
    ],
  },
  pillars: [
    {
      _key: 'smsf_p1',
      title: 'SMSF-Compliant Selection',
      description: 'Investing within super requires a specific lens. We focus on low-maintenance, high-demand residential assets that align with the long-term wealth preservation goals of a self-managed fund.\n\n• Focus on structural integrity\n• High-yield residential assets\n• Low maintenance requirements\n• Long-term growth focus',
    },
    {
      _key: 'smsf_p2',
      title: 'Off-Market Sourcing Strategy',
      description: 'We use our nationwide network to find properties that meet the strict criteria for SMSF lending and compliance, often securing deals before they ever reach the public market.\n\n• National network of agents\n• Pre-market opportunities\n• Less competition for quality assets\n• Direct negotiation on your behalf',
    },
    {
      _key: 'smsf_p3',
      title: 'End-to-End Coordination',
      description: 'SMSF purchases involve more "moving parts" than standard buys. We coordinate with your accountant, mortgage broker, and solicitor to ensure the acquisition meets all regulatory requirements.\n\n• Liaison with SMSF specialists\n• Managed due diligence\n• Compliance-focused reporting\n• Settlement support & coordination',
    },
  ],
  process: {
    heading: 'The SMSF Acquisition Journey',
    description: 'SMSF property purchases require careful planning and coordination. We manage the entire process alongside your advisory team to ensure full compliance.',
    steps: [
      { _key: 'smsfs1', stepNumber: '01', title: 'Step 1 - SMSF Readiness Assessment', body: 'We assess your fund balance, borrowing capacity, and investment goals to ensure SMSF property is the right strategy for your retirement plan.' },
      { _key: 'smsfs2', stepNumber: '02', title: 'Step 2 - Compliance Framework Setup', body: 'We work with your accountant and SMSF adviser to ensure the correct borrowing structures (LRBA) and compliance requirements are in place before acquisition.' },
      { _key: 'smsfs3', stepNumber: '03', title: 'Step 3 - Property Research & Sourcing', body: 'We identify and source compliant, high-yield properties that meet the sole purpose test and SMSF lending requirements, both on and off market.' },
      { _key: 'smsfs4', stepNumber: '04', title: 'Step 4 - Due Diligence & Compliance Check', body: 'Every property is assessed for structural integrity, yield performance, compliance with SMSF rules, and suitability for your fund\'s investment strategy.' },
      { _key: 'smsfs5', stepNumber: '05', title: 'Step 5 - Negotiation & Acquisition', body: 'We negotiate on behalf of your SMSF, using market data to secure the best possible price and terms while ensuring all compliance obligations are maintained.' },
      { _key: 'smsfs6', stepNumber: '06', title: 'Step 6 - Settlement Coordination', body: 'We coordinate with your entire advisory team — accountant, solicitor, and lender — to ensure a smooth, compliant settlement for your SMSF property purchase.' },
    ],
  },
  readiness: {
    badge: 'SMSF Eligibility',
    heading: 'Is SMSF Property Investment Right for You?',
    description: 'SMSF property investment is a powerful strategy, but it\'s not for everyone. Here\'s what typically makes a strong SMSF property investment candidate.',
    items: [
      { _key: 'smsfr1', title: 'Fund Balance', description: 'A minimum SMSF balance of $200,000-$250,000 is generally recommended to cover deposit, costs, and required liquidity buffers.' },
      { _key: 'smsfr2', title: 'Borrowing Capacity', description: 'Your SMSF needs sufficient borrowing capacity through an LRBA structure with a compliant lender.' },
      { _key: 'smsfr3', title: 'Sole Purpose Compliance', description: 'The property must be held purely for retirement benefit — you or family members cannot live in it.' },
      { _key: 'smsfr4', title: 'Long-Term Strategy', description: 'SMSF property works best as a long-term hold strategy aligned with your retirement income goals.' },
      { _key: 'smsfr5', title: 'Advisory Team', description: 'You have (or are ready to engage) an SMSF accountant, financial planner, and compliant LRBA lender.' },
      { _key: 'smsfr6', title: 'Low Maintenance Focus', description: 'SMSF properties should be low-maintenance, high-yield assets that generate reliable income for the fund.' },
    ],
    cta: {
      title: 'Unsure if SMSF property is right for you?',
      description: 'Book a free strategy call. We\'ll assess your fund position honestly and advise whether SMSF property acquisition is the right move.',
      buttonText: 'Book Free SMSF Strategy Call',
    },
  },
  whyJJ: {
    heading: 'Why SMSF Investors Choose JJ Property Partner',
    reasons: [
      { _key: 'wjjs1', title: 'SMSF Specialisation', description: 'Unlike most buyer\'s agents, we have deep expertise in SMSF property acquisition, including compliance, LRBA structures, and working with advisory teams.' },
      { _key: 'wjjs2', title: 'Compliance-First Approach', description: 'Every property recommendation is assessed against SMSF compliance requirements before it\'s presented to you.' },
      { _key: 'wjjs3', title: 'Coordinated Advisory Support', description: 'We work alongside your entire SMSF advisory team — accountant, financial planner, and lender — to ensure a seamless process.' },
      { _key: 'wjjs4', title: 'Nationwide Off-Market Access', description: 'Our agent network provides access to compliant SMSF-grade properties across Australia, often before public listing.' },
      { _key: 'wjjs5', title: 'Retirement-Focused Strategy', description: 'Every recommendation is aligned to your long-term retirement income and wealth goals, not just the immediate purchase.' },
    ],
  },
  faqs: [
    { _key: 'smsfaq1', question: 'Why buy property within an SMSF?', answer: 'Buying property through an SMSF can offer significant tax advantages, including a reduced tax rate on rental income and potential capital gains tax exemptions when you reach the pension phase.' },
    { _key: 'smsfaq2', question: 'How much do I need in super to buy property?', answer: 'Generally, lenders require a minimum balance of $200,000 to $250,000 to cover the deposit, purchasing costs, and required liquidity buffers, though this depends on your specific lender and strategy.' },
    { _key: 'smsfaq3', question: 'Can I use a mortgage to buy SMSF property?', answer: 'Yes, this is typically done through a Limited Recourse Borrowing Arrangement (LRBA). It involves specific legal structures and strictly defined borrowing conditions.' },
    { _key: 'smsfaq4', question: 'Can I live in the property I buy with my SMSF?', answer: 'No. Residential property held in an SMSF must meet the "sole purpose test," meaning it must be for the sole purpose of providing retirement benefits. You or your family cannot live in it.' },
    { _key: 'smsfaq5', question: 'Do you handle the SMSF setup process?', answer: 'We focus exclusively on the property acquisition. We work closely with your accountant, financial planner, or SMSF specialist who handles the legal setup and compliance of the fund itself.' },
  ],
  finalCta: {
    heading: 'Ready to grow your retirement wealth with SMSF property?',
    description: 'Book a free strategy session to discuss your SMSF position and how we can help you acquire the right property for your fund.',
    primaryButtonText: 'Book Free SMSF Strategy Session',
    secondaryButtonText: 'Learn More About SMSF',
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// 6. SERVICE PAGE — COMMERCIAL PROPERTY
// ─────────────────────────────────────────────────────────────────────────────
const commercialPropertyPage = {
  _id: 'servicePage-commercial-property',
  _type: 'servicePage',
  title: 'Commercial Property',
  slug: { _type: 'slug', current: 'commercial-property' },
  seo: {
    metaTitle: 'Commercial Property Investment Buyers Agent AU | JJ Property Partner',
    metaDescription: 'Strategic property acquisition for serious businesses and commercial investors. Use data-driven research and off-market access to build a high-performing property portfolio.',
    keywords: ['commercial property buyers agent', 'commercial property investment australia', 'commercial real estate buyers agent', 'commercial property acquisition'],
  },
  hero: {
    badge: 'Commercial Property',
    heading: 'Acquisition Strategies Engineered for Investment Precision.',
    subheading: 'Commercial property investment requires more than assumption. It needs structured market research, strategic acquisition planning, and expert execution to build long-term portfolio performance.',
  },
  intro: {
    heading: 'Commercial Acquisition Strategies for Smart Property Investors',
    content: 'Creating a strong commercial property portfolio requires market-led research, clear acquisition benchmarks, strategic timing, and expert execution throughout the process.',
    benefits: [
      'Data-backed research and suburb analysis to uncover commercial growth opportunities sooner',
      'Off-market and pre-market property access with reduced competition and stronger buying leverage',
      'Experienced negotiation support to help secure stronger terms than buying independently',
      'A long-term portfolio strategy designed around 5-10-year wealth creation',
      'Coordinated support with your broker, accountant, and financial adviser for informed decisions',
    ],
  },
  pillars: [
    {
      _key: 'cp_p1',
      title: 'Data-Driven Research & Property Selection',
      description: 'We use professional market research to identify strong commercial property opportunities across Australia. Our analysis focuses on suburbs with planned infrastructure, low vacancy levels, population growth, and long-term investment potential.\n\n• National commercial market insight\n• Suburb-based growth indicators\n• Yield and vacancy performance review\n• Infrastructure and development monitoring',
    },
    {
      _key: 'cp_p2',
      title: 'Off-Market Commercial Property Access',
      description: 'Access commercial assets before they appear on public listing portals. Through strong agent relationships and market connections, we help investors uncover quality opportunities with less buyer competition and stronger negotiation potential.\n\n• Early access to pre-market commercial deals\n• Exclusive off-market investment opportunities\n• Direct relationships with commercial sales agents\n• Reduced competition on high-quality assets',
    },
    {
      _key: 'cp_p3',
      title: 'Commercial Portfolio Planning',
      description: 'We don\'t just secure a commercial property; we plan a portfolio move. Every acquisition is assessed for its place in your 5-10-year investment strategy, income potential, equity growth, and future lending capacity.\n\n• Professional negotiation representation\n• Managed due diligence and property inspections\n• Strategic auction and offer representation\n• Settlement coordination and ongoing support',
    },
  ],
  process: {
    heading: 'Commercial Portfolio Strategy',
    description: 'Alex\'s personal experience building a $6 million-plus property portfolio across multiple Australian states supports a strategic commercial investment approach focused on sustainable portfolio growth, not only single property acquisitions.',
    steps: [
      { _key: 'cps1', stepNumber: '01', title: 'Step 1 - Investment Strategy & Acquisition Thesis', body: 'Build a clear commercial acquisition thesis aligned with your investment goals, whether targeting capital growth, strong rental yield, or a balanced strategy that supports long-term wealth creation.' },
      { _key: 'cps2', stepNumber: '02', title: 'Step 2 - Strategic Long-Term Property Acquisition Plan', body: 'Develop a 5-to-10-year commercial acquisition plan aligned with your income, borrowing capacity, and risk appetite, creating a clear roadmap for sustainable portfolio growth.' },
      { _key: 'cps3', stepNumber: '03', title: 'Step 3 - Strategic Location Diversification', body: 'Diversify your commercial property investments across key Australian locations to reduce concentration risk and capture growth opportunities across different market cycles.' },
      { _key: 'cps4', stepNumber: '04', title: 'Step 4 - Balancing Growth Potential with Cash Flow', body: 'Balance future capital growth with reliable rental income by choosing commercial assets that keep your portfolio stable, manageable, and positioned for long-term returns.' },
      { _key: 'cps5', stepNumber: '05', title: 'Step 5 - Plan Future Property Acquisitions', body: 'Plan every purchase with future growth in mind, reviewing equity, borrowing capacity, and tax considerations to support steady progress toward your next commercial property acquisition.' },
    ],
  },
  readiness: {
    badge: 'Commercial Investor Readiness',
    heading: 'Is Commercial Property Investment Right for You?',
    description: 'Strategic commercial property investment is a long-term commitment to wealth creation. We help determine whether your current position aligns with a successful commercial acquisition strategy.',
    items: [
      { _key: 'cpr1', title: 'Clear Investment Goals', description: 'You have defined income targets, capital growth ambitions, or a long-term commercial portfolio strategy.' },
      { _key: 'cpr2', title: 'Strong Financial Position', description: 'You have accessible equity, deposit funds, or pre-approval for commercial property lending.' },
      { _key: 'cpr3', title: 'Long-Term Mindset', description: 'Commercial property is best held for 5-10+ years to maximise capital growth and rental income.' },
      { _key: 'cpr4', title: 'Risk Understanding', description: 'You understand commercial lease risks, vacancy periods, and are comfortable with longer due diligence timelines.' },
      { _key: 'cpr5', title: 'Professional Advisory Team', description: 'You have a commercial mortgage broker, accountant, and solicitor experienced in commercial transactions.' },
      { _key: 'cpr6', title: 'National Perspective', description: 'You\'re open to acquiring commercial assets in the highest-potential markets across Australia.' },
    ],
    cta: {
      title: 'Not sure if commercial property fits your strategy?',
      description: 'Book a free strategy session. We\'ll assess your investment position and provide honest advice on whether commercial property is right for you.',
      buttonText: 'Book Free Strategy Call',
    },
  },
  whyJJ: {
    heading: 'Why Commercial Investors Choose JJ Property Partner',
    reasons: [
      { _key: 'wjjc1', title: 'National Coverage', description: 'We research and source commercial opportunities across all major Australian markets and commercial precincts.' },
      { _key: 'wjjc2', title: 'Data-Led Approach', description: 'Every commercial recommendation is backed by market analysis — vacancy rates, tenant quality, yield benchmarks, and infrastructure pipelines.' },
      { _key: 'wjjc3', title: 'Off-Market Access', description: 'Our commercial agent network provides access to quality assets before they reach public commercial listings.' },
      { _key: 'wjjc4', title: 'Portfolio Thinking', description: 'We plan every commercial acquisition with your next purchase in mind, building a sustainable long-term commercial portfolio.' },
      { _key: 'wjjc5', title: 'Expert Negotiation', description: 'We use commercial market expertise and comparable data to negotiate favourable terms on your behalf.' },
    ],
  },
  faqs: [
    { _key: 'cpfaq1', question: 'How do you find high-growth suburbs for commercial property investors?', answer: 'We use a data-led framework that reviews vacancy rates, rental yield trends, infrastructure spending and population growth across Australia to pinpoint suburbs with strong long-term capital growth potential.' },
    { _key: 'cpfaq2', question: 'Can you help with off-market investment properties?', answer: 'Yes. We have an extensive network of sales agents across Australia, giving our clients access to properties before they are listed on major portals like realestate.com.au or Domain.' },
    { _key: 'cpfaq3', question: 'Do you help investors compare commercial properties before buying?', answer: 'Yes. We assess location, rental potential, lease terms, tenant quality, yield, future growth prospects and risk factors so you can make a more informed commercial property decision.' },
    { _key: 'cpfaq4', question: 'What types of commercial properties do you recommend for long-term growth?', answer: 'We generally focus on well-positioned commercial properties in established or emerging growth corridors that offer strong tenant appeal, future capital upside, and reliable rental income potential.' },
    { _key: 'cpfaq5', question: 'How do you manage due diligence for commercial property purchases?', answer: 'We coordinate key checks, from building and pest inspections to contract reviews with your solicitor, ensuring every purchase is supported by detailed research and professional assessment.' },
    { _key: 'cpfaq6', question: 'What is your fee structure for commercial property investors?', answer: 'We offer clear fixed-fee or percentage-based structures, depending on your commercial property brief, search requirements, and acquisition strategy. Everything is discussed upfront during your initial discovery call.' },
  ],
  finalCta: {
    heading: 'Ready to build your commercial property portfolio?',
    description: 'Book a free 30-minute strategy session. We\'ll discuss your commercial investment goals and map out a clear acquisition path.',
    primaryButtonText: 'Book Free Strategy Session',
    secondaryButtonText: 'View Case Studies',
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// 7. CONTACT PAGE
// ─────────────────────────────────────────────────────────────────────────────
const contactPage = {
  _id: 'contactPage',
  _type: 'contactPage',
  title: 'Contact Page',
  seo: {
    metaTitle: 'Contact JJ Property Partner | Book a Free Strategy Session',
    metaDescription: 'Get in touch with JJ Property Partner. Book a free 30-minute strategy session with Alex to discuss your property goals.',
    keywords: ['contact buyers agent', 'book property consultation', 'jj property partner contact'],
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// 8. GOOGLE REVIEWS
// ─────────────────────────────────────────────────────────────────────────────
const reviews = [
  { _id: 'review-sarah-jenkins', _type: 'review', name: 'Sarah Jenkins', text: "Alex's off-market knowledge is unmatched. Saved us $150k.", date: '2 weeks ago', rating: 5 },
  { _id: 'review-michael-t', _type: 'review', name: 'Michael T.', text: 'Incredibly professional. The data-driven approach gave us total confidence.', date: '1 month ago', rating: 5 },
  { _id: 'review-david-emma', _type: 'review', name: 'David & Emma', text: 'We were looking for 8 months. Alex found our dream home in 3 weeks.', date: '3 months ago', rating: 5 },
  { _id: 'review-james-r', _type: 'review', name: 'James R.', text: 'Highly recommend for anyone building an investment portfolio in Sydney.', date: '4 months ago', rating: 5 },
  { _id: 'review-celine-w', _type: 'review', name: 'Celine W.', text: 'A seamless, stress-free acquisition from start to finish.', date: '6 months ago', rating: 5 },
  { _id: 'review-mark-h', _type: 'review', name: 'Mark H.', text: 'Negotiation skills are top-tier. Worth every cent.', date: '1 year ago', rating: 5 },
  { _id: 'review-olivia-p', _type: 'review', name: 'Olivia P.', text: 'The strategic property plan changed our entire trajectory. Best decision we made.', date: '1.5 years ago', rating: 5 },
  { _id: 'review-robert-k', _type: 'review', name: 'Robert K.', text: 'Exceptional due diligence. He spotted structural issues we missed.', date: '2 years ago', rating: 5 },
];

// ─────────────────────────────────────────────────────────────────────────────
// MAIN — Run all upserts
// ─────────────────────────────────────────────────────────────────────────────
async function main() {
  console.log('\n🚀 JJ Property Partner — Sanity CMS Full Content Sync\n');
  console.log('='.repeat(55));

  const tasks = [
    { label: '1. Home Page', doc: homePage },
    { label: '2. About Page', doc: aboutPage },
    { label: '3. Service Page — First Home Buyers', doc: firstHomeBuyersPage },
    { label: '4. Service Page — Property Investors', doc: propertyInvestorsPage },
    { label: '5. Service Page — SMSF Property', doc: smsfPropertyPage },
    { label: '6. Service Page — Commercial Property', doc: commercialPropertyPage },
    { label: '7. Contact Page', doc: contactPage },
  ];

  for (const task of tasks) {
    console.log(`\n📄 ${task.label}`);
    try {
      await upsert(task.doc);
    } catch (err) {
      console.error(`  ❌ Failed: ${err.message}`);
    }
  }

  // Upsert reviews
  console.log('\n📝 8. Google Reviews (8 items)');
  for (const review of reviews) {
    try {
      await upsert(review);
    } catch (err) {
      console.error(`  ❌ Failed review ${review._id}: ${err.message}`);
    }
  }

  console.log('\n' + '='.repeat(55));
  console.log('✅ Sync complete! All content has been pushed to Sanity CMS.');
  console.log('   Visit: https://jjpropertycms.sanity.studio to verify.\n');
}

main().catch(console.error);
