const fs = require('fs');
let code = fs.readFileSync('src/pages/Home.tsx', 'utf8');

// 1. Remove the top right arrows
const oldArrows = `<div className="flex items-center gap-2 hidden md:flex">
                  <button onClick={() => scrollServices('left')} className="p-4 rounded-full border-2 border-black/5 hover:bg-black hover:text-white transition-colors group">
                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                  </button>
                  <button onClick={() => scrollServices('right')} className="p-4 rounded-full border-2 border-black/5 hover:bg-black hover:text-white transition-colors group">
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>`;
code = code.replace(oldArrows, '');

// 2. Wrap the scroll container with a relative div and add side arrows
const oldScrollStart = `<div ref={servicesScrollRef} className="flex gap-10 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-8 pt-4 -mx-4 px-4 md:-mx-8 md:px-8">`;
const newScrollStart = `<div className="relative group">
              <button onClick={() => scrollServices('left')} className="absolute -left-4 md:-left-6 lg:-left-8 top-[40%] z-30 p-4 rounded-full bg-white border border-black/10 shadow-xl opacity-0 md:group-hover:opacity-100 transition-opacity hover:bg-black hover:text-white flex shadow-gold/20">
                <ArrowLeft className="w-6 h-6" />
              </button>
              <button onClick={() => scrollServices('right')} className="absolute -right-4 md:-right-6 lg:-right-8 top-[40%] z-30 p-4 rounded-full bg-white border border-black/10 shadow-xl opacity-0 md:group-hover:opacity-100 transition-opacity hover:bg-black hover:text-white flex shadow-gold/20">
                <ArrowRight className="w-6 h-6" />
              </button>
              <div ref={servicesScrollRef} className="flex gap-10 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-8 pt-4 -mx-4 px-4 md:-mx-8 md:px-8">`;
code = code.replace(oldScrollStart, newScrollStart);

// 3. Close the relative div after the scroll container
const oldScrollEnd = `)})}
            </div>
          </div>`;
const newScrollEnd = `)})}
            </div>
            </div>
          </div>`;
code = code.replace(oldScrollEnd, newScrollEnd);

// 4. Update the card width calculation
const oldCardClasses = "group shrink-0 snap-start w-[85vw] md:w-[calc(50%-1.25rem)] lg:w-[calc(33.333%-1.66rem)] relative p-12 rounded-[3.5rem] border transition-all duration-700 cursor-pointer flex flex-col items-start";
const newCardClasses = "group shrink-0 snap-start w-[85vw] md:w-[calc((100%-2.5rem)/2)] lg:w-[calc((100%-5rem)/3)] relative p-12 rounded-[3.5rem] border transition-all duration-700 cursor-pointer flex flex-col items-start";
code = code.replace(oldCardClasses, newCardClasses);

fs.writeFileSync('src/pages/Home.tsx', code);
