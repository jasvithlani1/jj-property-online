import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Shield, Calendar, Award, FileText, ArrowRight } from 'lucide-react';
import SEO from '../components/SEO';

const sections = [
  { id: 'introduction', label: '1. Introduction' },
  { id: 'information-we-collect', label: '2. What We Collect' },
  { id: 'how-we-collect', label: '3. How We Collect' },
  { id: 'why-we-collect', label: '4. Why We Collect & Use' },
  { id: 'disclosure', label: '5. Disclosure of Info' },
  { id: 'overseas-disclosure', label: '6. Overseas Disclosure' },
  { id: 'cookies', label: '7. Cookies & Tracking' },
  { id: 'security', label: '8. Data Security' },
  { id: 'retention', label: '9. Data Retention' },
  { id: 'rights', label: '10. Your Privacy Rights' },
  { id: 'third-party-links', label: '11. Third-Party Links' },
  { id: 'aml-ctf', label: '11A. AML/CTF Obligations' },
  { id: 'childrens-privacy', label: '12. Children\'s Privacy' },
  { id: 'changes', label: '13. Changes to Policy' },
  { id: 'contact', label: '14. Contact Us' },
];

export default function PrivacyPolicy() {
  const [activeSection, setActiveSection] = useState('introduction');

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
        title="Privacy Policy | JJ Property Partner"
        description="Privacy Policy for JJ Property Partner PTY LTD. Learn how we collect, use, and protect your personal information in accordance with Australian Privacy Principles."
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
                <Shield className="w-4 h-4" /> Legal & Transparency
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-sans font-black leading-tight mb-4">
                Privacy <span className="text-gold">Policy</span>
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
              
              {/* Business Overview Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                {/* Registry & Licence Card */}
                <div className="p-6 rounded-2xl bg-neutral-50/80 border border-black/5 flex flex-col gap-4">
                  <h4 className="text-xs font-black text-[#011122] uppercase tracking-wider border-b border-black/5 pb-2 flex items-center gap-1.5">
                    <Shield className="w-4 h-4 text-gold" /> Registry & Licence
                  </h4>
                  <div className="space-y-4">
                    <div className="flex gap-3">
                      <Award className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                      <div>
                        <span className="text-[10px] font-bold text-muted uppercase tracking-wider block">Company</span>
                        <p className="text-sm font-bold text-[#011122]">JJ Property Partner PTY LTD</p>
                        <p className="text-xs text-muted">ABN: 71 687 187 113</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <Shield className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                      <div>
                        <span className="text-[10px] font-bold text-muted uppercase tracking-wider block">REA Licence</span>
                        <p className="text-sm font-bold text-[#011122]">REA Licence No. 20543356</p>
                        <p className="text-xs text-muted">NSW Fair Trading</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contact Information Card */}
                <div className="p-6 rounded-2xl bg-neutral-50/80 border border-black/5 flex flex-col gap-4">
                  <h4 className="text-xs font-black text-[#011122] uppercase tracking-wider border-b border-black/5 pb-2 flex items-center gap-1.5">
                    <Mail className="w-4 h-4 text-gold" /> Contact Channels
                  </h4>
                  <div className="space-y-4">
                    <div className="flex gap-3">
                      <Mail className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                      <div>
                        <span className="text-[10px] font-bold text-muted uppercase tracking-wider block">Email Address</span>
                        <a href="mailto:info@jjpropertypartner.com.au" className="text-sm font-bold text-[#011122] hover:text-gold transition-colors">info@jjpropertypartner.com.au</a>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <Phone className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                      <div>
                        <span className="text-[10px] font-bold text-muted uppercase tracking-wider block">Phone / WhatsApp</span>
                        <a href="tel:+61481334458" className="text-sm font-bold text-[#011122] hover:text-gold transition-colors">0481 33 44 58</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Disclaimer introduction */}
              <div className="text-base text-[#011122]/90 leading-relaxed space-y-4 mb-10 pb-8 border-b border-black/5">
                <p className="font-bold">
                  JJ Property Partner PTY LTD is committed to protecting your privacy and handling your personal information in accordance with the Privacy Act 1988 (Cth) and the Australian Privacy Principles (APPs). Please read this Policy carefully before using our website or engaging our services.
                </p>
              </div>

              {/* Legal Clauses */}
              <div className="space-y-12 text-[#6F6F6F] leading-relaxed text-sm md:text-base font-sans">
                
                <section id="introduction" className="scroll-mt-28">
                  <h2 className="text-xl md:text-2xl font-sans font-black text-[#011122] mb-4 uppercase tracking-tight flex items-center gap-2">
                    <span className="text-gold">01.</span> Introduction
                  </h2>
                  <p className="mb-4">
                    This Privacy Policy explains how JJ Property Partner PTY LTD (ABN 71 687 187 113) ('we', 'us', 'our') collects, uses, stores, and discloses your personal information when you visit our website at <a href="https://www.jjpropertypartner.com.au" className="text-gold hover:underline">www.jjpropertypartner.com.au</a>, contact us, or engage our buyers agent services. This Privacy Policy forms part of our overall contractual framework and should be read together with our Terms and Conditions, available at <a href="/terms-and-conditions" className="text-gold hover:underline">www.jjpropertypartner.com.au/terms-and-conditions</a>.
                  </p>
                  <p>
                    By accessing our website or providing us with your personal information, you consent to the collection, use, and disclosure of your personal information in accordance with this Privacy Policy.
                  </p>
                </section>

                <section id="information-we-collect" className="scroll-mt-28">
                  <h2 className="text-xl md:text-2xl font-sans font-black text-[#011122] mb-4 uppercase tracking-tight flex items-center gap-2">
                    <span className="text-gold">02.</span> What Personal Information We Collect
                  </h2>
                  <p className="mb-4">We may collect the following types of personal information:</p>
                  
                  <h3 className="text-base font-bold text-[#011122] mt-6 mb-2">2.1 Information You Provide Directly</h3>
                  <ul className="space-y-2 mb-6">
                    {[
                      'Full name',
                      'Email address',
                      'Phone number and WhatsApp contact details',
                      'Residential or business address',
                      'Property preferences, budget, and acquisition criteria',
                      'Financial information relevant to your property goals (borrowing capacity, deposit amount, portfolio details)',
                      'Self-Managed Super Fund (SMSF) details where relevant to your service engagement',
                      'Information provided in strategy session enquiry forms, contact forms, or direct communications',
                      'Any other information you choose to provide to us',
                      'Records of referral commissions or benefits received in connection with referrals made on your behalf'
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-gold shrink-0 mt-2" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <h3 className="text-base font-bold text-[#011122] mt-6 mb-2">2.2 Information Collected Automatically</h3>
                  <ul className="space-y-2 mb-6">
                    {[
                      'IP address and device type',
                      'Browser type and version',
                      'Pages visited and time spent on our website',
                      'Referring website or search terms used to find our website',
                      'Location data (general, not precise)',
                      'Cookie data and similar tracking technologies'
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-gold shrink-0 mt-2" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <h3 className="text-base font-bold text-[#011122] mt-6 mb-2">2.3 Sensitive Information</h3>
                  <p className="mb-4">
                    In certain circumstances, our services may involve the collection of sensitive information including financial information and, where relevant to SMSF property acquisitions, superannuation-related information. We will only collect sensitive information with your consent and where it is necessary for the provision of our services.
                  </p>
                  <p className="p-4 rounded-xl bg-gold/5 border-l-4 border-gold text-[#011122]/90 text-sm">
                    <strong>Sensitive financial information we may collect</strong> includes borrowing capacity assessments, identification documents, payslips, tax returns, bank statements, and SMSF trust deeds provided in connection with your property acquisition. This information is collected solely for the purpose of providing our buyers agent services and will be handled with the highest degree of confidentiality. Your explicit consent for the collection of sensitive information will be obtained during the onboarding process or within your Engagement Agreement.
                  </p>
                </section>

                <section id="how-we-collect" className="scroll-mt-28">
                  <h2 className="text-xl md:text-2xl font-sans font-black text-[#011122] mb-4 uppercase tracking-tight flex items-center gap-2">
                    <span className="text-gold">03.</span> How We Collect Your Personal Information
                  </h2>
                  <p className="mb-4">We collect personal information through the following means:</p>
                  <ul className="space-y-2">
                    {[
                      'Strategy session enquiry forms on our website',
                      'Contact forms and email communications',
                      'Phone calls and WhatsApp communications',
                      'In-person or video call consultations',
                      'Calendly booking system (for strategy session scheduling)',
                      'Third-party referrals from partners, associates, or existing clients',
                      'Google Reviews and publicly available information',
                      'Automatically through website cookies and analytics tools',
                      'Records of cooling-off period notices and Engagement Agreement execution',
                      'Identity verification documents collected for Anti-Money Laundering and Counter-Terrorism Financing (AML/CTF) compliance purposes, including government-issued photo identification and proof of address'
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-gold shrink-0 mt-2" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                <section id="why-we-collect" className="scroll-mt-28">
                  <h2 className="text-xl md:text-2xl font-sans font-black text-[#011122] mb-4 uppercase tracking-tight flex items-center gap-2">
                    <span className="text-gold">04.</span> Why We Collect and Use Your Personal Information
                  </h2>
                  
                  <h3 className="text-base font-bold text-[#011122] mt-4 mb-2">4.1 Primary Purpose — Service Delivery</h3>
                  <ul className="space-y-2 mb-6">
                    {[
                      'To provide buyers agent services including property search, due diligence, negotiation, and settlement coordination',
                      'To understand your property goals, budget, and acquisition criteria',
                      'To identify suitable properties and present acquisition recommendations',
                      'To conduct suburb research, due diligence, and market analysis on your behalf',
                      'To communicate with your legal, financial, and other professional advisers as required',
                      'To manage our ongoing client relationship throughout your property acquisition'
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-gold shrink-0 mt-2" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <h3 className="text-base font-bold text-[#011122] mt-6 mb-2">4.2 Administrative and Business Purposes</h3>
                  <ul className="space-y-2 mb-6">
                    {[
                      'To respond to your enquiries and strategy session bookings',
                      'To schedule and manage appointments via our booking system',
                      'To send service-related communications including updates and settlement milestones',
                      'To maintain business records and comply with legal and regulatory obligations',
                      'To manage invoicing, payments, and our engagement agreement with you',
                      'To maintain records of referral commissions received from third-party service providers in accordance with our disclosure obligations under the Property and Stock Agents Act 2002 (NSW)',
                      'To comply with our obligations under the Anti-Money Laundering and Counter-Terrorism Financing Act 2006 (Cth) and related regulations, including identity verification, record keeping, and suspicious matter reporting obligations',
                      'To verify your identity and conduct customer due diligence as required by applicable AML/CTF laws and regulations'
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-gold shrink-0 mt-2" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <h3 className="text-base font-bold text-[#011122] mt-6 mb-2">4.3 Marketing and Communication</h3>
                  <ul className="space-y-2 mb-4">
                    {[
                      'To send you relevant property market updates, insights, and blog content (where you have consented)',
                      'To inform you of new services or changes to our existing services',
                      'To improve our website content and user experience'
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-gold shrink-0 mt-2" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <p>
                    You may opt out of marketing communications at any time by contacting us at <a href="mailto:info@jjpropertypartner.com.au" className="text-gold hover:underline">info@jjpropertypartner.com.au</a> or clicking the unsubscribe link in any marketing email.
                  </p>
                </section>

                <section id="disclosure" className="scroll-mt-28">
                  <h2 className="text-xl md:text-2xl font-sans font-black text-[#011122] mb-4 uppercase tracking-tight flex items-center gap-2">
                    <span className="text-gold">05.</span> Disclosure of Your Personal Information
                  </h2>
                  <p className="mb-4">We may disclose your personal information to the following third parties where necessary for the provision of our services or as required by law:</p>
                  
                  <h3 className="text-base font-bold text-[#011122] mt-4 mb-2">5.1 Service Providers and Professional Advisers</h3>
                  <ul className="space-y-2 mb-6">
                    {[
                      'Selling agents, real estate agencies, and property vendors (as part of property acquisition processes)',
                      'Mortgage brokers and lending institutions (as instructed by you)',
                      'Solicitors and conveyancers coordinating your property settlement',
                      'Building and pest inspection companies conducting inspections on your behalf',
                      'SMSF advisers, accountants, and auditors where relevant to your engagement',
                      'Financial planners or investment advisers you have authorised us to liaise with'
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-gold shrink-0 mt-2" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <h3 className="text-base font-bold text-[#011122] mt-6 mb-2">5.2 Technology and Platform Providers</h3>
                  <ul className="space-y-2 mb-6">
                    {[
                      'Website hosting and content management providers (Hostinger)',
                      'Email service providers for business communications',
                      'Calendly (appointment scheduling platform)',
                      'Google Analytics and Google Reviews platform',
                      'WhatsApp Business (Meta Platforms) for client communications',
                      'Cloud storage and document management service providers'
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-gold shrink-0 mt-2" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <h3 className="text-base font-bold text-[#011122] mt-6 mb-2">5.3 Legal and Regulatory Disclosure</h3>
                  <p className="mb-4">
                    We may disclose your personal information to government bodies, regulators, or law enforcement agencies where required by law, a court order, or in response to a lawful request. This includes disclosure to NSW Fair Trading in connection with our REA licence obligations.
                  </p>

                  <h3 className="text-base font-bold text-[#011122] mt-6 mb-2">5.4 Business Transfers</h3>
                  <p className="mb-4">
                    In the event of a sale, merger, or acquisition of JJ Property Partner PTY LTD, your personal information may be transferred to the acquiring entity as part of that transaction. We will notify you of any such transfer in accordance with applicable privacy laws. We do not sell, rent, or trade your personal information to third parties for their own marketing purposes.
                  </p>

                  <h3 className="text-base font-bold text-[#011122] mt-6 mb-2">5.5 Referral Partners</h3>
                  <p className="mb-4">
                    Where the Company refers clients to third-party service providers — including mortgage brokers, accountants, financial planners, solicitors, conveyancers, building and pest inspectors, or other professionals — the Company may disclose your name and contact details to those providers for the purpose of facilitating the referral.
                  </p>
                  <p>
                    The Company may receive a referral commission or benefit in connection with these referrals. All such referrals and commissions will be disclosed to you in writing prior to or at the time of the referral. You are under no obligation to engage any referred provider.
                  </p>
                </section>

                <section id="overseas-disclosure" className="scroll-mt-28">
                  <h2 className="text-xl md:text-2xl font-sans font-black text-[#011122] mb-4 uppercase tracking-tight flex items-center gap-2">
                    <span className="text-gold">06.</span> Overseas Disclosure
                  </h2>
                  <p>
                    Some of the third-party platforms and service providers we use (including Google, Meta/WhatsApp, and Calendly) may store or process personal information outside of Australia. Where we disclose personal information to overseas recipients, we take reasonable steps to ensure those recipients handle your information in accordance with the Australian Privacy Principles or equivalent privacy standards.
                  </p>
                </section>

                <section id="cookies" className="scroll-mt-28">
                  <h2 className="text-xl md:text-2xl font-sans font-black text-[#011122] mb-4 uppercase tracking-tight flex items-center gap-2">
                    <span className="text-gold">07.</span> Cookies and Website Tracking
                  </h2>
                  <p className="mb-4">
                    Our website uses cookies and similar tracking technologies to enhance your browsing experience and to analyse website traffic. Cookies are small text files stored on your device when you visit our website.
                  </p>

                  <h3 className="text-base font-bold text-[#011122] mt-4 mb-2">7.1 Types of Cookies We Use</h3>
                  <ul className="space-y-2 mb-6">
                    {[
                      'Essential cookies — necessary for the website to function correctly',
                      'Analytics cookies — to understand how visitors interact with our website (Google Analytics)',
                      'Marketing cookies — to track the effectiveness of our marketing activities',
                      'Preference cookies — to remember your settings and preferences'
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-gold shrink-0 mt-2" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <h3 className="text-base font-bold text-[#011122] mt-6 mb-2">7.2 Managing Cookies</h3>
                  <p>
                    You can control and manage cookies through your browser settings. Please note that disabling certain cookies may affect the functionality of our website. For information on managing cookies in your browser, please refer to your browser's help documentation.
                  </p>
                </section>

                <section id="security" className="scroll-mt-28">
                  <h2 className="text-xl md:text-2xl font-sans font-black text-[#011122] mb-4 uppercase tracking-tight flex items-center gap-2">
                    <span className="text-gold">08.</span> Data Security
                  </h2>
                  <p className="mb-4">
                    We take reasonable steps to protect your personal information from misuse, interference, loss, unauthorised access, modification, or disclosure. Our security measures include:
                  </p>
                  <ul className="space-y-2 mb-4">
                    {[
                      'Secure website hosting with SSL encryption',
                      'Access controls limiting personal information access to authorised personnel only',
                      'Secure email and communication platforms',
                      'Regular review of our data security practices and procedures'
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-gold shrink-0 mt-2" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <p>
                    While we take all reasonable precautions, no data transmission over the internet or electronic storage system can be guaranteed as completely secure. We cannot guarantee the absolute security of your personal information.
                  </p>
                </section>

                <section id="retention" className="scroll-mt-28">
                  <h2 className="text-xl md:text-2xl font-sans font-black text-[#011122] mb-4 uppercase tracking-tight flex items-center gap-2">
                    <span className="text-gold">09.</span> How Long We Retain Your Information
                  </h2>
                  <p className="mb-4">We retain your personal information for as long as necessary to provide our services to you and to comply with our legal obligations. Specifically:</p>
                  <ul className="space-y-2 mb-6">
                    {[
                      'Client engagement records — retained for a minimum of 7 years following the completion of our services, in accordance with NSW Fair Trading licence requirements',
                      'Enquiry and contact records — retained for up to 3 years from the date of last contact',
                      'Financial and transaction records — retained for 7 years in accordance with Australian taxation law',
                      'Website analytics data — retained in accordance with the applicable platform provider\'s retention policies',
                      'Anti-Money Laundering records — identity verification documents, customer due diligence records, and transaction records are retained for a minimum of 7 years from the date of the transaction or the end of the business relationship, in accordance with the Anti-Money Laundering and Counter-Terrorism Financing Act 2006 (Cth)'
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-gold shrink-0 mt-2" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <p>
                    When personal information is no longer required, we will take reasonable steps to destroy or de-identify it securely.
                  </p>
                </section>

                <section id="rights" className="scroll-mt-28">
                  <h2 className="text-xl md:text-2xl font-sans font-black text-[#011122] mb-4 uppercase tracking-tight flex items-center gap-2">
                    <span className="text-gold">10.</span> Your Privacy Rights
                  </h2>
                  <p className="mb-4">Under the Privacy Act 1988 (Cth) and the Australian Privacy Principles, you have the following rights in relation to your personal information:</p>

                  <h3 className="text-base font-bold text-[#011122] mt-4 mb-2">10.1 Right of Access</h3>
                  <p className="mb-4">
                    You have the right to request access to the personal information we hold about you. To make an access request, please contact us in writing at <a href="mailto:info@jjpropertypartner.com.au" className="text-gold hover:underline">info@jjpropertypartner.com.au</a>. We will respond to your request within 30 days. We may charge a reasonable fee for providing access to your information.
                  </p>

                  <h3 className="text-base font-bold text-[#011122] mt-6 mb-2">10.2 Right to Correction</h3>
                  <p className="mb-4">
                    If you believe that the personal information we hold about you is inaccurate, out of date, incomplete, irrelevant, or misleading, you have the right to request that we correct it. We will take reasonable steps to correct your information within 30 days of your request.
                  </p>

                  <h3 className="text-base font-bold text-[#011122] mt-6 mb-2">10.3 Right to Withdraw Consent</h3>
                  <p className="mb-4">
                    Where we rely on your consent to use your personal information, you have the right to withdraw your consent at any time. Withdrawal of consent will not affect the lawfulness of any processing carried out prior to your withdrawal.
                  </p>

                  <h3 className="text-base font-bold text-[#011122] mt-6 mb-2">10.4 Right to Complain</h3>
                  <p className="mb-4">
                    If you believe we have breached the Australian Privacy Principles or mishandled your personal information, you have the right to lodge a complaint with us directly or with the Office of the Australian Information Commissioner (OAIC).
                  </p>
                  <p>
                    To lodge a complaint with the OAIC, visit: <a href="https://www.oaic.gov.au" target="_blank" rel="noopener noreferrer" className="text-gold hover:underline flex-inline items-center">www.oaic.gov.au</a> or call 1300 363 992.
                  </p>
                </section>

                <section id="third-party-links" className="scroll-mt-28">
                  <h2 className="text-xl md:text-2xl font-sans font-black text-[#011122] mb-4 uppercase tracking-tight flex items-center gap-2">
                    <span className="text-gold">11.</span> Third-Party Websites and Links
                  </h2>
                  <p>
                    Our website may contain links to third-party websites, including real estate listing portals, government grant information pages, and partner service providers. This Privacy Policy does not apply to those third-party websites. We encourage you to review the privacy policies of any third-party websites you visit through links on our website.
                  </p>
                </section>

                <section id="aml-ctf" className="scroll-mt-28">
                  <h2 className="text-xl md:text-2xl font-sans font-black text-[#011122] mb-4 uppercase tracking-tight flex items-center gap-2">
                    <span className="text-gold">11A.</span> Anti-Money Laundering and Counter-Terrorism Financing
                  </h2>
                  <p className="mb-4">
                    JJ Property Partner PTY LTD is subject to obligations under the Anti-Money Laundering and Counter-Terrorism Financing Act 2006 (Cth) (AML/CTF Act) and the Anti-Money Laundering and Counter-Terrorism Financing Rules Instrument 2007 (Cth). In connection with these obligations, we are required to collect, verify, and retain certain personal information about our clients.
                  </p>

                  <h3 className="text-base font-bold text-[#011122] mt-4 mb-2">11A.1 Identity Verification</h3>
                  <p className="mb-4">
                    Before or during the onboarding process, we may be required to verify your identity by collecting and checking one or more of the following documents:
                  </p>
                  <ul className="space-y-2 mb-6">
                    {[
                      'Current Australian passport or foreign passport',
                      'Australian driver\'s licence or state/territory photo identification card',
                      'Medicare card (as a supporting document)',
                      'Birth certificate',
                      'Proof of address (such as a utility bill or government correspondence dated within the past 3 months)'
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-gold shrink-0 mt-2" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mb-4">
                    For corporate clients, SMSF trustees, or trust structures, additional documentation may be required including company ASIC extracts, trust deeds, and identification of beneficial owners and controlling persons.
                  </p>

                  <h3 className="text-base font-bold text-[#011122] mt-6 mb-2">11A.2 Upcoming AML/CTF Obligations — Effective 1 July 2026</h3>
                  <p className="mb-4">
                    The Anti-Money Laundering and Counter-Terrorism Financing Amendment Act 2024 (Cth) expands the AML/CTF regime to include real estate professionals, including buyers agents, as designated reporting entities. These expanded obligations take effect from 1 July 2026.
                  </p>
                  <p className="mb-4">From 1 July 2026, JJ Property Partner PTY LTD will be required to:</p>
                  <ul className="space-y-2 mb-6">
                    {[
                      'Implement and maintain an AML/CTF Program',
                      'Conduct Customer Due Diligence (CDD) on all clients',
                      'Conduct Enhanced Due Diligence (EDD) on higher-risk clients, transactions, or jurisdictions',
                      'Monitor ongoing client relationships for unusual or suspicious activity',
                      'Report suspicious matters to AUSTRAC',
                      'Report threshold transactions (AUD 10,000 or more) to AUSTRAC',
                      'Retain all AML/CTF records for a minimum of 7 years'
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-gold shrink-0 mt-2" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <h3 className="text-base font-bold text-[#011122] mt-6 mb-2">11A.3 Suspicious Matter Reporting</h3>
                  <p className="mb-4">
                    Under the AML/CTF Act, we are required to submit a Suspicious Matter Report (SMR) to AUSTRAC if we have reasonable grounds to suspect that a transaction or activity may be related to money laundering, terrorism financing, tax evasion, or other serious criminal activity. We are prohibited by law from disclosing to any person (including the subject of the report) that an SMR has been or may be submitted.
                  </p>

                  <h3 className="text-base font-bold text-[#011122] mt-6 mb-2">11A.4 Consequences of Non-Provision</h3>
                  <p>
                    If you do not provide the identity verification information we request, we may be unable to commence or continue providing our services to you. This is not a choice — it is a legal obligation. We will inform you if we are unable to proceed due to incomplete identity verification.
                  </p>
                </section>

                <section id="childrens-privacy" className="scroll-mt-28">
                  <h2 className="text-xl md:text-2xl font-sans font-black text-[#011122] mb-4 uppercase tracking-tight flex items-center gap-2">
                    <span className="text-gold">12.</span> Children's Privacy
                  </h2>
                  <p>
                    Our website and services are not directed at children under the age of 18. We do not knowingly collect personal information from children under 18. If you are under 18, please do not submit any personal information through our website or contact forms. If we become aware that we have inadvertently collected personal information from a child under 18, we will take steps to delete that information promptly.
                  </p>
                </section>

                <section id="changes" className="scroll-mt-28">
                  <h2 className="text-xl md:text-2xl font-sans font-black text-[#011122] mb-4 uppercase tracking-tight flex items-center gap-2">
                    <span className="text-gold">13.</span> Changes to This Privacy Policy
                  </h2>
                  <p>
                    We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors. When we update this Policy, we will revise the 'Last Updated' date at the top of this document and publish the updated Policy on our website. We encourage you to review this Privacy Policy periodically to stay informed about how we are protecting your personal information. Your continued use of our website or services after any changes to this Policy constitutes your acceptance of the updated Privacy Policy.
                  </p>
                </section>

                <section id="contact" className="scroll-mt-28 border-t border-black/5 pt-8">
                  <h2 className="text-xl md:text-2xl font-sans font-black text-[#011122] mb-4 uppercase tracking-tight flex items-center gap-2">
                    <span className="text-gold">14.</span> Contact Us — Privacy Enquiries
                  </h2>
                  <p className="mb-6">For all privacy-related enquiries, requests for access or correction, or complaints, please contact us:</p>
                  
                  <div className="p-6 rounded-2xl bg-neutral-50 border border-black/5 space-y-4 max-w-lg">
                    <div className="flex gap-3">
                      <Award className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-xs font-bold text-muted uppercase">Privacy Officer</h4>
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
