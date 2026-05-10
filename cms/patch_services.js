const fs = require('fs');

const data = JSON.parse(fs.readFileSync('services_update.ndjson', 'utf8').trim());
data.hero.stats.push({
  "_key": "s4",
  "value": "$6M+",
  "label": "Personal Portfolio"
});

fs.writeFileSync('services_update.ndjson', JSON.stringify(data) + '\n');
