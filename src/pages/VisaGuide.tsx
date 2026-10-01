import { useState } from 'react';
import { motion } from 'motion/react';
import { CheckCircle, AlertCircle, Clock, DollarSign, FileText, MessageCircle } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { WHATSAPP_CONSULTATION } from '../constants';

type Country = 'cyprus' | 'romania' | 'malaysia' | 'korea';
type Level = 'ug' | 'pg';

const data = {
  cyprus: {
    flag: '🇨🇾',
    name: 'Cyprus',
    color: 'from-amber-600 to-orange-700',
    accent: 'bg-amber-600',
    light: 'bg-amber-50 text-amber-800 border-amber-200',
    ug: {
      title: 'Undergraduate & Diploma Visa (CRMD Entry Permit)',
      intro: 'Cyprus offers an accessible European Union pathway for Bangladeshi students. Entry permits (Blue Paper) are issued directly by the Civil Registry and Migration Department (CRMD) in Nicosia — NO interview or travel to India needed.',
      timeline: '3–6 weeks after document submission',
      cost: '€150–€250 (official migration fee approx.)',
      steps: [
        { step: '01', title: 'University Application', desc: 'Select an accredited Cyprus university (e.g. University of Nicosia, European University Cyprus, Frederick). Keystone submits your attested academic documents.' },
        { step: '02', title: 'Offer Letter & Deposit', desc: 'Receive conditional offer letter. Transfer tuition deposit directly to university bank account via authorized student file transfer.' },
        { step: '03', title: 'Document Attestation', desc: 'Attest academic certificates, marksheets, police clearance, and medical reports via Education Board, Ministry of Foreign Affairs (MoFA Dhaka), and notary.' },
        { step: '04', title: 'CRMD Nicosia Filing', desc: 'University submits attested documents to Ministry of Education and CRMD in Nicosia for Entry Clearance.' },
        { step: '05', title: 'Blue Paper & OKTB', desc: 'CRMD issues official Entry Permit (Blue Paper). Keystone arranges OK-to-Board (OKTB) with airlines flying directly from Dhaka to Larnaca.' },
        { step: '06', title: 'Arrival & Resident Permit', desc: 'Arrive in Cyprus, complete arrival medical confirmation, and obtain your Temporary Resident Card from migration.' },
      ],
      documents: [
        'Original SSC & HSC / Diploma certificates + marksheets (attested by MoFA Dhaka)',
        'Valid passport (minimum 2 years validity)',
        'Police Clearance Certificate (attested by MoFA)',
        'Medical screening certificate (Hepatitis B/C, HIV, VDRL, Chest X-ray)',
        'Bank solvency certificate & 6-month bank statement (~€7,000 balance)',
        'Affidavit of Financial Sponsorship',
        'Official CRMD Entry Permit (Blue Paper)',
        'Passport-size photographs (white background)',
      ],
      tips: [
        'Zero IELTS required — Medium of Instruction (MOI) or internal placement test is accepted',
        'Study gaps up to 5–8 years are accepted with professional experience documentation',
        'No consular interview in India — files are processed directly in Nicosia',
        'Part-time work permitted up to 20 hours/week during study terms',
      ],
      warnings: [
        'Ensure medical tests are done at reputable, certified diagnostic labs',
        'Do not submit irregular or unverified bank statements',
      ],
    },
    pg: {
      title: 'Postgraduate (Master\'s) Student Visa',
      intro: 'Cyprus universities offer recognized European Master\'s degrees with flexible schedules and work rights. Ideal for graduates seeking European qualifications at moderate tuition.',
      timeline: '3–6 weeks after document submission',
      cost: '€150–€250 (migration fee approx.)',
      steps: [
        { step: '01', title: 'Program Selection', desc: 'Choose a Master\'s program in Business, Computer Science, or Management. Submit Bachelor\'s transcripts for review.' },
        { step: '02', title: 'Admission & Tuition Deposit', desc: 'Receive unconditional offer letter and settle initial tuition deposit directly with university.' },
        { step: '03', title: 'Attestation & Verification', desc: 'Attest degree certificates, transcripts, and police clearance through MoFA Dhaka.' },
        { step: '04', title: 'Migration Clearance', desc: 'CRMD Nicosia reviews file and issues postgraduate Entry Permit.' },
        { step: '05', title: 'OK-to-Board & Flight', desc: 'Receive entry permit and fly directly to Larnaca from Dhaka.' },
        { step: '06', title: 'Enrollment & Residency', desc: 'Register at campus and activate student employment authorization.' },
      ],
      documents: [
        'Bachelor\'s degree certificate + transcripts (attested by MoFA Dhaka)',
        'Valid passport (minimum 2 years validity)',
        'Police Clearance Certificate (attested by MoFA)',
        'Medical screening certificate (Hepatitis B/C, HIV, VDRL, Chest X-ray)',
        'Bank solvency certificate & 6-month statement (~€7,000)',
        'CV / Resume with work experience (explaining any gaps)',
        'Sponsorship affidavit from sponsor',
      ],
      tips: [
        'Evening and weekend classes accommodate student career schedules',
        'Spouses can apply for visit visas after student obtains residency',
      ],
      warnings: [
        'Ensure all graduation documents are officially verified prior to submission',
      ],
    },
  },
  romania: {
    flag: '🇷🇴',
    name: 'Romania',
    color: 'from-indigo-600 to-blue-800',
    accent: 'bg-indigo-600',
    light: 'bg-indigo-50 text-indigo-800 border-indigo-200',
    ug: {
      title: 'Language Preparatory Year (Anul Pregătitor) — Type D/SD',
      intro: 'Under Order of the Minister of Education (OME 5516/2024), international students have the statutory right to enroll in the 1-year Romanian Language Preparatory Year with ZERO IELTS, transitioning directly into European degree programs.',
      timeline: '6–10 weeks total process',
      cost: '€120 (statutory consular fee approx.)',
      steps: [
        { step: '01', title: 'Choose University & Program', desc: 'Apply to accredited state institutions (e.g. POLITEHNICA Bucharest, UTCN Cluj, UVT Timișoara, Ovidius Constanța).' },
        { step: '02', title: 'Letter of Acceptance (Scrisoare)', desc: 'The Romanian Ministry of Education issues your official Scrisoare de Acceptare la Studii confirming your statutory student status.' },
        { step: '03', title: 'Tuition Payment', desc: 'Transfer Year 1 tuition (€2,200–€2,700) directly via international bank wire to the university state treasury account.' },
        { step: '04', title: 'Digital Hague Apostille', desc: 'Authenticate educational certificates and transcripts through the Bangladesh MoFA e-Apostille system (apostille.mygov.bd).' },
        { step: '05', title: 'Type D/SD Visa Application', desc: 'File electronic application via evisa.mae.ro. Attend appointment at designated Romanian embassy mission (Bangkok / Kuala Lumpur / Hanoi) bypassing India transit freeze.' },
        { step: '06', title: 'Arrival & Permis de Ședere', desc: 'Arrive in Romania and register with the General Inspectorate for Immigration (IGI) to receive your Schengen-valid Temporary Residence Permit.' },
      ],
      documents: [
        'Original SSC & HSC / Polytechnic Diploma certificates + marksheets with digital Hague Apostille',
        'Official Letter of Acceptance (Scrisoare de Acceptare la Studii) from Ministry of Education',
        'Proof of 1-year tuition payment to university',
        'Bank solvency certificate & statement showing minimum €5,000–€6,500',
        'Police Clearance Certificate with Hague Apostille',
        'Medical fitness certificate certifying no contagious diseases',
        'Valid passport (minimum 2 years validity)',
        'Electronic visa application form (evisa.mae.ro confirmation)',
      ],
      tips: [
        'Zero IELTS required by statutory law (OME 5516/2024) for Anul Pregătitor',
        'Study gaps up to 5–8 years accepted with supporting employment documentation',
        'Romania is an official Schengen member since March 2024 (free air/sea Schengen movement)',
        'Low living costs (€300–€450/month) and legal 20 hrs/week part-time work rights',
      ],
      warnings: [
        'Hague Apostille through apostille.mygov.bd is strictly mandatory',
        'Do not miss the Ministry of Education registration deadlines (typically late summer)',
      ],
    },
    pg: {
      title: 'Postgraduate (Master\'s & Prep Year) Visa — Type D/SD',
      intro: 'Bangladeshi Bachelor\'s graduates can enter English-taught Master\'s programs or take the 1-year language preparatory foundation to access European research faculties.',
      timeline: '6–10 weeks total process',
      cost: '€120 (statutory consular fee approx.)',
      steps: [
        { step: '01', title: 'Select Master\'s Faculty', desc: 'Choose from top polytechnic and research universities in Bucharest, Cluj-Napoca, or Timișoara.' },
        { step: '02', title: 'Ministry Acceptance Letter', desc: 'Romanian Ministry of Education issues Scrisoare de Acceptare after credential evaluation.' },
        { step: '03', title: 'Tuition Transfer', desc: 'Pay annual tuition directly to university bank account.' },
        { step: '04', title: 'Hague Apostille & Visa Lodgement', desc: 'Apostille documents on apostille.mygov.bd and lodge Type D/SD visa file on evisa.mae.ro.' },
        { step: '05', title: 'Consular Appointment & Approval', desc: 'Complete biometric appointment at designated consular mission and collect visa.' },
        { step: '06', title: 'Residence Card (Permis de Ședere)', desc: 'Obtain biometric EU residence card with Schengen mobility.' },
      ],
      documents: [
        'Bachelor\'s certificate and marksheets with digital Hague Apostille',
        'Scrisoare de Acceptare from Romanian Ministry of Education',
        'Proof of 1-year tuition transfer',
        'Bank balance certificate (€5,000–€6,500)',
        'Apostilled Police Clearance Certificate',
        'Medical clearance certificate',
        'Valid passport (minimum 2 years validity)',
      ],
      tips: [
        'Degrees are fully accredited and recognized across the European Union (ECTS)',
        'Opportunity to convert to EU Blue Card / permanent work residence upon graduation',
      ],
      warnings: [
        'Ensure all degree verifications from UGC Bangladesh are completed prior to Apostille',
      ],
    },
  },
  malaysia: {
    flag: '🇲🇾',
    name: 'Malaysia',
    color: 'from-blue-600 to-blue-800',
    accent: 'bg-blue-600',
    light: 'bg-blue-50 text-blue-700 border-blue-200',
    ug: {
      title: 'Undergraduate (Bachelor\'s) Student Visa',
      intro: 'Malaysia is one of the most affordable and student-friendly destinations for Bangladeshi students. The Student Pass is issued by the Immigration Department of Malaysia (Jabatan Imigresen).',
      timeline: '4–8 weeks after offer letter',
      cost: 'BDT 15,000–25,000 (approx.)',
      steps: [
        { step: '01', title: 'Choose a University', desc: 'Select a MOHE-approved university in Malaysia (e.g., UCSI, Taylor\'s, INTI, Sunway). Keystone will help you shortlist based on your budget and grades.' },
        { step: '02', title: 'Apply & Get Offer Letter', desc: 'Submit your academic documents. The university will issue a Conditional or Unconditional Offer Letter within 1–3 weeks.' },
        { step: '03', title: 'EMGS Application', desc: 'The university submits your Student Pass application to the Education Malaysia Global Services (EMGS) online system. You will receive a Health Screening Appointment Letter.' },
        { step: '04', title: 'Medical Check-Up', desc: 'Complete your health screening at an EMGS-approved clinic in Bangladesh. Chest X-ray and blood test required. Results are uploaded directly to EMGS.' },
        { step: '05', title: 'Visa Approval Letter (VAL)', desc: 'Once EMGS approves, you receive a Visa Approval Letter (VAL). This takes 4–6 weeks. You then apply for a Single Entry Visa at the Malaysian Embassy in Dhaka.' },
        { step: '06', title: 'Travel & Entry', desc: 'Fly to Malaysia with your VAL, offer letter, and financial documents. At the airport, complete the Student Pass endorsement in your passport. You are now officially enrolled.' },
      ],
      documents: [
        'Original SSC & HSC certificates + transcripts (attested)',
        'English medium certificate or IELTS/TOEFL score',
        'Valid passport (minimum 18 months validity)',
        'Passport-size photos (white background, 35×45mm)',
        'Bank statement showing BDT 3–5 lakh (last 3 months)',
        'Sponsorship letter (from parent/guardian)',
        'Medical report from EMGS-approved clinic',
        'Offer letter from Malaysian university',
        'Visa Approval Letter (VAL) from EMGS',
        'Police Clearance Certificate (PCC)',
      ],
      tips: [
        'Apply at least 3 months before your intended intake',
        'Ensure your bank statement shows consistent balance — sudden deposits raise flags',
        'EMGS medical must be done at an approved clinic — check the EMGS website for the list',
        'Keep digital copies of all documents in Google Drive',
      ],
      warnings: [
        'Never use a tourist visa to enter Malaysia for study — it will result in deportation',
        'Do not apply without a genuine offer letter from an approved university',
      ],
    },
    pg: {
      title: 'Postgraduate (Master\'s/PhD) Student Visa',
      intro: 'Malaysia welcomes postgraduate students from Bangladesh with competitive fees and English-taught programs. The process is similar to undergraduate but with additional academic requirements.',
      timeline: '4–8 weeks after offer letter',
      cost: 'BDT 15,000–25,000 (approx.)',
      steps: [
        { step: '01', title: 'Check Entry Requirements', desc: 'You need a Bachelor\'s degree with minimum CGPA 2.5–3.0 (depending on university). Some programs require work experience. IELTS 6.0 or equivalent is usually required.' },
        { step: '02', title: 'Apply & Get Offer Letter', desc: 'Submit transcripts, degree certificate, research proposal (for research programs), and recommendation letters. Offer letter issued in 1–4 weeks.' },
        { step: '03', title: 'EMGS Application', desc: 'Same EMGS process as undergraduate. The university submits your Student Pass application. Research students may need supervisor approval at this stage.' },
        { step: '04', title: 'Medical Screening', desc: 'Health check at EMGS-approved clinic in Bangladesh. Same tests: chest X-ray and blood screening. Results uploaded by the clinic.' },
        { step: '05', title: 'Visa Approval Letter (VAL)', desc: 'Receive VAL in 4–6 weeks. Apply for Single Entry Visa at Malaysian Embassy, Dhaka. Bring all original documents to the embassy.' },
        { step: '06', title: 'Travel & Endorsement', desc: 'Fly to Malaysia. Student Pass endorsed at the airport or within 30 days at the immigration office near your university.' },
      ],
      documents: [
        'Bachelor\'s degree certificate + transcripts (attested)',
        'IELTS score report (minimum 6.0 band)',
        'Research proposal (for research-based programs)',
        '2 recommendation letters (academic/professional)',
        'CV / Resume',
        'Valid passport (minimum 18 months validity)',
        'Passport-size photos (white background)',
        'Bank statement showing BDT 4–6 lakh (last 3 months)',
        'Sponsorship/financial guarantee letter',
        'Medical report from EMGS-approved clinic',
        'Offer letter from Malaysian university',
        'Police Clearance Certificate (PCC)',
      ],
      tips: [
        'Contact potential supervisors before applying for research programs',
        'Master\'s by coursework is faster (1–1.5 years) than research (2–3 years)',
        'Many Malaysian universities offer partial scholarships to postgraduate students',
        'UTM, UM, and UPM are top Malaysian public universities ranked globally',
      ],
      warnings: [
        'Research program applications take longer — apply 4–6 months in advance',
        'Ensure your undergraduate degree is from a recognized institution',
      ],
    },
  },
  korea: {
    flag: '🇰🇷',
    name: 'South Korea',
    color: 'from-red-600 to-red-800',
    accent: 'bg-red-600',
    light: 'bg-red-50 text-red-700 border-red-200',
    ug: {
      title: 'Undergraduate (Bachelor\'s) Student Visa — D-2',
      intro: 'South Korea issues a D-2 visa for full-time degree students. It is one of the most prestigious study destinations in Asia, known for technology, scholarship opportunities (GKS), and quality education.',
      timeline: '6–12 weeks total process',
      cost: 'BDT 8,000–15,000 (visa fee approx.)',
      steps: [
        { step: '01', title: 'Get Admission', desc: 'Apply to a Korean university (e.g., Korea University, Yonsei, SKKU, Hanyang). Most accept English-taught programs. Submit academic documents, SOP, and recommendation letters.' },
        { step: '02', title: 'Receive Admission Letter (CoA)', desc: 'Once admitted, you receive a Certificate of Admission from the Korean university. This is your primary visa document.' },
        { step: '03', title: 'Prepare Visa Documents', desc: 'Gather all required documents (see checklist below). Financial proof is the most important — Korean Embassy strictly checks bank balance.' },
        { step: '04', title: 'Apply at Korean Embassy, Dhaka (Baridhara)', desc: 'Submit your D-2 visa application at the Embassy of the Republic of Korea in Dhaka (4 Madani Avenue, Baridhara). For IEQAS accredited universities, the university sponsors a Confirmation of Visa Issuance (VIC / 사증발급인정서) directly through Korea Immigration Service, streamlining embassy approval.' },
        { step: '05', title: 'Visa Issued (2–4 weeks)', desc: 'D-2 visa is stamped in your passport. It is typically valid for 1 year and renewable in Korea each year at the local immigration office (HiKorea).' },
        { step: '06', title: 'Arrive & Register', desc: 'Enter Korea before the visa start date. Register at your university, then visit the local immigration office within 90 days to obtain your Alien Registration Card (ARC).' },
      ],
      documents: [
        'Original SSC & HSC certificates + transcripts (attested by Education Board & MoFA Bangladesh)',
        'TOPIK score (if available) OR English proficiency proof (IELTS 5.5–6.5)',
        'Valid passport (minimum 12 months validity)',
        'Completed visa application form (D-2)',
        'Passport-size photos (3.5×4.5cm, white background)',
        'Certificate of Admission (CoA) OR Confirmation of Visa Issuance (사증발급인정서)',
        'Bank statement: statutory 20,000,000 KRW (~$15,000 USD / ~18 lakh BDT) for Seoul or 16,000,000–18,000,000 KRW for Regional National Universities',
        'Bank solvency certificate (maintained over 30 days)',
        'Sponsor\'s income proof (parent salary certificate or business certificate)',
        'Sponsor\'s bank statement (last 6 months)',
        'Sponsor relationship proof (birth certificate)',
        'Police Clearance Certificate (PCC)',
      ],
      tips: [
        'Apply for GKS (Global Korea Scholarship) — it covers full tuition, living allowance, and airfare',
        'TOPIK score significantly improves your visa approval and scholarship chances',
        'Korean embassy Dhaka is strict on financial documents — no sudden large deposits',
        'Apply to 3–5 universities to increase your chances',
        'September and March are the two main intakes',
      ],
      warnings: [
        'Financial proof is the #1 reason for D-2 visa rejection — ensure funds are genuine',
        'Never falsify documents — Korean Embassy cross-checks with universities directly',
        'Visa rejections make future applications harder — apply only when fully prepared',
      ],
    },
    pg: {
      title: 'Postgraduate (Master\'s/PhD) Student Visa — D-2',
      intro: 'Korea is excellent for postgraduate research. Government scholarships (GKS, BK21) fully fund thousands of international students each year. The D-2 visa process is the same as undergraduate with higher academic requirements.',
      timeline: '6–12 weeks total process',
      cost: 'BDT 8,000–15,000 (visa fee approx.)',
      steps: [
        { step: '01', title: 'Find a Professor / Program', desc: 'For research-based Master\'s or PhD, email Korean professors in your field with your CV and research interest. Getting a professor\'s acceptance dramatically improves admission odds.' },
        { step: '02', title: 'Apply for Admission or GKS Scholarship', desc: 'Apply directly to the university OR through the GKS (Global Korea Scholarship) program. GKS applications open every September for the following year. Keystone guides the full GKS process.' },
        { step: '03', title: 'Receive Certificate of Admission (CoA)', desc: 'After admission confirmation, you receive the CoA. For GKS students, NIIED issues additional scholarship documents.' },
        { step: '04', title: 'Prepare Financial & Academic Documents', desc: 'Postgraduate applicants need stronger financial proof. GKS scholarship holders are exempt from financial requirements as the government funds them.' },
        { step: '05', title: 'Submit D-2 Visa at Korean Embassy, Dhaka', desc: 'Same process as undergraduate. GKS students receive priority processing. Interview may be required.' },
        { step: '06', title: 'Arrive, Register & Get ARC', desc: 'Complete university enrollment, register at immigration office within 90 days, and receive your Alien Registration Card (ARC). GKS students attend a Korean Language Institute for 1 year before their main program.' },
      ],
      documents: [
        'Bachelor\'s (and Master\'s for PhD) degree + transcripts attested by MoFA',
        'Research proposal or study plan',
        'Professor\'s acceptance letter (for research programs)',
        '2–3 recommendation letters (academic)',
        'CV / Resume with research experience',
        'TOPIK score (Level 3+ preferred; Level 5+ for Korean-taught programs)',
        'IELTS/TOEFL (for English-taught programs)',
        'GKS application documents (if applicable)',
        'Valid passport (minimum 12 months)',
        'Completed D-2 visa application form',
        'Bank statement: minimum USD 10,000–20,000 (waived for GKS)',
        'Sponsor financial proof (if self-funded)',
        'Police Clearance Certificate (PCC)',
      ],
      tips: [
        'GKS scholarship for Master\'s pays: full tuition + KRW 900,000/month stipend + airfare + health insurance',
        'Contact professors before applying — a professor\'s support is often decisive for admission',
        'TOPIK Level 4+ opens doors to Korean-language programs with fewer international competitors',
        'BK21 is another funded program — ask universities about it',
        'PhD programs in Korea can lead to academic careers and PR pathways',
      ],
      warnings: [
        'GKS has strict deadlines — missing them by one day disqualifies your application',
        'Forged transcripts are detected instantly — Korean universities use official verification systems',
        'PhD without a professor connection is very difficult to get admitted',
      ],
    },
  },
};

