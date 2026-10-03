import { useState } from 'react';
import { motion } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import { 
  HardHat, 
  Video, 
  CheckCircle2, 
  Languages, 
  ShieldCheck, 
  Wrench, 
  ArrowRight, 
  Send, 
  Clock, 
  AlertTriangle
} from 'lucide-react';
import { WHATSAPP_NUMBER, OFFICE_ADDRESS, BRAND_NAME, ACADEMY_NAME } from '../constants';

interface Pipeline {
  id: string;
  country: string;
  flag: string;
  status: string;
  badgeColor: string;
  sectors: string[];
  permitType: string;
  highlights: string[];
  processingTime: string;
  description: string;
}

const pipelines: Pipeline[] = [
  {
    id: 'italy',
    country: 'Italy (EU Schengen)',
    flag: '🇮🇹',
    status: '#1 European Quota Destination',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    sectors: ['Transport & Logistics', 'Civil Construction', 'Agri-Business & Food Prep', 'Hospitality'],
    permitType: 'Decreto Flussi Bilateral Quota / Nulla Osta',
    processingTime: 'Structured Annual Quota Cycles',
    description: 'Europe’s primary legal workforce corridor for Bangladesh. Applications are processed directly through the Embassy of Italy in Dhaka and VFS Global Gulshan under formal government bilateral labor quotas.',
    highlights: [
      'Official bilateral government quota for Bangladeshi nationals',
      'Direct consular processing at Embassy of Italy in Dhaka & VFS Gulshan',
      'High-demand sectors: Commercial drivers, logistics handlers & technicians',
      'Full legal Schengen employment contract and health coverage'
    ]
  },
  {
    id: 'romania',
    country: 'Romania (EU)',
    flag: '🇷🇴',
    status: 'High Visa Issuance Velocity',
    badgeColor: 'bg-blue-100 text-blue-800 border-blue-200',
    sectors: ['Civil Engineering & Masonry', 'Industrial Welding (MIG/TIG)', 'Warehouse & Packaging', 'Heavy Machinery'],
    permitType: 'IGI Work Permit (Aviz de Muncă) + Type D/AM Visa',
    processingTime: '60–90 Days for Work Permit',
    description: 'Eastern Europe’s fastest-growing infrastructure hub. Romanian construction and industrial employers actively recruit certified tradespeople with expedited immigration clearances.',
    highlights: [
      'Statutory Work Notice issued by General Inspectorate for Immigration (IGI)',
      'Substantial employer-sponsored accommodation and medical insurance',
      'High demand for welders, carpenters, electricians, and logistics staff',
      'Emerging consular presence in Dhaka accelerating deployment'
    ]
  },
  {
    id: 'poland',
    country: 'Poland (EU Schengen)',
    flag: '🇵🇱',
    status: 'Central Europe Industrial Hub',
    badgeColor: 'bg-rose-100 text-rose-800 border-rose-200',
    sectors: ['Automotive & Manufacturing', 'Warehouse Automation', 'Metal Fabrication', 'Food Processing'],
    permitType: 'Voivodeship Work Permit (Zezwolenie Typ A)',
    processingTime: '90–120 Days for Regional Permit',
    description: 'Poland operates Central Europe’s largest logistics and manufacturing network, offering stable hourly contracts, full Schengen residency rights, and established Bangladeshi worker diaspora support.',
    highlights: [
      'Voivodeship governor-endorsed Type A Work Permit',
      'Central Europe’s most robust industrial manufacturing economy',
      'Strict workplace safety and overtime compensation standards',
      '29-nation Schengen Zone residency card upon arrival registration'
    ]
  },
  {
    id: 'malaysia',
    country: 'Malaysia (ASEAN)',
    flag: '🇲🇾',
    status: 'Fast-Track ASEAN Corridor',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
    sectors: ['High-Tech Manufacturing', 'Plantation Operations', 'Cold-Chain Logistics', 'Hospitality & Services'],
    permitType: 'KDN Calling Visa / MyIMMs Endorsement',
    processingTime: '30–45 Days Deployment Velocity',
    description: 'Southeast Asia’s most established employment gateway for Bangladeshi technicians and operators, backed by government-to-government bilateral agreements and direct High Commission stamping in Dhaka.',
    highlights: [
      'Government-regulated bilateral employment protocols',
      'Rapid visa issuance directly at High Commission of Malaysia in Dhaka',
      'Familiar cultural, culinary, and community ecosystem',
      'Extensive overtime and productivity bonus incentives'
    ]
  }
];

