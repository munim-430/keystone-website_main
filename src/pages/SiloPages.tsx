import { Helmet } from 'react-helmet-async';
import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowRight, BookOpen, BriefcaseBusiness, CheckCircle2, Globe2, Languages, ShieldCheck } from 'lucide-react';
import { WHATSAPP_CONSULTATION } from '../constants';

type Language = 'en' | 'bn';

type StudyDestination = {
  id: string;
  slug: string;
  name: string;
  flag: string;
  titleEn: string;
  titleBn: string;
  summaryEn: string;
  summaryBn: string;
  highlightsEn: string[];
  highlightsBn: string[];
  fitEn: string;
  fitBn: string;
};

type ManpowerRegion = {
  id: string;
  slug: string;
  name: string;
  titleEn: string;
  titleBn: string;
  summaryEn: string;
  summaryBn: string;
  rolesEn: string[];
  rolesBn: string[];
};

export const STUDY_DESTINATIONS: StudyDestination[] = [
  {
    id: 'malaysia',
    slug: 'study-in-malaysia-from-bangladesh',
    name: 'Malaysia',
    flag: '🇲🇾',
    titleEn: 'Study in Malaysia from Bangladesh',
    titleBn: 'বাংলাদেশ থেকে মালয়েশিয়ায় পড়াশোনা',
    summaryEn: 'A practical route for Bangladeshi students seeking internationally recognized programs, English-medium study options and comparatively accessible tuition structures.',
    summaryBn: 'বাংলাদেশি শিক্ষার্থীদের জন্য আন্তর্জাতিকভাবে স্বীকৃত ডিগ্রি, ইংরেজি মাধ্যমে পড়াশোনা এবং তুলনামূলকভাবে সাশ্রয়ী টিউশন কাঠামোর একটি বাস্তবসম্মত গন্তব্য।',
    highlightsEn: ['University and program shortlisting', 'Application and offer-letter follow-up', 'Document checklist and visa-file preparation'],
    highlightsBn: ['বিশ্ববিদ্যালয় ও প্রোগ্রাম বাছাই', 'আবেদন ও অফার লেটার ফলো-আপ', 'ডকুমেন্ট চেকলিস্ট ও ভিসা ফাইল প্রস্তুতি'],
    fitEn: 'Best for students who want a structured Asian study destination with a broad range of private and international university options.',
    fitBn: 'যারা এশিয়ার মধ্যে পরিকল্পিতভাবে পড়াশোনা করতে চান এবং বিভিন্ন বেসরকারি ও আন্তর্জাতিক বিশ্ববিদ্যালয়ের অপশন চান, তাদের জন্য উপযোগী।',
  },
  {
    id: 'south-korea',
    slug: 'study-in-south-korea-from-bangladesh',
    name: 'South Korea',
    flag: '🇰🇷',
    titleEn: 'Study in South Korea from Bangladesh',
    titleBn: 'বাংলাদেশ থেকে দক্ষিণ কোরিয়ায় পড়াশোনা',
    summaryEn: 'Guidance for Bangladeshi applicants exploring Korean language, undergraduate and postgraduate study pathways, including institution-specific admission requirements.',
    summaryBn: 'কোরিয়ান ভাষা, স্নাতক ও স্নাতকোত্তর পর্যায়ে পড়তে ইচ্ছুক বাংলাদেশি শিক্ষার্থীদের জন্য বিশ্ববিদ্যালয়ভিত্তিক ভর্তি শর্ত অনুযায়ী গাইডেন্স।',
    highlightsEn: ['D-2 / D-4 pathway guidance', 'University eligibility screening', 'Academic and financial document preparation'],
    highlightsBn: ['D-2 / D-4 পথ সম্পর্কে গাইডেন্স', 'বিশ্ববিদ্যালয় যোগ্যতা যাচাই', 'একাডেমিক ও আর্থিক ডকুমেন্ট প্রস্তুতি'],
    fitEn: 'Suitable for students interested in Korean universities, language institutes and technology-focused academic environments.',
    fitBn: 'কোরিয়ান বিশ্ববিদ্যালয়, ভাষা ইনস্টিটিউট এবং প্রযুক্তিনির্ভর একাডেমিক পরিবেশে আগ্রহী শিক্ষার্থীদের জন্য উপযোগী।',
  },
  {
    id: 'romania',
    slug: 'study-in-romania-from-bangladesh',
    name: 'Romania',
    flag: '🇷🇴',
    titleEn: 'Study in Romania from Bangladesh',
    titleBn: 'বাংলাদেশ থেকে রোমানিয়ায় পড়াশোনা',
    summaryEn: 'A European study route that may include Romanian preparatory-year options and English-taught programs depending on the institution and applicant profile.',
    summaryBn: 'বিশ্ববিদ্যালয় ও শিক্ষার্থীর প্রোফাইল অনুযায়ী রোমানিয়ান প্রিপারেটরি ইয়ার অথবা ইংরেজি মাধ্যমে পড়াশোনার সুযোগসহ একটি ইউরোপীয় শিক্ষা গন্তব্য।',
    highlightsEn: ['Preparatory-year pathway screening', 'Program and intake matching', 'Admission document sequencing'],
    highlightsBn: ['প্রিপারেটরি ইয়ার উপযোগিতা যাচাই', 'প্রোগ্রাম ও ইনটেক মিলিয়ে দেওয়া', 'ভর্তি ডকুমেন্ট সঠিক ধাপে প্রস্তুত করা'],
    fitEn: 'Useful for students comparing lower-cost European study options and language-preparatory pathways.',
    fitBn: 'তুলনামূলকভাবে কম খরচের ইউরোপীয় অপশন ও ভাষা প্রস্তুতি রুট খুঁজছেন এমন শিক্ষার্থীদের জন্য উপযোগী।',
  },
  {
    id: 'cyprus',
    slug: 'study-in-cyprus-from-bangladesh',
    name: 'Cyprus',
    flag: '🇨🇾',
    titleEn: 'Study in Cyprus from Bangladesh',
    titleBn: 'বাংলাদেশ থেকে সাইপ্রাসে পড়াশোনা',
    summaryEn: 'Application guidance for eligible Bangladeshi students considering universities and colleges in Cyprus, with institution-specific admission and visa requirements checked before filing.',
    summaryBn: 'সাইপ্রাসের বিশ্ববিদ্যালয় ও কলেজে আবেদন করতে ইচ্ছুক যোগ্য বাংলাদেশি শিক্ষার্থীদের জন্য প্রতিষ্ঠানভিত্তিক ভর্তি ও ভিসা শর্ত যাচাই করে আবেদন সহায়তা।',
    highlightsEn: ['Institution matching', 'Application-file preparation', 'Pre-visa document review'],
    highlightsBn: ['প্রতিষ্ঠান নির্বাচন', 'আবেদন ফাইল প্রস্তুতি', 'ভিসার আগে ডকুমেন্ট রিভিউ'],
    fitEn: 'For students who want a Mediterranean study destination and need a clear, institution-by-institution eligibility review.',
    fitBn: 'মেডিটেরেনিয়ান অঞ্চলে পড়াশোনা করতে চান এবং বিশ্ববিদ্যালয়ভিত্তিক পরিষ্কার যোগ্যতা যাচাই চান এমন শিক্ষার্থীদের জন্য।',
  },
  {
    id: 'hungary',
    slug: 'study-in-hungary-from-bangladesh',
    name: 'Hungary',
    flag: '🇭🇺',
    titleEn: 'Study in Hungary from Bangladesh',
    titleBn: 'বাংলাদেশ থেকে হাঙ্গেরিতে পড়াশোনা',
    summaryEn: 'Support for Bangladeshi applicants comparing Hungarian universities, English-taught degrees and scholarship or self-funded study routes.',
    summaryBn: 'হাঙ্গেরির বিশ্ববিদ্যালয়, ইংরেজি মাধ্যমে ডিগ্রি এবং স্কলারশিপ বা নিজস্ব অর্থায়নে পড়াশোনার পথ তুলনা করতে বাংলাদেশি শিক্ষার্থীদের সহায়তা।',
    highlightsEn: ['Program eligibility checks', 'Application timeline planning', 'Scholarship vs self-funded route comparison'],
    highlightsBn: ['প্রোগ্রাম যোগ্যতা যাচাই', 'আবেদন টাইমলাইন পরিকল্পনা', 'স্কলারশিপ বনাম নিজস্ব অর্থায়ন তুলনা'],
    fitEn: 'For applicants seeking a Central European study destination with varied university and scholarship options.',
    fitBn: 'মধ্য ইউরোপে বিভিন্ন বিশ্ববিদ্যালয় ও স্কলারশিপ অপশন খুঁজছেন এমন শিক্ষার্থীদের জন্য।',
  },
  {
    id: 'uk',
    slug: 'study-in-uk-from-bangladesh',
    name: 'United Kingdom',
    flag: '🇬🇧',
    titleEn: 'Study in the UK from Bangladesh',
    titleBn: 'বাংলাদেশ থেকে যুক্তরাজ্যে পড়াশোনা',
    summaryEn: 'Profile-based guidance for Bangladeshi students applying to UK universities, with course selection, application documents and visa-stage preparation handled as separate checkpoints.',
    summaryBn: 'কোর্স নির্বাচন, আবেদন ডকুমেন্ট ও ভিসা ধাপ আলাদা চেকপয়েন্ট হিসেবে ধরে যুক্তরাজ্যে আবেদনকারী বাংলাদেশি শিক্ষার্থীদের প্রোফাইলভিত্তিক গাইডেন্স।',
    highlightsEn: ['Course and university shortlisting', 'SOP and application review', 'CAS-stage and visa-file preparation'],
    highlightsBn: ['কোর্স ও বিশ্ববিদ্যালয় শর্টলিস্ট', 'SOP ও আবেদন রিভিউ', 'CAS ধাপ ও ভিসা ফাইল প্রস্তুতি'],
    fitEn: 'For students who want a globally recognized English-language degree and can meet institution and financial requirements.',
    fitBn: 'আন্তর্জাতিকভাবে স্বীকৃত ইংরেজি মাধ্যমে ডিগ্রি চান এবং বিশ্ববিদ্যালয় ও আর্থিক শর্ত পূরণ করতে সক্ষম শিক্ষার্থীদের জন্য।',
  },
  {
    id: 'canada',
    slug: 'study-in-canada-from-bangladesh',
    name: 'Canada',
    flag: '🇨🇦',
    titleEn: 'Study in Canada from Bangladesh',
    titleBn: 'বাংলাদেশ থেকে কানাডায় পড়াশোনা',
    summaryEn: 'A profile-first route for Bangladeshi applicants comparing Canadian colleges and universities, with current institution and visa rules checked before any recommendation.',
    summaryBn: 'কানাডার কলেজ ও বিশ্ববিদ্যালয় তুলনা করতে ইচ্ছুক বাংলাদেশি শিক্ষার্থীদের জন্য প্রোফাইলভিত্তিক গাইডেন্স, যেখানে সুপারিশের আগে বর্তমান প্রতিষ্ঠান ও ভিসা শর্ত যাচাই করা হয়।',
    highlightsEn: ['Program relevance review', 'Academic and financial readiness check', 'Application and visa-document planning'],
    highlightsBn: ['প্রোগ্রামের প্রাসঙ্গিকতা যাচাই', 'একাডেমিক ও আর্থিক প্রস্তুতি যাচাই', 'আবেদন ও ভিসা ডকুমেন্ট পরিকল্পনা'],
    fitEn: 'For students who can meet current admission, financial and immigration requirements and want a North American study pathway.',
    fitBn: 'বর্তমান ভর্তি, আর্থিক ও ইমিগ্রেশন শর্ত পূরণ করতে সক্ষম এবং উত্তর আমেরিকায় পড়তে চান এমন শিক্ষার্থীদের জন্য।',
  },
  {
    id: 'usa',
    slug: 'study-in-usa-from-bangladesh',
    name: 'United States',
    flag: '🇺🇸',
    titleEn: 'Study in the USA from Bangladesh',
    titleBn: 'বাংলাদেশ থেকে যুক্তরাষ্ট্রে পড়াশোনা',
    summaryEn: 'University and program planning for Bangladeshi students considering US undergraduate or postgraduate study, with academic fit, funding and documentation reviewed before applying.',
    summaryBn: 'যুক্তরাষ্ট্রে স্নাতক বা স্নাতকোত্তর পড়াশোনা করতে ইচ্ছুক বাংলাদেশি শিক্ষার্থীদের জন্য একাডেমিক ফিট, অর্থায়ন ও ডকুমেন্ট যাচাই করে বিশ্ববিদ্যালয় ও প্রোগ্রাম পরিকল্পনা।',
    highlightsEn: ['University-fit shortlisting', 'Funding and scholarship review', 'Application-document planning'],
    highlightsBn: ['উপযুক্ত বিশ্ববিদ্যালয় শর্টলিস্ট', 'অর্থায়ন ও স্কলারশিপ রিভিউ', 'আবেদন ডকুমেন্ট পরিকল্পনা'],
    fitEn: 'For academically prepared students who need a structured shortlist instead of applying randomly across US institutions.',
    fitBn: 'যারা প্রস্তুত একাডেমিক প্রোফাইল নিয়ে এলোমেলোভাবে আবেদন না করে পরিকল্পিত শর্টলিস্ট চান, তাদের জন্য।',
  },
  {
    id: 'greece',
    slug: 'study-in-greece-from-bangladesh',
    name: 'Greece',
    flag: '🇬🇷',
    titleEn: 'Study in Greece from Bangladesh',
    titleBn: 'বাংলাদেশ থেকে গ্রিসে পড়াশোনা',
    summaryEn: 'Guidance for Bangladeshi students comparing recognized study options in Greece, with eligibility and current consular requirements verified before application.',
    summaryBn: 'গ্রিসে স্বীকৃত পড়াশোনার অপশন তুলনা করতে ইচ্ছুক বাংলাদেশি শিক্ষার্থীদের জন্য আবেদন আগে যোগ্যতা ও বর্তমান কনস্যুলার শর্ত যাচাইসহ গাইডেন্স।',
    highlightsEn: ['Institution screening', 'Document readiness review', 'Application and consular timeline planning'],
    highlightsBn: ['প্রতিষ্ঠান যাচাই', 'ডকুমেন্ট প্রস্তুতি রিভিউ', 'আবেদন ও কনস্যুলার টাইমলাইন পরিকল্পনা'],
    fitEn: 'For students exploring Southern European study options and willing to follow institution-specific admission requirements.',
    fitBn: 'দক্ষিণ ইউরোপে পড়াশোনার অপশন খুঁজছেন এবং প্রতিষ্ঠানভিত্তিক ভর্তি শর্ত অনুসরণ করতে প্রস্তুত শিক্ষার্থীদের জন্য।',
  },
];

