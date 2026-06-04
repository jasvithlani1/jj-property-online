import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Shield, Calendar, Award, FileText, ArrowRight, CheckSquare } from 'lucide-react';
import SEO from '../components/SEO';

const sections = [
  { id: 'definitions', label: '1. Definitions' },
  { id: 'acceptance', label: '2. Acceptance of Terms' },
  { id: 'services', label: '3. Buyers Agent Services' },
  { id: 'engagement', label: '4. Engagement & Contracts' },
  { id: 'fees', label: '5. Fees and Payment' },
  { id: 'obligations', label: '6. Client Obligations' },
  { id: 'conflicts', label: '7. Conflicts of Interest' },
  { id: 'confidentiality', label: '8. Confidentiality' },
  { id: 'ip', label: '9. Intellectual Property' },
  { id: 'liability', label: '10. Limitation of Liability' },
  { id: 'indemnity', label: '11. Indemnity' },
  { id: 'termination', label: '12. Termination' },
  { id: 'dispute-resolution', label: '13. Dispute Resolution' },
  { id: 'website-use', label: '14. Website Terms of Use' },
  { id: 'testimonials', label: '15. Testimonials & Case Studies' },
  { id: 'force-majeure', label: '16. Force Majeure' },
  { id: 'amendments', label: '17. Amendments to Terms' },
  { id: 'general', label: '18. General Provisions' },
  { id: 'aml-ctf', label: '19. Anti-Money Laundering' },
  { id: 'contact', label: '20. Contact Us' },
];

