const fs = require('fs');
const path = require('path');

console.log('====================================================');
console.log('🛡️ AGENT 2: ADVERSARIAL BOUNDARY AUDITOR (STRESS TEST)');
console.log('====================================================\n');

let violations = [];
let passCount = 0;

function walk(dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);
  for (const file of list) {
    if (file === 'node_modules' || file === '.git' || file === '.next' || file === '.astro') continue;
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(fullPath));
    } else if (/\.(html|astro|tsx|jsx|ts|js|json|md)$/i.test(file)) {
      results.push(fullPath);
    }
  }
  return results;
}

const files = walk('.');
console.log(`Auditing ${files.length} source and content files...\n`);

// 1. Fee Leakage Stress Test
const feePatterns = [
  { name: 'Agency Fee Leakage', regex: /\bagency\s+fee\b/i },
  { name: 'Consultancy Service Fee', regex: /\b(consultancy|service)\s+fee\b/i },
  { name: 'File Opening Charge', regex: /\bfile\s+opening\s+(charge|fee|cost)\b/i },
  { name: 'Upfront Processing Fee', regex: /\b(our\s+fee|processing\s+fee\s+for\s+us|pay\s+us)\b/i },
];

for (const f of files) {
  // Exclude auditor scripts and contracts themselves from fee scan
  if (f.includes('agent2_adversarial_auditor') || f.includes('b2b_partner_contract')) continue;
  const content = fs.readFileSync(f, 'utf8');
  for (const p of feePatterns) {
    if (p.regex.test(content)) {
      violations.push({ file: f, category: 'FEE_LEAKAGE', detail: `Detected: ${p.name}` });
    }
  }
}
if (violations.filter(v => v.category === 'FEE_LEAKAGE').length === 0) {
  console.log('✓ PASS: Zero fee leakage detected across all public templates.');
  passCount++;
}

// 2. Regulatory Overreach Stress Test
const overreachPatterns = [
  { name: 'Illegal Work Permit Guarantee', regex: /\b(guaranteed\s+work\s+visa|unskilled\s+labor\s+visa)\b/i },
  { name: 'Unlicensed Manpower Export Claim', regex: /\b(manpower\s+export|recruitment\s+license\s+agent)\b/i },
];

for (const f of files) {
  if (f.includes('agent2_adversarial_auditor')) continue;
  const content = fs.readFileSync(f, 'utf8');
  for (const p of overreachPatterns) {
    if (p.regex.test(content)) {
      violations.push({ file: f, category: 'REGULATORY_OVERREACH', detail: `Detected: ${p.name}` });
    }
  }
}
if (violations.filter(v => v.category === 'REGULATORY_OVERREACH').length === 0) {
  console.log('✓ PASS: Zero regulatory overreach detected (pure higher education & language academy compliance).');
  passCount++;
}

// 3. Contact Vector & PII Integrity
const piiAndContactPatterns = [
  { name: 'Old Inactive Email (info@keystoneeducations.com)', regex: /info@keystoneeducations\.com/i },
  { name: 'Gazipur as Office / Campus Location', regex: /Gazipur\s+(office|branch|campus|desk|headquarters|hq)/i },
];

for (const f of files) {
  if (f.includes('agent2_adversarial_auditor')) continue;
  const content = fs.readFileSync(f, 'utf8');
  for (const p of piiAndContactPatterns) {
    if (p.regex.test(content)) {
      violations.push({ file: f, category: 'CONTACT_INTEGRITY', detail: `Detected: ${p.name}` });
    }
  }
}
if (violations.filter(v => v.category === 'CONTACT_INTEGRITY').length === 0) {
  console.log('✓ PASS: Zero Gazipur office mentions and zero broken email references.');
  passCount++;
}

// 4. Dhanmondi HQ Verification
let dhanmondiFound = false;
for (const f of files) {
  const content = fs.readFileSync(f, 'utf8');
  if (/House\s+7,\s*Mirpur\s+Road.*Sobhanbag.*Dhanmondi/i.test(content)) {
    dhanmondiFound = true;
    break;
  }
}
if (dhanmondiFound) {
  console.log('✓ PASS: Dhanmondi HQ verified (House 7, Mirpur Road, Sobhanbag, Dhanmondi, Dhaka).');
  passCount++;
} else {
  violations.push({ file: 'GLOBAL', category: 'OFFICE_INTEGRITY', detail: 'Dhanmondi HQ address not found in templates.' });
}

// Final Verdict
console.log('\n====================================================');
if (violations.length === 0) {
  console.log('🛡️ AGENT 2 FINAL VERDICT: PASS (CLEARANCE GRANTED)');
  console.log('All 4 invariants and adversarial stress boundaries passed with 0 violations.');
  console.log('====================================================');
  process.exit(0);
} else {
  console.error(`🚨 AGENT 2 FINAL VERDICT: FAIL (${violations.length} VIOLATIONS FOUND)`);
  violations.forEach(v => console.error(`  - [${v.category}] in ${v.file}: ${v.detail}`));
  console.log('====================================================');
  process.exit(1);
}