export const MANPOWER_REGIONS: ManpowerRegion[] = [
  {
    id: 'middle-east',
    slug: 'middle-east',
    name: 'Middle East',
    titleEn: 'Manpower Recruitment for the Middle East from Bangladesh',
    titleBn: 'বাংলাদেশ থেকে মধ্যপ্রাচ্যে জনশক্তি নিয়োগ',
    summaryEn: 'Candidate intake, documentation and employer-demand coordination for Middle East opportunities. Overseas recruitment must proceed through valid licensed recruiting arrangements and verified job demand.',
    summaryBn: 'মধ্যপ্রাচ্যের সুযোগের জন্য প্রার্থী সংগ্রহ, ডকুমেন্টেশন ও নিয়োগকর্তার চাহিদা সমন্বয়। বিদেশে কর্মী প্রেরণ অবশ্যই বৈধ লাইসেন্সধারী রিক্রুটিং ব্যবস্থার মাধ্যমে এবং যাচাইকৃত চাকরির চাহিদার ভিত্তিতে হবে।',
    rolesEn: ['Construction and technical trades', 'Hospitality and facilities support', 'Factory, logistics and general skilled roles'],
    rolesBn: ['নির্মাণ ও টেকনিক্যাল ট্রেড', 'হসপিটালিটি ও ফ্যাসিলিটি সাপোর্ট', 'ফ্যাক্টরি, লজিস্টিকস ও দক্ষ কর্মী পদ'],
  },
  {
    id: 'malaysia',
    slug: 'malaysia',
    name: 'Malaysia',
    titleEn: 'Bangladesh to Malaysia Manpower Recruitment Support',
    titleBn: 'বাংলাদেশ থেকে মালয়েশিয়া জনশক্তি নিয়োগ সহায়তা',
    summaryEn: 'A compliance-first candidate and documentation workflow for Malaysia-bound manpower opportunities, subject to current government approvals, licensed recruiting channels and verified employer demand.',
    summaryBn: 'মালয়েশিয়াগামী কর্মীদের জন্য কমপ্লায়েন্স-ভিত্তিক প্রার্থী ও ডকুমেন্টেশন ওয়ার্কফ্লো, যা বর্তমান সরকারি অনুমোদন, বৈধ রিক্রুটিং চ্যানেল এবং যাচাইকৃত নিয়োগকর্তার চাহিদার ওপর নির্ভরশীল।',
    rolesEn: ['Manufacturing and production', 'Plantation and service roles where legally open', 'Technical and maintenance roles'],
    rolesBn: ['ম্যানুফ্যাকচারিং ও প্রোডাকশন', 'আইনগতভাবে উন্মুক্ত প্ল্যান্টেশন ও সার্ভিস পদ', 'টেকনিক্যাল ও মেইনটেন্যান্স পদ'],
  },
  {
    id: 'europe',
    slug: 'europe',
    name: 'Europe',
    titleEn: 'European Manpower Recruitment Support from Bangladesh',
    titleBn: 'বাংলাদেশ থেকে ইউরোপে জনশক্তি নিয়োগ সহায়তা',
    summaryEn: 'Employer-led candidate sourcing and documentation support for selected European markets. Country rules, work permits, employer legitimacy and recruiting-license requirements must be verified before any placement is presented as active.',
    summaryBn: 'নির্বাচিত ইউরোপীয় বাজারে নিয়োগকর্তাভিত্তিক প্রার্থী সংগ্রহ ও ডকুমেন্টেশন সহায়তা। কোনো চাকরিকে সক্রিয় হিসেবে উপস্থাপনের আগে দেশভিত্তিক নিয়ম, ওয়ার্ক পারমিট, নিয়োগকর্তার বৈধতা এবং রিক্রুটিং লাইসেন্সের শর্ত যাচাই করা হবে।',
    rolesEn: ['Welding and fabrication', 'Warehouse and logistics', 'Manufacturing and technical support'],
    rolesBn: ['ওয়েল্ডিং ও ফ্যাব্রিকেশন', 'ওয়্যারহাউস ও লজিস্টিকস', 'ম্যানুফ্যাকচারিং ও টেকনিক্যাল সাপোর্ট'],
  },
];

