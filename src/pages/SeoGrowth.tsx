import { FormEvent, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowRight, BadgeCheck, Calculator, CheckCircle2, Globe2, Languages, MessageCircle, Search, ShieldCheck } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { EMAILJS_PUBLIC_KEY, EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, WHATSAPP_NUMBER } from '../constants';
import { STUDY_DESTINATIONS } from './SiloPages';

const SITE_URL = 'https://keystoneoverseasbd.com';
const BD_MOBILE_REGEX = /^(?:\+?880|0)?(1[3-9]\d{8})$/;

type Language = 'en' | 'bn';
type CaptureStatus = 'idle' | 'sent' | 'fallback';

type FaqItem = { question: string; answer: string };

function faqSchema(items: FaqItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };
}

function breadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

function countryFaqs(countryName: string, language: Language): FaqItem[] {
  if (language === 'bn') {
    return [
      {
        question: `বাংলাদেশ থেকে ${countryName}-এ পড়তে যাওয়া যায়?`,
        answer: `হ্যাঁ। বাংলাদেশি শিক্ষার্থীরা ${countryName}-এর যোগ্য বিশ্ববিদ্যালয় বা প্রতিষ্ঠানে আবেদন করতে পারেন, যদি সংশ্লিষ্ট প্রোগ্রামের একাডেমিক, ভাষা, আর্থিক ও ভিসা ডকুমেন্টের শর্ত পূরণ করেন। বিশ্ববিদ্যালয়, ইনটেক ও ভিসা নীতি ভেদে শর্ত বদলায়, তাই টাকা জমা দেওয়ার আগে বর্তমান নিয়ম যাচাই করা জরুরি।`,
      },
      {
        question: `${countryName}-এ পড়তে IELTS কি বাধ্যতামূলক?`,
        answer: `সব প্রোগ্রাম বা প্রতিষ্ঠানের জন্য একই নিয়ম নেই। কিছু প্রতিষ্ঠান IELTS চায়, কিছু ক্ষেত্রে অন্য ইংরেজি দক্ষতার প্রমাণ গ্রহণ করতে পারে। কোন প্রমাণ গ্রহণযোগ্য হবে তা নির্ভর করে নির্দিষ্ট বিশ্ববিদ্যালয়, কোর্স, ইনটেক এবং বর্তমান ভিসা শর্তের ওপর।`,
      },
      {
        question: `Study gap থাকলে ${countryName}-এ আবেদন করা যাবে?`,
        answer: `Study gap একা সাধারণত পুরো সিদ্ধান্ত নির্ধারণ করে না। Gap-এর সময় কী করেছেন, আগের পড়াশোনা, নতুন কোর্সের যৌক্তিকতা, আর্থিক প্রস্তুতি এবং প্রতিষ্ঠানের নিজস্ব admission policy—সবকিছু একসাথে মূল্যায়ন করা হয়।`,
      },
      {
        question: `${countryName}-এ পড়তে কত বাজেট লাগতে পারে?`,
        answer: `একটি নির্ভুল বাজেট বিশ্ববিদ্যালয়, কোর্স, টিউশন বা ডিপোজিট, আর্থিক প্রমাণ, ভিসা ফি, ভ্রমণ ও জীবনযাত্রার খরচের ওপর নির্ভর করে। তাই একটি নির্দিষ্ট অঙ্ককে সব শিক্ষার্থীর জন্য সঠিক ধরে নেওয়া উচিত নয়।`,
      },
    ];
  }

  return [
    {
      question: `Can Bangladeshi students study in ${countryName}?`,
      answer: `Yes. Bangladeshi students can apply to eligible institutions in ${countryName} when they meet the selected program's academic, language, financial and visa-document requirements. Requirements vary by university, intake and current immigration rules, so applicants should verify the live criteria before paying deposits or filing a visa application.`,
    },
    {
      question: `Is IELTS required to study in ${countryName} from Bangladesh?`,
      answer: `There is no single IELTS rule for every institution or program. Some universities require IELTS while others may accept different evidence of English ability. The accepted test, score and exemption rules depend on the specific university, course, intake and current visa requirements.`,
    },
    {
      question: `Can I apply to ${countryName} with a study gap?`,
      answer: `A study gap is not evaluated in isolation. Institutions may consider what you did during the gap, your previous academics, the logic of the new course, financial readiness and their own admission policy. A profile review is more useful than assuming a fixed gap limit.`,
    },
    {
      question: `How much budget is needed to study in ${countryName}?`,
      answer: `The realistic budget depends on the institution, tuition or deposit, proof-of-funds rules, visa fees, travel and living costs. Because these inputs change by program and intake, a single advertised amount can be misleading. Build the budget from the current official requirements.`,
    },
  ];
}