export default function TermsAndConditions() {
  const [activeSection, setActiveSection] = useState('definitions');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 250;
      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = el.offsetTop - 120;
      window.scrollTo({
        top: offset,
        behavior: 'smooth',
      });
      setActiveSection(id);
    }
  };

  return (
    <>
      <SEO 
        title="Terms and Conditions | JJ Property Partner"
        description="Read the Terms and Conditions of JJ Property Partner PTY LTD. Understand our buyers agent service agreements, fees, and client obligations."
      />

      <div className="w-full bg-neutral-50 selection:bg-gold/20 font-sans">
        {/* Hero Section */}
        <section className="pt-32 pb-16 md:pt-40 md:pb-24 relative px-6 bg-[#011122] text-white overflow-hidden text-center">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gold/10 blur-[160px] rounded-full -z-0 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gold/5 blur-[120px] rounded-full -z-0 pointer-events-none" />
          
          <div className="max-w-7xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-gold/40 bg-white/10 text-xs font-bold uppercase tracking-[0.2em] text-gold mb-4 backdrop-blur-sm">
                <CheckSquare className="w-4 h-4" /> Legal & Terms
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-sans font-black leading-tight mb-4">
                Terms & <span className="text-gold">Conditions</span>
              </h1>
              <p className="text-sm md:text-base text-white/60 font-sans max-w-2xl mx-auto leading-relaxed flex items-center justify-center gap-4 flex-wrap">
                <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-gold" /> Effective: 4 June 2026</span>
                <span className="opacity-30">|</span>
                <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-gold" /> Last Updated: 4 June 2026</span>
              </p>
            </motion.div>
          </div>
        </section>

        {/* Main Content Area */}
        <section className="py-12 md:py-20 px-6 sm:px-8 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Sticky Sidebar Navigation */}
            <aside className="hidden lg:block lg:col-span-4 sticky top-28 bg-white rounded-3xl p-6 border border-black/5 shadow-xl shadow-black/[0.02] max-h-[80vh] overflow-y-auto custom-scrollbar">
              <h3 className="text-xs font-black text-[#011122] uppercase tracking-wider mb-4 flex items-center gap-2 pb-3 border-b border-black/5">
                <FileText className="w-4 h-4 text-gold" /> Document Sections
              </h3>
              <nav className="flex flex-col gap-1">
                {sections.map((sec) => (
                  <button
                    key={sec.id}
                    onClick={() => scrollToSection(sec.id)}
                    className={`text-left text-sm py-2.5 px-4 rounded-xl font-semibold transition-all duration-200 cursor-pointer flex items-center justify-between group ${
                      activeSection === sec.id
                        ? 'bg-gold/10 text-gold pl-5'
                        : 'text-muted hover:text-gold hover:bg-neutral-50'
                    }`}
                  >
                    <span>{sec.label}</span>
                    <ArrowRight className={`w-3.5 h-3.5 opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0 ${activeSection === sec.id ? 'opacity-100 translate-x-0 text-gold' : ''}`} />
                  </button>
                ))}
              </nav>
            </aside>

            {/* Document Content */}
            <article className="lg:col-span-8 bg-white rounded-[2.5rem] p-8 md:p-12 border border-black/5 shadow-xl shadow-black/[0.01]">
              
              {/* Business Overview Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10 p-6 rounded-2xl bg-neutral-50/80 border border-black/5">
                <div className="flex gap-3">
                  <Award className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-muted uppercase tracking-wider">Company</h4>
                    <p className="text-sm font-bold text-[#011122]">JJ Property Partner PTY LTD</p>
                    <p className="text-xs text-muted">ABN: 71 687 187 113</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Shield className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-muted uppercase tracking-wider">REA Licence</h4>
                    <p className="text-sm font-bold text-[#011122]">REA Licence No. 20543356</p>
                    <p className="text-xs text-muted">NSW Fair Trading</p>
                  </div>
                </div>
                <div className="flex gap-3 pt-3 sm:pt-0 border-t sm:border-t-0 sm:border-l border-black/5 sm:pl-4">
                  <Mail className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-muted uppercase tracking-wider">Email Address</h4>
                    <a href="mailto:info@jjpropertypartner.com.au" className="text-sm font-bold text-[#011122] hover:text-gold transition-colors">info@jjpropertypartner.com.au</a>
                  </div>
                </div>
                <div className="flex gap-3 pt-3 sm:pt-0 border-t border-black/5 sm:border-l sm:pl-4">
                  <Phone className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-muted uppercase tracking-wider">Phone / WhatsApp</h4>
                    <a href="tel:+61481334458" className="text-sm font-bold text-[#011122] hover:text-gold transition-colors">0481 33 44 58</a>
                  </div>
                </div>
              </div>

              {/* Introduction statement */}
              <div className="text-base text-[#011122]/90 leading-relaxed space-y-4 mb-10 pb-8 border-b border-black/5">
                <p className="font-bold">
                  Please read these Terms and Conditions carefully before engaging the services of JJ Property Partner PTY LTD or using our website. By engaging our services or using our website, you agree to be bound by these Terms and Conditions.
                </p>
              </div>

              {/* Legal Clauses */}
              <div className="space-y-12 text-[#6F6F6F] leading-relaxed text-sm md:text-base font-sans">
                
                <section id="definitions" className="scroll-mt-28">
                  <h2 className="text-xl md:text-2xl font-sans font-black text-[#011122] mb-4 uppercase tracking-tight flex items-center gap-2">
                    <span className="text-gold">01.</span> Definitions
                  </h2>
                  <p className="mb-4">In these Terms and Conditions, the following definitions apply:</p>
                  <ul className="space-y-3">
                    {[
                      { term: "'Company', 'we', 'us', 'our'", desc: 'means JJ Property Partner PTY LTD (ABN 71 687 187 113), its directors, employees, agents, and assigns.' },
                      { term: "'Client', 'you', 'your'", desc: 'means the person or entity engaging the Company\'s services or accessing the Company\'s website.' },
                      { term: "'Services'", desc: 'means buyers agent services, property acquisition services, negotiation services, auction bidding services, strategy consultations, research services, and any other services provided by the Company.' },
                      { term: "'Engagement Agreement'", desc: 'means the written agreement signed between the Company and the Client specifying the scope, fees, and conditions of the Services.' },
                      { term: "'Property'", desc: 'means any real property, including residential property, commercial property, or property acquired through a Self-Managed Super Fund, that is the subject of the Company\'s Services.' },
                      { term: "'Website'", desc: 'means www.jjpropertypartner.com.au and all associated pages and subdomains.' },
                      { term: "'Fee'", desc: 'means the remuneration payable by the Client to the Company as specified in the Engagement Agreement.' },
                      { term: "'GST'", desc: 'means Goods and Services Tax as defined under the A New Tax System (Goods and Services Tax) Act 1999 (Cth).' }
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-gold shrink-0 mt-2.5" />
                        <span><strong>{item.term}</strong> {item.desc}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                <section id="acceptance" className="scroll-mt-28">
                  <h2 className="text-xl md:text-2xl font-sans font-black text-[#011122] mb-4 uppercase tracking-tight flex items-center gap-2">
                    <span className="text-gold">02.</span> Acceptance of Terms
                  </h2>
                  <p className="mb-4">
                    By engaging the Company's Services, signing an Engagement Agreement, submitting an enquiry form, booking a strategy session, or using the Company's website, you agree to be bound by these Terms and Conditions, our Privacy Policy, and any additional terms set out in your Engagement Agreement.
                  </p>
                  <p>
                    If you do not agree with any part of these Terms and Conditions, you must not engage our Services or use our website. These Terms and Conditions apply to all persons who engage our Services or access our website, regardless of their location within Australia.
                  </p>
                </section>

                <section id="services" className="scroll-mt-28">
                  <h2 className="text-xl md:text-2xl font-sans font-black text-[#011122] mb-4 uppercase tracking-tight flex items-center gap-2">
                    <span className="text-gold">03.</span> Buyers Agent Services
                  </h2>
                  
                  <h3 className="text-base font-bold text-[#011122] mt-4 mb-2">3.1 Nature of Services</h3>
                  <p className="mb-4">
                    JJ Property Partner PTY LTD provides professional buyers agent services to purchasers of residential property, commercial property, and property acquired through Self-Managed Super Funds across Australia. Our Services are provided exclusively in the interests of the buyer and we do not act for or receive remuneration from vendors, developers, or selling agents.
                  </p>

                  <h3 className="text-base font-bold text-[#011122] mt-6 mb-2">3.2 Licence and Regulatory Compliance</h3>
                  <p className="mb-4">
                    The Company holds a current REA Licence (No. 20543356) issued by NSW Fair Trading under the Property and Stock Agents Act 2002 (NSW). All Services are provided in accordance with the conditions of this licence and applicable Australian laws and regulations.
                  </p>

                  <h3 className="text-base font-bold text-[#011122] mt-6 mb-2">3.3 Scope of Services</h3>
                  <p className="mb-4">The specific scope of Services to be provided will be set out in your Engagement Agreement, which may include:</p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
                    {[
                      'Property search and identification',
                      'Suburb/market research & data analysis',
                      'Property inspections and due diligence',
                      'Building and pest inspection coordination',
                      'Contract review coordination',
                      'Price negotiation at private treaty',
                      'Auction bidding representation',
                      'Settlement coordination support',
                      'Negotiation-only service option',
                      'SMSF property acquisition coordination',
                      'Free strategy session (preliminary)'
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <h3 className="text-base font-bold text-[#011122] mt-6 mb-2">3.4 Limitations of Service</h3>
                  <p className="mb-4">
                    The Company provides property acquisition services and strategic property advice. The Company does not provide financial advice, legal advice, tax advice, accounting advice, or financial planning services. Clients are strongly encouraged to engage independent licensed professionals including mortgage brokers, financial planners, solicitors, and accountants before making any property acquisition decision.
                  </p>
                  <p className="p-4 rounded-xl bg-gold/5 border-l-4 border-gold text-[#011122]/90 text-sm mb-4">
                    <strong>Referral Commissions Disclosure:</strong> The Company may receive referral commissions, fees, or other benefits from third-party service providers including mortgage brokers, accountants, financial planners, solicitors, conveyancers, and other professionals when the Company refers clients to those providers. The receipt of any such referral commission or benefit will be disclosed to the Client in writing prior to or at the time of the referral, in accordance with the Property and Stock Agents Act 2002 (NSW) and the Australian Consumer Law. Clients are under no obligation to engage any referred service provider and may freely choose their own independent professionals.
                  </p>
                  <p>
                    Recommendations made by the Company are based on research, market analysis, and professional judgment. Past performance of any property, suburb, or market does not guarantee future results. The Company does not guarantee any particular capital growth, rental yield, or investment outcome.
                  </p>
                </section>

                <section id="engagement" className="scroll-mt-28">
                  <h2 className="text-xl md:text-2xl font-sans font-black text-[#011122] mb-4 uppercase tracking-tight flex items-center gap-2">
                    <span className="text-gold">04.</span> Engagement and Contract Formation
                  </h2>
                  
                  <h3 className="text-base font-bold text-[#011122] mt-4 mb-2">4.1 Engagement Agreement</h3>
                  <p className="mb-4">
                    The Company's Services are provided under a written Engagement Agreement signed by both parties. The Engagement Agreement sets out the specific services to be provided, the fee structure, payment terms, duration of engagement, and any special conditions. No binding obligation arises on the Company to provide Services until a signed Engagement Agreement is in place.
                  </p>

                  <h3 className="text-base font-bold text-[#011122] mt-6 mb-2">4.2 Free Strategy Session</h3>
                  <p className="mb-4">
                    The Company offers a complimentary, no-obligation strategy consultation of approximately 30 minutes. This session does not constitute a binding engagement and no property acquisition services are provided during or as a result of this session unless an Engagement Agreement is subsequently signed.
                  </p>

                  <h3 className="text-base font-bold text-[#011122] mt-6 mb-2">4.3 SMSF Engagements</h3>
                  <p className="mb-4">
                    For SMSF property acquisitions, the Client warrants that they have obtained appropriate advice from a licensed financial adviser, SMSF specialist, and accountant regarding the suitability of property investment for their fund prior to engaging the Company's Services. The Company's role is limited to the property acquisition process and does not include SMSF compliance advice.
                  </p>

                  <h3 className="text-base font-bold text-[#011122] mt-6 mb-2">4.4 Cooling-Off Period</h3>
                  <p className="mb-4">
                    In accordance with Section 59 of the Property and Stock Agents Act 2002 (NSW), the Client is entitled to a cooling-off period in respect of the Engagement Agreement. The cooling-off period commences at the time the Client signs the Engagement Agreement and ends at 5:00 PM on the next business day or Saturday following the date of signing.
                  </p>
                  <p>
                    During the cooling-off period, the Client may rescind the Engagement Agreement by giving written notice to the Company. Notice of rescission must be delivered to the Company in writing (including by email to <a href="mailto:info@jjpropertypartner.com.au" className="text-gold hover:underline">info@jjpropertypartner.com.au</a>) before the expiry of the cooling-off period. The Client acknowledges that the cooling-off right applies to the Engagement Agreement and that these Terms and Conditions, which form part of the overall contractual framework, do not independently create a cooling-off right beyond that provided by the Act.
                  </p>
                </section>

                <section id="fees" className="scroll-mt-28">
                  <h2 className="text-xl md:text-2xl font-sans font-black text-[#011122] mb-4 uppercase tracking-tight flex items-center gap-2">
                    <span className="text-gold">05.</span> Fees and Payment
                  </h2>
                  
                  <h3 className="text-base font-bold text-[#011122] mt-4 mb-2">5.1 Fee Structures</h3>
                  <p className="mb-4">
                    The Company offers the following fee structures, as agreed in the Engagement Agreement: Fixed fee, Percentage-based fee, or Hybrid fee (upfront retainer + success fee). All fees quoted by the Company are GST-inclusive unless expressly stated otherwise in the Engagement Agreement. The applicable fee will be set out in your Engagement Agreement.
                  </p>

                  <h3 className="text-base font-bold text-[#011122] mt-6 mb-2">5.2 Engagement Retainer</h3>
                  <p className="mb-4">
                    The Company may require payment of an upfront engagement retainer upon signing the Engagement Agreement. The retainer amount and its treatment (whether refundable, credited against the success fee, or non-refundable) will be specified in the Engagement Agreement.
                  </p>

                  <h3 className="text-base font-bold text-[#011122] mt-6 mb-2">5.3 Success Fee</h3>
                  <p className="mb-4">
                    Where the Engagement Agreement provides for a success fee, this fee becomes payable upon exchange of contracts for the property acquired by the Company on the Client's behalf. The success fee is payable regardless of whether the acquisition is subject to finance approval, cooling-off rights, or other conditions, unless the Engagement Agreement expressly provides otherwise.
                  </p>

                  <h3 className="text-base font-bold text-[#011122] mt-6 mb-2">5.4 Payment Terms</h3>
                  <p className="mb-4">
                    Fees are payable within the timeframe specified in the Engagement Agreement and the Company's invoice. Late payments may incur interest at the rate of 10% per annum calculated daily on the outstanding balance. The Company reserves the right to suspend Services where fees remain unpaid beyond their due date.
                  </p>

                  <h3 className="text-base font-bold text-[#011122] mt-6 mb-2">5.5 GST</h3>
                  <p className="mb-4">
                    All fees quoted by the Company are GST-inclusive as stated in Clause 5.1. Tax invoices compliant with the A New Tax System (Goods and Services Tax) Act 1999 (Cth) will be issued for all payments. The GST component will be itemised on each tax invoice for the Client's records.
                  </p>

                  <h3 className="text-base font-bold text-[#011122] mt-6 mb-2">5.6 Expenses</h3>
                  <p className="mb-4">
                    Unless included in the agreed fee, the Client is responsible for all out-of-pocket expenses reasonably incurred by the Company in performing the Services, including building and pest inspection fees, travel expenses for interstate property inspections, and report costs. All expenses will be approved by the Client prior to being incurred.
                  </p>

                  <h3 className="text-base font-bold text-[#011122] mt-6 mb-2">5.7 Referral Commission Income</h3>
                  <p>
                    The Company's fee as set out in the Engagement Agreement is separate from any referral commissions or benefits the Company may receive from third-party service providers referred to the Client. The receipt of referral commissions does not reduce or offset the Company's fees payable by the Client under the Engagement Agreement. Full disclosure of all referral commissions will be provided in accordance with Clause 7 of these Terms and Conditions.
                  </p>
                </section>

                <section id="obligations" className="scroll-mt-28">
                  <h2 className="text-xl md:text-2xl font-sans font-black text-[#011122] mb-4 uppercase tracking-tight flex items-center gap-2">
                    <span className="text-gold">06.</span> Client Obligations
                  </h2>
                  <p className="mb-4">The Client agrees to:</p>
                  <ul className="space-y-2">
                    {[
                      'Provide accurate, complete, and up-to-date information regarding their financial position, borrowing capacity, and property criteria',
                      'Inform the Company promptly of any changes in their financial circumstances or instructions',
                      'Engage and maintain appropriate finance pre-approval before or shortly after engaging the full search service',
                      'Engage a licensed solicitor or conveyancer for contract review and settlement coordination',
                      'Not engage multiple buyers agents simultaneously without disclosure to the Company',
                      'Respond promptly to requests for instructions, approvals, or information from the Company to avoid delays',
                      'Review and execute documents in a timely manner as required by the acquisition process',
                      'Comply with all obligations under any property contract executed on their behalf',
                      'Provide valid government-issued photo identification and any other identity verification documents requested by the Company for Anti-Money Laundering and Counter-Terrorism Financing (AML/CTF) compliance purposes',
                      'Disclose any matters relevant to AML/CTF obligations, including the source of funds and beneficial ownership details',
                      'Not use the Company\'s services for any unlawful purpose, including money laundering, terrorism financing, fraud, or tax evasion'
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-gold shrink-0 mt-2" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                <section id="conflicts" className="scroll-mt-28">
                  <h2 className="text-xl md:text-2xl font-sans font-black text-[#011122] mb-4 uppercase tracking-tight flex items-center gap-2">
                    <span className="text-gold">07.</span> Conflicts of Interest
                  </h2>
                  <p className="mb-4">
                    The Company acts exclusively as a buyers agent representing the interests of the Client in all property acquisition matters. The Company does not receive commissions, fees, or other payments from vendors, real estate agents, or property developers in connection with property acquisitions performed on behalf of the Client.
                  </p>

                  <h3 className="text-base font-bold text-[#011122] mt-4 mb-2">7.1 Referral Commissions</h3>
                  <p className="mb-4">
                    The Company may receive referral commissions, fees, rebates, or other benefits from third-party service providers when the Company refers clients to those providers, including mortgage brokers, tax advisers, financial planners, solicitors, building and pest inspectors, and property managers.
                  </p>
                  <p className="mb-4">
                    The Company is required under the Property and Stock Agents Act 2002 (NSW), the Property and Stock Agents Regulation 2022 (NSW), and the Australian Consumer Law to disclose to the Client any referral commission or benefit the Company receives or expects to receive in connection with any referral. The Company will provide written disclosure to the Client prior to or at the time of making any referral, specifying the nature and estimated value of any referral commission or benefit received.
                  </p>
                  <p className="mb-4">
                    Clients are under no obligation to engage any third-party service provider referred by the Company. The Company's recommendations are based on the provider's suitability for the Client's needs and are not influenced by the receipt of referral commissions. Clients may freely select their own independent professionals at any time.
                  </p>

                  <h3 className="text-base font-bold text-[#011122] mt-6 mb-2">7.2 Conflict Management</h3>
                  <p>
                    Where any actual or potential conflict of interest arises — including in connection with referral commissions — the Company will disclose this to the Client in writing promptly and will obtain the Client's informed consent before continuing to act. The Client may terminate the engagement without penalty where a conflict of interest cannot be appropriately managed with the Client's informed consent.
                  </p>
                </section>

                <section id="confidentiality" className="scroll-mt-28">
                  <h2 className="text-xl md:text-2xl font-sans font-black text-[#011122] mb-4 uppercase tracking-tight flex items-center gap-2">
                    <span className="text-gold">08.</span> Confidentiality
                  </h2>
                  <p className="mb-4">
                    <strong>8.1 Company Obligations:</strong> The Company agrees to keep confidential all personal and financial information provided by the Client and will not disclose such information to any third party except as necessary to provide the Services or as required by law. This obligation survives the termination of the engagement.
                  </p>
                  <p>
                    <strong>8.2 Client Obligations:</strong> The Client agrees to keep confidential all proprietary research, suburb analysis, market data, and acquisition strategies provided by the Company and will not disclose such information to third parties without the Company's prior written consent.
                  </p>
                </section>

                <section id="ip" className="scroll-mt-28">
                  <h2 className="text-xl md:text-2xl font-sans font-black text-[#011122] mb-4 uppercase tracking-tight flex items-center gap-2">
                    <span className="text-gold">09.</span> Intellectual Property
                  </h2>
                  <p className="mb-4">
                    All content on the Company's website — including text, images, graphics, logos, case studies, blog content, and research reports — is the intellectual property of JJ Property Partner PTY LTD or its licensors. You may not copy, reproduce, distribute, publish, or create derivative works from any website content without the Company's prior written consent.
                  </p>
                  <p>
                    Research reports, property analysis documents, and suburb data provided to Clients during an engagement remain the intellectual property of the Company. Clients may use this material for their own personal property acquisition decisions but may not reproduce or distribute it commercially.
                  </p>
                </section>

                <section id="liability" className="scroll-mt-28">
                  <h2 className="text-xl md:text-2xl font-sans font-black text-[#011122] mb-4 uppercase tracking-tight flex items-center gap-2">
                    <span className="text-gold">10.</span> Limitation of Liability
                  </h2>
                  
                  <h3 className="text-base font-bold text-[#011122] mt-4 mb-2">10.1 General Limitation</h3>
                  <p className="mb-4">
                    To the maximum extent permitted by Australian law, the Company's total liability to the Client for any claim arising out of or in connection with the Services — whether in contract, tort (including negligence), statute, or otherwise — is limited to the total fees paid by the Client to the Company under the relevant Engagement Agreement.
                  </p>

                  <h3 className="text-base font-bold text-[#011122] mt-6 mb-2">10.2 Exclusion of Consequential Loss</h3>
                  <p className="mb-4">
                    To the maximum extent permitted by Australian law, the Company excludes all liability for indirect, consequential, special, or incidental loss or damage, including loss of profits, loss of expected capital gains, loss of rental income, or any other economic loss arising from or in connection with the Services or the Client's reliance on any advice or information provided by the Company.
                  </p>

                  <h3 className="text-base font-bold text-[#011122] mt-6 mb-2">10.3 Consumer Guarantees</h3>
                  <p className="mb-4">
                    Nothing in these Terms and Conditions excludes, restricts, or modifies any right or remedy, or any guarantee, warranty, or other term or condition, implied or imposed by the Australian Consumer Law (Schedule 2, Competition and Consumer Act 2010 (Cth)) that cannot be lawfully excluded or limited. Where the Australian Consumer Law applies, our liability is limited to the re-supply of the relevant services.
                  </p>

                  <h3 className="text-base font-bold text-[#011122] mt-6 mb-2">10.4 Property Market Risks</h3>
                  <p>
                    The Client acknowledges that property investment involves inherent risks including market fluctuations, changes in interest rates, legislative changes, and economic conditions beyond the Company's control. The Company does not guarantee any particular investment outcome, capital growth, or rental yield. The Client accepts full responsibility for their property acquisition decisions.
                  </p>
                </section>

                <section id="indemnity" className="scroll-mt-28">
                  <h2 className="text-xl md:text-2xl font-sans font-black text-[#011122] mb-4 uppercase tracking-tight flex items-center gap-2">
                    <span className="text-gold">11.</span> Indemnity
                  </h2>
                  <p className="mb-4">The Client indemnifies and holds harmless the Company, its directors, employees, and agents from and against any claims, losses, damages, costs (including legal costs on a solicitor-client basis), and expenses arising out of or in connection with:</p>
                  <ul className="space-y-2">
                    {[
                      'Any breach of these Terms and Conditions by the Client',
                      'The Client\'s failure to comply with their obligations under any property contract',
                      'False or misleading information provided by the Client to the Company',
                      'The Client\'s failure to obtain appropriate financial, legal, or SMSF advice before making an acquisition decision'
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-gold shrink-0 mt-2" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                <section id="termination" className="scroll-mt-28">
                  <h2 className="text-xl md:text-2xl font-sans font-black text-[#011122] mb-4 uppercase tracking-tight flex items-center gap-2">
                    <span className="text-gold">12.</span> Termination
                  </h2>
                  
                  <h3 className="text-base font-bold text-[#011122] mt-4 mb-2">12.1 Termination by the Client</h3>
                  <p className="mb-4">The Client may terminate the Engagement Agreement at any time by providing written notice to the Company. Upon termination, the Client is liable for:</p>
                  <ul className="space-y-2 mb-4">
                    <li>• Payment of all fees for Services performed to the date of termination</li>
                    <li>• Any non-refundable retainer fees as specified in the Engagement Agreement</li>
                    <li>• Reimbursement of any out-of-pocket expenses incurred by the Company prior to termination</li>
                  </ul>
                  <p className="mb-4">
                    Where the Client terminates the engagement after the Company has identified a property and the Client subsequently purchases that property within 12 months of termination, the full success fee will remain payable.
                  </p>

                  <h3 className="text-base font-bold text-[#011122] mt-6 mb-2">12.2 Termination by the Company</h3>
                  <p className="mb-4">
                    The Company may terminate the Engagement Agreement by providing written notice to the Client if: the Client materially breaches these Terms and Conditions and fails to remedy the breach within 14 days; the Client provides false/misleading information; payment of fees is overdue by 30 days; a conflict of interest arises; the Company must terminate to comply with AML/CTF obligations; or the Client's conduct is unreasonable/abusive.
                  </p>

                  <h3 className="text-base font-bold text-[#011122] mt-6 mb-2">12.3 Effect of Termination</h3>
                  <p>
                    Termination of the Engagement Agreement does not affect any accrued rights or obligations of either party prior to termination. Clauses relating to confidentiality, intellectual property, limitation of liability, and dispute resolution survive termination.
                  </p>
                </section>

                <section id="dispute-resolution" className="scroll-mt-28">
                  <h2 className="text-xl md:text-2xl font-sans font-black text-[#011122] mb-4 uppercase tracking-tight flex items-center gap-2">
                    <span className="text-gold">13.</span> Dispute Resolution
                  </h2>
                  <p className="mb-4">
                    <strong>13.1 Negotiation:</strong> If a dispute arises, the parties agree to first attempt to resolve the dispute through good-faith negotiation within 14 days of written notice of the dispute.
                  </p>
                  <p className="mb-4">
                    <strong>13.2 Mediation:</strong> If the dispute is not resolved through negotiation within 14 days, either party may refer the dispute to mediation with an agreed mediator or a mediator nominated by the Law Society of New South Wales. The costs of mediation will be shared equally.
                  </p>
                  <p className="mb-4">
                    <strong>13.3 Regulatory Complaints:</strong> Disputes relating to the conduct of a licensed buyers agent may be referred to NSW Fair Trading at any time.
                  </p>
                  <p>
                    <strong>13.4 Governing Law:</strong> These Terms and Conditions are governed by the laws of New South Wales, Australia. Each party submits to the non-exclusive jurisdiction of the courts of New South Wales.
                  </p>
                </section>

                <section id="website-use" className="scroll-mt-28">
                  <h2 className="text-xl md:text-2xl font-sans font-black text-[#011122] mb-4 uppercase tracking-tight flex items-center gap-2">
                    <span className="text-gold">14.</span> Website Terms of Use
                  </h2>
                  <p className="mb-4">
                    <strong>14.1 Website Access:</strong> Access to and use of the Company's website is provided on an 'as is' basis. While we endeavour to keep the website current and accurate, we do not warrant that the website will be available at all times, free from errors or viruses, or that content is complete and up to date.
                  </p>
                  <p className="mb-4">
                    <strong>14.2 Website Content:</strong> The information on our website is provided for general information purposes only and does not constitute financial, legal, or investment advice. You should not rely on website content as a substitute for professional advice specific to your circumstances.
                  </p>
                  <p className="mb-4">
                    <strong>14.3 Prohibited Use:</strong> You must not use our website for any unlawful purpose or in a way that infringes the rights of others. Specifically, you must not scrape/crawl data, copy content without consent, or attempt to gain unauthorized access to our systems.
                  </p>
                  <p>
                    <strong>14.4 External Links:</strong> Our website may contain links to third-party websites. These links are provided for convenience only. The Company does not endorse, control, or accept responsibility for the content of any linked third-party website.
                  </p>
                </section>

                <section id="testimonials" className="scroll-mt-28">
                  <h2 className="text-xl md:text-2xl font-sans font-black text-[#011122] mb-4 uppercase tracking-tight flex items-center gap-2">
                    <span className="text-gold">15.</span> Testimonials and Case Studies
                  </h2>
                  <p>
                    Client testimonials and case studies published on our website reflect the genuine experiences of past clients. All identifying information (names, property addresses) has been removed or altered to protect client privacy. Past client outcomes do not guarantee similar results for other clients.
                  </p>
                </section>

                <section id="force-majeure" className="scroll-mt-28">
                  <h2 className="text-xl md:text-2xl font-sans font-black text-[#011122] mb-4 uppercase tracking-tight flex items-center gap-2">
                    <span className="text-gold">16.</span> Force Majeure
                  </h2>
                  <p>
                    The Company will not be liable for any delay or failure to perform its obligations under these Terms and Conditions where such delay or failure is caused by circumstances beyond the Company's reasonable control, including acts of God, natural disasters, pandemic, government action, legislative changes, market conditions, or communication/technology failures.
                  </p>
                </section>

                <section id="amendments" className="scroll-mt-28">
                  <h2 className="text-xl md:text-2xl font-sans font-black text-[#011122] mb-4 uppercase tracking-tight flex items-center gap-2">
                    <span className="text-gold">17.</span> Amendments to Terms and Conditions
                  </h2>
                  <p>
                    The Company reserves the right to amend these Terms and Conditions at any time. Amended Terms will be published on the Company's website and will take effect from the date of publication. For existing engagements, amended Terms will apply to the extent they do not affect accrued rights under the existing Engagement Agreement. Your continued use of our website or engagement of our Services after any amendment constitutes your acceptance of the updated Terms and Conditions.
                  </p>
                </section>

                <section id="general" className="scroll-mt-28">
                  <h2 className="text-xl md:text-2xl font-sans font-black text-[#011122] mb-4 uppercase tracking-tight flex items-center gap-2">
                    <span className="text-gold">18.</span> General Provisions
                  </h2>
                  <p className="mb-4">
                    <strong>18.1 Entire Agreement:</strong> These Terms and Conditions, together with the Engagement Agreement and the Company's Privacy Policy, constitute the entire agreement between the Company and the Client.
                  </p>
                  <p className="mb-4">
                    <strong>18.2 Severability:</strong> If any provision of these Terms and Conditions is found to be invalid or unenforceable, that provision will be severed and the remaining provisions will continue in full force and effect.
                  </p>
                  <p className="mb-4">
                    <strong>18.3 Waiver:</strong> The failure of either party to enforce any right or remedy will not constitute a waiver of that right or remedy in the future.
                  </p>
                  <p className="mb-4">
                    <strong>18.4 Assignment:</strong> The Client may not assign or transfer their rights without prior written consent from the Company.
                  </p>
                  <p className="mb-4">
                    <strong>18.5 Electronic Execution and Delivery:</strong> The Engagement Agreement, these Terms, and any notices may be executed and delivered electronically (e.g. DocuSign, Adobe Sign, or email PDF). An electronic signature has the same legal effect as a handwritten signature in accordance with the Electronic Transactions Act 2000 (NSW) and the Electronic Transactions Act 1999 (Cth).
                  </p>
                  <p>
                    <strong>18.6 Privacy Policy:</strong> These Terms are to be read together with the Company's Privacy Policy, which is available on the Company's website at <a href="/privacy-policy" className="text-gold hover:underline">www.jjpropertypartner.com.au/privacy-policy</a>.
                  </p>
                </section>

                <section id="aml-ctf" className="scroll-mt-28">
                  <h2 className="text-xl md:text-2xl font-sans font-black text-[#011122] mb-4 uppercase tracking-tight flex items-center gap-2">
                    <span className="text-gold">19.</span> Anti-Money Laundering and Counter-Terrorism Financing
                  </h2>
                  
                  <h3 className="text-base font-bold text-[#011122] mt-4 mb-2">19.1 AML/CTF Obligations</h3>
                  <p className="mb-4">
                    JJ Property Partner PTY LTD is subject to obligations under the Anti-Money Laundering and Counter-Terrorism Financing Act 2006 (Cth) (AML/CTF Act) and related rules and regulations to prevent financial crime in connection with property transactions.
                  </p>

                  <h3 className="text-base font-bold text-[#011122] mt-6 mb-2">19.2 Client Identity Verification</h3>
                  <p className="mb-4">
                    The Company is required to verify the identity of all clients. The Client agrees to provide, upon request, required identity verification documents including government-issued photo ID, proof of residential address, and additional details for company/trust/SMSF structures showing beneficial owners.
                  </p>

                  <h3 className="text-base font-bold text-[#011122] mt-6 mb-2">19.3 Expanded AML/CTF Obligations from 1 July 2026</h3>
                  <p className="mb-4">
                    From 1 July 2026, expanded AML/CTF obligations will apply to real estate professionals including buyers agents. The Company will be required to maintain an AML/CTF Program, conduct Customer Due Diligence (CDD), monitor transactions, submit Threshold Transaction Reports and Suspicious Matter Reports to AUSTRAC, and retain records for 7 years.
                  </p>

                  <h3 className="text-base font-bold text-[#011122] mt-6 mb-2">19.4 Right to Refuse or Terminate</h3>
                  <p className="mb-4">
                    The Company reserves the right to refuse to commence services, suspend services, or terminate the Engagement Agreement immediately if the Client fails to provide identity verification documents, or if the Company has reasonable grounds to suspect illegal activity. The Company is prohibited by law from disclosing reasons for termination to the extent that it would involve tipping off.
                  </p>

                  <h3 className="text-base font-bold text-[#011122] mt-6 mb-2">19.5 Tipping-Off Prohibition</h3>
                  <p className="mb-4">
                    Under the AML/CTF Act, the Company is prohibited from disclosing to the Client that a Suspicious Matter Report has been or may be submitted to AUSTRAC, or that an investigation is being considered.
                  </p>

                  <h3 className="text-base font-bold text-[#011122] mt-6 mb-2">19.6 No Liability for AML/CTF Compliance Actions</h3>
                  <p>
                    The Company will not be liable to the Client for any loss, delay, damage, or inconvenience arising from the Company's compliance with its obligations under the AML/CTF Act.
                  </p>
                </section>

                <section id="contact" className="scroll-mt-28 border-t border-black/5 pt-8">
                  <h2 className="text-xl md:text-2xl font-sans font-black text-[#011122] mb-4 uppercase tracking-tight flex items-center gap-2">
                    <span className="text-gold">20.</span> Contact Us
                  </h2>
                  <p className="mb-6">For all enquiries relating to these Terms and Conditions, please contact us:</p>
                  
                  <div className="p-6 rounded-2xl bg-neutral-50 border border-black/5 space-y-4 max-w-lg">
                    <div className="flex gap-3">
                      <Award className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-xs font-bold text-muted uppercase">Contact Person</h4>
                        <p className="text-base font-bold text-[#011122]">Alex Selvenraja</p>
                        <p className="text-xs text-muted">Founder & Principal Buyers Agent</p>
                      </div>
                    </div>
                    <div className="flex gap-3 pt-3 border-t border-black/5">
                      <Mail className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-xs font-bold text-muted uppercase">Email Address</h4>
                        <a href="mailto:info@jjpropertypartner.com.au" className="text-sm font-bold text-[#011122] hover:text-gold transition-colors">info@jjpropertypartner.com.au</a>
                      </div>
                    </div>
                    <div className="flex gap-3 pt-3 border-t border-black/5">
                      <Phone className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-xs font-bold text-muted uppercase">Phone / WhatsApp</h4>
                        <a href="tel:+61481334458" className="text-sm font-bold text-[#011122] hover:text-gold transition-colors">0481 33 44 58</a>
                      </div>
                    </div>
                    <div className="flex gap-3 pt-3 border-t border-black/5">
                      <MapPin className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-xs font-bold text-muted uppercase">Office Address</h4>
                        <p className="text-sm font-bold text-[#011122]">Sydney, New South Wales, Australia</p>
                      </div>
                    </div>
                  </div>
                </section>

              </div>
            </article>

          </div>
        </section>
      </div>
    </>
  );
}
