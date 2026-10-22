import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { BadgeCheck, BriefcaseBusiness, ExternalLink, FileCheck2, GraduationCap, Image as ImageIcon, ShieldCheck, Star } from 'lucide-react';
import { CONTACT_EMAIL, FACEBOOK_URL, OFFICE_ADDRESS, WHATSAPP_DISPLAY, WHATSAPP_NUMBER } from '../constants';

export function StructuredData() {
  const graph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'LocalBusiness',
        '@id': 'https://keystoneoverseasbd.com/#localbusiness',
        name: 'Keystone Overseas',
        url: 'https://keystoneoverseasbd.com/',
        logo: 'https://keystoneoverseasbd.com/logo.png',
        image: 'https://keystoneoverseasbd.com/logo.png',
        telephone: `+${WHATSAPP_NUMBER}`,
        email: CONTACT_EMAIL,
        address: {
          '@type': 'PostalAddress',
          streetAddress: '4th Floor, House 5/4, Sobhanbag Road No. 16',
          addressLocality: 'Dhaka',
          postalCode: '1207',
          addressCountry: 'BD',
        },
        areaServed: { '@type': 'Country', name: 'Bangladesh' },
        sameAs: [FACEBOOK_URL],
        knowsAbout: [
          'Study abroad counseling',
          'University admission support',
          'Student visa document preparation',
          'Overseas manpower candidate documentation',
        ],
      },
      {
        '@type': 'EducationalOrganization',
        '@id': 'https://keystoneoverseasbd.com/#academy',
        name: 'Keystone Academy',
        url: 'https://keystoneoverseasbd.com/#academy',
        parentOrganization: { '@id': 'https://keystoneoverseasbd.com/#localbusiness' },
        address: {
          '@type': 'PostalAddress',
          streetAddress: '4th Floor, House 5/4, Sobhanbag Road No. 16',
          addressLocality: 'Dhaka',
          postalCode: '1207',
          addressCountry: 'BD',
        },
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: `+${WHATSAPP_NUMBER}`,
          contactType: 'admissions',
          areaServed: 'BD',
          availableLanguage: ['English', 'Bengali'],
        },
      },
    ],
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(graph)}</script>
    </Helmet>
  );
}

export function ComplianceStrip() {
  return (
    <section className="bg-slate-950 text-slate-200 border-t border-slate-800" aria-label="Business verification details">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 grid md:grid-cols-3 gap-4 text-sm">
        <div className="flex items-start gap-3">
          <ShieldCheck className="text-emerald-400 flex-shrink-0" size={20} />
          <div><div className="font-bold text-white">Trade License No.</div><div className="text-slate-400">[PLACEHOLDER — document upload pending]</div></div>
        </div>
        <div className="flex items-start gap-3">
          <BriefcaseBusiness className="text-amber-400 flex-shrink-0" size={20} />
          <div><div className="font-bold text-white">BMET / Recruiting License (RL) No.</div><div className="text-slate-400">[PLACEHOLDER — verification pending]</div></div>
        </div>
        <div className="flex items-start gap-3">
          <BadgeCheck className="text-blue-400 flex-shrink-0" size={20} />
          <div><div className="font-bold text-white">Published verification policy</div><div className="text-slate-400">No license number is claimed until the supporting document is verified.</div></div>
        </div>
      </div>
    </section>
  );
}

