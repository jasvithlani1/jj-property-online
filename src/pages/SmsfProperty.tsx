import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import { openCalendly } from '../utils/calendly';
import Link from '../components/Link';
import { useEffect, useState } from 'react';
import { client, urlFor } from '../lib/sanity';
import PageSEO from '../components/PageSEO';

const smsfStepImages = [
 '/images/acquisitions/user_prop_19.png',
 '/images/acquisitions/user_prop_20.png',
 '/images/acquisitions/user_prop_21.png',
 '/images/acquisitions/prop_4.png',
 '/images/acquisitions/prop_5.png',
 '/images/acquisitions/aus_prop_kawana.png',
];

const smsfFaqs = [
 {
 question: 'Why buy property within an SMSF?',
 answer: 'Buying property through an SMSF can offer significant tax advantages, including a reduced tax rate on rental income and potential capital gains tax exemptions when you reach the pension phase.'
 },
 {
 question: 'How much do I need in super to buy property?',
 answer: 'Generally, lenders require a minimum balance of $200,000 to $250,000 to cover the deposit, purchasing costs, and required liquidity buffers, though this depends on your specific lender and strategy.'
 },
 {
 question: 'Can I use a mortgage to buy SMSF property?',
 answer: 'Yes, this is typically done through a Limited Recourse Borrowing Arrangement (LRBA). It involves specific legal structures and strictly defined borrowing conditions.'
 },
 {
 question: 'Can I live in the property I buy with my SMSF?',
 answer: 'No. Residential property held in an SMSF must meet the "sole purpose test," meaning it must be for the sole purpose of providing retirement benefits. You or your family cannot live in it.'
 },
 {
 question: 'Do you handle the SMSF setup process?',
 answer: 'We focus exclusively on the property acquisition. We work closely with your accountant, financial planner, or SMSF specialist who handles the legal setup and compliance of the fund itself.'
 }
];

const pillars = [
 {
 title: 'SMSF-Compliant Selection',
 description: 'Investing within super requires a specific lens. We focus on low-maintenance, high-demand residential assets that align with the long-term wealth preservation goals of a self-managed fund.\n\n• Focus on structural integrity\n• High-yield residential assets\n• Low maintenance requirements\n• Long-term growth focus',
 image: '/images/acquisitions/user_prop_16.png',
 },
 {
 title: 'Off-Market Sourcing Strategy',
 description: 'We use our nationwide network to find properties that meet the strict criteria for SMSF lending and compliance, often securing deals before they ever reach the public market.\n\n• National network of agents\n• Pre-market opportunities\n• Less competition for quality assets\n• Direct negotiation on your behalf',
 image: '/images/acquisitions/aus_house_4.png',
 },
 {
 title: 'End-to-End Coordination',
 description: 'SMSF purchases involve more "moving parts" than standard buys. We coordinate with your accountant, mortgage broker, and solicitor to ensure the acquisition meets all regulatory requirements.\n\n• Liaison with SMSF specialists\n• Managed due diligence\n• Compliance-focused reporting\n• Settlement support & coordination',
 image: '/images/acquisitions/prop_1.png',
 }
];

