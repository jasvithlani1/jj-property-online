export interface CaseStudy {
  id: string;
  title: string;
  result: string;
  location: string;
  shortQuote: string;
  image: string;
  tag: string;
  tagColor: string;
  client: string;
  challenge: string;
  strategy: string;
  outcome: string;
  stats: { label: string; value: string }[];
}

export const caseStudies: CaseStudy[] = [
  {
    id: 'smsf-architect',
    title: 'The SMSF Architect',
    result: '$2.4M Investment',
    location: 'Parramatta, NSW',
    shortQuote: "Alex's precision transformed our retirement strategy. We secured a dual-occupancy winner 15% below market value.",
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=900',
    tag: 'SMSF Acquisition',
    tagColor: 'bg-gold/10 text-gold',
    client: 'A senior IT executive and his partner approached JJ Property Partner with a complex brief: build a compliant SMSF property portfolio that would deliver consistent rental yield and long-term capital growth.',
    challenge: 'Their existing financial advisor had recommended a high-rise apartment on the open market. After an independent assessment by the JJ Property system, the asset showed below-average land content, excessive body corporate fees, and zero rental premium — a classic yield trap that would have underperformed their retirement targets by an estimated $800k over 20 years.',
    strategy: 'Alex immediately pivoted the brief toward dual-occupancy houses with independent leases on freehold land. Using off-market intelligence from a trusted developer network in the Parramatta corridor, he identified a brand-new dual-occupancy in a high-demand rental catchment, 900m from Westmead Hospital and two train lines. After 3 weeks of quiet negotiation — never exposing the buyer\'s identity — settlement was achieved 15% under independent market appraisal.',
    outcome: 'The asset now generates two independent rental streams totalling $62,400 per annum. Independent valuation at 18 months post-settlement showed a $340k capital gain. The client\'s self-managed fund is now on track to exceed its 20-year retirement target.',
    stats: [
      { label: 'Purchase Price', value: '$2.4M' },
      { label: 'Below Market Value', value: '15%' },
      { label: 'Annual Rental Income', value: '$62,400' },
      { label: 'Capital Growth @ 18mo', value: '$340K' },
    ],
  },
  {
    id: 'first-home-surry-hills',
    title: 'First Home, First Class',
    result: 'Off-Market Terrace',
    location: 'Surry Hills, NSW',
    shortQuote: 'As first-home buyers, we felt completely outmatched. Alex got us off-market access to our dream home in 14 days.',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=900',
    tag: 'First Home Buyer',
    tagColor: 'bg-gold/10 text-gold',
    client: 'A young professional couple — one in fintech, one in medicine — had been searching for a character terrace in the Inner City for over 8 months. Every property they attended went to auction and sold above their ceiling. They were exhausted, outbid, and sceptical about the market.',
    challenge: 'Sydney\'s Inner City terrace market moves faster than public portals can list. An agent whisper, a social media post, or a developer\'s phone call can create an unofficial "private treaty" before a property ever reaches Domain or realestate.com.au. As first-home buyers without an established agent network, they were structurally disadvantaged. Every auction they attended was packed with seasoned investors.',
    strategy: 'Within 72 hours of being engaged, Alex activated his Surry Hills and Paddington residential agent network. He identified a two-storey terrace owner who had privately mentioned a desire to sell — specifically to an owner-occupier who would respect the neighbour\'s privacy. Alex arranged a private inspection, represented the couple\'s identity fully, and submitted a structured private treaty offer with a 60-day settlement to suit the vendor. One competing offer was made; Alex\'s clinical negotiation secured the deal before it escalated.',
    outcome: 'The terrace was acquired within 14 days of engagement at $95,000 below the likely auction clearing price, based on three comparable recent sales. The couple moved in six weeks later and have retained JJ Property Partner for their future investment portfolio brief.',
    stats: [
      { label: 'Days to Acquisition', value: '14' },
      { label: 'Savings vs Auction Est.', value: '$95K' },
      { label: 'Competing Bidders Bypassed', value: '7+' },
      { label: 'Settlement Period', value: '60 Days' },
    ],
  },
  {
    id: 'northern-beaches-portfolio',
    title: 'Portfolio Growth',
    result: '3 Asset Acquisition',
    location: 'Northern Beaches, NSW',
    shortQuote: 'Scale requires data. JJ Property Partner provided the technical dissection needed to triple my high-yield portfolio.',
    image: 'https://images.unsplash.com/photo-1513584684374-8bdb7489feef?auto=format&fit=crop&q=80&w=900',
    tag: 'Property Investment',
    tagColor: 'bg-gold/10 text-gold',
    client: 'A seasoned investor with an existing two-property portfolio engaged JJ Property Partner to accelerate growth. The brief was ambitious: acquire three additional high-yield, capital-growth assets within 18 months without expanding into speculative or regional markets.',
    challenge: 'At the investor\'s price point ($900k–$1.4M per asset), the Northern Beaches market offered very limited properties with genuine dual-income potential. Most of what was publicly listed was either over-capitalised, had council restrictions on additional dwellings, or was in flood zones that created insurability risk. Two assets the client had shortlisted himself were flagged during JJ\'s due diligence process — one had unapproved structures; the other sat in a coastal erosion zone.',
    strategy: 'Alex applied a systematic data layer to identify pockets where zoning allowed dual-occupancy or granny flat construction on existing lots, rental demand was driven by hospital or university proximity (recession-proof tenants), and price points remained below suburb median. Three separate acquisitions were staged across 16 months — two off-market, and one via a private expression-of-interest campaign that Alex managed to access before public marketing commenced.',
    outcome: 'All three assets were settled within the 18-month brief at a combined acquisition cost of $3.65M. Combined rental income at full occupancy reached $128,400 per annum. The portfolio, now spanning 5 properties, has an independently assessed total value of $5.8M.',
    stats: [
      { label: 'Assets Acquired', value: '3' },
      { label: 'Combined Value', value: '$3.65M' },
      { label: 'Combined Annual Income', value: '$128,400' },
      { label: 'Total Portfolio Value', value: '$5.8M' },
    ],
  },
];