export function SearchOptimizedStudyCountryLanding({ language = 'en' }: { language?: Language }) {
  const { slug } = useParams();
  const country = STUDY_DESTINATIONS.find((item) => item.slug === slug);
  if (!country) return <Navigate to={language === 'bn' ? '/bn/student-consultancy' : '/student-consultancy'} replace />;

  const isBn = language === 'bn';
  const title = isBn ? country.titleBn : country.titleEn;
  const summary = isBn ? country.summaryBn : country.summaryEn;
  const highlights = isBn ? country.highlightsBn : country.highlightsEn;
  const fit = isBn ? country.fitBn : country.fitEn;
  const faqs = countryFaqs(country.name, language);
  const englishPath = `/student-consultancy/${country.slug}`;
  const banglaPath = `/bn/study/${country.slug}`;
  const canonicalPath = isBn ? banglaPath : englishPath;

  return (
    <div className="pt-24 pb-24 lg:pb-16 bg-slate-50 min-h-screen">
      <Helmet>
        <html lang={isBn ? 'bn' : 'en'} />
        <title>{title} — Keystone Overseas</title>
        <meta name="description" content={summary} />
        <link rel="canonical" href={`${SITE_URL}${canonicalPath}`} />
        <link rel="alternate" hrefLang="en" href={`${SITE_URL}${englishPath}`} />
        <link rel="alternate" hrefLang="bn" href={`${SITE_URL}${banglaPath}`} />
        <link rel="alternate" hrefLang="x-default" href={`${SITE_URL}${englishPath}`} />
        <script type="application/ld+json">{JSON.stringify(faqSchema(faqs))}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema([
          { name: 'Home', url: SITE_URL },
          { name: isBn ? 'বিদেশে পড়াশোনা' : 'Student Consultancy', url: `${SITE_URL}${isBn ? '/bn/student-consultancy' : '/student-consultancy'}` },
          { name: title, url: `${SITE_URL}${canonicalPath}` },
        ]))}</script>
      </Helmet>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <span className="text-5xl" aria-hidden="true">{country.flag}</span>
          <Link to={isBn ? englishPath : banglaPath} className="inline-flex items-center gap-2 text-sm font-bold text-brand-blue border border-blue-100 bg-white px-4 py-2 rounded-full">
            <Languages size={16} /> {isBn ? 'English version' : 'বাংলা ভার্সন'}
          </Link>
        </div>

        <h1 className="text-4xl md:text-6xl font-black text-slate-950 max-w-4xl leading-tight mb-6">{title}</h1>
        <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-4xl mb-8">{summary}</p>

        <section className="bg-white border-l-4 border-brand-red rounded-2xl p-6 md:p-8 shadow-sm mb-10" aria-labelledby="direct-answer-heading">
          <div className="flex items-center gap-2 text-brand-red font-black text-xs uppercase tracking-widest mb-3">
            <Search size={16} /> {isBn ? 'সরাসরি উত্তর' : 'Direct answer'}
          </div>
          <h2 id="direct-answer-heading" className="text-xl md:text-2xl font-black text-slate-900 mb-3">{faqs[0].question}</h2>
          <p className="text-slate-700 leading-7">{faqs[0].answer}</p>
        </section>

        <div className="grid lg:grid-cols-3 gap-7 mb-12">
          <section className="lg:col-span-2 bg-white border border-slate-200 rounded-3xl p-7 md:p-9">
            <h2 className="text-2xl font-black text-slate-900 mb-6">{isBn ? 'কীভাবে প্রস্তুতি নেবেন' : 'What to prepare'}</h2>
            <div className="space-y-4">
              {highlights.map((item) => (
                <div key={item} className="flex gap-3 items-start">
                  <CheckCircle2 size={21} className="text-emerald-600 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-700">{item}</span>
                </div>
              ))}
            </div>
            <div className="mt-7 bg-slate-50 border border-slate-200 rounded-2xl p-5">
              <h3 className="font-black text-slate-900 mb-2">{isBn ? 'কার জন্য উপযোগী?' : 'Who may find this route suitable?'}</h3>
              <p className="text-slate-600 leading-relaxed">{fit}</p>
            </div>
          </section>

          <aside className="bg-brand-blue-dark text-white rounded-3xl p-7 md:p-8">
            <Calculator size={34} className="mb-5 text-blue-200" />
            <h2 className="text-2xl font-black mb-3">{isBn ? 'আপনার Visa Fit Score দেখুন' : 'Check your Visa Fit Score'}</h2>
            <p className="text-blue-100 text-sm leading-relaxed mb-6">{isBn ? 'Study gap, IELTS এবং বাজেট দিয়ে একটি প্রাথমিক profile-strength score নিন। এটি embassy decision-এর prediction নয়।' : 'Use your study gap, English score and budget to get a preliminary profile-strength score. It is not a prediction of an embassy decision.'}</p>
            <Link to="/visa-success-score" className="inline-flex items-center gap-2 bg-white text-brand-blue-dark font-black px-5 py-3 rounded-xl hover:bg-blue-50 transition-colors">
              {isBn ? 'ফ্রি স্কোর দেখুন' : 'Calculate free score'} <ArrowRight size={17} />
            </Link>
          </aside>
        </div>

        <section className="mb-12" aria-labelledby="country-faq-heading">
          <h2 id="country-faq-heading" className="text-3xl font-black text-slate-950 mb-6">{isBn ? 'সাধারণ প্রশ্নের সরাসরি উত্তর' : 'Direct answers to common questions'}</h2>
          <div className="grid md:grid-cols-2 gap-5">
            {faqs.slice(1).map((item) => (
              <article key={item.question} className="bg-white border border-slate-200 rounded-2xl p-6">
                <h3 className="font-black text-slate-900 text-lg mb-3">{item.question}</h3>
                <p className="text-slate-600 leading-7">{item.answer}</p>
              </article>
            ))}
          </div>
        </section>

        {country.id === 'south-korea' && (
          <section className="bg-white border border-slate-200 rounded-3xl p-7 md:p-8 mb-10">
            <div className="flex items-center gap-2 text-brand-blue font-black mb-3"><Languages size={19} /> Bangla + Banglish search guide</div>
            <h2 className="text-2xl font-black text-slate-900 mb-3">“Kivabe South Korea Jabo?”</h2>
            <p className="text-slate-600 mb-5">বাংলায় ধাপে ধাপে South Korea study route বুঝতে আমাদের dedicated guide দেখুন।</p>
            <Link to="/bn/guide/kivabe-south-korea-jabo" className="inline-flex items-center gap-2 text-brand-blue font-black">Guide পড়ুন <ArrowRight size={17} /></Link>
          </section>
        )}

        <div className="bg-slate-950 text-white rounded-3xl p-8 md:p-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h2 className="text-2xl font-black mb-2">{isBn ? 'নিয়ম বদলায়—আবেদনের আগে যাচাই করুন' : 'Rules change — verify before applying'}</h2>
            <p className="text-slate-300 max-w-2xl">{isBn ? 'ভর্তি, আর্থিক ও ভিসা শর্ত বিশ্ববিদ্যালয় ও সরকারি উৎস থেকে বর্তমান তথ্য দিয়ে যাচাই করা উচিত।' : 'Admission, financial and visa requirements should be checked against current university and official government sources before filing.'}</p>
          </div>
          <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hi, I want a current eligibility review for ${country.name}.`)}`} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 bg-emerald-500 text-white font-black px-6 py-3 rounded-xl whitespace-nowrap">
            <MessageCircle size={18} /> {isBn ? 'WhatsApp করুন' : 'Request profile review'}
          </a>
        </div>
      </main>
    </div>
  );
}

