import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, BriefcaseBusiness, CheckCircle2, Download, MapPin, ShieldCheck } from 'lucide-react';
import { CONTACT_EMAIL, OFFICE_ADDRESS, WHATSAPP_CONSULTATION, WHATSAPP_DISPLAY } from '../constants';
import { COMPANY_PROFILE_URL, trackLeadEvent } from '../lib/leadCapture';

const principles = [
  'Verify eligibility before recommending a study route.',
  'Keep student admissions and manpower recruitment as separate workflows.',
  'Do not publish license numbers until the supporting documents are verified.',
  'Do not publish fabricated review counts, visa-success percentages or success evidence.',
  'Use current institution, employer and destination requirements before filing.',
];

const COMPANY_PROFILE_AVAILABLE = import.meta.env.VITE_COMPANY_PROFILE_AVAILABLE === 'true';

const About = () => {
  const handleBrochureClick = () => {
    void trackLeadEvent('company_profile_download_clicked', { placement: 'about_page' });
  };

  return (
    <>
      <Helmet>
        <title>About Keystone Overseas — Dhaka, Bangladesh</title>
        <meta name="description" content="Learn how Keystone Overseas separates student consultancy from manpower recruitment support and applies an evidence-first approach to overseas education and recruitment workflows." />
        <link rel="canonical" href="https://keystoneoverseasbd.com/about" />
      </Helmet>

      <div className="pt-24 pb-24 lg:pb-16 bg-slate-50 min-h-screen">
        <section className="bg-brand-blue-dark text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[1.15fr,0.85fr] gap-10 items-center">
            <div>
              <span className="font-bold uppercase tracking-widest text-xs text-blue-200">About Keystone Overseas</span>
              <h1 className="text-4xl md:text-6xl font-black mt-4 mb-6 leading-tight">Built around clearer decisions, cleaner files and separate operating pipelines.</h1>
              <p className="text-blue-100 text-lg leading-relaxed max-w-3xl">Keystone Overseas is a Dhaka-based overseas education and recruitment-support business. The student side focuses on profile-based university admissions. The manpower side is kept separate and follows employer-demand, documentation and licensing checks appropriate to overseas recruitment.</p>
              {COMPANY_PROFILE_AVAILABLE && (
                <a
                  href={COMPANY_PROFILE_URL}
                  target="_blank"
                  rel="noreferrer"
                  onClick={handleBrochureClick}
                  className="mt-7 inline-flex items-center gap-2 bg-white text-brand-blue-dark px-6 py-3 rounded-full font-black"
                >
                  <Download size={18} /> View Company Profile Brochure
                </a>
              )}
            </div>
            <div className="bg-white/10 border border-white/15 rounded-3xl p-8 backdrop-blur-sm">
              <ShieldCheck size={34} className="text-emerald-300 mb-5" />
              <h2 className="text-2xl font-black mb-4">Evidence-first public policy</h2>
              <p className="text-blue-100 leading-relaxed">Public claims should be traceable to a real source: a verified document, an official requirement, a real review feed or a redacted client outcome. Marketing language is secondary to verifiable evidence.</p>
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid lg:grid-cols-2 gap-7 mb-14">
            <article className="bg-white border border-slate-200 rounded-3xl p-8">
              <BookOpen className="text-brand-blue mb-5" size={30} />
              <h2 className="text-3xl font-black text-slate-900 mb-3">Student Consultancy</h2>
              <p className="text-slate-600 leading-relaxed mb-6">Students are assessed using academics, study gap, English level, budget, sponsor readiness and target intake before a destination or university is recommended.</p>
              <Link to="/student-consultancy" className="font-bold text-brand-blue inline-flex items-center gap-2">Explore the education workflow <ArrowRight size={16} /></Link>
            </article>
            <article className="bg-white border border-slate-200 rounded-3xl p-8">
              <BriefcaseBusiness className="text-amber-700 mb-5" size={30} />
              <h2 className="text-3xl font-black text-slate-900 mb-3">Manpower Recruitment Support</h2>
              <p className="text-slate-600 leading-relaxed mb-6">Candidate intake and documentation are handled separately from education. Job demand, employer legitimacy, destination rules and the applicable licensed recruiting channel must be checked before placement activity.</p>
              <Link to="/manpower-recruitment" className="font-bold text-amber-700 inline-flex items-center gap-2">Explore the manpower workflow <ArrowRight size={16} /></Link>
            </article>
          </div>

          <div className="grid lg:grid-cols-[0.8fr,1.2fr] gap-8 items-start">
            <div className="bg-slate-900 text-white rounded-3xl p-8">
              <h2 className="text-2xl font-black mb-4">Founder perspective</h2>
              <p className="text-slate-300 leading-relaxed">Founder Hasibul Munim spent nine years living and studying in South Korea. That experience informs Keystone's emphasis on practical preparation, document discipline and realistic expectations rather than destination marketing alone.</p>
            </div>
            <div className="bg-white border border-slate-200 rounded-3xl p-8">
              <h2 className="text-2xl font-black text-slate-900 mb-5">Operating principles</h2>
              <div className="space-y-4">{principles.map((item) => <div key={item} className="flex gap-3 text-slate-700"><CheckCircle2 className="text-emerald-600 flex-shrink-0 mt-0.5" size={20} /><span>{item}</span></div>)}</div>
            </div>
          </div>

          <div className="mt-12 bg-white border border-slate-200 rounded-3xl p-8 grid md:grid-cols-3 gap-6">
            <div><MapPin className="text-brand-red mb-3" /><h3 className="font-black text-slate-900 mb-1">Office</h3><p className="text-slate-600 text-sm leading-relaxed">{OFFICE_ADDRESS}</p></div>
            <div><h3 className="font-black text-slate-900 mb-1">WhatsApp</h3><p className="text-slate-600 text-sm mb-3">{WHATSAPP_DISPLAY}</p><a href={WHATSAPP_CONSULTATION} target="_blank" rel="noreferrer" className="text-brand-blue font-bold text-sm">Start an inquiry</a></div>
            <div><h3 className="font-black text-slate-900 mb-1">Email</h3><p className="text-slate-600 text-sm break-all">{CONTACT_EMAIL}</p></div>
          </div>
        </section>
      </div>
    </>
  );
};

export default About;
