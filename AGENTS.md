# Keystone Overseas — Agent Guardrails & Domain Invariants

## 1. Domain & Brand Invariants
- **Brand Identity**: Strictly `Keystone Overseas`. The language training unit is `Keystone Language Academy` (or `Keystone Academy`). Never revert to legacy names.
- **Physical Headquarters**: `House 7, Mirpur Road, Sobhanbag, Dhanmondi, Dhaka, Bangladesh`.
- **Contact Channels**: 
  - Phone/WhatsApp: `+880 1941 646278` / `01941-646278` (E.164: `+8801941646278`, clean WhatsApp: `8801941646278`).
  - Inbound Email: `munim.m247@gmail.com`. The old address `info@keystoneeducations.com` is deprecated and must never be referenced.
- **Fee Confidentiality**: NEVER mention agency fees, consultancy service fees, file opening charges, or internal margins on any public webpage, meta tag, or schema. All customer-facing figures must represent direct university tuition bank wires or official statutory consular fees.
- **Office Exclusivity**: Zero references to Gazipur as an office, branch, campus, or desk. Gazipur may only appear as a student geographic origin district (e.g. "from Gazipur", "32 km to Dhanmondi HQ").

## 2. Technical & Routing Invariants
- **Nationwide Saturation**: Always maintain the 64-district matrix across all 8 divisions (`Dhaka`, `Chittagong`, `Sylhet`, `Rajshahi`, `Khulna`, `Barishal`, `Rangpur`, `Mymensingh`). Notice standard spelling `Barishal` (with an 'h').
- **SPA vs. Server Route Seam**: Any link pointing to `/districts` or programmatic SEO routes from the React SPA must use plain `<a>` tags (or `reloadDocument`) to prevent client-side routing hijacking.

## 3. Data Validation Standards
- **Bangladeshi Mobile Numbers**: Must match regex `r'(?:\+?880|0)?(1[3-9]\d{8})'`. Landlines (BTCL/PSTN) must be segregated from SMS/WhatsApp campaigns.

## 4. Multi-Agent Collaboration Protocol
- Agents must operate in alternating turns as defined in `CO_AGENT_PROTOCOL.md`.
- Shared state must be maintained in `.agent_sync/turn_state.json`.
- Agent 1 (Spec & Invariant Integrity Agent / Builder) implements and verifies specs.
- Agent 2 (Adversarial Boundary Auditor / Validator) stress-tests boundaries and holds veto power.

## 5. Candidate Placement Dossier & Brochure Design Invariant
Whenever generating candidate brochures, placement dossiers, or pitch decks:
- **Strict 1-Page A4 Layout**: Must fit on exactly 1 single sheet of A4 paper when printed (`@page { size: A4; margin: 0; }` with `@media print { page-break-inside: avoid; }`). Never allow awkward page overflows.
- **Minimalist Swiss / Executive One-Pager Aesthetic**:
  - Clean typography using modern sans-serif (`Plus Jakarta Sans` or system UI).
  - 50/50 balance between clean typography and whitespace. Zero visual clutter, no dark saturated backgrounds, no multi-level heavy tables, and no dense technical jargon.
- **Standard 5-Part Information Hierarchy**:
  1. **Top Letterhead**: `KEYSTONE OVERSEAS` + `European Technical Placement & Workforce Division` + Clean Destination Badge (Country Flag + Permit Type, e.g. `🇵🇱 POLAND — WORK PERMIT TYPE A`).
  2. **Candidate Snapshot**: Candidate Name in large bold typography, professional title, and clean verification chips (`✓ BTEB Diploma`, `✓ CGPA`, `Institution`, `10-Year e-Passport`, `Age/Marital Status`).
  3. **2-Column Core Comparison**:
     - *Column 1 (Job Opportunity)*: Specific job role, target industrial corridor, and 3 plain-language bullet points emphasizing daily tasks, precision testing, and 100% climate-controlled/indoor work (no manual/field labor).
     - *Column 2 (Living & Safety Standards)*: Accommodations (female-only rooms if female candidate, 2–3 persons max, heating, WiFi), statutory meal subsidies/vouchers, state health insurance, and legal residence rights.
  4. **Assurance & Family Guarantee Banner**: Clear, reassuring highlight box for family/candidate peace of mind (verified employer, legal contract, dedicated welfare contact).
  5. **4-Step Deployment Roadmap**: 4 simple horizontal flow boxes (`[ 1. Work Permit ] → [ 2. Attestation ] → [ 3. Visa ] → [ 4. Arrival ]`).
  6. **Clean Corporate Footer**: Dhanmondi Headquarters address, verified WhatsApp line (`+880 1941 646278`), email (`munimm247@gmail.com`), and unique candidate tracking reference.
- **Dual Output**: Always generate both the print-ready `.html` (with a one-click `🖨️ Print / Save as PDF` button) and a companion `.md` summary.
