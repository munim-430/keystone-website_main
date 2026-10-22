import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, BriefcaseBusiness, CheckCircle2, FileCheck2, GraduationCap, MessageCircle, ShieldCheck } from 'lucide-react';
import { WHATSAPP_CONSULTATION } from '../constants';

const studentServices = [
  ['Profile Assessment', 'Academic background, study gap, English status, budget, sponsor readiness and intake preference are reviewed before a destination is recommended.'],
  ['University & Program Shortlisting', 'Options are filtered by the student profile instead of presenting a generic country list as a guaranteed fit.'],
  ['Application Preparation', 'Forms, SOP-related guidance, supporting documents, deadlines and offer-letter follow-up are organized as a case checklist.'],
  ['Visa-Stage Preparation', 'Required financial, academic and consular documents are reviewed against the current destination and institution process.'],
];

const manpowerServices = [
  ['Employer-Demand Verification', 'Job opportunities should be tied to a traceable employer, demand and destination-specific process before candidate processing begins.'],
  ['Candidate Intake', 'Identity, trade background, experience, passport readiness and role suitability are captured in a separate manpower workflow.'],
  ['Documentation Support', 'Candidate and employer documents are organized for the applicable licensed recruiting process and destination requirements.'],
  ['Pre-Deployment Readiness', 'Contract, role, destination, required training and travel readiness are checked before any deployment is treated as ready.'],
];

const Services = () => {
  return (
    <>
      <Helmet>
        <title>Services — Keystone Overseas</title>
        <meta name="description" content="Keystone Overseas services are split into two distinct workflows: student consultancy for overseas education and compliance-first manpower recruitment support." />
        <link rel="canonical" href="https://keystoneoverseasbd.com/services" />
      </Helmet>

      <div className="pt-24 pb-24 lg:pb-16 bg-slate-50 min-h-screen">
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-4xl mb-12">
            <span className="text-brand-red font-bold uppercase tracking-widest text-xs">Services</span>
            <h1 className="text-4xl md:text-6xl font-black text-slate-900 mt-4 mb-6">One company, two separate operating systems.</h1>
            <p className="text-lg text-slate-600 leading-relaxed">Student admissions and overseas manpower recruitment are not bundled into one vague “visa service.” Each has its own intake, verification steps, documents, risks and next actions.</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            <section className="bg-white border border-slate-200 rounded-[2rem] p-8 md:p-10">
              <div className="w-14 h-14 rounded-2xl bg-blue-50 text-brand-blue flex items-center justify-center mb-6"><GraduationCap size={28} /></div>
              <h2 className="text-3xl font-black text-slate-900 mb-3">Student Consultancy</h2>
              <p className="text-slate-600 mb-7">For applicants planning overseas education.</p>
              <div className="space-y-5 mb-8">
                {studentServices.map(([title, body]) => (
                  <div key={title} className="flex gap-3">
                    <CheckCircle2 className="text-emerald-600 flex-shrink-0 mt-1" size={20} />
                    <div><h3 className="font-black text-slate-900 mb-1">{title}</h3><p className="text-slate-600 text-sm leading-relaxed">{body}</p></div>
                  </div>
                ))}
              </div>
              <Link to="/student-consultancy" className="inline-flex items-center gap-2 font-black text-brand-blue">Open Student Consultancy <ArrowRight size={17} /></Link>
            </section>

            <section className="bg-white border border-slate-200 rounded-[2rem] p-8 md:p-10">
              <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center mb-6"><BriefcaseBusiness size={28} /></div>
              <h2 className="text-3xl font-black text-slate-900 mb-3">Manpower Recruitment Support</h2>
              <p className="text-slate-600 mb-7">For overseas employment inquiries and employer-led candidate demand.</p>
              <div className="space-y-5 mb-8">
                {manpowerServices.map(([title, body]) => (
                  <div key={title} className="flex gap-3">
                    <CheckCircle2 className="text-amber-600 flex-shrink-0 mt-1" size={20} />
                    <div><h3 className="font-black text-slate-900 mb-1">{title}</h3><p className="text-slate-600 text-sm leading-relaxed">{body}</p></div>
                  </div>
                ))}
              </div>
              <Link to="/manpower-recruitment" className="inline-flex items-center gap-2 font-black text-amber-700">Open Manpower Recruitment <ArrowRight size={17} /></Link>
            </section>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-slate-900 text-white rounded-3xl p-7"><ShieldCheck className="text-emerald-400 mb-4" /><h3 className="font-black text-xl mb-2">No guaranteed visa claim</h3><p className="text-slate-300 text-sm leading-relaxed">Admission and visa decisions belong to institutions and authorities. Public claims are kept conditional and evidence-based.</p></div>
            <div className="bg-white border border-slate-200 rounded-3xl p-7"><FileCheck2 className="text-brand-blue mb-4" /><h3 className="font-black text-xl mb-2">Document discipline</h3><p className="text-slate-600 text-sm leading-relaxed">Each case should have a checklist, status, next action and supporting file rather than depending on scattered chats.</p></div>
            <div className="bg-white border border-slate-200 rounded-3xl p-7"><BookOpen className="text-violet-600 mb-4" /><h3 className="font-black text-xl mb-2">English + বাংলা</h3><p className="text-slate-600 text-sm leading-relaxed">Core education and manpower pages are available in both English and Bengali for clearer local search intent and user understanding.</p></div>
          </div>

          <div className="mt-12 bg-brand-blue-dark text-white rounded-3xl p-8 md:p-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div><MessageCircle className="text-blue-200 mb-3" /><h2 className="text-2xl font-black mb-2">Not sure which workflow applies?</h2><p className="text-blue-100">Send the inquiry first. Student and manpower cases will be routed separately.</p></div>
            <a href={WHATSAPP_CONSULTATION} target="_blank" rel="noreferrer" className="bg-white text-brand-blue-dark px-6 py-3 rounded-full font-bold whitespace-nowrap">Start on WhatsApp</a>
          </div>
        </section>
      </div>
    </>
  );
};

export default Services;
