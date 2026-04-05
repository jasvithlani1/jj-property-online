const fs = require('fs');

// --- Blog Data ---
const blogPosts = [
  {
    slug: 'off-market-sydney-2025',
    title: 'The Off-Market Advantage: Why the Best Sydney Properties Never Hit the Portals',
    excerpt: 'In a city where public listings attract 30+ competing buyers within 48 hours, the real prize assets are traded quietly. Here\'s how to access them.',
    date: '2026-03-28T00:00:00Z',
    author: 'Alex',
    content: [
      { type: 'paragraph', text: 'If you\'ve ever lost a Sydney auction to a buyer who "just knew" the vendor, you\'ve experienced the off-market gap firsthand. In premium Sydney suburbs, we estimate that between 25% and 40% of transactions in any given quarter never reach public portals.' },
      { type: 'heading', text: 'What Is Off-Market Property?' },
      { type: 'paragraph', text: 'An off-market property is one where the vendor has decided to sell without public advertising.' },
      { type: 'list', items: ['Pre-market "whispers"', 'Developer stock', 'Vendor-initiated private sales', 'Post-auction negotiation'] },
      { type: 'quote', text: 'In 14 years of doing this, I\'ve never had a client overpay on an off-market deal. When emotional bidding is removed from the equation, price aligns with value.' }
    ]
  },
  {
    slug: 'smsf-property-rules-2025',
    title: 'SMSF Property in 2026: What the ATO Actually Wants You to Know',
    excerpt: 'Self-managed super fund property is one of the most powerful retirement tools available — and one of the most heavily scrutinised.',
    date: '2026-03-14T00:00:00Z',
    author: 'Alex',
    content: [
      { type: 'paragraph', text: 'The appeal of using your SMSF to buy property is understandable. Direct property ownership inside a concessionally-taxed structure, with full control over the asset class — it sounds like a perfect strategy.' },
      { type: 'heading', text: 'The Sole Purpose Test' },
      { type: 'list', items: ['You cannot live in the property', 'Your children cannot live in the property', 'You cannot use it as a holiday home', 'Related parties cannot lease commercial property'] },
      { type: 'quote', text: 'The most dangerous SMSF property purchase is the one made without a SMSF-specialist advisor in the room.' }
    ]
  },
  {
    slug: 'parramatta-growth-corridor-2025',
    title: 'Parramatta 2026: Sydney\'s Second CBD and What It Means for Property Buyers',
    excerpt: 'The $20B infrastructure commitment behind Parramatta\'s transformation, and why astute investors are positioning themselves in specific pockets.',
    date: '2026-02-28T00:00:00Z',
    author: 'Alex',
    content: [
      { type: 'paragraph', text: 'Parramatta\'s elevation from a western suburb service hub to Sydney\'s genuine second CBD is not a marketing narrative — it is a $20+ billion infrastructure investment.' },
      { type: 'list', items: ['Sydney Metro West (opening 2030)', 'Western Sydney Airport (opening 2026)', 'Westmead Health Precinct', 'Powerhouse Museum relocation'] },
      { type: 'quote', text: 'The window to acquire freehold residential within 1km of a Metro West station at pre-line pricing is closing.' }
    ]
  },
  {
    slug: 'first-home-buyer-guide-sydney',
    title: 'First Home Buyers in Sydney: The Honest Guide Nobody Gives You',
    excerpt: 'After helping hundreds of first home buyers navigate the Sydney market, here is the unfiltered reality of what it takes.',
    date: '2026-02-10T00:00:00Z',
    author: 'Alex',
    content: [
      { type: 'paragraph', text: 'The Sydney first home buyer\'s journey is often described in three stages: discovery, heartbreak, and compromise.' },
      { type: 'heading', text: 'Mistake 1: Treating Portals as the Full Market' },
      { type: 'paragraph', text: 'As we\'ve covered in depth in our off-market guide, a significant portion of Sydney\'s premium residential stock never appears on public portals.' },
      { type: 'quote', text: 'The most expensive house is rarely the one with the highest purchase price. It\'s the one that wrecks your monthly cash flow.' }
    ]
  },
  {
    slug: 'negotiation-tactics-buyers-agents',
    title: 'The Negotiation Playbook: How Buyers Agents Secure Properties Below Asking',
    excerpt: 'Professional negotiation is a structured discipline, not a personality trait. Here are the specific tactics that protect buyers.',
    date: '2026-01-22T00:00:00Z',
    author: 'Alex',
    content: [
      { type: 'paragraph', text: 'Most property negotiations in Sydney are lost before they begin. The buyer expresses enthusiasm and enters the conversation from a position of visible motivation.' },
      { type: 'quote', text: 'Negotiation isn\'t about being aggressive. It\'s about information, timing, and removing emotion from the transaction.' },
      { type: 'list', items: ['Anchor on Independent Valuation', 'Control the Timeline', 'Unconditional contracts remove uncertainty premium'] }
    ]
  },
  {
    slug: 'northern-beaches-investment-guide',
    title: 'Northern Beaches Investment Guide: Which Pockets Are Worth the Premium?',
    excerpt: 'The Northern Beaches commands a significant lifestyle premium. But not all suburbs deliver equivalent investment performance.',
    date: '2026-01-08T00:00:00Z',
    author: 'Alex',
    content: [
      { type: 'paragraph', text: 'The Northern Beaches peninsula stretches 30+ kilometres from Manly to Palm Beach, and the investment performance varies significantly.' },
      { type: 'heading', text: 'The B-Line Factor' },
      { type: 'paragraph', text: 'The B-Line bus rapid transit corridor has had a measurable gravitational pull on rental demand.' },
      { type: 'quote', text: 'Dee Why and Curl Curl are where we are finding the best risk-adjusted returns right now.' }
    ]
  }
];

