export interface CaseStudyDetailField {
  label: string;
  value: string;
}

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
  propertyDetails?: CaseStudyDetailField[];
}

export const caseStudies: CaseStudy[] = [
  {
    id: 'smsf-architect',
    title: 'The SMSF Architect',
    result: '$2.4M Investment',
    location: 'Parramatta, NSW',
    shortQuote: "Alex's precision transformed our retirement strategy. We secured a dual-occupancy winner 15% below market value.",
    image: '/images/acquisitions/prop_1.png',
    tag: 'SMSF Acquisition',
    tagColor: 'bg-gold text-white shadow-lg shadow-gold/20 font-black',
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
    propertyDetails: [
      { label: 'Buyers', value: 'Senior IT Executive & Partner' },
      { label: 'Property Address', value: 'Parramatta, NSW' },
      { label: 'Purchase Price', value: '$2,400,000' },
      { label: 'Property Type', value: 'Brand-New Dual Occupancy' },
      { label: 'Annual Rental Income', value: '$62,400' },
      { label: 'Below Market Value', value: '15%' },
      { label: 'Capital Growth @ 18mo', value: '$340,000' }
    ]
  },
  {
    id: 'first-home-surry-hills',
    title: 'First Home, First Class',
    result: 'Off-Market Terrace',
    location: 'Surry Hills, NSW',
    shortQuote: 'As first-home buyers, we felt completely outmatched. Alex got us off-market access to our dream home in 14 days.',
    image: '/images/acquisitions/prop_2.png',
    tag: 'First Home Buyer',
    tagColor: 'bg-gold text-white shadow-lg shadow-gold/20 font-black',
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
    propertyDetails: [
      { label: 'Buyers', value: 'Fintech & Medicine Professionals' },
      { label: 'Property Address', value: 'Surry Hills, NSW' },
      { label: 'Acquisition Type', value: 'Off-Market Character Terrace' },
      { label: 'Days to Acquisition', value: '14 Days' },
      { label: 'Savings vs Auction Est.', value: '$95,000' },
      { label: 'Settlement Period', value: '60 Days' }
    ]
  },
  {
    id: 'northern-beaches-portfolio',
    title: 'A Strategic Gordonvale Purchase with Strong Rental Yield',
    result: '5.65% Rental Yield',
    location: 'Gordonvale, QLD',
    shortQuote: "For Sasi and Saranya, this purchase represents a confident step forward in their property journey guided by Alex's research-led approach.",
    image: '/images/acquisitions/user_prop_14.jpg',
    tag: 'Property Investment',
    tagColor: 'bg-gold text-white shadow-lg shadow-gold/20 font-black',
    client: 'At JJ Property Partner, Alex helps buyers make confident, data-backed property decisions across Australia. This recent purchase in Gordonvale, Queensland, shows how the right buyer’s agent strategy can uncover a property with solid rental appeal, strong land value, and positive capital growth potential.',
    challenge: 'The buyers wanted a property that offered more than just affordability. They were looking for a smart investment with rental strength, future growth potential, and a location that could continue to benefit from local demand. Gordonvale stood out due to its residential appeal and access to Cairns region growth.',
    strategy: 'This property at 22 Mendelsohn Close offered several investment-friendly advantages. The 3-bedroom, 2-bathroom layout made it suitable for long-term tenants, while the 760 sqm land size added further value. Alex supported the buyers through a structured property selection process, reviewing the numbers, assessing suburb fundamentals, and helping the clients move forward with clarity.',
    outcome: 'The result was a strong investment purchase in Gordonvale with a healthy rental yield of 5.65%, excellent land size of 760 sqm, and notable capital growth. The current estimated value of $826,000 shows a strong uplift from the original purchase price of $690,000, reflecting approximately $136,000 in capital growth.',
    stats: [
      { label: 'Purchase Price', value: '$690,000' },
      { label: 'Current Value', value: '$826,000' },
      { label: 'Capital Growth', value: '$136,000' },
      { label: 'Rental Yield', value: '5.65%' },
    ],
    propertyDetails: [
      { label: 'Buyer Name', value: 'Sasi and Saranya' },
      { label: 'Property Address', value: '22 Mendelsohn Close, Gordonvale QLD 4865' },
      { label: 'Purchase Price', value: '$690,000' },
      { label: 'Property Type', value: '3 Bed / 2 Bath / 2 Car' },
      { label: 'Purchase Month', value: 'September 2025' },
      { label: 'Market Rent', value: '$750 per week' },
      { label: 'Current Value', value: '$826,000' },
      { label: 'Land Size', value: '760 sqm' },
      { label: 'Estimated Capital Growth', value: '$136,000' },
      { label: 'Rental Yield', value: '5.65%' }
    ]
  },
  {
    id: 'high-yield-investment-cairns',
    title: 'Securing a High-Performing Investment Property in Gordonvale, QLD',
    result: '$115k Capital Growth',
    location: 'Gordonvale, QLD',
    shortQuote: "For Ragu and Devi, this was not just a property purchase. It was a well-researched investment decision guided by Alex’s property knowledge and buyer-focused approach.",
    image: '/images/acquisitions/user_prop_15.png',
    tag: 'Property Investment',
    tagColor: 'bg-gold text-white shadow-lg shadow-gold/20 font-black',
    client: 'At JJ Property Partner, Alex helped buyers Ragu and Devi secure a strong investment property in Gordonvale, Queensland. The goal was to find a property that offered solid rental appeal, good land size, and long-term growth potential in a practical regional market.',
    challenge: 'The selected property at 11 Bonner Close, Gordonvale QLD 4865 stood out because it offered a family-friendly layout, strong rental return, and a generous block size. For investors, these features can make a meaningful difference when balancing cash flow, tenant demand, and future capital growth.',
    strategy: 'Alex focused on more than just the purchase price. The property had the fundamentals many Australian investors look for: a practical family layout, good land content, rental demand, and the potential for capital growth. With a market rent of $750 per week, the property offered a healthy rental yield of 5.34%, helping support the overall investment position.\n\nThe 662 sqm land size also added long-term value, particularly in a market where usable land and family homes remain attractive to renters and future buyers.',
    outcome: 'Purchased for $730,000, the property is now valued at approximately $845,000, reflecting an estimated capital growth of $115,000. This case study shows how the right buyer’s agent strategy can help investors move with clarity, confidence, and strong market insight.',
    stats: [
      { label: 'Purchase Price', value: '$730,000' },
      { label: 'Current Value', value: '$845,000' },
      { label: 'Capital Growth', value: '$115,000' },
      { label: 'Rental Yield', value: '5.34%' },
    ],
    propertyDetails: [
      { label: 'Buyers', value: 'Ragu and Devi' },
      { label: 'Property Address', value: '11 Bonner Close, Gordonvale QLD 4865' },
      { label: 'Purchase Price', value: '$730,000' },
      { label: 'Property Type', value: '4 Bed, 2 Bath, 2 Car Spaces' },
      { label: 'Purchase Month', value: 'September 2025' },
      { label: 'Market Rent', value: '$750 per week' },
      { label: 'Current Value', value: '$845,000' },
      { label: 'Land Size', value: '662 sqm' },
      { label: 'Capital Growth', value: 'Approx. $115,000' },
      { label: 'Rental Yield', value: '5.34%' }
    ]
  }
];
