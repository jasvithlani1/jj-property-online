import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Shield, Calendar, Award, FileText, ArrowRight, CheckSquare } from 'lucide-react';
import PageSEO from '../components/PageSEO';
import { client } from '../lib/sanity';
import type { SeoModule } from '../types/seo';
import { PortableText } from '@portabletext/react';

const generateId = (title: string) => title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

interface LegalSection {
  _key: string;
  title: string;
  body: any[];
}

export default function TermsAndConditions() {
  const [activeSection, setActiveSection] = useState('');
  const [seoModule, setSeoModule] = useState<SeoModule | undefined>();
  const [sections, setSections] = useState<LegalSection[]>([]);

  useEffect(() => {
    const fetchSeo = async () => {
      try {
        const query = `*[_type == "termsAndConditionsPage"][0] {
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
          sections[] {
            _key,
            title,
            body
          }
        }`;
        const data = await client.fetch(query);
        if (data?.seoModule) {
          setSeoModule(data.seoModule);
        }
        if (data?.sections) {
          setSections(data.sections);
          if (data.sections.length > 0) {
            setActiveSection(generateId(data.sections[0].title));
          }
        }
      } catch (err) {
        console.error('Error fetching terms SEO:', err);
      }
    };
    fetchSeo();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 250;
      for (const section of sections) {
        const id = generateId(section.title);
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(id);
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
      <PageSEO
        title="Terms and Conditions | JJ Property Partner"
        description="Read the comprehensive Terms and Conditions for engaging JJ Property Partner PTY LTD's buyers agent services in Australia."
        seoModule={seoModule}
        path="/terms-and-conditions"
        breadcrumbs={[{ name: 'Terms and Conditions', url: '/terms-and-conditions' }]}
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
                {sections.map((sec) => {
                  const id = generateId(sec.title);
                  return (
                  <button
                    key={sec._key}
                    onClick={() => scrollToSection(id)}
                    className={`text-left text-sm py-2.5 px-4 rounded-xl font-semibold transition-all duration-200 cursor-pointer flex items-center justify-between group ${
                      activeSection === id
                        ? 'bg-gold/10 text-gold pl-5'
                        : 'text-muted hover:text-gold hover:bg-neutral-50'
                    }`}
                  >
                    <span>{sec.title}</span>
                    <ArrowRight className={`w-3.5 h-3.5 opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0 ${activeSection === id ? 'opacity-100 translate-x-0 text-gold' : ''}`} />
                  </button>
                )})}
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

              {/* Introduction statement */}
              <div className="text-base text-[#011122]/90 leading-relaxed space-y-4 mb-10 pb-8 border-b border-black/5">
                <p className="font-bold">
                  Please read these Terms and Conditions carefully before engaging the services of JJ Property Partner PTY LTD or using our website. By engaging our services or using our website, you agree to be bound by these Terms and Conditions.
                </p>
              </div>

              {/* Legal Clauses */}
              <div className="space-y-12 text-[#6F6F6F] leading-relaxed text-sm md:text-base font-sans portable-text-container">
                {sections.map((section) => {
                  const id = generateId(section.title);
                  return (
                    <section key={section._key} id={id} className="scroll-mt-28">
                      <h2 className="text-xl md:text-2xl font-sans font-black text-[#011122] mb-4 uppercase tracking-tight flex items-center gap-2">
                        {section.title}
                      </h2>
                      <div className="space-y-4">
                        <PortableText 
                          value={section.body}
                          components={{
                            block: {
                              normal: ({children}) => <p className="mb-4">{children}</p>,
                              h3: ({children}) => <h3 className="text-base font-bold text-[#011122] mt-6 mb-2">{children}</h3>
                            },
                            list: {
                              bullet: ({children}) => <ul className="space-y-2 mb-6">{children}</ul>
                            },
                            listItem: {
                              bullet: ({children}) => (
                                <li className="flex items-start gap-2.5">
                                  <div className="w-1.5 h-1.5 rounded-full bg-gold shrink-0 mt-2" />
                                  <span>{children}</span>
                                </li>
                              )
                            },
                            marks: {
                              link: ({children, value}) => (
                                <a href={value.href} className="text-gold hover:underline" target="_blank" rel="noopener noreferrer">
                                  {children}
                                </a>
                              )
                            }
                          }}
                        />
                      </div>
                    </section>
                  );
                })}
                <section id="contact" className="scroll-mt-28 border-t border-black/5 pt-8">
                  <h2 className="text-xl md:text-2xl font-sans font-black text-[#011122] mb-4 uppercase tracking-tight flex items-center gap-2">
                    <span className="text-gold"></span> Contact Us
                  </h2>
                  <p className="mb-6">For all enquiries relating to these Terms and Conditions, please contact us:</p>
                  
                  <div className="p-6 rounded-2xl bg-neutral-50 border border-black/5 space-y-4 max-w-lg">
                    <div className="flex gap-3">
                      <Award className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-xs font-bold text-muted uppercase">Contact Person</h4>
                        <p className="text-base font-bold text-[#011122]">Alex</p>
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