function GoogleReviewsPanel() {
  const widgetUrl = import.meta.env.VITE_GOOGLE_REVIEWS_WIDGET_URL as string | undefined;
  const reviewUrl = import.meta.env.VITE_GOOGLE_BUSINESS_REVIEW_URL as string | undefined;

  return (
    <section className="py-16 bg-white border-y border-slate-100" id="google-reviews">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-8">
          <div>
            <div className="flex items-center gap-2 text-brand-blue font-bold uppercase tracking-widest text-xs mb-3"><Star size={16} /> Google Reviews</div>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900">Verified reviews, pulled from the source.</h2>
            <p className="text-slate-600 mt-3 max-w-2xl">This block is designed for a live Google Business Profile review widget. No manually invented star rating or review text is displayed.</p>
          </div>
          {reviewUrl && <a href={reviewUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 font-bold text-brand-blue">Open on Google <ExternalLink size={16} /></a>}
        </div>

        {widgetUrl ? (
          <div className="rounded-3xl overflow-hidden border border-slate-200 bg-white shadow-sm min-h-[360px]">
            <iframe src={widgetUrl} title="Verified Google Reviews for Keystone Overseas" loading="lazy" className="w-full min-h-[420px] border-0" referrerPolicy="no-referrer-when-downgrade" />
          </div>
        ) : (
          <div className="rounded-3xl border-2 border-dashed border-slate-300 bg-slate-50 p-8 md:p-10 flex flex-col md:flex-row gap-6 md:items-center md:justify-between">
            <div>
              <h3 className="font-black text-xl text-slate-900 mb-2">Google Business Profile connection required</h3>
              <p className="text-slate-600 max-w-3xl">Set <code className="font-mono text-xs bg-white border rounded px-1.5 py-1">VITE_GOOGLE_REVIEWS_WIDGET_URL</code> to the verified widget URL and optionally <code className="font-mono text-xs bg-white border rounded px-1.5 py-1">VITE_GOOGLE_BUSINESS_REVIEW_URL</code>. Until then, the website intentionally shows no unverified review count or rating.</p>
            </div>
            <BadgeCheck size={40} className="text-slate-400 flex-shrink-0" />
          </div>
        )}
      </div>
    </section>
  );
}

type EvidenceCardProps = {
  type: 'student' | 'worker';
  title: string;
  description: string;
};

function EvidenceCard({ type, title, description }: EvidenceCardProps) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
      <div className="aspect-[4/3] bg-slate-100 flex items-center justify-center border-b border-slate-200">
        <div className="text-center px-5">
          {type === 'student' ? <FileCheck2 className="mx-auto text-brand-blue mb-3" size={34} /> : <ImageIcon className="mx-auto text-amber-600 mb-3" size={34} />}
          <p className="font-bold text-slate-700">Verified media slot</p>
          <p className="text-xs text-slate-500 mt-1">Real asset will be published only after upload and privacy review.</p>
        </div>
      </div>
      <div className="p-5">
        <div className="text-xs uppercase tracking-widest font-black text-slate-400 mb-2">{type === 'student' ? 'Student visa evidence' : 'Worker deployment evidence'}</div>
        <h3 className="font-black text-lg text-slate-900 mb-2">{title}</h3>
        <p className="text-sm text-slate-600 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

export function HomepageTrust() {
  return (
    <>
      <GoogleReviewsPanel />
      <section className="py-16 bg-slate-50" id="verified-success-stories">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-9">
            <div>
              <div className="flex items-center gap-2 text-emerald-700 font-bold uppercase tracking-widest text-xs mb-3"><BadgeCheck size={16} /> Verified outcomes</div>
              <h2 className="text-3xl md:text-4xl font-black text-slate-900">Success stories backed by evidence.</h2>
              <p className="text-slate-600 mt-3 max-w-3xl">Visa copies must be redacted before publication. Worker deployment photos must be authentic and used with permission. The site will not generate or stage fake evidence.</p>
            </div>
            <Link to="/success-stories" className="font-bold text-brand-blue inline-flex items-center gap-2">View evidence policy and stories <ExternalLink size={15} /></Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            <EvidenceCard type="student" title="Student visa copy #1" description="Upload a real redacted visa copy. Hide passport number, date of birth, visa number, MRZ/barcodes and other sensitive identifiers." />
            <EvidenceCard type="student" title="Student visa copy #2" description="Use only a real successful case with consent. Add country, intake and institution after verification." />
            <EvidenceCard type="worker" title="Worker deployment photo #1" description="Upload a real airport, pre-departure or destination arrival photo only with appropriate permission." />
            <EvidenceCard type="worker" title="Worker deployment photo #2" description="Add employer/country context only after the placement and supporting documents are verified." />
          </div>
        </div>
      </section>
    </>
  );
}

export function VerifiedSuccessStories() {
  return (
    <div className="pt-24 pb-24 lg:pb-16 bg-slate-50 min-h-screen">
      <Helmet>
        <title>Verified Success Stories — Keystone Overseas</title>
        <meta name="description" content="Verified Keystone Overseas student visa and worker deployment evidence, published only after privacy redaction, consent and internal verification." />
        <link rel="canonical" href="https://keystoneoverseasbd.com/success-stories" />
      </Helmet>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-4xl mb-12">
          <div className="flex items-center gap-2 text-emerald-700 font-bold uppercase tracking-widest text-xs mb-4"><BadgeCheck size={16} /> Evidence-first success stories</div>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6">Real outcomes only. Personal data redacted.</h1>
          <p className="text-lg text-slate-600 leading-relaxed">This page is reserved for authentic visa outcomes and worker deployment evidence. We do not publish invented testimonials, fabricated visa images or stock photos as client success proof.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
          <EvidenceCard type="student" title="Student visa evidence" description="Awaiting your real redacted visa asset and verified case details." />
          <EvidenceCard type="student" title="Admission + visa evidence" description="Awaiting a real case pack suitable for public publication." />
          <EvidenceCard type="worker" title="Worker departure evidence" description="Awaiting a real deployment photo with consent and verified job context." />
          <EvidenceCard type="worker" title="Destination arrival evidence" description="Awaiting a real arrival or workplace photo cleared for publication." />
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white border border-slate-200 rounded-3xl p-7"><GraduationCap className="text-brand-blue mb-4" /><h2 className="font-black text-xl mb-3">For student evidence</h2><p className="text-slate-600 text-sm leading-relaxed">Redact passport number, visa/reference number, date of birth, signatures, MRZ, QR/barcodes, financial information and any identifier not needed to prove the outcome.</p></div>
          <div className="bg-white border border-slate-200 rounded-3xl p-7"><BriefcaseBusiness className="text-amber-600 mb-4" /><h2 className="font-black text-xl mb-3">For worker evidence</h2><p className="text-slate-600 text-sm leading-relaxed">Publish only genuine deployment images with permission. Employer, salary and destination claims should match verified contracts and the applicable licensed recruiting process.</p></div>
        </div>
      </section>
    </div>
  );
}

export function ContactTrustLine() {
  return <span className="sr-only">Keystone Overseas, {OFFICE_ADDRESS}, {WHATSAPP_DISPLAY}, {CONTACT_EMAIL}</span>;
}