export default function VisaGuide() {
  const [country, setCountry] = useState<Country>('cyprus');
  const [level, setLevel] = useState<Level>('ug');
  const guide = data[country][level];
  const meta = data[country];

  return (
    <>
      <Helmet>
        <title>Visa Guide — Cyprus, Romania, Malaysia &amp; Korea | Keystone Overseas</title>
        <meta name="description" content="Step-by-step student visa guide for Cyprus (CRMD entry permit), Romania (Anul Pregătitor), Malaysia (eVAL), and South Korea (D-2) for Bangladeshi students." />
        <link rel="canonical" href="https://www.keystoneeducations.com/visa-guide" />
      </Helmet>

      <div className="pt-20 pb-24 lg:pb-0 overflow-hidden">

        {/* Hero */}
        <section className={`bg-gradient-to-br ${meta.color} py-16 relative overflow-hidden`}>
          <div className="absolute inset-0 opacity-10"
            style={{ backgroundImage: 'radial-gradient(#fff 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }} />
          <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <span className="inline-block bg-white/20 text-white font-bold uppercase tracking-widest text-xs px-4 py-2 rounded-full mb-4 border border-white/20">
                Step-by-Step Visa Guide
              </span>
              <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
                {meta.flag} {guide.title}
              </h1>
              <p className="text-white/80 text-lg max-w-2xl mx-auto">{guide.intro}</p>
            </motion.div>
          </div>
        </section>

        {/* Country + Level Switcher */}
        <div className="sticky top-16 z-40 bg-white border-b border-slate-200 shadow-sm">
          <div className="max-w-4xl mx-auto px-4 py-3 flex flex-col sm:flex-row gap-3">
            {/* Country */}
            <div className="flex rounded-xl border border-slate-200 overflow-hidden flex-1 flex-wrap sm:flex-nowrap">
              {(['cyprus', 'romania', 'malaysia', 'korea'] as Country[]).map((c) => (
                <button key={c} onClick={() => setCountry(c)}
                  className={`flex-1 py-2.5 px-2 text-xs sm:text-sm font-bold transition-all ${country === c ? 'bg-brand-blue text-white' : 'text-slate-600 hover:bg-slate-50'}`}>
                  {data[c].flag} {data[c].name}
                </button>
              ))}
            </div>
            {/* Level */}
            <div className="flex rounded-xl border border-slate-200 overflow-hidden flex-1">
              <button onClick={() => setLevel('ug')}
                className={`flex-1 py-2.5 text-sm font-bold transition-all ${level === 'ug' ? 'bg-brand-red text-white' : 'text-slate-600 hover:bg-slate-50'}`}>
                Bachelor's (UG)
              </button>
              <button onClick={() => setLevel('pg')}
                className={`flex-1 py-2.5 text-sm font-bold transition-all ${level === 'pg' ? 'bg-brand-red text-white' : 'text-slate-600 hover:bg-slate-50'}`}>
                Master's / PhD
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-10 space-y-12">

          {/* Quick Info */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { icon: Clock, label: 'Processing Time', value: guide.timeline },
              { icon: DollarSign, label: 'Approx. Cost', value: guide.cost },
              { icon: FileText, label: 'Visa Type', value: country === 'korea' ? 'D-2 Student Visa' : 'Student Pass' },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                <Icon size={20} className="text-brand-blue mb-2" />
                <p className="text-xs text-slate-500 font-medium">{label}</p>
                <p className="text-sm font-bold text-slate-900 mt-0.5">{value}</p>
              </div>
            ))}
          </div>

          {/* Steps */}
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900 mb-6">Step-by-Step Process</h2>
            <div className="space-y-4">
              {guide.steps.map((s, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }} viewport={{ once: true }}
                  className="flex gap-4 bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
                  <div className={`w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center text-white text-xs font-extrabold ${meta.accent}`}>
                    {s.step}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-1">{s.title}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">{s.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Documents */}
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900 mb-6">Required Documents Checklist</h2>
            <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 space-y-3">
              {guide.documents.map((doc, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle size={18} className="text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700 text-sm">{doc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tips */}
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900 mb-4">Pro Tips</h2>
            <div className="space-y-3">
              {guide.tips.map((tip, i) => (
                <div key={i} className={`flex items-start gap-3 rounded-xl border p-4 ${meta.light}`}>
                  <span className="text-lg flex-shrink-0">💡</span>
                  <p className="text-sm font-medium">{tip}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Warnings */}
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900 mb-4">Important Warnings</h2>
            <div className="space-y-3">
              {guide.warnings.map((w, i) => (
                <div key={i} className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4">
                  <AlertCircle size={18} className="text-red-500 flex-shrink-0 mt-0.5" />
                  <p className="text-sm font-medium text-red-700">{w}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="bg-gradient-to-br from-brand-blue to-brand-blue-dark rounded-3xl p-8 text-center text-white">
            <h3 className="text-2xl font-extrabold mb-2">Need Help With Your {meta.name} Application?</h3>
            <p className="text-blue-200 mb-6">Our consultants will guide you through every step — for free.</p>
            <a href={WHATSAPP_CONSULTATION} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold px-8 py-4 rounded-full transition-all hover:scale-105 shadow-lg">
              <MessageCircle size={20} /> WhatsApp Us Now
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