export default function SmsfProperty() {
 const [openFaq, setOpenFaq] = useState<number | null>(null);
 const [pageData, setPageData] = useState<any>(null);

 useEffect(() => {
 const fetchPageData = async () => {
 try {
 const query = `*[_type == "servicePage" && slug.current == "smsf-property"][0] {
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
      _type == "serviceSchema" => { serviceName, serviceDescription, areaServed },
      _type == "articleSchema" => { articleType, authorName, publishedDate, modifiedDate }
    }
  },
 hero,
 intro,
 pillars,
 process,
 readiness,
 whyJJ,
 faqs,
 finalCta
 }`;
 const data = await client.fetch(query);
 if (data) setPageData(data);
 } catch (err) {
 console.error('Error fetching SMSF Property page data:', err);
 }
 };
 fetchPageData();
 }, []);

 return (
 <>
 <PageSEO
        title={"SMSF Property Buyers Agent AU"}
        description={"Specialist property acquisition for Self-Managed Super Funds. We find high-performing, compliant residential assets to help grow your retirement wealth."}
        seoModule={pageData?.seoModule}
        path="/services/smsf-property"
        breadcrumbs={[{ name: 'Services', url: '/services' }, { name: 'SMSF Property', url: '/services/smsf-property' }]}
      />
 
 <div className="w-full bg-white selection:bg-gold/20 ">
 {/* Hero Section */}
 <section className="pt-32 pb-4 md:pt-40 md:pb-4 relative px-6 sm:px-8 bg-[#011122] text-white overflow-hidden">
 <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gold/10 blur-[160px] rounded-full -z-0 pointer-events-none" />
 <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gold/5 blur-[120px] rounded-full -z-0 pointer-events-none" />

 <div className="max-w-7xl mx-auto relative z-10 text-center">
 <motion.div
 initial={{ opacity: 0, y: 40 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.8 }}
 >
 <div className="inline-block px-7 py-3 rounded-full border border-gold/40 bg-white/10 text-sm font-bold uppercase tracking-[0.2em] text-white mb-4 md:mb-6 backdrop-blur-sm">
 {pageData?.hero?.badge || "SMSF Property"}
 </div>
 <h1 className="text-4xl sm:text-4xl md:text-5xl font-sans font-black leading-[1.1] mb-4 md:mb-6 max-w-5xl mx-auto px-4">
 {pageData?.hero?.heading?.includes('Fund') ? (
 <>Strategic Acquisitions for your <span className="text-gold">Self-Managed Super Fund.</span></>
 ) : pageData?.hero?.heading || (
 <>Strategic Acquisitions for your <span className="text-gold">Self-Managed Super Fund.</span></>
 )}
 </h1>
 <p className="text-xl md:text-2xl text-white/80 font-sans max-w-3xl mx-auto leading-relaxed text-left md:text-center">
 {pageData?.hero?.subheading || "Unlock the power of your super with residential property. We help you identify and secure high-performing, compliant assets nationwide."}
 </p>
 </motion.div>
 </div>
 </section>

 {/* Introduction Section */}
 <section className="py-4 px-8 bg-white overflow-hidden">
 <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-16 items-stretch">
 <motion.div
 initial={{ opacity: 0, x: -40 }}
 whileInView={{ opacity: 1, x: 0 }}
 viewport={{ once: true }}
 transition={{ duration: 0.8 }}
 className="text-center"
 >
 <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-black text-[#011122] mb-4 leading-tight">
 {pageData?.intro?.heading || "Secure Your Retirement with Smart SMSF Property Choices"}
 </h2>
 
 {/* Mobile Image */}
 <div className="relative h-[320px] rounded-[2rem] overflow-hidden shadow-2xl mb-4 lg:hidden">
 <img
 src={pageData?.intro?.image ? urlFor(pageData.intro.image).url() : "/images/acquisitions/aus_house_3.png"}
 alt="Modern Residential Property"
 className="absolute inset-0 w-full h-full object-cover"
 />
 <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
 </div>

 <div className="space-y-2 text-lg text-muted font-sans leading-relaxed text-left">
 <p>
 {pageData?.intro?.content || "Investing in residential property through an SMSF is a powerful way to build retirement wealth, but it requires a specialized approach that prioritizes compliance and long-term stability."}
 </p>
 <p className="font-semibold text-[#011122]">
 {pageData?.intro?.heading ? "What we offer:" : "How JJ Property Partner supports SMSF investors:"}
 </p>
 <ul className="space-y-2 pt-2">
 {(pageData?.intro?.benefits || [
 "Selection of properties that meet strict SMSF lending and compliance criteria",
 "Nationwide research to find the best growth and yield opportunities for your fund",
 "Strategic off-market access to secure quality assets with less competition",
 "Coordination with your accountant, broker, and solicitor for a seamless purchase",
 "Expert negotiation to ensure you secure the best possible terms for your fund"
 ]).map((item: string, idx: number) => (
 <li key={idx} className="flex items-start justify-start gap-4 text-left">
 <div className="w-2 h-2 rounded-full bg-gold shrink-0 mt-2" />
 <span>{item}</span>
 </li>
 ))}
 </ul>
 </div>
 </motion.div>
 <motion.div
 initial={{ opacity: 0, scale: 0.95 }}
 whileInView={{ opacity: 1, scale: 1 }}
 viewport={{ once: true }}
 transition={{ duration: 0.8 }}
 className="hidden lg:flex relative min-h-[400px] h-full rounded-[3rem] overflow-hidden shadow-2xl"
 >
 <img
 src={pageData?.intro?.image ? urlFor(pageData.intro.image).url() : "/images/acquisitions/aus_house_3.png"}
 alt="Modern Residential Property"
 className="absolute inset-0 w-full h-full object-cover"
 />
 <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
 </motion.div>
 </div>
 </section>

 {/* Content Pillars */}
 <section className="py-4 px-6 md:px-8 bg-neutral-50">
 <div className="max-w-7xl mx-auto flex flex-col gap-6 md:gap-12">
 {(pageData?.pillars || pillars).map((pillar: any, index: number) => (
 <motion.div
 key={index}
 initial={{ opacity: 0, y: 60 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true, margin: '-100px' }}
 transition={{ duration: 0.9, ease: 'easeOut' }}
 className={`grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-20 items-stretch ${index % 2 === 0 ? 'lg:grid-flow-col-dense' : ''}`}
 >
 <div className={`text-center ${index % 2 === 0 ? 'lg:col-start-2' : ''}`}>
 <h2 className="text-3xl md:text-4xl font-sans font-black text-[#011122] mb-3 md:mb-4 leading-tight">
 {pillar.title}
 </h2>

 {/* Mobile Image */}
 <div className="relative h-[320px] sm:h-[400px] rounded-[2rem] overflow-hidden shadow-2xl shadow-gold/5 mb-4 lg:hidden">
 <img
 src={pillar.image?.asset ? urlFor(pillar.image).url() : (typeof pillar.image === 'string' ? pillar.image : (index === 0 ? "/images/acquisitions/user_prop_16.png" : index === 1 ? "/images/acquisitions/aus_house_4.png" : "/images/acquisitions/prop_1.png"))}
 alt={pillar.title}
 className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-700"
 />
 </div>

 <div className="space-y-3 text-base md:text-lg text-muted font-sans leading-relaxed text-left">
 {(pillar.description || "").replace(/—/g, '-').split('\n\n').map((paragraph: string, pIdx: number) => {
 if (paragraph.startsWith('• ')) {
 return (
 <div key={pIdx} className="space-y-1.5 mt-2">
 {paragraph.split('\n').map((item, iIdx) => (
 <div key={iIdx} className="flex items-start justify-start gap-4 text-left">
 <div className="w-2 h-2 rounded-full bg-gold shrink-0 mt-2" />
 <span>{item.replace('• ', '')}</span>
 </div>
 ))}
 </div>
 );
 }
 return <p key={pIdx}>{paragraph}</p>;
 })}
 </div>
 </div>

 <div className={`hidden lg:flex relative min-h-[400px] h-full rounded-[2rem] overflow-hidden shadow-2xl shadow-gold/5 ${index % 2 === 0 ? 'lg:col-start-1' : ''}`}>
 <img
 src={pillar.image?.asset ? urlFor(pillar.image).url() : (typeof pillar.image === 'string' ? pillar.image : (index === 0 ? "/images/acquisitions/user_prop_16.png" : index === 1 ? "/images/acquisitions/aus_house_4.png" : "/images/acquisitions/prop_1.png"))}
 alt={pillar.title}
 className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-700"
 />
 </div>
 </motion.div>
 ))}
 </div>
 </section>

 {/* Your SMSF Acquisition Journey */}
 <section className="py-4 px-8 bg-[#011122] text-white overflow-hidden relative">
 <div className="max-w-7xl mx-auto text-center mb-4">
 <h2 className="text-4xl md:text-5xl font-sans font-black mb-4 text-white">
 {pageData?.process?.heading || (
 <>Your SMSF Acquisition <span className="text-gold">Journey</span></>
 )}
 </h2>
 <div className="h-1.5 w-24 bg-gold mx-auto rounded-full" />
 </div>
 <div className="max-w-7xl mx-auto">
 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
 {(pageData?.process?.steps || [
 { stepNumber: '01', title: 'Strategy & Setup', body: 'We coordinate with your financial professionals to ensure your fund is structured correctly and your investment strategy is property-ready.' },
 { stepNumber: '02', title: 'Compliant Sourcing', body: 'We identify residential assets that meet SMSF lending requirements and offer the best long-term growth and yield potential.' },
 { stepNumber: '03', title: 'Managed Due Diligence', body: 'Thorough inspections and professional contract reviews ensure the asset is sound and all SMSF regulatory requirements are met.' },
 { stepNumber: '04', title: 'Strategic Settlement', body: 'We manage the entire process through to settlement, ensuring a seamless transition and property management setup.' }
 ]).map((card: any, i: number) => (
 <motion.div
 key={card.stepNumber || i}
 initial={{ opacity: 0, y: 30 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 transition={{ delay: i * 0.1 }}
 className="flex flex-col rounded-[2rem] overflow-hidden bg-white/5 border border-white/10 hover:border-gold/30 transition-all duration-500 group"
 >
 <div className="relative h-48 overflow-hidden shrink-0">
   <img
     src={card.image?.asset ? urlFor(card.image).url() : (typeof card.image === 'string' ? card.image : (smsfStepImages[i] || smsfStepImages[0]))}
     alt={card.title}
     className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-75"
   />
   <div className="absolute inset-0 bg-gradient-to-t from-[#011122]/80 to-transparent" />
   <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-gold/90 text-white text-xs font-bold uppercase tracking-widest backdrop-blur-sm">
     Step {card.stepNumber || `0${i + 1}`}
   </div>
 </div>
 <div className="flex flex-col items-start text-left p-6">
   <h3 className="text-xl font-sans font-black text-white leading-tight mb-3">{card.title}</h3>
   <p className="text-sm text-white/60 leading-relaxed font-sans">{card.body}</p>
 </div>
 </motion.div>
 ))}
 </div>
 </div>
 </section>

 <section className="py-4 px-8 bg-white overflow-hidden border-t border-gold/5">
 <div className="max-w-5xl mx-auto">
 <div className="text-center mb-4">
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 className="inline-block px-6 py-2 rounded-full bg-gold/5 border border-gold/10 text-gold text-xs font-bold uppercase tracking-[0.2em] mb-4"
 >
 {pageData?.readiness?.badge || "SMSF Compliance"}
 </motion.div>
 <h2 className="text-4xl md:text-5xl font-sans font-black text-[#011122] mb-4 md:mb-6 leading-[1.1]">
 {pageData?.readiness?.heading || (
 <>SMSF Property <br /> <span className="text-gold ">Requirements.</span></>
 )}
 </h2>
 <p className="text-xl text-muted font-sans leading-relaxed max-w-2xl mx-auto text-center">
 {pageData?.readiness?.description || "Investing within super involves specific rules and lending criteria. We help you navigate these requirements to ensure your purchase is both compliant and successful."}
 </p>
 </div>

 <div className="relative">
 {/* Vertical line connector */}
 <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-gold/40 via-gold/10 to-transparent transform md:-translate-x-1/2 hidden sm:block" />

 <div className="flex flex-col gap-4 md:gap-6 relative z-10">
 {(pageData?.readiness?.items || [
 { title: "Sole Purpose Test", description: "The investment must be for the sole purpose of providing retirement benefits to members." },
 { title: "No Personal Use", description: "You or your family cannot live in or use the residential property held by your fund." },
 { title: "Arm's Length", description: "All transactions must be conducted on a purely commercial, arm's-length basis." },
 { title: "Lending Rules", description: "Borrowing is typically done through a Limited Recourse Borrowing Arrangement (LRBA)." },
 { title: "Liquidity Buffer", description: "Lenders often require a cash buffer within the fund after the property purchase." },
 { title: "Single Title", description: "SMSF borrowing rules usually require the property to be on a single title asset." }
 ]).map((item: any, idx: number) => (
 <motion.div
 key={idx}
 initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }}
 whileInView={{ opacity: 1, x: 0 }}
 viewport={{ once: true }}
 transition={{ duration: 0.8, delay: idx * 0.1 }}
 className={`flex flex-col ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-4 md:gap-20`}
 >
 <div className="flex-1 w-full">
 <div className={`flex flex-col items-center gap-2 md:gap-4 ${idx % 2 === 0 ? 'md:items-end' : 'md:items-start'}`}>
 <span className="text-gold font-sans text-2xl md:text-sm font-black uppercase tracking-[0.3em]">0{idx + 1}</span>
 <h4 className={`text-2xl md:text-3xl font-sans font-black text-[#011122] text-center ${idx % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>{item.title}</h4>
 <p className={`text-base text-muted leading-relaxed font-sans max-w-sm text-center ${idx % 2 === 0 ? 'md:text-right md:ml-auto' : 'md:text-left md:mr-auto'}`}>
 {item.description || item.desc}
 </p>
 </div>
 </div>

 <div className="relative flex items-center justify-center shrink-0">
 <div className="w-12 h-12 rounded-full bg-white border-2 border-gold shadow-[0_0_20px_rgba(200,169,106,0.3)] z-10 flex items-center justify-center">
 <div className="w-3 h-3 rounded-full bg-gold animate-pulse" />
 </div>
 </div>

 <div className="flex-1 hidden md:block" />
 </motion.div>
 ))}
 </div>
 </div>

 {/* Bottom CTA Card */}
 <motion.div
 initial={{ opacity: 0, y: 40 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 className="mt-4 max-w-3xl mx-auto"
 >
 <div className="bg-[#011122] text-white rounded-[3rem] p-8 md:p-16 shadow-2xl relative overflow-hidden group text-center">
 <div className="absolute top-0 right-0 w-64 h-64 bg-gold/10 blur-[100px] -mr-32 -mt-4 group-hover:bg-gold/20 transition-colors" />
 <div className="absolute bottom-0 left-0 w-64 h-64 bg-gold/5 blur-[80px] -ml-32 -mb-3" />
 <h3 className="text-3xl sm:text-4xl font-sans font-black text-white mb-4 relative z-10">{pageData?.readiness?.cta?.title || "Discuss Your SMSF Strategy"}</h3>
 <p className="text-white/60 text-base sm:text-lg mb-6 leading-relaxed relative z-10 max-w-xl mx-auto">
 {pageData?.readiness?.cta?.description || "Ready to build your retirement wealth? Our free discovery call will review your fund's goals and map out a compliant property acquisition path."}
 </p>
 <button
 onClick={openCalendly}
 className="rounded-full px-10 py-3.5 bg-gold text-white text-sm font-bold uppercase tracking-widest hover:bg-gold-hover hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 cursor-pointer relative z-10 shadow-2xl shadow-gold/20"
 >
 {pageData?.readiness?.cta?.buttonText || "Book Discovery Call"}
 </button>
 </div>
 </motion.div>
 </div>
 </section>

 {/* FAQ Section */}
 <section className="relative py-[1px] bg-gradient-to-b from-white to-neutral-50 px-8">
   <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-2 lg:gap-8">
     <div className="lg:col-span-4 flex flex-col items-center text-center lg:items-start lg:text-left mb-2">
       <h2 className="text-4xl md:text-5xl font-sans font-black text-black leading-tight mb-2">
         Frequently <br className="hidden lg:block" />
         <span className="text-gold">Asked Questions.</span>
       </h2>
       <p className="text-muted text-lg font-sans text-left lg:text-left">Essential insights for buying residential property within super.</p>
     </div>

     <div className="lg:col-span-8 flex flex-col gap-1">
       {(pageData?.faqs || smsfFaqs).map((faq: any, index: number) => (
         <div key={index} className="border-b border-black/10">
           <button
             onClick={() => setOpenFaq(openFaq === index ? null : index)}
             aria-expanded={openFaq === index}
             aria-controls={`faq-answer-${index}`}
             className="w-full flex items-center justify-between py-2 hover:bg-neutral-50 rounded-xl px-2 transition-colors group cursor-pointer"
           >
             <span className={`flex-1 text-left text-lg sm:text-xl font-sans font-semibold transition-colors duration-300 ${openFaq === index ? 'text-gold' : 'text-muted group-hover:text-gold'}`}>
               {faq.question}
             </span>
             <motion.div
               animate={{ rotate: openFaq === index ? 45 : 0 }}
               transition={{ type: 'spring', stiffness: 200, damping: 20 }}
               className={`w-10 h-10 rounded-full border flex items-center justify-center shrink-0 transition-colors duration-300 ${openFaq === index ? 'border-gold bg-gold text-white shadow-lg' : 'border-black/10 text-black group-hover:border-gold group-hover:text-gold'}`}
               aria-hidden="true"
             >
               <Plus className="w-5 h-5" />
             </motion.div>
           </button>
           <AnimatePresence>
             {openFaq === index && (
               <motion.div
                 id={`faq-answer-${index}`}
                 initial={{ height: 0, opacity: 0 }}
                 animate={{ height: 'auto', opacity: 1 }}
                 exit={{ height: 0, opacity: 0 }}
                 transition={{ duration: 0.3, ease: 'easeInOut' }}
                 className="overflow-hidden"
               >
                 <p className="text-base text-muted font-sans leading-relaxed pb-4 text-left px-4">{faq.answer}</p>
               </motion.div>
             )}
           </AnimatePresence>
         </div>
       ))}
     </div>
   </div>
 </section>

 {/* CTA Section */}
 <section className="py-12 md:py-20 px-6 sm:px-8 bg-[#011122] text-white relative overflow-hidden">
 {/* Ambient Glows */}
 <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-gold/10 blur-[120px] rounded-full pointer-events-none" />
 
 <div className="max-w-4xl mx-auto relative z-10">
 <motion.div
 initial={{ opacity: 0, y: 30 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 transition={{ duration: 0.8 }}
 className="relative p-8 md:p-16 rounded-[2.5rem] md:rounded-[4rem] bg-white/[0.03] border border-white/10 backdrop-blur-md shadow-2xl overflow-hidden group text-center"
 >
 {/* Glow corner */}
 <div className="absolute top-0 right-0 w-80 h-80 bg-gold/10 blur-[100px] -mr-40 -mt-40 group-hover:bg-gold/20 transition-colors pointer-events-none" />
 <div className="absolute bottom-0 left-0 w-80 h-80 bg-gold/5 blur-[80px] -ml-40 -mb-40 pointer-events-none" />

 <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-black mb-6 leading-tight">
 {pageData?.finalCta?.heading || (
 <>Secure your <span className="text-gold">Future</span> today.</>
 )}
 </h2>
 <p className="text-base sm:text-lg text-white/70 font-sans mb-8 leading-relaxed max-w-2xl mx-auto">
 {pageData?.finalCta?.description || "Ready to explore how residential property can grow your super? Book your free discovery call with Alex today."}
 </p>
 <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
 <button
 onClick={openCalendly}
 className="w-full sm:w-auto rounded-full px-10 py-4 bg-gold hover:bg-gold-hover text-white text-sm font-bold uppercase tracking-widest hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 shadow-xl shadow-gold/20 cursor-pointer"
 >
 {pageData?.finalCta?.primaryButtonText || "Book Discovery Call"}
 </button>
 <Link
 href="/contact"
 className="w-full sm:w-auto rounded-full px-10 py-4 border border-white/20 bg-white/5 text-white text-sm font-bold uppercase tracking-widest hover:bg-white hover:text-[#011122] transition-all duration-300"
 >
 {pageData?.finalCta?.secondaryButtonText || "Message Alex"}
 </Link>
 </div>
 </motion.div>
 </div>
 </section>
 </div>
 </>
 );
}