const GUIDE_DATA: Record<string, { title: string; description: string; question: string; answer: string; points: string[]; faqs: FaqItem[] }> = {
  'kivabe-south-korea-jabo': {
    title: 'Kivabe South Korea Jabo? — বাংলাদেশ থেকে কোরিয়ায় পড়াশোনার গাইড',
    description: 'বাংলাদেশ থেকে South Korea-তে study route, university eligibility, language requirement, documents এবং visa preparation সহজ বাংলায় বুঝুন।',
    question: 'বাংলাদেশ থেকে কিভাবে South Korea যাবো পড়াশোনার জন্য?',
    answer: 'প্রথমে নিজের একাডেমিক প্রোফাইল, study gap, ভাষার প্রস্তুতি ও বাজেট যাচাই করুন। এরপর উপযুক্ত Korean university বা language program বেছে admission requirement পূরণ করতে হবে। Offer বা admission stage সম্পন্ন হলে বর্তমান D-2/D-4 visa document rules অনুযায়ী ফাইল প্রস্তুত করতে হয়।',
    points: ['নিজের academic profile ও gap যাচাই', 'University বা language program shortlist', 'বর্তমান language requirement যাচাই', 'Academic + financial documents প্রস্তুত', 'Admission এবং visa stage আলাদা করে track করা'],
    faqs: [
      { question: 'Korea যেতে IELTS লাগে?', answer: 'সব university বা program-এর requirement এক নয়। IELTS, TOEFL, TOPIK, institution test বা অন্য language evidence—কোনটি গ্রহণযোগ্য তা নির্দিষ্ট program-এর বর্তমান admission rule থেকে যাচাই করতে হবে।' },
      { question: 'Study gap থাকলে Korea যাওয়া যাবে?', answer: 'Gap থাকলেই profile automatically reject হয় না। Gap explanation, academic history, intended program এবং university-specific eligibility একসাথে দেখা হয়।' },
      { question: 'D-2 আর D-4 কী?', answer: 'সাধারণভাবে D-2 degree-study category এবং D-4 নির্দিষ্ট training বা language-study category-এর সাথে সম্পর্কিত। সঠিক category আপনার admission type এবং বর্তমান Korean immigration rules-এর ওপর নির্ভর করে।' },
    ],
  },
  'bhalo-manpower-agency-dhaka': {
    title: 'Bhalo Manpower Agency Dhaka — ভালো এজেন্সি যাচাই করবেন যেভাবে',
    description: 'Dhaka-তে manpower agency বাছাইয়ের আগে RL/BMET status, job order, employer, contract, payment receipt এবং process transparency কীভাবে যাচাই করবেন।',
    question: 'Dhaka-তে ভালো manpower agency কিভাবে চিনবো?',
    answer: 'কোনো agency-কে শুধু Facebook post বা কথার ওপর “ভালো” ধরে নেবেন না। Recruiting License বা সংশ্লিষ্ট বৈধ partner status, employer ও job order, লিখিত contract, সরকারি process, অফিসের পরিচয়, payment receipt এবং refund/complaint terms যাচাই করুন। যাচাই করা যায় না এমন guarantee বা cash-only pressure এড়িয়ে চলুন।',
    points: ['Recruiting License / সংশ্লিষ্ট বৈধ partner relationship যাচাই', 'Employer ও job order-এর প্রমাণ দেখুন', 'Salary, role ও deductions লিখিত contract-এ মিলিয়ে নিন', 'প্রতিটি payment-এর official receipt নিন', 'Visa/job guarantee ধরনের absolute claim এড়িয়ে চলুন'],
    faqs: [
      { question: 'RL number কেন গুরুত্বপূর্ণ?', answer: 'Recruiting License বা RL তথ্য আপনাকে সংশ্লিষ্ট recruiting entity-এর বৈধ পরিচয় যাচাই করতে সাহায্য করে। শুধু একটি number দেখানোই যথেষ্ট নয়—বর্তমান সরকারি source-এ status মিলিয়ে দেখা উচিত।' },
      { question: 'আগে টাকা চাইলে কী করবো?', answer: 'কী বাবদ টাকা, কাকে দিচ্ছেন, সরকারি বা employer cost কোনটি এবং refund rule কী—লিখিতভাবে বুঝে official receipt ছাড়া payment করা উচিত নয়।' },
      { question: 'Guaranteed visa বলা কি বিশ্বাসযোগ্য?', answer: 'Embassy বা immigration authority-এর decision কোনো private agency নিশ্চিত করতে পারে না। তাই visa guarantee-এর বদলে documented process, eligibility এবং verifiable job order-কে গুরুত্ব দিন।' },
    ],
  },
  'bideshe-porashona-kivabe-jabo': {
    title: 'Bideshe Porashona Kivabe Jabo — বিদেশে পড়াশোনার সহজ রোডম্যাপ',
    description: 'বাংলাদেশ থেকে বিদেশে পড়তে যাওয়ার profile review, country selection, university application, financial preparation এবং visa-file roadmap।',
    question: 'বাংলাদেশ থেকে বিদেশে পড়াশোনা করতে কীভাবে শুরু করবো?',
    answer: 'শুরু করুন নিজের ফলাফল, study gap, English proficiency, preferred subject এবং বাস্তবসম্মত budget লিখে। তারপর country নয়—আগে suitable program ও institution shortlist করুন। Admission requirement পূরণ, document verification ও financial planning শেষ করে offer এবং visa stage আলাদা ধাপে পরিচালনা করুন।',
    points: ['Profile লিখে বাস্তব eligibility বোঝা', 'Subject ও career goal অনুযায়ী country shortlist', 'Official university requirements যাচাই', 'Budget + proof-of-funds planning', 'Offer, deposit এবং visa stage আলাদা checkpoint'],
    faqs: [
      { question: 'কম বাজেটে কোন দেশ ভালো?', answer: 'একটি country সবার জন্য “সেরা” নয়। Tuition, scholarship, proof of funds, living cost এবং visa process মিলিয়ে আপনার profile অনুযায়ী comparison করতে হবে।' },
      { question: 'IELTS না থাকলে কি বিদেশে পড়া যায়?', answer: 'কিছু institution বিকল্প language evidence নিতে পারে, আবার অনেক program standard English test চায়। “No IELTS” blanket promise-এর বদলে নির্দিষ্ট program rule যাচাই করা উচিত।' },
      { question: 'কখন consultant দরকার?', answer: 'আপনি নিজেও আবেদন করতে পারেন। Consultant useful হতে পারে যখন program comparison, document sequencing, current requirements বা deadline tracking-এ structured support দরকার হয়।' },
    ],
  },
  'malaysia-study-korte-koto-taka-lage': {
    title: 'Malaysia Study Korte Koto Taka Lage? — বাজেট কীভাবে হিসাব করবেন',
    description: 'Malaysia-তে study budget হিসাব করতে tuition, deposit, visa-related charges, living cost ও financial preparation কীভাবে আলাদা করবেন।',
    question: 'Malaysia-তে পড়তে কত টাকা লাগে?',
    answer: 'Malaysia study budget একটি fixed number নয়। University, program, tuition, initial deposit, visa-related official charges, accommodation এবং living cost অনুযায়ী মোট খরচ বদলে যায়। তাই social-media package price-এর বদলে selected university-এর current fee schedule এবং official process ধরে item-by-item budget তৈরি করুন।',
    points: ['University tuition ও deposit আলাদা লিখুন', 'Official visa-related charges যাচাই করুন', 'Accommodation ও monthly living cost ধরুন', 'Currency movement-এর buffer রাখুন', 'কোন payment refundable তা আগে বুঝুন'],
    faqs: [
      { question: 'একটি package price বিশ্বাস করা উচিত?', answer: 'Package-এর প্রতিটি component লিখিতভাবে না বুঝে মোট price ধরে সিদ্ধান্ত নেওয়া ঝুঁকিপূর্ণ। University fee, official fee এবং service-related item আলাদা দেখা উচিত।' },
      { question: 'Scholarship থাকলে budget কমবে?', answer: 'Scholarship-এর amount, duration, eligibility এবং tuition-এর কোন অংশ cover করে তা award terms থেকে যাচাই করতে হবে। Scholarship মানেই সব living বা visa-related cost cover হবে এমন নয়।' },
      { question: 'Budget proof কীভাবে plan করবো?', answer: 'Financial evidence-এর ধরন ও amount institution এবং current visa process অনুযায়ী বদলাতে পারে। আবেদন করার আগে live requirement যাচাই করুন।' },
    ],
  },
};

