import { Helmet } from 'react-helmet-async';
import { CONTACT_EMAIL } from '../constants';

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="mb-8"><h2 className="text-2xl font-black text-slate-900 mb-3">{title}</h2><div className="text-slate-600 leading-relaxed space-y-3">{children}</div></section>
);

export function PrivacyPolicy() {
  return (
    <div className="pt-24 pb-24 lg:pb-16 bg-slate-50 min-h-screen">
      <Helmet><title>Privacy Policy — Keystone Overseas</title><meta name="description" content="Privacy policy for Keystone Overseas website inquiries, documents and communications." /><link rel="canonical" href="https://keystoneoverseasbd.com/privacy" /></Helmet>
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-5">Privacy Policy</h1>
        <p className="text-slate-500 mb-10">Last updated: 22 October 2026</p>
        <Section title="Information we collect"><p>We may receive contact details, academic information, employment information and documents that you voluntarily provide through WhatsApp, email, forms or in-person consultation.</p></Section>
        <Section title="How information is used"><p>Information is used to assess inquiries, prepare applications or candidate files, communicate next steps, maintain internal records and meet applicable compliance requirements.</p></Section>
        <Section title="Sensitive documents"><p>Passport, visa, financial, academic and employment documents are treated as confidential working materials. Public success evidence is published only after appropriate redaction and permission.</p></Section>
        <Section title="Third parties"><p>Information may be shared only where needed with relevant universities, institutions, employers, licensed recruiting partners, service providers or authorities involved in the requested process.</p></Section>
        <Section title="Contact"><p>For privacy questions or correction requests, email <a className="font-bold text-brand-blue" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.</p></Section>
      </main>
    </div>
  );
}

export function TermsOfService() {
  return (
    <div className="pt-24 pb-24 lg:pb-16 bg-slate-50 min-h-screen">
      <Helmet><title>Terms of Service — Keystone Overseas</title><meta name="description" content="Website and service terms for Keystone Overseas education consultancy and manpower recruitment support." /><link rel="canonical" href="https://keystoneoverseasbd.com/terms" /></Helmet>
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-5">Terms of Service</h1>
        <p className="text-slate-500 mb-10">Last updated: 22 October 2026</p>
        <Section title="No guaranteed outcome"><p>University admission, visa approval, work permit approval and final recruitment decisions are controlled by institutions, employers and government authorities. Keystone Overseas does not guarantee those outcomes.</p></Section>
        <Section title="Separate service workflows"><p>Student consultancy and manpower recruitment support are separate services with different requirements, documents and compliance obligations.</p></Section>
        <Section title="Accuracy of information"><p>Applicants and candidates must provide truthful, complete and current information. Keystone may decline to process files containing altered, misleading or unverifiable documents.</p></Section>
        <Section title="Manpower licensing"><p>Overseas recruitment activity must follow applicable Bangladesh recruiting-license requirements and destination-country rules. Public license details are not treated as verified until supporting documents are reviewed.</p></Section>
        <Section title="Website content"><p>Country, university, visa and recruitment information may change. Current official or primary-source requirements should be checked before a final filing or payment decision.</p></Section>
        <Section title="Contact"><p>Questions about these terms can be sent to <a className="font-bold text-brand-blue" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.</p></Section>
      </main>
    </div>
  );
}
