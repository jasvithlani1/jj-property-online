
import { motion } from 'framer-motion';
import { ArrowUpRight, BadgeCheck, Briefcase, Building2, MapPin, Target, Search, Handshake } from 'lucide-react';
import Link from '../components/Link';
import React, { useState, useEffect } from 'react';
import { client, urlFor } from '../lib/sanity';
import PageSEO from '../components/PageSEO';

export default function About() {
 const [aboutData, setAboutData] = useState<any>(null);

 useEffect(() => {
 const fetchAboutData = async () => {
 try {
 const query = `*[_type == "aboutPage"][0] {
  seoModule {
   metaTitle,
   metaDescription,
   ogImage { asset, hotspot },
   canonicalUrl,
   noIndex,
   schemaModules[] {
     _type, enabled,
     _type == "faqSchema" => { faqs[]{ _key, question, answer } },
     _type == "reviewSchema" => { ratingValue, ratingCount, bestRating, worstRating },
     _type == "serviceSchema" => { serviceName, serviceDescription, areaServed }
   }
  },
  profile,
  purpose,
  trackRecord,
  techAdvantage,
  values,
  pillarsSection,
  credentials
  }`;
 const data = await client.fetch(query);
 if (data) setAboutData(data);
 } catch {
 }
 };
 fetchAboutData();
 }, []);

 return (
 <>
 <PageSEO
        title={"About Us - Trusted Buyers Agent Australia"}
        description={"JJ Property Partner offers expert, data-driven property buying across Australia with off-market access, smart negotiation, and personalized investment strategies."}
        seoModule={aboutData?.seoModule}
        path="/about"
        breadcrumbs={[{ name: 'About', url: '/about' }]}
      />
 
 <div className="w-full bg-white selection:bg-gold/20 ">

  {/* Profile Section (New Hero) */}
  <section className="pt-[110px] pb-4 md:pt-40 md:pb-4 px-8 bg-white">
  <div className="max-w-7xl mx-auto">
   <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 1 }}
    className="text-center mb-2 md:mb-8 mt-2 md:mt-0"
   >
   <h1 className="text-4xl sm:text-4xl md:text-5xl font-sans font-black text-[#011122] leading-tight">
   {aboutData?.profile?.heading ? (
   <>
   {aboutData.profile.heading.split(',')[0]}, <br />
   <span className="text-gold ">{aboutData.profile.heading.split(',').slice(1).join(',').trim()}</span>
   </>
   ) : (
   <>
   A Smarter Way to Buy, <br />
   <span className="text-gold ">Built on Experience.</span>
   </>
   )}
   </h1>
  </motion.div>
 <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 md:gap-16 items-start">
  <motion.div
  initial={{ opacity: 0, x: -40 }}
  whileInView={{ opacity: 1, x: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 1 }}
  className="lg:col-span-5 relative"
  >
  <div className="relative rounded-[3rem] overflow-hidden shadow-2xl group">
  <img
  src={aboutData?.profile?.image ? urlFor(aboutData.profile.image).url() : "/buyers-agent-showing.jpg"}
  alt={aboutData?.profile?.image?.alt || "Alex - Founder of JJ Property Partner"}
  className="w-full aspect-[3/4] max-h-[460px] object-cover hover:scale-105 transition-all duration-700 brightness-[0.95]"
  />
 <div className="absolute inset-0 bg-gradient-to-t from-[#011122]/60 via-transparent to-transparent" />
 <div className="absolute bottom-10 left-10 text-white">
 <p className="text-4xl font-sans font-black mb-1">Alex</p>
 <p className="text-xs font-sans tracking-[0.3em] uppercase text-gold font-bold">Founder & Principal Advisor</p>
 </div>
 </div>
 
 {/* Decorative gold element */}
 <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gold/10 rounded-full blur-3xl -z-10" />
 </motion.div>

  <motion.div
  initial={{ opacity: 0, x: 40 }}
  whileInView={{ opacity: 1, x: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 1, delay: 0.2 }}
  className="lg:col-span-7 space-y-3 text-center"
  >
 <div className="space-y-3 text-lg text-muted font-sans leading-relaxed text-left">
 <p className="text-xl text-[#011122] font-medium leading-relaxed text-left">
 {aboutData?.profile?.quote || "\"JJ Property Partner was founded on a simple belief: every buyer deserves professional representation backed by deep analytical rigor.\""}
 </p>
 {aboutData?.profile?.description ? (
 aboutData.profile.description.split('\n\n').map((para: string, i: number) => (
 <p key={i}>{para}</p>
 ))
 ) : (
 <>
 <p>
 Alex brings more than 20 years of experience in technology and real estate to the table. As a licensed buyers agent and seasoned property investor, he bridges the gap between traditional market knowledge and modern data analytics. Based in Sydney and working with clients nationwide, he ensures that every acquisition is treated with the same precision as his own personal portfolio.
 </p>
 <p>
 The name <span className="text-[#011122] font-bold ">“JJ”</span> reflects the family values at the heart of our firm. Named after Alex’s daughters, Jessica and Jennifer, the business is a testament to long-term legacy and genuine care. We don't just find houses; we secure the right foundations for your future.
 </p>
 </>
 )}
 </div>

  <div className="py-2 md:pt-6 md:pb-0 grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-0 border-t border-gold/10">
  {(aboutData?.profile?.stats || [
  { label: 'IT & Real Estate', value: '20+ Years' },
  { label: 'Personal Portfolio', value: '$6M+' },
  { label: 'Service Area', value: 'Nationwide' }
  ]).map((stat: any, i: number) => (
  <div key={i} className={`flex flex-col items-center text-center gap-1 sm:border-r border-gold/20 sm:last:border-r-0 sm:px-6 first:pl-0 last:pr-0`}>
  <span className="text-2xl font-sans font-black text-[#011122]">{stat.value}</span>
  <span className="text-xs font-bold uppercase tracking-widest text-muted">{stat.label}</span>
  </div>
  ))}
  </div>
 </motion.div>
 </div>
 </div>
 </section>

 {/* Purpose Section */}
 <section className="py-4 mt-3.5 px-8 bg-[#FFFBF2] overflow-hidden">
 <div className="max-w-4xl mx-auto text-center">
 <motion.div
 initial={{ opacity: 0, y: 30 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 transition={{ duration: 0.8 }}
 >
 <div className="text-7xl md:text-8xl font-sans font-black text-gold/40 leading-none mb-2 select-none">JJ</div>
 <h2 className="text-3xl md:text-5xl font-sans font-black text-[#011122] mb-2">
 {aboutData?.purpose?.heading ? (
   <span dangerouslySetInnerHTML={{ __html: aboutData.purpose.heading.replace('. ', '. <br class="block md:hidden" /> ') }} />
 ) : (
   <>A name with purpose. <br className="block md:hidden" /> A promise with heart.</>
 )}
 </h2>
 
 <div className="space-y-2 text-lg md:text-xl text-muted font-sans leading-relaxed mb-2 text-left">
 {aboutData?.purpose?.description ? (
 aboutData.purpose.description.split('\n\n').map((para: string, i: number) => <p key={i}>{para.replace(/—/g, '-')}</p>)
 ) : (
 <>
 <p>
 The initials <span className="text-[#011122] font-semibold">JJ</span> carry deep personal meaning. They represent the two people who inspired Alex to build something lasting - his daughters <span className="text-[#011122] font-medium">Jessica and Jennifer</span>.
 </p>
 <p>
 Every property acquisition, every negotiation, every piece of advice is delivered with the same dedication he puts into building their future.
 </p>
 </>
 )}
 </div>

 <div className="my-6 md:my-8">
 <Link 
 href="/contact" 
 className="relative inline-flex items-center gap-3 px-12 py-3 md:py-5 bg-gold text-[#011122] text-sm font-bold uppercase tracking-[0.3em] rounded-[2px] shadow-xl transition-all hover:scale-105 active:scale-95 group overflow-hidden"
 >
 {/* Shine Effect */}
 <div className="absolute inset-0 w-1/2 h-full bg-white/20 -skew-x-[25deg] -translate-x-[150%] group-hover:translate-x-[250%] transition-transform duration-1000 ease-in-out" />
 
 <span className="relative z-10">Start Your Journey</span>
 <ArrowUpRight className="relative z-10 w-4 h-4 transition-transform duration-300" />
 </Link>
 </div>

 <div className="flex items-center justify-center gap-12 md:gap-24 relative">
 <div className="flex flex-col items-center">
 <span className="text-7xl md:text-8xl font-sans font-black text-[#011122]">J</span>
 <span className="text-xs font-bold uppercase tracking-[0.3em] text-muted mt-2">Jessica</span>
 </div>
 
 <div className="text-3xl md:text-4xl font-sans font-black text-gold">+</div>
 
 <div className="flex flex-col items-center">
 <span className="text-7xl md:text-8xl font-sans font-black text-[#011122]">J</span>
 <span className="text-xs font-bold uppercase tracking-[0.3em] text-muted mt-2">Jennifer</span>
 </div>
 </div>
 </motion.div>
 </div>
 </section>

 {/* Track Record & Tech Advantage */}
 <section className="py-4 md:py-4 mt-2 md:mt-3.5 bg-white px-8 relative overflow-hidden">
  <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-16 relative z-10">
 <motion.div
 initial={{ opacity: 0, y: 30 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 transition={{ duration: 0.6 }}
 className="bg-white p-10 md:p-12 rounded-[2rem] shadow-sm border border-gold/10 text-center"
 >
 <h3 className="text-3xl font-sans font-black mb-2 text-[#011122]">{aboutData?.trackRecord?.title || "Alex's Personal Track Record"}</h3>
 <div className="space-y-4 text-base md:text-lg text-muted font-sans leading-relaxed text-left">
 <p>
 {aboutData?.trackRecord?.content ? aboutData.trackRecord.content.replace(/\$5 million/g, '$6 million') : "Alex has personally built a property portfolio valued at more than $6 million across multiple Australian states. That experience is grounded in real purchasing decisions made through changing market conditions, interest rate movements, and economic cycles. Every recommendation he gives clients is shaped by the same disciplined research, due diligence, and long-term thinking he applies to his own property strategy."}
 </p>
 </div>
 </motion.div>

 <motion.div
 initial={{ opacity: 0, y: 30 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 transition={{ duration: 0.6, delay: 0.2 }}
 className="bg-[#011122] text-white p-10 md:p-12 rounded-[2rem] shadow-xl relative overflow-hidden text-center"
 >
 <div className="absolute top-0 right-0 w-64 h-64 bg-gold/10 rounded-full blur-[60px]" />
 <h3 className="text-3xl font-sans font-black mb-2 relative z-10">{aboutData?.techAdvantage?.title || "The Technology Advantage"}</h3>
 <div className="space-y-4 text-base md:text-lg text-white/70 font-sans leading-relaxed relative z-10 text-left">
 <p>
 {aboutData?.techAdvantage?.content || "Alex’s IT background shapes the way JJ Property Partner approaches every property purchase. With more than 20 years in information technology, he brings analytical thinking, data modelling, and a systems-led process to identifying opportunities across Australia. This helps buyers make informed decisions backed by research, market evidence, and a clear understanding of long-term property potential, rather than relying on guesswork or emotion."}
 </p>
 </div>
 </motion.div>
 </div>
 </section>

  {/* Core Values */}
  <section className="pt-0 pb-6 md:py-4 mt-2 md:mt-3.5 px-8 bg-white">
  <div className="max-w-7xl mx-auto">
  <div className="text-center mb-6 md:mb-8">
 <h2 className="text-4xl md:text-5xl font-sans font-black text-black mb-4 md:mb-2">Our Core Values</h2>
 <div className="h-1 w-20 bg-gold mx-auto rounded-full" />
 </div>
 
 <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-8">
 {(aboutData?.values || [
 { title: 'Truly Independent, Always Buyer-Focused', description: 'JJ Property Partner is a dedicated buyers-only agency, acting solely in the interests of the buyer at every stage of the property journey. We do not represent sellers, developers, or third parties, so there is never a conflict of interest. Our advice remains completely independent, transparent, and focused on securing the right outcome for you.' },
 { title: 'Clear Advice, Every Step', description: 'We believe property decisions should be backed by clear communication and honest guidance. We are upfront about our fees, research process, market insights, and recommendations from day one. You will always know where you stand and what risks or opportunities exist, so you can move forward with complete confidence.' },
 { title: 'Direct Access, Personal Guidance', description: 'At JJ Property Partner, every client works directly with Alex from the initial strategy session through to settlement. You are not passed between team members or treated like a number. This hands-on approach ensures clear communication, consistent guidance, and a personalized buying experience built on trust, accountability, and genuine attention to your goals.' },
 { title: 'Building Wealth for the Long Run', description: 'Every purchase is guided by a long-term strategy built to support financial growth, portfolio strength, and lasting security. We work with buyers who want more than a quick transaction, helping them make confident decisions today while planning for tomorrow. That is why many clients return for their second, third, and even fourth property as their goals continue to grow.' }
 ]).map((value: any, index: number) => (
 <motion.div 
 key={index}
 initial={{ opacity: 0, y: 30 }} 
 whileInView={{ opacity: 1, y: 0 }} 
 viewport={{ once: true }} 
 transition={{ duration: 0.6, delay: index * 0.1 }} 
 className="p-8 md:p-10 rounded-[2rem] bg-[#011122] border border-white/5 shadow-2xl hover:bg-[#011830] hover:border-gold/30 transition-all duration-500 group"
 >
  <div className="flex flex-row items-center justify-center mb-4">
  <h4 className="text-2xl font-sans font-black text-gold text-center">{value.title}</h4>
  </div>
 <p className="text-white/70 text-base md:text-lg leading-relaxed text-left">{value.description}</p>
 </motion.div>
 ))}
 </div>
 </div>
 </section>

 {/* Pillars Section */}
 <section className="py-6 md:py-16 mt-2 md:mt-3.5 px-8 bg-[#011122] text-white relative overflow-hidden">
 <div className="absolute inset-0 w-full h-full opacity-20">
 <div className="absolute top-10 left-10 w-72 h-72 bg-gold rounded-full blur-[120px]" />
 <div className="absolute bottom-10 right-10 w-96 h-96 bg-gold/80 rounded-full blur-[140px]" />
 </div>

 <div className="max-w-7xl mx-auto relative z-10 text-center mb-6">
 <h2 className="text-4xl md:text-5xl font-sans font-black mb-2 drop-shadow-lg text-gold">{aboutData?.pillarsSection?.heading || "Three Pillars of Our Service"}</h2>
 <p className="text-lg font-sans text-white/70 max-w-2xl mx-auto">
 {aboutData?.pillarsSection?.subheading || "Our unyielding commitment to precision, integrity, and market-beating results."}
 </p>
 </div>

 <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-8 relative z-10 items-stretch">
 {(aboutData?.pillarsSection?.pillars || [
 {
 title: "Data-Driven Precision",
 text: "Backed by over 20 years of analytical experience, we use advanced suburb research and property assessment to guide every recommendation. Our approach is grounded in evidence, not emotion, helping identify true value and long-term growth potential."
 },
 {
 title: "Off-Market Access",
 text: "Through strong relationships with selling agents and industry professionals across Australia, we help clients access off-market and pre-market opportunities, reducing competition and creating conditions for smarter buying decisions."
 },
 {
 title: "Executive Representation",
 text: "We act solely in your best interests, managing negotiations with discretion, protecting your privacy, and representing you throughout the purchase process with a strategic, data-led approach designed to secure the right terms."
 }
 ]).map((val: any, i: number) => (
  <motion.div
  key={i}
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6, delay: i * 0.1 }}
  className="p-6 md:p-10 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-gold/30 transition-all duration-300 backdrop-blur-sm group text-center flex flex-col h-full"
  >
   <div className="flex flex-row items-center justify-start gap-4 mb-4 w-full min-h-[72px]">
   <div className="p-3 rounded-2xl bg-white/5 border border-white/5 group-hover:scale-110 transition-transform duration-500 shrink-0">
   {i === 0 ? <Target className="w-6 h-6 text-gold" /> : i === 1 ? <Search className="w-6 h-6 text-gold" /> : <Handshake className="w-6 h-6 text-gold" />}
   </div>
   <h3 className="text-xl md:text-2xl font-sans font-black text-gold leading-tight text-left">{val.title}</h3>
   </div>
  <p className="text-white/60 font-sans leading-relaxed text-base md:text-lg text-left flex-1">
  {val.text}
  </p>
  </motion.div>
 ))}
 </div>
 </section>

  {/* Credentials */}
  {(() => {
    const iconMap: Record<string, React.ReactNode> = {
      BadgeCheck: <BadgeCheck className="w-5 h-5 text-gold" />,
      Briefcase:  <Briefcase  className="w-5 h-5 text-gold" />,
      Building2:  <Building2  className="w-5 h-5 text-gold" />,
      MapPin:     <MapPin     className="w-5 h-5 text-gold" />,
    };
    const fallbackItems = [
      { icon: 'BadgeCheck', label: 'REA Licence', value: '20543356' },
      { icon: 'Briefcase',  label: 'ABN',         value: '71 687 187 113' },
      { icon: 'Building2',  label: 'Business',    value: 'JJ Property Partner' },
      { icon: 'MapPin',     label: 'Location',    value: 'Sydney, NSW' },
    ];
    const heading = aboutData?.credentials?.heading || 'Credentials & Licencing';
    const items   = aboutData?.credentials?.items   || fallbackItems;
    return (
      <section className="pt-0.5 pb-4 md:pt-[30px] md:pb-4 mt-0.5 md:mt-0 px-4 sm:px-8 bg-neutral-50 border-t border-gold/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-2 md:mb-6 mt-1 md:mt-0">
            <h2 className="text-3xl md:text-4xl font-sans font-black text-black">{heading}</h2>
          </div>
          <div className="bg-white p-3 sm:p-4 md:p-5 rounded-3xl md:rounded-full shadow-sm border border-gold/10 grid grid-cols-1 min-[360px]:grid-cols-2 md:flex md:flex-row md:flex-wrap justify-between gap-2.5 sm:gap-4 md:gap-6 items-center max-w-5xl mx-auto">
            {items.map((cred: any, i: number) => (
              <div
                key={i}
                className="flex items-center gap-2 sm:gap-3 w-full md:w-auto justify-start p-2.5 sm:p-3 md:p-0 rounded-2xl md:rounded-none bg-neutral-50/50 md:bg-transparent border border-black/5 md:border-none md:border-r md:border-gold/20 md:pr-6 md:last:border-r-0 min-w-0"
              >
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gold/10 rounded-full flex items-center justify-center shrink-0 shadow-sm">
                  {iconMap[cred.icon] ?? <BadgeCheck className="w-5 h-5 text-gold" />}
                </div>
                <div className="flex flex-col items-start justify-center min-w-0">
                  <span className="text-[9px] sm:text-[10px] font-bold text-muted uppercase tracking-widest">{cred.label}</span>
                  <span className={`text-xs min-[400px]:text-sm sm:text-base font-sans font-black text-black leading-tight break-words min-w-0 ${cred.label === 'ABN' ? 'min-[400px]:whitespace-nowrap' : cred.label === 'Business' ? 'md:whitespace-nowrap' : 'whitespace-nowrap'}`}>{cred.value}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  })()}
 </div>
 </>
 );
}