export function BanglaSearchLanding() {
  const { slug } = useParams();
  const guide = slug ? GUIDE_DATA[slug] : undefined;
  if (!guide || !slug) return <Navigate to="/bn/student-consultancy" replace />;
  const canonical = `${SITE_URL}/bn/guide/${slug}`;

  return (
    <div className="pt-24 pb-24 lg:pb-16 bg-slate-50 min-h-screen">
      <Helmet>
        <html lang="bn" />
        <title>{guide.title}</title>
        <meta name="description" content={guide.description} />
        <link rel="canonical" href={canonical} />
        <script type="application/ld+json">{JSON.stringify(faqSchema(guide.faqs))}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema([
          { name: 'Home', url: SITE_URL },
          { name: 'বাংলা গাইড', url: `${SITE_URL}/bn/student-consultancy` },
          { name: guide.question, url: canonical },
        ]))}</script>
      </Helmet>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="inline-flex items-center gap-2 bg-blue-50 text-brand-blue border border-blue-100 px-4 py-2 rounded-full font-bold text-sm mb-6"><Languages size={17} /> বাংলা + Banglish Search Guide</div>
        <h1 className="text-4xl md:text-6xl font-black text-slate-950 leading-tight mb-7">{guide.title}</h1>

        <section className="bg-white border-l-4 border-brand-red rounded-2xl p-7 md:p-9 shadow-sm mb-10">
          <div className="text-brand-red uppercase tracking-widest text-xs font-black mb-3">Direct Answer</div>
          <h2 className="text-2xl font-black text-slate-900 mb-4">{guide.question}</h2>
          <p className="text-slate-700 leading-8 text-lg">{guide.answer}</p>
        </section>

        <section className="grid md:grid-cols-2 gap-7 mb-12">
          <div className="bg-white border border-slate-200 rounded-3xl p-7">
            <h2 className="text-2xl font-black text-slate-900 mb-5">কী কী যাচাই করবেন</h2>
            <div className="space-y-4">
              {guide.points.map((point) => <div key={point} className="flex gap-3"><CheckCircle2 className="text-emerald-600 flex-shrink-0 mt-0.5" size={20} /><span className="text-slate-700">{point}</span></div>)}
            </div>
          </div>
          <div className="bg-slate-950 text-white rounded-3xl p-7">
            <ShieldCheck size={32} className="text-blue-200 mb-4" />
            <h2 className="text-2xl font-black mb-3">Shortcut নয়, verification</h2>
            <p className="text-slate-300 leading-7 mb-6">Search query Banglish হলেও সিদ্ধান্তের ভিত্তি হওয়া উচিত official, current এবং verifiable information। Keystone-এর public guides absolute visa বা job guarantee দেয় না।</p>
            <Link to="/visa-success-score" className="inline-flex items-center gap-2 bg-white text-slate-950 font-black px-5 py-3 rounded-xl">Free Visa Fit Score <ArrowRight size={17} /></Link>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-black text-slate-950 mb-6">আরও প্রশ্ন</h2>
          <div className="space-y-4">
            {guide.faqs.map((item) => (
              <article key={item.question} className="bg-white border border-slate-200 rounded-2xl p-6">
                <h3 className="text-lg font-black text-slate-900 mb-2">{item.question}</h3>
                <p className="text-slate-600 leading-7">{item.answer}</p>
              </article>
            ))}
          </div>
        </section>

        <div className="flex flex-wrap gap-3">
          <Link to="/bn/student-consultancy" className="bg-brand-blue text-white font-black px-5 py-3 rounded-xl">বিদেশে পড়াশোনা Hub</Link>
          <Link to="/bn/manpower-recruitment" className="bg-white border border-slate-200 text-slate-800 font-black px-5 py-3 rounded-xl">ম্যানপাওয়ার Hub</Link>
        </div>
      </main>
    </div>
  );
}

