const fs = require('fs');
let code = fs.readFileSync('src/pages/Home.tsx', 'utf8');

// Replace the grid start and map start
code = code.replace(
  '<div className="grid grid-cols-1 md:grid-cols-3 gap-10">\n              {(homeData?.servicesPreview || servicesPreview).map((service: any, index: number) => (',
  '<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">\n              {servicesPreview.map((localService: any, index: number) => {\n                const service = homeData?.servicesPreview?.find((s: any) => s.title === localService.title) || localService;\n                return ('
);

// We need to replace the specific closing of this map.
// The map ends with `</Link>` followed by `))} `
// Let's find the first `</Link>\n              ))} ` after the grid start
const gridStartIdx = code.indexOf('<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">');
const linkEndIdx = code.indexOf('</Link>\n              ))} ', gridStartIdx);

if (linkEndIdx !== -1) {
    code = code.substring(0, linkEndIdx) + '</Link>\n              )})} ' + code.substring(linkEndIdx + 25);
}

fs.writeFileSync('src/pages/Home.tsx', code);