const trades = [
  'Industrial Welder (MIG / TIG / Arc)',
  'Electrician & Cable Technician',
  'Heavy Equipment Operator / Crane Driver',
  'Commercial Truck / Delivery Driver',
  'Civil Construction / Mason / Carpenter',
  'Warehouse Specialist & Forklift Operator',
  'Food Processing & Packaging Worker',
  'Chef / Kitchen & Hospitality Specialist',
  'General Factory & Assembly Operator'
];

export default function Workforce() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    trade: trades[0],
    country: 'All / Best Match',
    experience: '1–3 Years',
    hasPassport: 'Yes'
  });
  const [phoneError, setPhoneError] = useState('');

  const handlePhoneChange = (val: string) => {
    setFormData(prev => ({ ...prev, phone: val }));
    const bdRegex = /(?:\+?880|0)?(1[3-9]\d{8})$/;
    if (val && !bdRegex.test(val.replace(/[\s-]/g, ''))) {
      setPhoneError('Please enter a valid 11-digit Bangladeshi mobile number (e.g. 01941646278)');
    } else {
      setPhoneError('');
    }
  };

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const bdRegex = /(?:\+?880|0)?(1[3-9]\d{8})$/;
    const cleanPhone = formData.phone.replace(/[\s-]/g, '');
    if (!bdRegex.test(cleanPhone)) {
      setPhoneError('A valid Bangladeshi contact number is required to receive trade assessment calls.');
      return;
    }

    const message = [
      `*🛠️ Workforce Candidate Registration — ${BRAND_NAME}*`,
      `━━━━━━━━━━━━━━━━━━━━`,
      `👤 *Candidate Name:* ${formData.name}`,
      `📞 *Mobile / WhatsApp:* ${formData.phone}`,
      `🧰 *Trade / Specialization:* ${formData.trade}`,
      `🌍 *Target Country:* ${formData.country}`,
      `⏳ *Experience Level:* ${formData.experience}`,
      `🛂 *Valid Passport:* ${formData.hasPassport}`,
      `━━━━━━━━━━━━━━━━━━━━`,
      `I would like to schedule my technical trade assessment and inquire about ongoing employer quotas.`
    ].join('\n');

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="pt-20 bg-slate-50 min-h-screen">
      <Helmet>
        <title>International Workforce & Technical Recruitment — Keystone Overseas</title>
        <meta 
          name="description" 
          content="Verified overseas workforce pipelines for Romania, Poland, Italy, and Malaysia. Hands-on workshop trade tests, consular video dossiers, and pre-departure language training in Dhanmondi, Dhaka." 
        />
        <link rel="canonical" href="https://www.keystoneeducations.com/workforce" />
      </Helmet>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-brand-blue to-slate-900 text-white py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-3xl">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 bg-amber-500/20 border border-amber-400/30 text-amber-300 px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold mb-6"
            >
              <HardHat size={16} />
              <span>Ethical International Manpower & Technical Deployment</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight mb-6"
            >
              Verified Global <span className="text-amber-400">Workforce Pipelines</span> from Bangladesh
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg sm:text-xl text-slate-300 leading-relaxed mb-8"
            >
              Connecting skilled Bangladeshi tradespeople, certified technicians, and industrious operators directly with licensed employers in <strong className="text-white">Romania, Poland, Italy, and Malaysia</strong>. Complete documentation, workshop vetting, and consular interview preparation.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap gap-4"
            >
              <a 
                href="#register" 
                className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-8 py-4 rounded-xl shadow-lg shadow-amber-500/20 transition-all flex items-center gap-2"
              >
                <span>Register for Trade Assessment</span>
                <ArrowRight size={18} />
              </a>
              <a 
                href="#pipelines" 
                className="bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-4 rounded-xl border border-white/20 backdrop-blur-sm transition-all"
              >
                View Country Pipelines
              </a>
            </motion.div>
          </div>
        </div>

        {/* Floating Metrics Bar */}
        <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-slate-800 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div>
            <div className="text-3xl font-extrabold text-amber-400">4 Active</div>
            <div className="text-sm text-slate-400">Government-Permitted Corridors</div>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-white">100% On-Camera</div>
            <div className="text-sm text-slate-400">Practical Workshop Testing</div>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-amber-400">{ACADEMY_NAME}</div>
            <div className="text-sm text-slate-400">Pre-Departure Language Prep</div>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-white">Zero Margin</div>
            <div className="text-sm text-slate-400">Statutory Transparency Policy</div>
          </div>
        </div>
      </section>

      {/* The Keystone Technical Assessment & Video Studio USP */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 text-brand-blue font-bold text-sm tracking-wider uppercase bg-blue-50 px-3 py-1 rounded-lg">
              <Video size={16} />
              <span>The Keystone Verification Advantage</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
              Why Foreign Employers Trust Our <span className="text-brand-blue">Practical Video Dossiers</span>
            </h2>

            <p className="text-slate-600 leading-relaxed">
              Paper resumes and unregulated trade certificates frequently cause visa rejections and employer cancellations. European and multinational companies demand tangible proof before dispatching statutory work permits.
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
                <div className="bg-amber-100 text-amber-800 p-2.5 rounded-xl shrink-0 mt-1">
                  <Wrench size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Hands-on Technical Workshops</h4>
                  <p className="text-sm text-slate-600 mt-1">
                    Every welder, technician, and driver undergoes hands-on trade drills supervised by certified senior trade assessors in our partner workshops.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
                <div className="bg-blue-100 text-brand-blue p-2.5 rounded-xl shrink-0 mt-1">
                  <Video size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Consular-Grade Video Documentation</h4>
                  <p className="text-sm text-slate-600 mt-1">
                    We produce high-definition video portfolios demonstrating the candidate performing standardized occupational tasks (e.g. 3G/4G welding welds, circuit wiring, machinery handling) attached directly to the employer dossier.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
                <div className="bg-emerald-100 text-emerald-800 p-2.5 rounded-xl shrink-0 mt-1">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Information Asymmetry Eliminated</h4>
                  <p className="text-sm text-slate-600 mt-1">
                    When foreign hiring directors and visa consular officers can review authentic video evidence of craftsmanship, employer trust surges and interview clearance rates maximize.
                  </p>
                </div>
              </div>
            </div>

            {/* Compliance Alert */}
            <div className="bg-amber-50/80 border border-amber-200 rounded-2xl p-4 text-xs sm:text-sm text-amber-900 flex items-start gap-3">
              <AlertTriangle className="text-amber-600 shrink-0 mt-0.5" size={18} />
              <div>
                <strong>Ethical Transparency Invariant:</strong> Consular visas are sovereign decisions granted exclusively by national immigration ministries. We guarantee thorough technical verification and consular documentation integrity—never unlawful outcome promises.
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-6 sm:p-8 text-white shadow-2xl relative overflow-hidden">
              <div className="flex items-center justify-between pb-6 border-b border-slate-700">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-xs font-mono uppercase tracking-wider text-slate-300">Live Trade Testing Session</span>
                </div>
                <span className="text-xs bg-slate-700/80 px-3 py-1 rounded-full text-amber-400 font-semibold">HD Multi-Angle Recording</span>
              </div>

              <div className="my-6 space-y-4">
                <div className="p-4 bg-slate-800/80 rounded-2xl border border-slate-700">
                  <div className="text-xs text-amber-400 font-mono mb-1">MODULE 01: TRADE AUDIT</div>
                  <div className="text-sm font-semibold text-white">Real-Time Precision & Safety Protocol Evaluation</div>
                  <div className="text-xs text-slate-400 mt-1">Industrial welding seams, electrical diagnostic safety, precision measurements.</div>
                </div>

                <div className="p-4 bg-slate-800/80 rounded-2xl border border-slate-700">
                  <div className="text-xs text-blue-400 font-mono mb-1">MODULE 02: VISUAL DOSSIER PACKAGING</div>
                  <div className="text-sm font-semibold text-white">4K Digital Media Portfolio & Tool Competence reel</div>
                  <div className="text-xs text-slate-400 mt-1">Timestamped video evidence linked directly to candidate official BMET / European profile.</div>
                </div>

                <div className="p-4 bg-slate-800/80 rounded-2xl border border-slate-700">
                  <div className="text-xs text-emerald-400 font-mono mb-1">MODULE 03: EMPLOYER REVIEW</div>
                  <div className="text-sm font-semibold text-white">Direct Employer Selection & Work Permit Initiation</div>
                  <div className="text-xs text-slate-400 mt-1">European and Malaysian HR teams approve files without costly intermediary delays.</div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-700 flex items-center justify-between text-xs text-slate-400">
                <span>Assessment Center: Dhanmondi HQ, Dhaka</span>
                <span className="text-amber-400 font-medium">Certified Equipment</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Country Pipelines Section */}
      <section id="pipelines" className="py-20 bg-slate-100/70 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-amber-600 font-bold uppercase tracking-wider text-sm">International Corridors</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2 mb-4">
              Active Workforce Pipelines
            </h2>
            <p className="text-slate-600 text-lg">
              Structured, legally compliant recruitment pipelines vetted against statutory European and ASEAN labor regulations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {pipelines.map((pipeline) => (
              <div 
                key={pipeline.id}
                className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm hover:shadow-xl transition-all border border-slate-200/80 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-4xl">{pipeline.flag}</span>
                      <div>
                        <h3 className="text-2xl font-bold text-slate-900">{pipeline.country}</h3>
                        <span className="text-xs font-medium text-slate-500">{pipeline.permitType}</span>
                      </div>
                    </div>
                    <span className={`text-xs font-bold px-3 py-1 rounded-full border ${pipeline.badgeColor}`}>
                      {pipeline.status}
                    </span>
                  </div>

                  <p className="text-slate-600 text-sm leading-relaxed mb-6">
                    {pipeline.description}
                  </p>

                  <div className="mb-6">
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Priority Trade Sectors</div>
                    <div className="flex flex-wrap gap-2">
                      {pipeline.sectors.map((sec, idx) => (
                        <span key={idx} className="bg-slate-100 text-slate-800 text-xs font-medium px-3 py-1 rounded-lg">
                          {sec}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2 mb-6">
                    {pipeline.highlights.map((h, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                        <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs text-slate-500">
                    <Clock size={14} />
                    <span>Timeline: {pipeline.processingTime}</span>
                  </div>
                  <a 
                    href="#register"
                    className="inline-flex items-center gap-1.5 text-brand-blue font-bold text-sm hover:text-brand-red transition-colors"
                  >
                    <span>Apply for {pipeline.country.split(' ')[0]}</span>
                    <ArrowRight size={14} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Keystone Language Academy Integration */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="bg-gradient-to-r from-brand-blue to-slate-900 rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-xl">
          <div className="max-w-2xl relative z-10 space-y-6">
            <div className="inline-flex items-center gap-2 bg-white/10 text-white px-3.5 py-1 rounded-full text-xs font-semibold backdrop-blur-sm">
              <Languages size={14} />
              <span>Language Training & Cultural Induction</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight">
              Pre-Departure Training at <span className="text-amber-400">{ACADEMY_NAME}</span>
            </h2>

            <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
              Arriving in Europe or Southeast Asia without basic survival vocabulary and workplace safety fluency leaves workers vulnerable. Keystone Language Academy equips all candidates with:
            </p>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <li className="flex items-center gap-3 text-sm text-slate-100">
                <CheckCircle2 size={18} className="text-amber-400 shrink-0" />
                <span>Basic Romanian & Polish Jobsite Phrases</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-slate-100">
                <CheckCircle2 size={18} className="text-amber-400 shrink-0" />
                <span>Workplace Occupational Safety Vocabulary</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-slate-100">
                <CheckCircle2 size={18} className="text-amber-400 shrink-0" />
                <span>Consular Visa Interview Simulation</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-slate-100">
                <CheckCircle2 size={18} className="text-amber-400 shrink-0" />
                <span>Foreign Labor Laws & Worker Rights Orientation</span>
              </li>
            </ul>

            <div className="pt-4">
              <div className="text-xs text-slate-300">
                📍 Conducted on-campus at <strong>{OFFICE_ADDRESS}</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Candidate Registration Intake Form */}
      <section id="register" className="py-20 bg-white border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-amber-600 font-bold uppercase tracking-wider text-sm">Direct Intake</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2 mb-4">
              Register for Trade Assessment & Interview
            </h2>
            <p className="text-slate-600">
              Submit your trade credentials. Our technical recruitment desk in Dhanmondi will verify your profile and schedule your practical workshop testing session.
            </p>
          </div>

          <form onSubmit={handleWhatsAppSubmit} className="bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Full Name (as per Passport) *
                </label>
                <input 
                  type="text"
                  required
                  placeholder="e.g. Md. Tariqul Islam"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-blue bg-white text-slate-900 text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Mobile Number / WhatsApp *
                </label>
                <input 
                  type="tel"
                  required
                  placeholder="01941-646278"
                  value={formData.phone}
                  onChange={e => handlePhoneChange(e.target.value)}
                  className={`w-full px-4 py-3 rounded-xl border ${phoneError ? 'border-red-500' : 'border-slate-300'} focus:outline-none focus:ring-2 focus:ring-brand-blue bg-white text-slate-900 text-sm`}
                />
                {phoneError && (
                  <p className="text-red-500 text-xs mt-1.5">{phoneError}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Your Primary Trade / Occupation *
                </label>
                <select 
                  value={formData.trade}
                  onChange={e => setFormData({ ...formData, trade: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-blue bg-white text-slate-900 text-sm"
                >
                  {trades.map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Preferred Target Country *
                </label>
                <select 
                  value={formData.country}
                  onChange={e => setFormData({ ...formData, country: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-blue bg-white text-slate-900 text-sm"
                >
                  <option value="All / Best Match">All / Recommend Best Match</option>
                  <option value="Italy (EU Schengen)">Italy (EU Schengen)</option>
                  <option value="Romania (EU)">Romania (EU)</option>
                  <option value="Poland (EU Schengen)">Poland (EU Schengen)</option>
                  <option value="Malaysia (ASEAN)">Malaysia (ASEAN)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Experience in this Trade
                </label>
                <select 
                  value={formData.experience}
                  onChange={e => setFormData({ ...formData, experience: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-blue bg-white text-slate-900 text-sm"
                >
                  <option value="Fresh / Trained">Fresh / Completed Training</option>
                  <option value="1–3 Years">1–3 Years Practical Experience</option>
                  <option value="3–5 Years">3–5 Years Practical Experience</option>
                  <option value="5+ Years">5+ Years Senior Specialist</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Do you hold a Valid Bangladeshi Passport?
                </label>
                <select 
                  value={formData.hasPassport}
                  onChange={e => setFormData({ ...formData, hasPassport: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-blue bg-white text-slate-900 text-sm"
                >
                  <option value="Yes (Valid > 2 Years)">Yes (Valid for 2+ Years)</option>
                  <option value="Yes (Expiring Soon)">Yes (Expiring within 1 Year)</option>
                  <option value="Applied / In Process">Applied / Currently in Process</option>
                  <option value="No Passport Yet">No Passport Yet</option>
                </select>
              </div>
            </div>

            <div className="pt-4">
              <button 
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 text-base"
              >
                <Send size={18} />
                <span>Submit & Dispatch to Workforce Desk on WhatsApp</span>
              </button>
              <p className="text-center text-xs text-slate-500 mt-3">
                Direct dispatch to our official Dhanmondi recruitment coordinators: +880 1941 646278
              </p>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