const GAP_POINTS: Record<string, number> = { '0': 25, '1-2': 22, '3-5': 17, '6+': 10 };
const IELTS_POINTS: Record<string, number> = { none: 7, '5.0': 12, '5.5': 16, '6.0': 20, '6.5': 23, '7.0+': 25 };
const BUDGET_POINTS: Record<string, number> = { 'under-5': 8, '5-10': 15, '10-20': 23, '20+': 30 };

function scoreBand(score: number) {
  if (score >= 80) return { label: 'Strong profile signals', className: 'text-emerald-700 bg-emerald-50 border-emerald-200' };
  if (score >= 60) return { label: 'Moderate profile signals', className: 'text-amber-700 bg-amber-50 border-amber-200' };
  return { label: 'Needs profile strengthening', className: 'text-red-700 bg-red-50 border-red-200' };
}

export function VisaSuccessScore() {
  const [gap, setGap] = useState('0');
  const [ielts, setIelts] = useState('none');
  const [budget, setBudget] = useState('5-10');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [captureStatus, setCaptureStatus] = useState<CaptureStatus>('idle');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const score = useMemo(() => Math.min(100, 20 + (GAP_POINTS[gap] ?? 0) + (IELTS_POINTS[ielts] ?? 0) + (BUDGET_POINTS[budget] ?? 0)), [gap, ielts, budget]);
  const band = scoreBand(score);
  const whatsappText = encodeURIComponent(`Visa Fit Score lead\nName: ${name}\nPhone: ${phone}\nEmail: ${email}\nStudy gap: ${gap}\nIELTS: ${ielts}\nBudget: ${budget}\nScore: ${score}/100 (${band.label})`);
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappText}`;

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError('');
    const cleanedPhone = phone.replace(/[\s\-()]/g, '');
    if (!BD_MOBILE_REGEX.test(cleanedPhone)) {
      setError('Enter a valid Bangladeshi mobile number, for example 01711234567.');
      return;
    }
    if (!email.includes('@') || !consent) {
      setError('Enter a valid email and confirm follow-up consent.');
      return;
    }

    setLoading(true);
    let delivered = false;
    try {
      const configured = EMAILJS_SERVICE_ID !== 'YOUR_EMAILJS_SERVICE_ID' && EMAILJS_TEMPLATE_ID !== 'YOUR_EMAILJS_TEMPLATE_ID' && EMAILJS_PUBLIC_KEY !== 'YOUR_EMAILJS_PUBLIC_KEY';
      if (configured) {
        await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
          from_name: name,
          phone: cleanedPhone,
          reply_to: email,
          study_gap: gap,
          ielts_status: ielts,
          budget_bdt: budget,
          visa_fit_score: `${score}/100`,
          score_band: band.label,
          inquiry_type: 'Visa Fit Score',
        }, { publicKey: EMAILJS_PUBLIC_KEY });
        delivered = true;
      }
    } catch {
      delivered = false;
    } finally {
      setCaptureStatus(delivered ? 'sent' : 'fallback');
      setShowResult(true);
      setLoading(false);
    }
  };

  const calculatorFaqs: FaqItem[] = [
    { question: 'Does the Visa Success Score predict visa approval?', answer: 'No. It is a profile-strength screening tool based only on the inputs you provide. Embassy or immigration decisions depend on official rules, documents, credibility, finances and other factors that this calculator cannot fully evaluate.' },
    { question: 'Why does the calculator ask for phone and email?', answer: 'The contact details let Keystone Overseas follow up on the score if you explicitly consent. The form should not be treated as a visa application, and submitting it does not guarantee admission or a visa.' },
    { question: 'Can a low score be improved?', answer: 'Often, yes. A profile may improve through stronger language evidence, better financial planning, a more suitable program or destination, and clearer documentation. A low score is a prompt for review, not a rejection decision.' },
  ];

  return (
    <div className="pt-24 pb-24 lg:pb-16 bg-slate-50 min-h-screen">
      <Helmet>
        <title>Free Visa Success Score Bangladesh — Visa Fit Calculator | Keystone Overseas</title>
        <meta name="description" content="Free visa-fit calculator for Bangladeshi students. Enter study gap, IELTS status and budget to receive a preliminary profile-strength score and optional consultation follow-up." />
        <link rel="canonical" href={`${SITE_URL}/visa-success-score`} />
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebApplication',
          name: 'Keystone Overseas Visa Success Score',
          url: `${SITE_URL}/visa-success-score`,
          applicationCategory: 'EducationalApplication',
          operatingSystem: 'Any',
          offers: { '@type': 'Offer', price: '0', priceCurrency: 'BDT' },
          description: 'A free preliminary study-abroad profile-strength calculator. It does not predict or guarantee a visa decision.',
        })}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema(calculatorFaqs))}</script>
      </Helmet>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="max-w-3xl mb-10">
          <div className="inline-flex items-center gap-2 bg-red-50 text-brand-red border border-red-100 rounded-full px-4 py-2 text-sm font-black mb-5"><Calculator size={17} /> Free interactive tool</div>
          <h1 className="text-4xl md:text-6xl font-black text-slate-950 leading-tight mb-5">Visa Success Score</h1>
          <p className="text-xl text-slate-600 leading-relaxed">Get a fast <strong>Visa Fit Score</strong> from your study gap, English status and budget. The score measures profile signals only; it is not a visa approval probability or embassy prediction.</p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 items-start">
          <form onSubmit={handleSubmit} className="lg:col-span-3 bg-white border border-slate-200 rounded-3xl p-6 md:p-9 shadow-sm space-y-6">
            <div>
              <label className="block font-black text-slate-900 mb-2">Study gap</label>
              <select value={gap} onChange={(e) => { setGap(e.target.value); setShowResult(false); }} className="w-full border border-slate-200 rounded-xl px-4 py-3 bg-white">
                <option value="0">No study gap</option><option value="1-2">1–2 years</option><option value="3-5">3–5 years</option><option value="6+">6+ years</option>
              </select>
            </div>
            <div>
              <label className="block font-black text-slate-900 mb-2">IELTS / English status</label>
              <select value={ielts} onChange={(e) => { setIelts(e.target.value); setShowResult(false); }} className="w-full border border-slate-200 rounded-xl px-4 py-3 bg-white">
                <option value="none">No IELTS yet</option><option value="5.0">IELTS 5.0</option><option value="5.5">IELTS 5.5</option><option value="6.0">IELTS 6.0</option><option value="6.5">IELTS 6.5</option><option value="7.0+">IELTS 7.0+</option>
              </select>
            </div>
            <div>
              <label className="block font-black text-slate-900 mb-2">Available study budget</label>
              <select value={budget} onChange={(e) => { setBudget(e.target.value); setShowResult(false); }} className="w-full border border-slate-200 rounded-xl px-4 py-3 bg-white">
                <option value="under-5">Under BDT 5 lakh</option><option value="5-10">BDT 5–10 lakh</option><option value="10-20">BDT 10–20 lakh</option><option value="20+">BDT 20 lakh+</option>
              </select>
            </div>

            <div className="border-t border-slate-200 pt-6">
              <div className="flex items-center gap-2 text-brand-blue font-black mb-4"><BadgeCheck size={19} /> Your score is ready — where should we send the follow-up?</div>
              <div className="grid md:grid-cols-2 gap-4">
                <input required value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" className="border border-slate-200 rounded-xl px-4 py-3" />
                <input required value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone / WhatsApp" type="tel" className="border border-slate-200 rounded-xl px-4 py-3" />
              </div>
              <input required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email address" type="email" className="w-full border border-slate-200 rounded-xl px-4 py-3 mt-4" />
              <label className="flex gap-3 items-start mt-4 text-sm text-slate-600">
                <input required checked={consent} onChange={(e) => setConsent(e.target.checked)} type="checkbox" className="mt-1" />
                <span>I agree that Keystone Overseas may use these details to contact me about this score and study-abroad services. See the <Link to="/privacy" className="text-brand-blue font-bold">Privacy Policy</Link>.</span>
              </label>
              {error && <p className="text-red-600 text-sm mt-3">{error}</p>}
            </div>

            <button type="submit" disabled={loading} className="w-full bg-brand-blue hover:bg-brand-red text-white font-black py-4 rounded-xl transition-colors disabled:opacity-60">
              {loading ? 'Calculating…' : 'Reveal My Free Score'}
            </button>
          </form>

          <aside className="lg:col-span-2 space-y-6">
            {!showResult ? (
              <div className="bg-slate-950 text-white rounded-3xl p-8 min-h-[300px] flex flex-col justify-center">
                <Globe2 size={38} className="text-blue-300 mb-5" />
                <h2 className="text-3xl font-black mb-3">3 inputs. One profile signal.</h2>
                <p className="text-slate-300 leading-relaxed">Your result stays hidden until you submit the form with consent. No document upload is required.</p>
              </div>
            ) : (
              <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
                <div className="text-sm uppercase tracking-widest text-slate-500 font-black mb-2">Your Visa Fit Score</div>
                <div className="text-7xl font-black text-slate-950 mb-3">{score}<span className="text-2xl text-slate-400">/100</span></div>
                <div className={`inline-flex px-4 py-2 rounded-full border font-black text-sm ${band.className}`}>{band.label}</div>
                <p className="text-slate-600 leading-relaxed mt-5">This score reflects only study gap, English status and budget. It does not evaluate document authenticity, academic progression, immigration history, institution-specific criteria or an embassy decision.</p>

                {captureStatus === 'sent' ? (
                  <div className="mt-5 flex gap-2 items-start text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-xl p-4 text-sm"><CheckCircle2 size={18} className="mt-0.5 flex-shrink-0" /> Your submitted details were sent for follow-up.</div>
                ) : (
                  <div className="mt-5 bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-900">Automated lead delivery is not configured yet. Your score was calculated locally; use WhatsApp below if you want Keystone to receive the profile now.</div>
                )}

                <a href={whatsappUrl} target="_blank" rel="noreferrer" className="mt-5 inline-flex w-full items-center justify-center gap-2 bg-emerald-500 text-white font-black px-5 py-3 rounded-xl"><MessageCircle size={18} /> Send score on WhatsApp</a>
              </div>
            )}

            <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5 text-sm text-blue-950"><strong>Important:</strong> No private consultancy can guarantee or accurately predict an embassy's visa decision. Use the score to identify whether your profile deserves a deeper eligibility review.</div>
          </aside>
        </div>

        <section className="mt-14">
          <h2 className="text-3xl font-black text-slate-950 mb-6">How the score should be used</h2>
          <div className="grid md:grid-cols-3 gap-5">
            {calculatorFaqs.map((item) => <article key={item.question} className="bg-white border border-slate-200 rounded-2xl p-6"><h3 className="font-black text-slate-900 mb-3">{item.question}</h3><p className="text-slate-600 leading-7">{item.answer}</p></article>)}
          </div>
        </section>
      </main>
    </div>
  );
}
