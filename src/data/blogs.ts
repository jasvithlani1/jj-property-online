export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: BlogSection[];
  category: string;
  categoryColor: string;
  readTime: string;
  date: string;
  author: string;
  authorRole: string;
  coverImage: string;
  featured?: boolean;
}

export interface BlogSection {
  type: 'paragraph' | 'heading' | 'subheading' | 'quote' | 'list';
  text?: string;
  items?: string[];
}

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    slug: 'off-market-sydney-2025',
    title: 'The Off-Market Advantage: Why the Best Sydney Properties Never Hit the Portals',
    excerpt: 'In a city where public listings attract 30+ competing buyers within 48 hours, the real prize assets are traded quietly. Here\'s how to access them.',
    category: 'Market Intelligence',
    categoryColor: 'bg-sky-100 text-sky-800',
    readTime: '6 min read',
    date: 'March 28, 2026',
    author: 'Alex',
    authorRole: 'Principal Advisor, JJ Property Partner',
    coverImage: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=1400',
    featured: true,
    content: [
      { type: 'paragraph', text: 'If you\'ve ever lost a Sydney auction to a buyer who "just knew" the vendor, you\'ve experienced the off-market gap firsthand. In premium Sydney suburbs, we estimate that between 25% and 40% of transactions in any given quarter never reach public portals. They are traded by phone, text, and trusted referral — within a tightly guarded network of agents, developers, and repeat clients.' },
      { type: 'heading', text: 'What Is Off-Market Property?' },
      { type: 'paragraph', text: 'An off-market property is one where the vendor has decided to sell without public advertising. This can happen for a range of reasons: they want privacy, they\'re testing price appetite, they have a personal connection to a particular buyer profile, or they simply trust their agent\'s judgment over a public campaign.' },
      { type: 'paragraph', text: 'For vendors, the benefits are real: no styling costs, no open home disruption, no public price discovery that anchors their expectations too low. For most buyers — the ones scrolling Domain at 11pm — this entire market is invisible.' },
      { type: 'heading', text: 'How Buyers Agents Access It' },
      { type: 'paragraph', text: 'Access to off-market stock is built on professional relationships that take years to establish. Our network includes selling agents across all of Sydney\'s key markets — from Inner West terraces to Northern Beaches acreage — who will call us before a listing is formally prepared because they know we represent serious, pre-qualified buyers who will act decisively.' },
      { type: 'list', items: ['Pre-market "whispers" from agents testing buyer appetite before committing to a campaign', 'Developer stock that hasn\'t been publicly launched, offered first to known buyer agent networks', 'Vendor-initiated private sales where an agent approaches one trusted counterpart', 'Post-auction negotiation on properties that were publicly passed in'] },
      { type: 'quote', text: 'In 14 years of doing this, I\'ve never had a client overpay on an off-market deal. When emotional bidding is removed from the equation, price aligns with value.' },
      { type: 'heading', text: 'The Price Advantage Is Real' },
      { type: 'paragraph', text: 'Public auctions are deliberately designed to create competition, urgency, and emotional pricing. Off-market transactions remove all three. When you\'re the only buyer at the table — armed with independent valuation data — you negotiate from a position of complete information, not comparative fear.' },
      { type: 'paragraph', text: 'Across our client acquisitions in 2025, off-market purchases averaged 8–14% below the equivalent publicly-campaigned comparable sale. On a $1.5M purchase, that\'s $120,000 to $210,000 in preserved capital — more than covering years of buyer\'s agent fees and leaving substantial equity in the asset from day one.' },
    ],
  },
  {
    id: '2',
    slug: 'smsf-property-rules-2025',
    title: 'SMSF Property in 2026: What the ATO Actually Wants You to Know',
    excerpt: 'Self-managed super fund property is one of the most powerful retirement tools available — and one of the most heavily scrutinised. A practical breakdown from acquisition specialists.',
    category: 'SMSF Strategy',
    categoryColor: 'bg-emerald-100 text-emerald-800',
    readTime: '8 min read',
    date: 'March 14, 2026',
    author: 'Alex',
    authorRole: 'Principal Advisor, JJ Property Partner',
    coverImage: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=1400',
    content: [
      { type: 'paragraph', text: 'The appeal of using your SMSF to buy property is understandable. Direct property ownership inside a concessionally-taxed structure, with full control over the asset class — it sounds like a perfect strategy. For the right client, it is. But the ATO\'s compliance framework around SMSF property is among the tightest in the financial system, and the consequences of a breach are severe.' },
      { type: 'heading', text: 'The Sole Purpose Test — The Foundation of Everything' },
      { type: 'paragraph', text: 'Every decision your SMSF makes must pass the sole purpose test: the fund exists solely to provide retirement benefits for its members. This means the property cannot be used personally by you, your family, or any related party — regardless of how temporary or minor the use seems.' },
      { type: 'list', items: ['You cannot live in the property', 'Your children cannot live in the property (even if they pay market rent)', 'You cannot use it as a holiday home between tenants', 'Related parties cannot lease commercial property from your SMSF unless it meets very specific conditions'] },
      { type: 'heading', text: 'Limited Recourse Borrowing Arrangements' },
      { type: 'paragraph', text: 'If your SMSF doesn\'t have sufficient cash to purchase outright, you can borrow via a Limited Recourse Borrowing Arrangement (LRBA). This is a specific legal structure where a custodian/bare trust holds the property until the loan is repaid. The "limited recourse" component protects your other SMSF assets — the lender can only claim against the asset being purchased, not your broader super portfolio.' },
      { type: 'quote', text: 'The most dangerous SMSF property purchase is the one made without a SMSF-specialist accountant, a SMSF-compliant solicitor, and an independent buyers agent in the room simultaneously.' },
      { type: 'heading', text: 'What Makes a Good SMSF Property?' },
      { type: 'paragraph', text: 'Not all properties are suitable for SMSF acquisition. The key criteria we apply when sourcing assets for SMSF clients are yield sustainability, capital growth driven by land content, minimal body corporate exposure, and tenant stability.' },
      { type: 'list', items: ['Gross yield of 4.5%+ to cover loan servicing from rental income (LRBAs must be self-funding from rental income + member contributions)', 'Freehold land content — avoid leasehold, service apartments, and hotel rooms', 'Low-maintenance construction — SMSF trustee obligations make high-maintenance properties a liability', 'Tenant profile with longevity: government services, healthcare workers, universities'] },
    ],
  },
  {
    id: '3',
    slug: 'parramatta-growth-corridor-2025',
    title: 'Parramatta 2026: Sydney\'s Second CBD and What It Means for Property Buyers',
    excerpt: 'The $20B infrastructure commitment behind Parramatta\'s transformation, and why astute investors are positioning themselves in specific pockets — before the price discovery catches up.',
    category: 'Market Analysis',
    categoryColor: 'bg-amber-100 text-amber-800',
    readTime: '7 min read',
    date: 'February 28, 2026',
    author: 'Alex',
    authorRole: 'Principal Advisor, JJ Property Partner',
    coverImage: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&q=80&w=1400',
    content: [
      { type: 'paragraph', text: 'Parramatta\'s elevation from a western suburb service hub to Sydney\'s genuine second CBD is not a marketing narrative — it is a $20+ billion infrastructure investment backed by state and federal funding commitments spanning the next decade. Western Sydney Airport at Badgerys Creek, the Sydney Metro West line, and Westmead\'s $1B health precinct expansion are not speculative. They are under construction.' },
      { type: 'heading', text: 'The Infrastructure Timeline' },
      { type: 'list', items: ['Sydney Metro West (opening 2030): Nine new stations connecting Parramatta to the CBD in 20 minutes, down from 50+ minutes', 'Western Sydney Airport (opening 2026): Approximately 45 minutes from Parramatta by road, creating an international connectivity hub', 'Westmead Health Precinct: $1B investment across Children\'s Hospital, Westmead Hospital, and adjacent research institutes — generating 10,000+ new healthcare roles', 'Powerhouse Museum relocation: Cultural anchor investment reinforcing Parramatta\'s identity as a destination, not just a transit hub'] },
      { type: 'heading', text: 'Where We Are Sourcing Assets' },
      { type: 'paragraph', text: 'Not all of Parramatta\'s growth will translate equally to residential price appreciation. The specific pockets we are currently targeting for client acquisitions are chosen based on walkability to transport nodes, proximity to employment anchors, and land content that won\'t be compressed by oversupply of high-density product.' },
      { type: 'quote', text: 'The window to acquire freehold residential within 1km of a Metro West station at pre-line pricing is closing. Once construction timelines are confirmed by the state government, price discovery in these corridors moves rapidly.' },
      { type: 'heading', text: 'The Yield Story' },
      { type: 'paragraph', text: 'Beyond capital growth, Parramatta\'s rental market is exceptionally tight. Strong demand from healthcare workers, IT professionals, government employees, and university students means quality residential assets in the right pockets are achieving Sub-2% vacancy rates. We are seeing clients acquire dual-occupancy assets generating combined yields of 5.2–6.1% on their acquisition cost — well above the Sydney average.' },
    ],
  },
  {
    id: '4',
    slug: 'first-home-buyer-guide-sydney',
    title: 'First Home Buyers in Sydney: The Honest Guide Nobody Gives You',
    excerpt: 'After helping hundreds of first home buyers navigate the Sydney market, here is the unfiltered reality of what it takes — and the exact mistakes that cost most buyers tens of thousands.',
    category: 'First Home',
    categoryColor: 'bg-purple-100 text-purple-800',
    readTime: '10 min read',
    date: 'February 10, 2026',
    author: 'Alex',
    authorRole: 'Principal Advisor, JJ Property Partner',
    coverImage: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&q=80&w=1400',
    content: [
      { type: 'paragraph', text: 'The Sydney first home buyer\'s journey is often described in three stages: discovery, heartbreak, and compromise. Discovery is when you realise what your budget can theoretically buy. Heartbreak is when you attend your first five auctions and lose every single one. Compromise is when you eventually buy something you settled for, in a location you weren\'t targeting, at a price that exhausted your reserves.' },
      { type: 'paragraph', text: 'This doesn\'t have to be your story. But avoiding it requires an honest understanding of the market — not the polished version your bank or a real estate agent\'s marketing presents.' },
      { type: 'heading', text: 'Mistake 1: Treating Domain and realestate.com.au as the Full Market' },
      { type: 'paragraph', text: 'As we\'ve covered in depth in our off-market guide, a significant portion of Sydney\'s premium residential stock never appears on public portals. First home buyers — without established agent relationships or a buyer\'s agent — operate in a structurally disadvantaged position. They are, by definition, competing only for the publicly-marketed overflow.' },
      { type: 'heading', text: 'Mistake 2: Getting Pre-Approved and Thinking That\'s Your Budget' },
      { type: 'paragraph', text: 'Pre-approval is a ceiling, not a target. It tells you the maximum a bank will lend you under current conditions — it says nothing about what your life will look like servicing that debt alongside insurance, maintenance, strata, council rates, and any future rate movements.' },
      { type: 'list', items: ['Build a monthly cash flow model at 1.5% above your current rate', 'Include all holding costs: strata (if applicable), council rates, water, building insurance', 'Allow 1% of property value annually for maintenance reserves', 'Model your lifestyle: travel, family plans, school fees — what actually matters to you'] },
      { type: 'quote', text: 'The most expensive house is rarely the one with the highest purchase price. It\'s the one that wrecks your monthly cash flow and removes all optionality from your life.' },
      { type: 'heading', text: 'Mistake 3: Falling in Love Before Doing the Numbers' },
      { type: 'paragraph', text: 'Sydney auctions are engineered for emotional participation. The Saturday morning theatre of a crowded auction — adrenaline, a skilled auctioneer, visible competitor behaviour — is specifically designed to extract maximum price from motivated buyers. A first home buyer attending their fifth auction after months of disappointment is the ideal candidate for overpayment.' },
    ],
  },
  {
    id: '5',
    slug: 'negotiation-tactics-buyers-agents',
    title: 'The Negotiation Playbook: How Buyers Agents Secure Properties Below Asking',
    excerpt: 'Professional negotiation is a structured discipline, not a personality trait. Here are the specific tactics that protect buyers in Sydney\'s most competitive market in a decade.',
    category: 'Strategy',
    categoryColor: 'bg-rose-100 text-rose-800',
    readTime: '8 min read',
    date: 'January 22, 2026',
    author: 'Alex',
    authorRole: 'Principal Advisor, JJ Property Partner',
    coverImage: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=1400',
    content: [
      { type: 'paragraph', text: 'Most property negotiations in Sydney are lost before they begin. The buyer calls the selling agent, expresses enthusiasm, asks how much the vendor wants, and enters the conversation from a position of visible motivation and minimal information. The vendor\'s agent — who speaks to 50 buyers a week and has watched thousands of negotiations — immediately identifies the leverage points and uses them.' },
      { type: 'heading', text: 'The Information Asymmetry Problem' },
      { type: 'paragraph', text: 'A skilled selling agent knows: how many other buyers are genuinely interested, what comparable properties have achieved, the vendor\'s timeline and motivation, and any structural factors about the property that might reduce buyer enthusiasm. A self-represented buyer walking into that conversation knows almost none of these things.' },
      { type: 'quote', text: 'Negotiation isn\'t about being aggressive. It\'s about information, timing, and removing emotion from the transaction on your side while keeping it highly present on the vendor\'s.' },
      { type: 'heading', text: 'Tactic 1: Anchor on Independent Valuation, Not Comparable Sales Narratives' },
      { type: 'paragraph', text: 'The listing agent will present you with a "comparable sales" analysis that supports the asking price. This is not objective research — it is a curated selection of supporting evidence. A professional buyer\'s agent commissions an independent valuation or builds their own comparable sales model using raw data, not agent-curated summaries.' },
      { type: 'heading', text: 'Tactic 2: Control the Timeline' },
      { type: 'paragraph', text: 'Vendors sell for a reason, and that reason often has a timeline attached. Understanding the vendor\'s settlement preference — and having flexibility to accommodate it — is worth money. We\'ve secured properties at 3–5% below asking simply by offering a vendor their exact preferred settlement date while competitors were inflexible.' },
      { type: 'list', items: ['Always ask: "What does the vendor\'s ideal settlement look like?"', 'In a down market: shorter settlement means more certainty for vendor', 'In a rising market: longer settlement benefits the buyer, locks in today\'s price', 'Unconditional contracts from a financially prepared buyer remove uncertainty premium'] },
    ],
  },
  {
    id: '6',
    slug: 'northern-beaches-investment-guide',
    title: 'Northern Beaches Investment Guide: Which Pockets Are Worth the Premium?',
    excerpt: 'The Northern Beaches commands a significant lifestyle premium. But not all suburbs deliver equivalent investment performance. A data-driven breakdown from buyers who have operated here for two decades.',
    category: 'Market Analysis',
    categoryColor: 'bg-amber-100 text-amber-800',
    readTime: '9 min read',
    date: 'January 8, 2026',
    author: 'Alex',
    authorRole: 'Principal Advisor, JJ Property Partner',
    coverImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1400',
    content: [
      { type: 'paragraph', text: 'The Northern Beaches peninsula stretches 30+ kilometres from Manly to Palm Beach, and the investment performance of a property in Avalon is almost nothing like the performance of an equivalent property in Dee Why — despite both being "Northern Beaches". Understanding these distinctions is the difference between a high-performing investment and a lifestyle purchase that underdelivers on return.' },
      { type: 'heading', text: 'The B-Line Factor' },
      { type: 'paragraph', text: 'The B-Line bus rapid transit corridor — running from Mona Vale through Brookvale and down to the CBD — has had a measurable gravitational pull on rental demand and price growth in suburbs within walking distance of its stops. Properties within 500m of a B-Line stop have shown meaningfully stronger rental occupancy and yield than equivalent properties further from the corridor.' },
      { type: 'heading', text: 'Manly vs Dee Why: The Case for Mid-Beach' },
      { type: 'paragraph', text: 'Manly\'s premium is well-established and largely priced in. Entry-level houses in Manly are now above $3M, and the yield profile reflects that: most investors achieve gross yields of 2.8–3.4%, which complicates debt servicing. The investment case for Manly rests almost entirely on capital growth — which remains strong but volatile.' },
      { type: 'quote', text: 'Dee Why and Curl Curl are where we are finding the best risk-adjusted returns on the Northern Beaches right now. Large land content, B-Line access, and yields that actually service the debt.' },
      { type: 'list', items: ['Dee Why: Strong rental demand from young professionals, B-Line terminus, median house price still below $2M with land content', 'Curl Curl: Undervalued by the market relative to neighbouring Freshwater, large blocks, quiet family suburb with genuine scarcity', 'Narrabeen: Lake and beach proximity, government-contracted rental demand from emergency services, strong dual-occupancy potential on corner blocks'] },
    ],
  },
];
