import { Helmet } from 'react-helmet-async';
import { Mail, MapPin, MessageCircle, Clock } from 'lucide-react';
import {
  CONTACT_EMAIL,
  OFFICE_ADDRESS,
  OFFICE_HOURS,
  WHATSAPP_CONSULTATION,
  WHATSAPP_DISPLAY,
} from '../constants';

const Contact = () => {
  return (
    <>
      <Helmet>
        <title>Contact Keystone Overseas — Dhanmondi, Dhaka</title>
        <meta
          name="description"
          content="Contact Keystone Overseas in Dhanmondi, Dhaka for study abroad consultation, application support, and document guidance."
        />
        <link rel="canonical" href="https://keystoneoverseasbd.com/contact" />
      </Helmet>

      <div className="pt-24 pb-24 lg:pb-16 bg-slate-50 min-h-screen">
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-3xl mb-12">
            <span className="inline-block text-brand-red font-bold uppercase tracking-widest text-xs mb-4">
              Contact Keystone Overseas
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-5">
              Speak with our Dhanmondi team
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed">
              Tell us your study goal, academic background, preferred destination, and target intake. We will review the information before recommending a pathway.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <a
              href={WHATSAPP_CONSULTATION}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-lg transition-all"
            >
              <MessageCircle className="text-emerald-600 mb-4" size={28} />
              <h2 className="font-bold text-xl text-slate-900 mb-2">WhatsApp</h2>
              <p className="text-slate-600">{WHATSAPP_DISPLAY}</p>
              <p className="text-sm text-slate-500 mt-2">Fastest channel for a new consultation.</p>
            </a>

            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-lg transition-all"
            >
              <Mail className="text-brand-blue mb-4" size={28} />
              <h2 className="font-bold text-xl text-slate-900 mb-2">Email</h2>
              <p className="text-slate-600 break-all">{CONTACT_EMAIL}</p>
              <p className="text-sm text-slate-500 mt-2">For documents and detailed inquiries.</p>
            </a>

            <div className="bg-white border border-slate-200 rounded-2xl p-6">
              <MapPin className="text-brand-red mb-4" size={28} />
              <h2 className="font-bold text-xl text-slate-900 mb-2">Office</h2>
              <p className="text-slate-600">{OFFICE_ADDRESS}</p>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-6">
              <Clock className="text-brand-blue mb-4" size={28} />
              <h2 className="font-bold text-xl text-slate-900 mb-2">Office hours</h2>
              <p className="text-slate-600">{OFFICE_HOURS}</p>
            </div>
          </div>

          <div className="bg-brand-blue-dark rounded-3xl p-8 md:p-10 text-white flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Not sure where you qualify?</h2>
              <p className="text-blue-100 max-w-2xl">
                Send your academic profile and preferred region. Eligibility depends on the institution, program, intake, and current admission requirements.
              </p>
            </div>
            <a
              href={WHATSAPP_CONSULTATION}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-white text-brand-blue-dark px-6 py-3 rounded-full font-bold whitespace-nowrap hover:bg-slate-100 transition-colors"
            >
              Start Consultation
            </a>
          </div>
        </section>
      </div>
    </>
  );
};

export default Contact;
