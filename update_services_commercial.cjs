const fs = require('fs');
let code = fs.readFileSync('src/pages/Services.tsx', 'utf8');

// 1. Fix icon fallback logic to handle more than 3 services
code = code.replace(
  "(index === 0 ? <Key className=\"w-8 h-8\" /> : index === 1 ? <Building2 className=\"w-8 h-8\" /> : <Landmark className=\"w-8 h-8\" />)",
  "services.find(s => s.id === service.id)?.icon || <Building2 className=\"w-8 h-8\" />"
);

code = code.replace(
  "(index === 0 ? <FaKey className=\"w-8 h-8\" /> : index === 1 ? <FaBuilding className=\"w-8 h-8\" /> : <FaLandmark className=\"w-8 h-8\" />)",
  "services.find(s => s.id === service.id)?.solidIcon || <FaBuilding className=\"w-8 h-8\" />"
);

// 2. Merge local services with Sanity services to ensure Commercial is included
code = code.replace(
  "{(pageData?.serviceList || services).map((service: any, index: number) => (",
  `{(() => {
              const sanityServices = pageData?.serviceList || [];
              // Merge: use Sanity data if available, otherwise use local data
              const allServices = services.map(local => {
                const sanity = sanityServices.find((s: any) => s.id === local.id || s._id === local.id);
                return sanity ? { ...local, ...sanity } : local;
              });
              return allServices;
            })().map((service: any, index: number) => (`
);

// 3. Tighten vertical gaps between service sections
code = code.replace(
  "gap-24 md:gap-32",
  "gap-8 md:gap-12"
);

// 4. Tighten padding on service sections
code = code.replace(
  "py-4 md:py-2 px-8",
  "py-2 md:py-3 px-8"
);

fs.writeFileSync('src/pages/Services.tsx', code);
