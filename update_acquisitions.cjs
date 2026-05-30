const fs = require('fs');

const csv = fs.readFileSync('/Users/jas/.gemini/antigravity/brain/badd395e-edd4-4f99-b7cf-7b50865f9530/.system_generated/steps/343/content.md', 'utf-8');
const lines = csv.split('\n');

const dataLines = lines.slice(9).filter(l => l.trim().length > 0 && /^\d+,/.test(l));

function parseCSVLine(line) {
    const result = [];
    let current = '';
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
        if (line[i] === '"') {
            inQuotes = !inQuotes;
        } else if (line[i] === ',' && !inQuotes) {
            result.push(current.trim());
            current = '';
        } else {
            current += line[i];
        }
    }
    result.push(current.trim());
    return result;
}

const acquisitions = dataLines.map((line, idx) => {
    const cols = parseCSVLine(line);
    if (cols.length < 11) return null;
    
    // cols:
    // 0: S.NO
    // 1: Name
    // 2: Property Address
    // 3: Purchase Price
    // 4: Configuration
    // 5: Purchase Month
    // 6: Market Rent
    // 7: current Value
    // 8: Land Size
    // 9: Capital growth
    // 10: Rental Yeild

    let address = cols[2];
    
    // Extract state
    let stateMatch = address.match(/\b(NSW|QLD|VIC|SA|WA|TAS|ACT|NT)\b/i);
    let state = stateMatch ? stateMatch[1].toUpperCase() : 'NSW';
    
    // Extract city (word before state)
    let city = "Sydney";
    if (stateMatch) {
        let beforeState = address.substring(0, stateMatch.index).trim();
        beforeState = beforeState.replace(/,$/, '').trim();
        let parts = beforeState.split(' ');
        city = parts[parts.length - 1];
        // handle two word cities if possible? Let's just do a simple heuristic
        if (parts.length > 1) {
            let last = parts[parts.length - 1].replace(/,$/, '');
            let prev = parts[parts.length - 2].replace(/,$/, '');
            if (prev.toLowerCase() === 'port' || prev.toLowerCase() === 'blacks' || prev.toLowerCase() === 'castle' || prev.toLowerCase() === 'rural' || prev.toLowerCase() === 'marsden') {
                city = prev + ' ' + last;
            } else {
                city = last;
            }
        }
    }
    // Clean city
    city = city.replace(/,$/, '').trim();
    if(city.toLowerCase() === 'view' && address.toLowerCase().includes('rural view')) city = 'Rural View';
    if(city.toLowerCase() === 'beach' && address.toLowerCase().includes('blacks beach')) city = 'Blacks Beach';
    if(city.toLowerCase() === 'kennedy' && address.toLowerCase().includes('port kennedy')) city = 'Port Kennedy';

    let price = cols[3].replace(/\.00$/, '').replace(/\"/g, '');
    if (!price.startsWith('$')) price = '$' + price;
    
    let configStr = cols[4].trim();
    let configParts = configStr.split(/\s+/);
    let config = configParts.join(' / ');
    if(configParts.length === 1) config = configStr; // fallback

    let monthStr = cols[5].replace(/\s*-\s*/, '-').replace(/\s+/, '-');
    if (monthStr.length > 6) {
        let parts = monthStr.split('-');
        if(parts.length===2) {
            monthStr = parts[0].substring(0,3) + '-' + parts[1].substring(2,4);
        }
    }
    if(!monthStr.includes('-')) {
       monthStr = monthStr.substring(0,3) + '-' + monthStr.substring(monthStr.length-2);
    }

    let rent = cols[6];
    if (!rent.includes('$')) rent = '$' + rent;
    if (!rent.toLowerCase().includes('pw')) rent = rent + ' PW';

    let val = cols[7].replace(/\"/g, '');
    if(!val.includes(',')) val = Number(val).toLocaleString('en-US');
    if (!val.startsWith('$')) val = '$' + val;

    let size = cols[8].replace(/\"/g, '').toLowerCase();
    if (!size.includes('sqm') && size !== '') size = size + ' sqm';
    if (size === '') size = 'N/A';

    let growth = cols[9].replace(/\.00$/, '').replace(/\"/g, '');
    if (!growth.startsWith('+')) growth = '+' + growth;

    let yieldVal = cols[10];
    if (!yieldVal.includes('%')) yieldVal = yieldVal + '%';

    let image = `/images/acquisitions/user_prop_${idx + 1}.png`;
    // reuse images from old logic roughly
    if (idx === 0) image = '/images/acquisitions/prop_1.png';
    else if (idx === 1) image = '/images/acquisitions/prop_2.png';
    else if (idx === 2) image = '/images/acquisitions/prop_3.png';
    else if (idx === 11) image = '/images/acquisitions/user_prop_12.jpg';
    else if (idx === 12) image = '/images/acquisitions/user_prop_13.jpg';
    else if (idx === 13) image = '/images/acquisitions/user_prop_14.jpg';
    else image = `/images/acquisitions/user_prop_${idx + 1}.png`;

    // Special override for Toucan Cres (Index 8 / Row 9):
    if (idx === 8) {
        image = '/images/acquisitions/user_prop_9.png'; // We just copied the new one here!
    }

    return `  {
    city: '${city}',
    state: '${state}',
    price: '${price}',
    config: '${config}',
    month: '${monthStr}',
    rental: '${rent}',
    value: '${val}',
    size: '${size}',
    growth: '${growth}',
    yield: '${yieldVal}',
    image: '${image}'
  }`;
}).filter(Boolean);

const fileContent = `export interface Acquisition {
  city: string;
  state: string;
  dealDone?: boolean;
  price: string;
  config: string;
  month: string;
  rental: string;
  value: string;
  size: string;
  growth: string;
  yield: string;
  image: string;
}

export const acquisitions: Acquisition[] = [
${acquisitions.join(',\n')}
];
`;

fs.writeFileSync('/Users/jas/Desktop/HTML Training/JJ prop V2/src/data/acquisitions.ts', fileContent);
console.log('Successfully updated acquisitions.ts with ' + acquisitions.length + ' properties.');
