import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const violations = [];

function checkFile(filePath, rules) {
  const fullPath = path.join(rootDir, filePath);
  if (!fs.existsSync(fullPath)) return;
  const content = fs.readFileSync(fullPath, 'utf8');

  for (const rule of rules) {
    const matches = content.match(rule.pattern);
    if (matches) {
      violations.push({
        file: filePath,
        description: rule.description,
        matches: matches.slice(0, 3),
      });
    }
  }
}

console.log('🔍 Running Anti-Gravity Zero-Tolerance Boundary & Leakage Audit...');

// Rule 1: Zero Agency Fee Exposure
const feeRules = [
  { pattern: /৳\s*120/gi, description: 'Exposed flat fee (৳120k / ৳120,000)' },
  { pattern: /"priceRange"\s*:\s*"[^"]+"/gi, description: 'Commercial priceRange in schema' },
  { pattern: /No\s*Visa\s*,?\s*No\s*Fee/gi, description: 'Contingency pricing claim (No Visa No Fee)' },
];

// Rule 2: Regulatory & Manpower Isolation
const manpowerRules = [
  { pattern: /"RecruitmentAgency"/gi, description: 'Unlicensed RecruitmentAgency in schema' },
  { pattern: /manpower\s+agency/gi, description: 'Unlicensed manpower agency claim' },
  { pattern: /overseas\s+manpower/gi, description: 'Overseas manpower recruitment claim' },
  { pattern: /skilled\s+and\s+semi-skilled\s+manpower/gi, description: 'Labor export claims without BMET RL license' },
];

// Rule 3: Purge Verification (Dead email & Gazipur traces)
const purgeRules = [
  { pattern: /info@keystoneeducations\.com/gi, description: 'Dead unmonitored email info@keystoneeducations.com' },
  { pattern: /Gazipur/gi, description: 'Legacy office footprint (Gazipur)' },
  { pattern: /Rajendrapur/gi, description: 'Legacy office footprint (Rajendrapur)' },
];

// Rule 4: Form & Scraping Sanitization
const formRules = [
  { pattern: /YOUR_EMAILJS_/gi, description: 'Unconfigured EmailJS dummy token causing form failure' },
  { pattern: /munimm247@gmail\.com/gi, description: 'Personal email exposed in client bundle constants' },
];

// Scan critical files
const filesToScan = [
  'index.html',
  'src/constants.ts',
  'src/components/Footer.tsx',
  'src/components/ConsultationForm.tsx',
  'src/pages/About.tsx',
  'src/pages/Home.tsx',
  'src/pages/VisaGuide.tsx',
  'src/pages/Services.tsx',
];

for (const file of filesToScan) {
  checkFile(file, [...feeRules, ...manpowerRules, ...purgeRules, ...formRules]);
}

if (violations.length > 0) {
  console.error('\n❌ BOUNDARY BREACH DETECTED:');
  for (const v of violations) {
    console.error(`  - [${v.file}] ${v.description} (Found: ${JSON.stringify(v.matches)})`);
  }
  console.error(`\nTotal violations: ${violations.length}. Remediation required before release.`);
  process.exit(1);
} else {
  console.log('\n✅ ALL BOUNDARY REDLINES PASSED: Zero fee exposures, zero manpower leaks, clean purge, secure forms.');
  process.exit(0);
}
