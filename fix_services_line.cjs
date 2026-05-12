const fs = require('fs');

// 1. Fix Home.tsx Services Preview Cards
let homeCode = fs.readFileSync('src/pages/Home.tsx', 'utf8');
const homeOld = `                    <div className={\`p-5 rounded-[2rem] mb-2 transition-all duration-500 transform group-hover:scale-110 group-hover:rotate-6 \${index % 2 === 0 ? 'bg-gold text-white shadow-[0_0_30px_rgba(200,169,106,0.3)]' : \`bg-gold/5 text-gold group-hover:bg-gold group-hover:text-white\`
                      }\`}>
                      <div className="w-8 h-8 flex items-center justify-center">
                        {service.icon || servicesPreview.find((s: any) => s.title === service.title)?.icon || servicesPreview[index]?.icon}
                      </div>
                    </div>

                    <h3 className={\`text-3xl font-serif mb-6 leading-tight \${index % 2 === 0 ? 'text-white' : 'text-black font-semibold'}\`}>
                      {service.title}
                    </h3>`;

const homeNew = `                    <div className="flex items-center gap-6 mb-8 w-full">
                      <div className={\`p-4 rounded-2xl shrink-0 transition-all duration-500 transform group-hover:scale-110 group-hover:rotate-6 \${index % 2 === 0 ? 'bg-gold text-white shadow-[0_0_30px_rgba(200,169,106,0.3)]' : \`bg-gold/5 text-gold group-hover:bg-gold group-hover:text-white\`
                        }\`}>
                        <div className="w-7 h-7 flex items-center justify-center">
                          {service.icon || servicesPreview.find((s: any) => s.title === service.title)?.icon || servicesPreview[index]?.icon}
                        </div>
                      </div>
                      <h3 className={\`text-2xl md:text-3xl font-serif leading-tight \${index % 2 === 0 ? 'text-white' : 'text-black font-semibold'}\`}>
                        {service.title}
                      </h3>
                    </div>`;

homeCode = homeCode.replace(homeOld, homeNew);
fs.writeFileSync('src/pages/Home.tsx', homeCode);

// 2. Fix Services.tsx Main Service Sections
let servicesCode = fs.readFileSync('src/pages/Services.tsx', 'utf8');
const servicesOld = `                <div className="flex items-center gap-6 mb-6 relative">
                  <div className={\`absolute -left-2 top-0 w-20 h-20 blur-2xl rounded-full opacity-30 group-hover:opacity-50 transition-opacity \${service.accentClass.replace('bg-','bg-').replace('-50','-400')}\`} />
                  <div className={\`relative p-4 rounded-[1.25rem] bg-[#011122] border border-white/10 shadow-[0_0_25px_rgba(200,169,106,0.3)] drop-shadow-[0_0_12px_rgba(200,169,106,0.8)] group-hover:-translate-y-1 transition-all duration-500 z-10 text-gold\`}>
                    <motion.div
                      variants={{
                        initial: { rotateY: 0 },
                        hover: { rotateY: 180 }
                      }}
                      transition={{ duration: 0.6 }}
                      className="relative w-8 h-8"
                    >
                      <motion.div
                        className="absolute inset-0 h-full w-full flex items-center justify-center"
                        variants={{
                          initial: { opacity: 1, visibility: 'visible' },
                          hover: { opacity: 0, visibility: 'hidden' }
                        }}
                      >
                        {service.icon || services.find(s => s.id === service.id)?.icon || services.find(s => s.id === service.id)?.icon || <Building2 className="w-8 h-8" />}
                      </motion.div>
                      <motion.div
                        className="absolute inset-0 h-full w-full flex items-center justify-center"
                        style={{ rotateY: 180 }}
                        variants={{
                          initial: { opacity: 0, visibility: 'hidden' },
                          hover: { opacity: 1, visibility: 'visible' }
                        }}
                      >
                        {service.solidIcon || services.find(s => s.id === service.id)?.solidIcon || services.find(s => s.id === service.id)?.solidIcon || <FaBuilding className="w-8 h-8" />}
                      </motion.div>
                    </motion.div>
                  </div>
                  <span className={\`text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full \${service.accentClass || 'bg-gold/5 border-gold/20'} border shadow-sm\`}>
                    {service.tag}
                  </span>
                </div>

                 <h2 className="text-4xl md:text-5xl font-serif text-[#011122] mb-4 leading-tight">
                  {service.title}
                </h2>`;

const servicesNew = `                <div className="flex flex-col gap-4 mb-8">
                  <div className="flex items-center gap-6 relative">
                    <div className={\`absolute -left-2 top-0 w-20 h-20 blur-2xl rounded-full opacity-30 group-hover:opacity-50 transition-opacity \${service.accentClass.replace('bg-','bg-').replace('-50','-400')}\`} />
                    <div className={\`relative p-4 rounded-[1.25rem] bg-[#011122] border border-white/10 shadow-[0_0_25px_rgba(200,169,106,0.3)] drop-shadow-[0_0_12px_rgba(200,169,106,0.8)] group-hover:-translate-y-1 transition-all duration-500 z-10 text-gold\`}>
                      <motion.div
                        variants={{
                          initial: { rotateY: 0 },
                          hover: { rotateY: 180 }
                        }}
                        transition={{ duration: 0.6 }}
                        className="relative w-8 h-8"
                      >
                        <motion.div
                          className="absolute inset-0 h-full w-full flex items-center justify-center"
                          variants={{
                            initial: { opacity: 1, visibility: 'visible' },
                            hover: { opacity: 0, visibility: 'hidden' }
                          }}
                        >
                          {service.icon || services.find(s => s.id === service.id)?.icon || <Building2 className="w-8 h-8" />}
                        </motion.div>
                        <motion.div
                          className="absolute inset-0 h-full w-full flex items-center justify-center"
                          style={{ rotateY: 180 }}
                          variants={{
                            initial: { opacity: 0, visibility: 'hidden' },
                            hover: { opacity: 1, visibility: 'visible' }
                          }}
                        >
                          {service.solidIcon || services.find(s => s.id === service.id)?.solidIcon || <FaBuilding className="w-8 h-8" />}
                        </motion.div>
                      </motion.div>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-serif text-[#011122] leading-tight">
                      {service.title}
                    </h2>
                  </div>
                  <span className={\`w-fit text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full \${service.accentClass || 'bg-gold/5 border-gold/20'} border shadow-sm\`}>
                    {service.tag}
                  </span>
                </div>`;

servicesCode = servicesCode.replace(servicesOld, servicesNew);
fs.writeFileSync('src/pages/Services.tsx', servicesCode);

console.log('Fixed services layout in Home and Services pages.');