const PageShell = ({ children }: { children: React.ReactNode }) => (
  <div className="pt-24 pb-24 lg:pb-16 bg-slate-50 min-h-screen">{children}</div>
);

const LanguageSwitch = ({ language, englishPath, banglaPath }: { language: Language; englishPath: string; banglaPath: string }) => (
  <div className="inline-flex bg-white border border-slate-200 rounded-full p-1 shadow-sm">
    <Link to={englishPath} className={`px-4 py-2 rounded-full text-sm font-bold ${language === 'en' ? 'bg-brand-blue text-white' : 'text-slate-600'}`}>English</Link>
    <Link to={banglaPath} className={`px-4 py-2 rounded-full text-sm font-bold ${language === 'bn' ? 'bg-brand-blue text-white' : 'text-slate-600'}`}>বাংলা</Link>
  </div>
);

export function StudentConsultancy({ language = 'en' }: { language?: Language }) {
  const isBn = language === 'bn';
  const path = isBn ? '/bn/student-consultancy' : '/student-consultancy';
  return (
    <PageShell>
      <Helmet>
        <html lang={isBn ? 'bn' : 'en'} />
        <title>{isBn ? 'বিদেশে পড়াশোনা পরামর্শ — Keystone Overseas' : 'Student Consultancy in Bangladesh — Keystone Overseas'}</title>
        <meta name="description" content={isBn ? 'বাংলাদেশি শিক্ষার্থীদের জন্য দেশ ও বিশ্ববিদ্যালয় বাছাই, যোগ্যতা যাচাই, ভর্তি আবেদন, ডকুমেন্ট ও ভিসা প্রস্তুতি।' : 'Student consultancy for Bangladeshi applicants: eligibility screening, country and university shortlisting, applications, documents and visa-stage preparation.'} />
        <link rel="canonical" href={`https://keystoneoverseasbd.com${path}`} />
        <link rel="alternate" hrefLang="en" href="https://keystoneoverseasbd.com/student-consultancy" />
        <link rel="alternate" hrefLang="bn" href="https://keystoneoverseasbd.com/bn/student-consultancy" />
      </Helmet>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-[1.4fr,0.6fr] gap-10 items-start">
          <div>
            <div className="flex items-center gap-2 text-brand-blue font-bold uppercase tracking-widest text-xs mb-5"><BookOpen size={16} /> {isBn ? 'স্টুডেন্ট কনসালটেন্সি' : 'Student Consultancy'}</div>
            <h1 className="text-4xl md:text-6xl font-black text-slate-900 leading-tight mb-6">{isBn ? 'প্রথমে প্রোফাইল। তারপর দেশ, বিশ্ববিদ্যালয় ও আবেদন।' : 'Profile first. Then country, university and application.'}</h1>
            <p className="text-lg text-slate-600 leading-relaxed max-w-3xl mb-8">{isBn ? 'আপনি শুধু “ইউরোপ যেতে চাই” বললে আমরা কোনো এলোমেলো অপশন বলি না। একাডেমিক ফলাফল, স্টাডি গ্যাপ, বাজেট, ইংরেজি দক্ষতা, স্পনসর ও লক্ষ্য ইনটেক দেখে উপযুক্ত পথ তৈরি করি।' : 'Instead of randomly suggesting a destination, we review academics, study gap, budget, English level, sponsor readiness and target intake before recommending a study pathway.'}</p>
            <div className="flex flex-wrap gap-3 mb-10">
              <a href={WHATSAPP_CONSULTATION} target="_blank" rel="noreferrer" className="bg-brand-blue text-white px-6 py-3 rounded-full font-bold">{isBn ? 'প্রোফাইল যাচাই শুরু করুন' : 'Start profile assessment'}</a>
              <LanguageSwitch language={language} englishPath="/student-consultancy" banglaPath="/bn/student-consultancy" />
            </div>
          </div>
          <aside className="bg-brand-blue-dark text-white rounded-3xl p-7">
            <ShieldCheck size={30} className="mb-4 text-blue-200" />
            <h2 className="font-bold text-xl mb-3">{isBn ? 'কীভাবে কাজ করি' : 'How the process works'}</h2>
            <ol className="space-y-3 text-blue-100 text-sm">
              {(isBn ? ['ইনটেক ও প্রোফাইল', 'যোগ্যতা যাচাই', 'দেশ ও বিশ্ববিদ্যালয় শর্টলিস্ট', 'আবেদন ও ডকুমেন্ট', 'অফার, ফি ও ভিসা প্রস্তুতি'] : ['Intake and profile', 'Eligibility screening', 'Country and university shortlist', 'Application and documents', 'Offer, payment and visa preparation']).map((x, i) => <li key={x} className="flex gap-3"><span className="font-black text-white">{i + 1}.</span>{x}</li>)}
            </ol>
          </aside>
        </div>

        <div className="mt-14 grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {STUDY_DESTINATIONS.map((country) => (
            <Link key={country.id} to={isBn ? `/bn/study/${country.slug}` : `/student-consultancy/${country.slug}`} className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-xl hover:-translate-y-1 transition-all group">
              <div className="text-4xl mb-4">{country.flag}</div>
              <h2 className="text-xl font-black text-slate-900 mb-2">{isBn ? country.titleBn : country.titleEn}</h2>
              <p className="text-slate-600 text-sm leading-relaxed mb-5">{isBn ? country.summaryBn : country.summaryEn}</p>
              <span className="inline-flex items-center gap-2 text-brand-blue font-bold text-sm">{isBn ? 'বিস্তারিত দেখুন' : 'View country guide'} <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" /></span>
            </Link>
          ))}
        </div>

        <div className="mt-16 rounded-3xl border border-amber-200 bg-amber-50 p-7">
          <h2 className="font-black text-slate-900 mb-2">{isBn ? 'আলাদা সেবা: বিদেশে চাকরি / জনশক্তি' : 'Separate service: manpower recruitment'}</h2>
          <p className="text-slate-700 mb-4">{isBn ? 'স্টুডেন্ট ভর্তি এবং কর্মী নিয়োগ একই প্রক্রিয়া নয়। চাকরি বা জনশক্তি সংক্রান্ত অনুসন্ধানের জন্য আলাদা কমপ্লায়েন্স-ভিত্তিক সিলো ব্যবহার করুন।' : 'Student admissions and worker recruitment are not the same workflow. Job and manpower inquiries use a separate compliance-first silo.'}</p>
          <Link to={isBn ? '/bn/manpower-recruitment' : '/manpower-recruitment'} className="font-bold text-amber-800 inline-flex items-center gap-2">{isBn ? 'জনশক্তি সেকশন দেখুন' : 'Go to Manpower Recruitment'} <ArrowRight size={16} /></Link>
        </div>
      </section>
    </PageShell>
  );
}

