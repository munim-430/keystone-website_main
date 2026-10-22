import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowRight, BadgeCheck, BookOpen, BriefcaseBusiness, CheckCircle2, GraduationCap, Languages, MapPin, MessageCircle, ShieldCheck } from 'lucide-react';
import { BRAND_SLOGAN, CONTACT_EMAIL, OFFICE_ADDRESS, WHATSAPP_CONSULTATION, WHATSAPP_DISPLAY } from '../constants';
import { STUDY_DESTINATIONS } from './SiloPages';

const educationSteps = [
  'Profile intake and academic review',
  'Country and university shortlisting',
  'Application and document checklist',
  'Offer, payment and visa-stage preparation',
];

const manpowerSteps = [
  'Employer and job-demand verification',
  'Candidate eligibility and trade screening',
  'Documentation and licensed-channel coordination',
  'Deployment readiness and compliance checks',
];

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Keystone Overseas — Student Consultancy & Manpower Recruitment Support Bangladesh</title>
        <meta name="description" content="Keystone Overseas in Dhaka provides study-abroad student consultancy and separate compliance-first manpower recruitment support for Bangladesh. English and Bangla guidance available." />
        <link rel="canonical" href="https://keystoneoverseasbd.com/" />
        <meta property="og:title" content="Keystone Overseas — Student Consultancy & Manpower Support" />
        <meta property="og:description" content="Two separate service pipelines: overseas education for students and compliance-first manpower support for overseas recruitment." />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="overflow-hidden pb-16 lg:pb-0">
        <section className="relative bg-white pt-32 pb-20 border-b border-slate-100">
          <div className="absolute inset-0 opacity-[0.035]" style={{ backgroundImage: 'radial-gradient(#0f172a 0.7px, transparent 0.7px)', backgroundSize: '24px 24px' }} />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid lg:grid-cols-[1.25fr,0.75fr] gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 border border-blue-100 bg-blue-50 text-brand-blue rounded-full px-4 py-2 font-bold text-sm mb-6">
                  <BadgeCheck size={17} /> Dhaka-based overseas education & recruitment support
                </div>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight text-slate-950 leading-[1.03] mb-6">
                  Two services. <span className="text-brand-blue">Two separate pipelines.</span> No more confusion.
                </h1>
                <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-3xl mb-8">
                  Keystone Overseas separates student admissions from manpower recruitment. Students get profile-based university guidance. Manpower candidates are handled through a compliance-first workflow tied to verified job demand and applicable licensed recruiting channels.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link to="/student-consultancy" className="inline-flex items-center gap-2 bg-brand-blue text-white px-6 py-3.5 rounded-full font-bold shadow-lg shadow-blue-900/10">Student Consultancy <ArrowRight size={17} /></Link>
                  <Link to="/manpower-recruitment" className="inline-flex items-center gap-2 bg-slate-900 text-white px-6 py-3.5 rounded-full font-bold">Manpower Recruitment <ArrowRight size={17} /></Link>
                  <Link to="/bn/student-consultancy" className="inline-flex items-center gap-2 border border-slate-300 bg-white text-slate-700 px-5 py-3.5 rounded-full font-bold"><Languages size={17} /> বাংলা</Link>
                </div>
              </div>

              <div className="bg-slate-950 text-white rounded-[2rem] p-8 shadow-2xl shadow-slate-900/15">
                <ShieldCheck className="text-emerald-400 mb-5" size={36} />
                <h2 className="text-2xl font-black mb-4">Evidence before claims.</h2>
                <div className="space-y-4 text-slate-300">
                  <div className="flex gap-3"><CheckCircle2 className="text-emerald-400 flex-shrink-0" size={19} /><span>No fabricated visa-success percentage.</span></div>
                  <div className="flex gap-3"><CheckCircle2 className="text-emerald-400 flex-shrink-0" size={19} /><span>No fake Google review count or rating.</span></div>
                  <div className="flex gap-3"><CheckCircle2 className="text-emerald-400 flex-shrink-0" size={19} /><span>License numbers are published only after document verification.</span></div>
                  <div className="flex gap-3"><CheckCircle2 className="text-emerald-400 flex-shrink-0" size={19} /><span>Success evidence is published only after redaction and permission.</span></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="company-profile" className="py-20 bg-white border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-[0.95fr,1.05fr] gap-12 lg:gap-16 items-start">
              <div className="lg:sticky lg:top-28">
                <span className="font-bold text-brand-red uppercase tracking-[0.18em] text-xs">Company Profile</span>
                <h2 className="text-4xl md:text-5xl font-black text-slate-950 mt-4 mb-4">Keystone Overseas</h2>
                <p className="text-brand-blue font-black text-xl md:text-2xl mb-6">{BRAND_SLOGAN}</p>
                <p className="text-slate-600 text-lg leading-8 mb-7">
                  Keystone Overseas is a Dhaka-based overseas services company focused on two clearly separated areas: international education consultancy for students and compliance-led manpower recruitment support for overseas employment pathways.
                </p>
                <p className="text-slate-600 leading-7 mb-8">
                  Our operating model is built around structured intake, document discipline, current requirement checking, transparent communication and evidence-based public claims. We support clients in both English and Bangla and keep education and manpower workflows separate so each case follows the correct process.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link to="/about" className="inline-flex items-center gap-2 bg-slate-950 text-white px-6 py-3 rounded-full font-black">Full Company Profile <ArrowRight size={17} /></Link>
                  <Link to="/contact" className="inline-flex items-center gap-2 border border-slate-300 text-slate-800 px-6 py-3 rounded-full font-black">Contact Headquarters</Link>
                </div>
              </div>

              <div className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-5">
                  <article className="rounded-3xl border border-slate-200 bg-slate-50 p-7">
                    <MapPin className="text-brand-red mb-5" size={28} />
                    <div className="text-xs uppercase tracking-widest font-black text-slate-500 mb-2">Headquarters</div>
                    <h3 className="font-black text-xl text-slate-950 mb-2">Sobhanbag, Dhaka</h3>
                    <p className="text-slate-600 leading-7">{OFFICE_ADDRESS}</p>
                  </article>

                  <article className="rounded-3xl border border-blue-100 bg-blue-50/60 p-7">
                    <GraduationCap className="text-brand-blue mb-5" size={28} />
                    <div className="text-xs uppercase tracking-widest font-black text-blue-700 mb-2">Division 01</div>
                    <h3 className="font-black text-xl text-slate-950 mb-2">Student Consultancy</h3>
                    <p className="text-slate-600 leading-7">Profile review, country and institution shortlisting, application support, document preparation and visa-stage guidance.</p>
                  </article>

                  <article className="rounded-3xl border border-amber-100 bg-amber-50/60 p-7">
                    <BriefcaseBusiness className="text-amber-700 mb-5" size={28} />
                    <div className="text-xs uppercase tracking-widest font-black text-amber-700 mb-2">Division 02</div>
                    <h3 className="font-black text-xl text-slate-950 mb-2">Manpower Support</h3>
                    <p className="text-slate-600 leading-7">Candidate intake, job-demand verification, documentation and coordination through applicable licensed recruitment channels.</p>
                  </article>

                  <article className="rounded-3xl border border-emerald-100 bg-emerald-50/60 p-7">
                    <ShieldCheck className="text-emerald-700 mb-5" size={28} />
                    <div className="text-xs uppercase tracking-widest font-black text-emerald-700 mb-2">Operating Principle</div>
                    <h3 className="font-black text-xl text-slate-950 mb-2">Evidence First</h3>
                    <p className="text-slate-600 leading-7">No invented approval rates, fake reviews or unverifiable licensing claims. Public claims should be supported before they are published.</p>
                  </article>
                </div>

                <div className="rounded-[2rem] bg-slate-950 text-white p-8 md:p-9">
                  <div className="grid md:grid-cols-3 gap-7">
                    <div>
                      <div className="text-blue-300 text-xs uppercase tracking-widest font-black mb-2">Communication</div>
                      <div className="font-black text-xl">English + Bangla</div>
                      <p className="text-slate-400 text-sm leading-6 mt-2">Clear guidance for local applicants, families, candidates and institutional partners.</p>
                    </div>
                    <div>
                      <div className="text-blue-300 text-xs uppercase tracking-widest font-black mb-2">Service Model</div>
                      <div className="font-black text-xl">Digital + Office</div>
                      <p className="text-slate-400 text-sm leading-6 mt-2">Online inquiry and document workflows backed by a physical Dhaka office.</p>
                    </div>
                    <div>
                      <div className="text-blue-300 text-xs uppercase tracking-widest font-black mb-2">Core Standard</div>
                      <div className="font-black text-xl">Separate Pipelines</div>
                      <p className="text-slate-400 text-sm leading-6 mt-2">Education and manpower cases are not mixed into one generic process.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="font-bold text-brand-red uppercase tracking-widest text-xs">Choose the correct service</span>
              <h2 className="text-3xl md:text-5xl font-black text-slate-900 mt-3">Student Consultancy or Manpower Recruitment?</h2>
              <p className="text-slate-600 mt-4 text-lg">The two journeys use different rules, documents and compliance checks. They now have separate site architecture and separate content.</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-7">
              <article className="bg-white border border-slate-200 rounded-[2rem] p-8 md:p-10 shadow-sm">
                <div className="w-14 h-14 rounded-2xl bg-blue-50 text-brand-blue flex items-center justify-center mb-6"><BookOpen size={28} /></div>
                <h3 className="text-3xl font-black text-slate-900 mb-3">Student Consultancy</h3>
                <p className="text-slate-600 leading-relaxed mb-7">For students who want to study abroad but need a structured answer based on academics, study gap, budget, English level, sponsor readiness and target intake.</p>
                <ol className="space-y-3 mb-8">{educationSteps.map((step, index) => <li key={step} className="flex gap-3 text-slate-700"><span className="w-6 h-6 rounded-full bg-blue-50 text-brand-blue flex items-center justify-center text-xs font-black flex-shrink-0">{index + 1}</span>{step}</li>)}</ol>
                <Link to="/student-consultancy" className="inline-flex items-center gap-2 font-black text-brand-blue">Explore Student Consultancy <ArrowRight size={17} /></Link>
              </article>

              <article className="bg-white border border-slate-200 rounded-[2rem] p-8 md:p-10 shadow-sm">
                <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center mb-6"><BriefcaseBusiness size={28} /></div>
                <h3 className="text-3xl font-black text-slate-900 mb-3">Manpower Recruitment</h3>
                <p className="text-slate-600 leading-relaxed mb-7">For overseas employment inquiries. A job is not treated as active until employer demand, destination requirements and the applicable licensed recruiting arrangement are checked.</p>
                <ol className="space-y-3 mb-8">{manpowerSteps.map((step, index) => <li key={step} className="flex gap-3 text-slate-700"><span className="w-6 h-6 rounded-full bg-amber-50 text-amber-700 flex items-center justify-center text-xs font-black flex-shrink-0">{index + 1}</span>{step}</li>)}</ol>
                <Link to="/manpower-recruitment" className="inline-flex items-center gap-2 font-black text-amber-700">Explore Manpower Recruitment <ArrowRight size={17} /></Link>
              </article>
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5 mb-10">
              <div>
                <span className="font-bold text-brand-red uppercase tracking-widest text-xs">Student SEO hub</span>
                <h2 className="text-3xl md:text-5xl font-black text-slate-900 mt-3">Study abroad from Bangladesh</h2>
                <p className="text-slate-600 mt-3 max-w-2xl">Dedicated country pages answer the specific intent instead of sending every visitor to one generic destination page.</p>
              </div>
              <Link to="/student-consultancy" className="font-bold text-brand-blue inline-flex items-center gap-2">All study destinations <ArrowRight size={16} /></Link>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {STUDY_DESTINATIONS.slice(0, 6).map((country) => (
                <Link key={country.id} to={`/student-consultancy/${country.slug}`} className="border border-slate-200 rounded-2xl p-6 hover:shadow-lg hover:-translate-y-1 transition-all group">
                  <div className="text-4xl mb-4">{country.flag}</div>
                  <h3 className="text-xl font-black text-slate-900 mb-2">{country.titleEn}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-3">{country.summaryEn}</p>
                  <span className="inline-flex items-center gap-2 text-brand-blue font-bold text-sm">Open guide <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" /></span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-brand-blue-dark text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[1fr,0.8fr] gap-10 items-center">
            <div>
              <div className="flex items-center gap-2 text-blue-200 font-bold uppercase tracking-widest text-xs mb-4"><Languages size={16} /> বাংলা কনটেন্ট</div>
              <h2 className="text-3xl md:text-5xl font-black mb-5">মূল সেবাগুলো বাংলায়ও প্রকাশিত।</h2>
              <p className="text-blue-100 text-lg leading-relaxed max-w-3xl">স্টুডেন্ট কনসালটেন্সি ও ম্যানপাওয়ার রিক্রুটমেন্ট—দুইটি সিলোর মূল পেজ এবং দেশ/রিজিয়ন পেজ বাংলায় রয়েছে, যাতে বাংলাদেশি ব্যবহারকারী ও বাংলা সার্চ কুয়েরি উভয়কেই পরিষ্কারভাবে সার্ভ করা যায়।</p>
            </div>
            <div className="flex flex-wrap lg:justify-end gap-3">
              <Link to="/bn/student-consultancy" className="bg-white text-brand-blue-dark px-5 py-3 rounded-full font-bold">বাংলায় স্টুডেন্ট গাইড</Link>
              <Link to="/bn/manpower-recruitment" className="border border-blue-300 text-white px-5 py-3 rounded-full font-bold">বাংলায় ম্যানপাওয়ার</Link>
            </div>
          </div>
        </section>

        <section className="py-20 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="bg-white border border-slate-200 rounded-3xl p-7">
                <MapPin className="text-brand-red mb-4" size={27} />
                <h3 className="font-black text-xl text-slate-900 mb-2">Dhaka Office</h3>
                <p className="text-slate-600 leading-relaxed">{OFFICE_ADDRESS}</p>
              </div>
              <div className="bg-white border border-slate-200 rounded-3xl p-7">
                <MessageCircle className="text-emerald-600 mb-4" size={27} />
                <h3 className="font-black text-xl text-slate-900 mb-2">WhatsApp</h3>
                <p className="text-slate-600 mb-4">{WHATSAPP_DISPLAY}</p>
                <a href={WHATSAPP_CONSULTATION} target="_blank" rel="noreferrer" className="font-bold text-emerald-700">Start an inquiry →</a>
              </div>
              <div className="bg-white border border-slate-200 rounded-3xl p-7">
                <GraduationCap className="text-brand-blue mb-4" size={27} />
                <h3 className="font-black text-xl text-slate-900 mb-2">Documents & detailed inquiries</h3>
                <p className="text-slate-600 break-all">{CONTACT_EMAIL}</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