// --- Case Study Data ---
const caseStudiesData = [
  {
    id: 'smsf-architect',
    title: 'The SMSF Architect',
    result: '$2.4M Investment',
    location: 'Parramatta, NSW',
    shortQuote: "Alex's precision transformed our retirement strategy. We secured a dual-occupancy winner 15% below market value.",
    client: 'A senior IT executive and his partner approached JJ Property Partner with a complex brief.',
    challenge: 'Their existing financial advisor had recommended a high-rise apartment. assessment showed zero rental premium.',
    strategy: 'Alex immediately pivoted the brief toward dual-occupancy houses with independent leases on freehold land.',
    outcome: 'The asset now generates two independent rental streams totalling $62,400 per annum.',
    stats: [
      { label: 'Purchase Price', value: '$2.4M' },
      { label: 'Below Market Value', value: '15%' },
      { label: 'Annual Rental Income', value: '$62,400' },
      { label: 'Capital Growth @ 18mo', value: '$340K' }
    ]
  },
  {
    id: 'first-home-surry-hills',
    title: 'First Home, First Class',
    result: 'Off-Market Terrace',
    location: 'Surry Hills, NSW',
    shortQuote: 'As first-home buyers, we felt completely outmatched. Alex got us off-market access to our dream home in 14 days.',
    client: 'A young professional couple had been searching for over 8 months. Every property sold above their ceiling.',
    challenge: 'Sydney\'s Inner City terrace market moves faster than public portals can list.',
    strategy: 'Alex activated his Surry Hills and Paddington residential agent network to find a private seller.',
    outcome: 'The terrace was acquired within 14 days of engagement at $95,000 below the likely auction clearing price.',
    stats: [
      { label: 'Days to Acquisition', value: '14' },
      { label: 'Savings vs Auction Est.', value: '$95K' },
      { label: 'Competing Bidders Bypassed', value: '7+' }
    ]
  },
  {
    id: 'northern-beaches-portfolio',
    title: 'Portfolio Growth',
    result: '3 Asset Acquisition',
    location: 'Northern Beaches, NSW',
    shortQuote: 'Scale requires data. JJ Property Partner provided the technical dissection needed to triple my high-yield portfolio.',
    client: 'A seasoned investor engaged JJ Property Partner to acquire three additional high-yield assets.',
    challenge: 'At the investor\'s price point, the market offered limited properties with genuine dual-income potential.',
    strategy: 'Alex applied a systematic data layer to identify pockets where zoning allowed dual-occupancy.',
    outcome: 'All three assets were settled within the 18-month brief at a combined acquisition cost of $3.65M.',
    stats: [
      { label: 'Assets Acquired', value: '3' },
      { label: 'Combined Value', value: '$3.65M' },
      { label: 'Total Portfolio Value', value: '$5.8M' }
    ]
  }
];

const ndjson = [];

// Helper to convert to Portable Text
const toPortableText = (content) => {
  return content.map(item => {
    if (item.type === 'paragraph' || item.type === 'heading' || item.type === 'quote') {
      return {
        _type: 'block',
        _key: Math.random().toString(36).substr(2, 9),
        style: item.type === 'paragraph' ? 'normal' : (item.type === 'heading' ? 'h2' : 'blockquote'),
        children: [{ _type: 'span', _key: Math.random().toString(36).substr(2, 9), text: item.text }]
      };
    }
    if (item.type === 'list') {
      return item.items.map(li => ({
          _type: 'block',
          _key: Math.random().toString(36).substr(2, 9),
          listItem: 'bullet',
          children: [{ _type: 'span', _key: Math.random().toString(36).substr(2, 9), text: li }]
      }));
    }
    return null;
  }).flat().filter(Boolean);
};

// Generate Posts
blogPosts.forEach(post => {
  ndjson.push(JSON.stringify({
    _type: 'post',
    _id: `post-${post.slug}`,
    title: post.title,
    slug: { _type: 'slug', current: post.slug },
    excerpt: post.excerpt,
    publishedAt: post.date,
    featured: true,
    body: toPortableText(post.content),
    seo: { _type: 'seo', metaTitle: post.title, metaDescription: post.excerpt }
  }));
});

// Generate Case Studies
caseStudiesData.forEach(cs => {
  ndjson.push(JSON.stringify({
    _type: 'caseStudy',
    _id: `cs-${cs.id}`,
    title: cs.title,
    slug: { _type: 'slug', current: cs.id },
    resultText: cs.result,
    location: cs.location,
    shortQuote: cs.shortQuote,
    client: cs.client,
    challenge: cs.challenge,
    strategy: cs.strategy,
    outcome: cs.outcome,
    stats: cs.stats.map(s => ({ ...s, _key: Math.random().toString(36).substr(2, 9) })),
    seo: { _type: 'seo', metaTitle: cs.title, metaDescription: cs.outcome.substring(0, 150) }
  }));
});

fs.writeFileSync('cms/import.ndjson', ndjson.join('\n'));
console.log('Migration NDJSON generated at cms/import.ndjson');