export function StudyCountryLanding({ language = 'en' }: { language?: Language }) {
  const { slug } = useParams();
  const country = STUDY_DESTINATIONS.find((item) => item.slug === slug);
  if (!country) return <Navigate to={language === 'bn' ? '/bn/student-consultancy' : '/student-consultancy'} replace />;
  const isBn = language === 'bn';
  const englishPath = `/student-consultancy/${country.slug}`;
  const banglaPath = `/bn/study/${country.slug}`;
  const title = isBn ? country.titleBn : country.titleEn;
  const summary = isBn ? country.summaryBn : country.summaryEn;
  const highlights = isBn ? country.highlightsBn : country.highlightsEn;

  return (
    <PageShell>
      <Helmet>
        <html lang={isBn ? 'bn' : 'en'} />
        <title>{title} — Keystone Overseas</title>
        <meta name="description" content={summary} />
        <link rel="canonical" href={`https://keystoneoverseasbd.com${isBn ? banglaPath : englishPath}`} />
        <link rel="alternate" hrefLang="en" href={`https://keystoneoverseasbd.com${englishPath}`} />
        <link rel="alternate" hrefLang="bn" href={`https://keystoneoverseasbd.com${banglaPath}`} />
      </Helmet>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <Link to={isBn ? '/bn/student-consultancy' : '/student-consultancy'} className="text-sm font-bold text-brand-blue">← {isBn ? 'স্টুডেন্ট কনসালটেন্সি' : 'Student Consultancy'}</Link>
          <LanguageSwitch language={language} englishPath={englishPath} banglaPath={banglaPath} />
        </div>

        <div className="bg-white border border-slate-200 rounded-[2rem] p-8 md:p-12 shadow-sm">
          <div className="text-6xl mb-6">{country.flag}</div>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 leading-tight">{title}</h1>
          <p className="text-xl text-slate-600 leading-relaxed max-w-4xl mb-10">{summary}</p>

          <div className="grid md:grid-cols-3 gap-5 mb-10">
            {highlights.map((item) => <div key={item} className="rounded-2xl bg-slate-50 border border-slate-200 p-5"><CheckCircle2 className="text-emerald-600 mb-3" size={23} /><p className="font-bold text-slate-800">{item}</p></div>)}
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-black text-slate-900 mb-4">{isBn ? 'কার জন্য উপযোগী?' : 'Who is this route for?'}</h2>
              <p className="text-slate-600 leading-relaxed">{isBn ? country.fitBn : country.fitEn}</p>
            </div>
            <div>
              <h2 className="text-2xl font-black text-slate-900 mb-4">{isBn ? 'পরবর্তী ধাপ' : 'Next step'}</h2>
              <p className="text-slate-600 leading-relaxed mb-5">{isBn ? 'পাসপোর্ট থাকলে সেটি, সর্বশেষ শিক্ষাগত ফলাফল, স্টাডি গ্যাপ, ইংরেজি দক্ষতা ও আনুমানিক বাজেট পাঠান। নির্দিষ্ট বিশ্ববিদ্যালয় বা ভিসা যোগ্যতার নিশ্চয়তা দেওয়ার আগে বর্তমান শর্ত যাচাই করা হবে।' : 'Send your passport if available, latest academic results, study gap, English status and approximate budget. Current requirements are checked before any university or visa eligibility is presented as suitable.'}</p>
              <a href={WHATSAPP_CONSULTATION} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-brand-blue text-white px-6 py-3 rounded-full font-bold">{isBn ? 'WhatsApp-এ প্রোফাইল পাঠান' : 'Send profile on WhatsApp'} <ArrowRight size={17} /></a>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

export function ManpowerRecruitment({ language = 'en' }: { language?: Language }) {
  const isBn = language === 'bn';
  const path = isBn ? '/bn/manpower-recruitment' : '/manpower-recruitment';
  return (
    <PageShell>
      <Helmet>
        <html lang={isBn ? 'bn' : 'en'} />
        <title>{isBn ? 'বিদেশে জনশক্তি নিয়োগ সহায়তা — Keystone Overseas' : 'Manpower Recruitment Support from Bangladesh — Keystone Overseas'}</title>
        <meta name="description" content={isBn ? 'বিদেশি নিয়োগকর্তার চাহিদা অনুযায়ী প্রার্থী ইনটেক, ডকুমেন্টেশন ও কমপ্লায়েন্স সমন্বয়। বৈধ লাইসেন্সধারী রিক্রুটিং চ্যানেলের মাধ্যমে প্রসেসিং।' : 'Compliance-first manpower candidate intake, documentation and employer-demand coordination from Bangladesh through applicable licensed recruiting channels.'} />
        <link rel="canonical" href={`https://keystoneoverseasbd.com${path}`} />
        <link rel="alternate" hrefLang="en" href="https://keystoneoverseasbd.com/manpower-recruitment" />
        <link rel="alternate" hrefLang="bn" href="https://keystoneoverseasbd.com/bn/manpower-recruitment" />
      </Helmet>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-4xl">
          <div className="flex items-center gap-2 text-amber-700 font-bold uppercase tracking-widest text-xs mb-5"><BriefcaseBusiness size={16} /> {isBn ? 'ম্যানপাওয়ার রিক্রুটমেন্ট' : 'Manpower Recruitment'}</div>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 leading-tight mb-6">{isBn ? 'চাকরি আগে যাচাই। তারপর প্রার্থী ও ডকুমেন্ট।' : 'Verify the job first. Then candidate and documents.'}</h1>
          <p className="text-lg text-slate-600 leading-relaxed mb-8">{isBn ? 'আমরা কোনো চাকরিকে শুধু বিজ্ঞাপন দেখে “নিশ্চিত” বলি না। নিয়োগকর্তা, চাহিদাপত্র, ওয়ার্ক পারমিট কাঠামো, দেশভিত্তিক নিয়ম এবং প্রযোজ্য রিক্রুটিং লাইসেন্স চ্যানেল যাচাই করে তারপর প্রার্থী প্রসেসিং করা হবে।' : 'We do not present a job as active merely because an advertisement exists. Employer legitimacy, demand documents, work-permit structure, destination rules and applicable recruiting-license channels must be checked before candidate processing.'}</p>
          <div className="flex flex-wrap gap-3 mb-12"><LanguageSwitch language={language} englishPath="/manpower-recruitment" banglaPath="/bn/manpower-recruitment" /></div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {MANPOWER_REGIONS.map((region) => (
            <Link key={region.id} to={isBn ? `/bn/manpower/${region.slug}` : `/manpower-recruitment/${region.slug}`} className="bg-white border border-slate-200 rounded-2xl p-7 hover:shadow-xl transition-all group">
              <Globe2 className="text-amber-600 mb-5" size={31} />
              <h2 className="text-xl font-black text-slate-900 mb-3">{isBn ? region.titleBn : region.titleEn}</h2>
              <p className="text-sm text-slate-600 leading-relaxed mb-5">{isBn ? region.summaryBn : region.summaryEn}</p>
              <span className="inline-flex items-center gap-2 text-amber-700 font-bold text-sm">{isBn ? 'বিস্তারিত' : 'View recruitment page'} <ArrowRight size={16} /></span>
            </Link>
          ))}
        </div>

        <div className="mt-14 grid md:grid-cols-2 gap-6">
          <div className="bg-slate-900 text-white rounded-3xl p-8"><ShieldCheck className="mb-4 text-amber-300" /><h2 className="font-black text-2xl mb-3">{isBn ? 'লাইসেন্স ও কমপ্লায়েন্স' : 'Licensing and compliance'}</h2><p className="text-slate-300 leading-relaxed">{isBn ? 'সাইটে BMET/RL নম্বরের জন্য যাচাইকরণযোগ্য প্লেসহোল্ডার রাখা হয়েছে। প্রকৃত নম্বর ও ডকুমেন্ট পাওয়ার আগে কোনো লাইসেন্স দাবি করা হবে না।' : 'The site now reserves a verifiable placeholder for BMET/RL details. No recruiting-license claim is made until the actual number and supporting document are supplied.'}</p></div>
          <div className="bg-white border border-slate-200 rounded-3xl p-8"><BookOpen className="mb-4 text-brand-blue" /><h2 className="font-black text-2xl mb-3">{isBn ? 'বিদেশে পড়াশোনা?' : 'Looking to study abroad?'}</h2><p className="text-slate-600 mb-4">{isBn ? 'স্টুডেন্ট ভর্তি সম্পূর্ণ আলাদা সিস্টেমে পরিচালিত হয়।' : 'Student admissions are handled in a separate education workflow.'}</p><Link to={isBn ? '/bn/student-consultancy' : '/student-consultancy'} className="font-bold text-brand-blue inline-flex items-center gap-2">{isBn ? 'স্টুডেন্ট কনসালটেন্সি দেখুন' : 'Go to Student Consultancy'} <ArrowRight size={16} /></Link></div>
        </div>
      </section>
    </PageShell>
  );
}

export function ManpowerRegionLanding({ language = 'en' }: { language?: Language }) {
  const { region } = useParams();
  const data = MANPOWER_REGIONS.find((item) => item.slug === region);
  if (!data) return <Navigate to={language === 'bn' ? '/bn/manpower-recruitment' : '/manpower-recruitment'} replace />;
  const isBn = language === 'bn';
  const englishPath = `/manpower-recruitment/${data.slug}`;
  const banglaPath = `/bn/manpower/${data.slug}`;
  const title = isBn ? data.titleBn : data.titleEn;
  const summary = isBn ? data.summaryBn : data.summaryEn;
  const roles = isBn ? data.rolesBn : data.rolesEn;

  return (
    <PageShell>
      <Helmet>
        <html lang={isBn ? 'bn' : 'en'} />
        <title>{title} — Keystone Overseas</title>
        <meta name="description" content={summary} />
        <link rel="canonical" href={`https://keystoneoverseasbd.com${isBn ? banglaPath : englishPath}`} />
        <link rel="alternate" hrefLang="en" href={`https://keystoneoverseasbd.com${englishPath}`} />
        <link rel="alternate" hrefLang="bn" href={`https://keystoneoverseasbd.com${banglaPath}`} />
      </Helmet>
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4"><Link to={isBn ? '/bn/manpower-recruitment' : '/manpower-recruitment'} className="font-bold text-amber-700 text-sm">← {isBn ? 'ম্যানপাওয়ার রিক্রুটমেন্ট' : 'Manpower Recruitment'}</Link><LanguageSwitch language={language} englishPath={englishPath} banglaPath={banglaPath} /></div>
        <div className="bg-white border border-slate-200 rounded-[2rem] p-8 md:p-12">
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 leading-tight mb-6">{title}</h1>
          <p className="text-xl text-slate-600 leading-relaxed mb-10 max-w-4xl">{summary}</p>
          <h2 className="text-2xl font-black text-slate-900 mb-5">{isBn ? 'সাধারণ কর্মী ক্যাটাগরি' : 'Typical candidate categories'}</h2>
          <div className="grid md:grid-cols-3 gap-5 mb-10">{roles.map((role) => <div key={role} className="bg-slate-50 border border-slate-200 p-5 rounded-2xl"><CheckCircle2 className="text-amber-600 mb-3" /><p className="font-bold text-slate-800">{role}</p></div>)}</div>
          <div className="rounded-2xl bg-amber-50 border border-amber-200 p-6 mb-8"><h3 className="font-black text-slate-900 mb-2">{isBn ? 'গুরুত্বপূর্ণ কমপ্লায়েন্স নোট' : 'Important compliance note'}</h3><p className="text-slate-700 leading-relaxed">{isBn ? 'কোনো চাকরি, বেতন, ভিসা বা ওয়ার্ক পারমিটকে নিশ্চিত বলা হবে না যতক্ষণ পর্যন্ত সংশ্লিষ্ট নিয়োগকর্তা, সরকারি অনুমোদন এবং প্রযোজ্য লাইসেন্সধারী রিক্রুটিং চ্যানেল যাচাই করা না হয়।' : 'No job, salary, visa or work permit is represented as guaranteed until the relevant employer, government approvals and applicable licensed recruiting channel have been verified.'}</p></div>
          <a href={WHATSAPP_CONSULTATION} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-full font-bold">{isBn ? 'প্রার্থী বা নিয়োগকর্তা অনুসন্ধান পাঠান' : 'Send candidate or employer inquiry'} <ArrowRight size={17} /></a>
        </div>
      </section>
    </PageShell>
  );
}
