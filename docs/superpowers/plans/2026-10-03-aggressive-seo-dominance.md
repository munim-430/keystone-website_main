# Keystone Aggressive SEO Dominance & Fast Indexing Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Establish total organic search dominance for Keystone Overseas across Bangladesh's 64 districts by consolidating domain authority, automating Google Indexing API submissions, and deploying parasite/competitor intercept assets.

**Architecture:**
- **Core Edge (Vercel)**: Hard 301 canonical redirects from apex (`keystoneeducations.com`) to `www.keystoneeducations.com`, clean sitemap routes.
- **Indexing Engine (Local / Snow Mesh)**: Python SQLite-backed batch Google Indexing API worker (`bulk-indexing-script-ian`) pushing all 458 URLs directly to Googlebot.
- **Parasite Authority Layer**: GitHub high-DA (DR 96) educational guide repositories and Markdown knowledge silos linking back to Keystone district hubs.
- **Competitor Intercept Layer**: Programmatic comparison & fee audit templates intercepting competitor brand searches.
- **Rank Reconnaissance**: Self-hosted `SerpBear` instance tracking daily keyword movements across all 64 districts.

---

### Task 1: Fix Core Technical SEO Leaks (301 Permanent Redirect & Clean Sitemaps)

**Files:**
- Modify: `/home/munim/keystone-website-main/vercel.json`
- Modify: `/home/munim/keystone-website-main/public/sitemap.xml`

- [ ] **Step 1.1**: Update `vercel.json` to enforce permanent 301 redirects from apex `keystoneeducations.com` to `https://www.keystoneeducations.com` with `permanent: true`.
- [ ] **Step 1.2**: Remove invalid `#anchor` URL fragments from `public/sitemap.xml` (`/services#language-academy`, `/services#ielts-fast-track`, etc.).
- [ ] **Step 1.3**: Verify local builds (`npm run build`) and test redirect response codes.
- [ ] **Step 1.4**: Commit changes and deploy to Vercel production.

---

### Task 2: Install and Configure the Open-Source SEO Arsenal

**Directory:** `/home/munim/seo-arsenal/`

- [ ] **Step 2.1**: Complete cloning and setup of:
  - `bulk-indexing-script-ian` (Google Indexing API Batch Engine)
  - `action-google-indexing` (GitHub Actions workflow)
  - `domainhunter` & `seo-link-hunter` (Expired Domain Scrapers)
  - `serpbear` (Self-hosted Rank Tracker)
  - `crawl4ai` (Deep Web & Competitor Scraper)
- [ ] **Step 2.2**: Set up virtual environments and install Python & Node dependencies for each tool.
- [ ] **Step 2.3**: Create a unified wrapper script `/home/munim/seo-arsenal/run_arsenal.sh` to trigger indexing and rank checks.

---

### Task 3: Build & Execute the Google Indexing API Force-Feed

**Files:**
- Create: `/home/munim/keystone-seo-engine/scripts/google_batch_index.py`
- Create: `/home/munim/seo-arsenal/urls_to_index.txt` (extracted from `sitemap-0.xml`)

- [ ] **Step 3.1**: Parse all 458 URLs from `https://www.keystoneeducations.com/sitemap-0.xml` and export to `urls_to_index.txt`.
- [ ] **Step 3.2**: Configure the Google Cloud Service Account credentials JSON for the Indexing API.
- [ ] **Step 3.3**: Execute initial batch push (first 200 URLs) with `URL_UPDATED` payloads to force Googlebot crawling within 2 to 12 hours.
- [ ] **Step 3.4**: Log submission receipts and HTTP status codes to SQLite database.

---

### Task 4: Launch GitHub Parasite SEO Repositories (High-DA Hijack)

**Target Account:** `munim-430` (GitHub DR 96)

- [ ] **Step 4.1**: Create public repo `munim-430/south-korea-student-visa-bangladesh-guide` with exhaustive IEQAS university tables, statutory bank proof rules, and dofollow links to Keystone Dhanmondi HQ.
- [ ] **Step 4.2**: Create public repo `munim-430/romania-language-preparatory-year-bangladesh` detailing the *Anul Pregătitor* study-gap framework and linking to `/romania-prep-year/from-dhaka/`.
- [ ] **Step 4.3**: Create public repo `munim-430/cyprus-student-visa-without-ielts-dhaka` covering CRMD Blue Paper procedures.
- [ ] **Step 4.4**: Push repos to GitHub and submit URLs to IndexNow/Google Indexing API for instant SERP indexing.

---

### Task 5: Deploy Competitor Intercept & Comparison Engine

**Files:**
- Create: `/home/munim/keystone-seo-engine/src/pages/compare/[competitor].astro`
- Data: `/home/munim/keystone-seo-engine/src/data/competitors.json`

- [ ] **Step 5.1**: Map top 25 Bangladeshi education consultancies (BSB, Shabuj, PFEC, Mentors, Executive, etc.).
- [ ] **Step 5.2**: Build objective comparison templates contrasting hidden file opening charges vs Keystone's direct statutory university bank wire transparency.
- [ ] **Step 5.3**: Inject `Review` & `FAQPage` schema to capture rich snippets on Google for queries like `[competitor] reviews` and `[competitor] complaints`.
- [ ] **Step 5.4**: Re-build and deploy to Vercel.

---

### Task 6: Deploy SerpBear Autonomous Rank Tracker

- [ ] **Step 6.1**: Configure `serpbear` in `/home/munim/seo-arsenal/serpbear`.
- [ ] **Step 6.2**: Add keywords: 64 district terms for South Korea, Romania, Cyprus, Malaysia, plus top 15 competitor comparison queries.
- [ ] **Step 6.3**: Integrate SerpBear into the local **Snow Mesh** dashboard for daily automated ranking reports.
