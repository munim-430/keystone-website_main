import { FormEvent, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Mail, MapPin, MessageCircle, Clock, Send } from 'lucide-react';
import {
  CONTACT_EMAIL,
  SECONDARY_CONTACT_EMAIL,
  OFFICE_ADDRESS,
  OFFICE_HOURS,
  WHATSAPP_CONSULTATION,
  WHATSAPP_DISPLAY,
  WHATSAPP_NUMBER,
} from '../constants';
import { captureLead } from '../lib/leadCapture';

const Contact = () => {
  const [submitting, setSubmitting] = useState(false);
  const [notice, setNotice] = useState('');
  const [fallbackUrl, setFallbackUrl] = useState('');

  async function submitInquiry(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = String(form.get('name') || '').trim();
    const phone = String(form.get('phone') || '').trim();
    const email = String(form.get('email') || '').trim();
    const inquiryType = String(form.get('inquiry_type') || 'student');
    const destination = String(form.get('destination') || '').trim();
    const message = String(form.get('message') || '').trim();
    const consent = form.get('consent') === 'on';
    const honeypot = String(form.get('_company') || '');

    setSubmitting(true);
    setNotice('');
    setFallbackUrl('');

    const result = await captureLead({
      kind: 'contact',
      name,
      phone,
      email,
      lead_type: inquiryType === 'manpower' ? 'manpower' : inquiryType === 'partnership' ? 'partnership' : 'student',
      inquiry_type: inquiryType,
      preferred_destination: destination,
      country_interest: destination || undefined,
      message,
      consent,
      event_name: 'contact_form_submitted',
      _company: honeypot,
    });

    const waText = [
      'Website consultation inquiry',
      `Name: ${name}`,
      `Phone: ${phone}`,
      `Email: ${email}`,
      `Type: ${inquiryType}`,
      destination ? `Destination: ${destination}` : '',
      message ? `Message: ${message}` : '',
    ].filter(Boolean).join('\n');
    const wa = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(waText)}`;

    if (result.ok) {
      setNotice('Your inquiry has been saved. Our team can now follow up from the Keystone lead system.');
      e.currentTarget.reset();
    } else {
      setNotice('The online lead system is temporarily unavailable. Send the same inquiry on WhatsApp so it is not lost.');
      setFallbackUrl(wa);
    }
    setSubmitting(false);
  }

  return (
    <>
      <Helmet>
        <title>Contact Keystone Overseas — Dhanmondi, Dhaka</title>
        <meta
          name="description"
          content="Contact Keystone Overseas in Dhanmondi, Dhaka for study abroad consultation, manpower support, partnership inquiries, application support, and document guidance."
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
              Tell us what you need. Website inquiries now enter the Keystone lead system so the team can track follow-up instead of relying only on chat history.
            </p>
          </div>

          <div className="grid lg:grid-cols-[1.05fr,.95fr] gap-8 mb-10">
            <form onSubmit={submitInquiry} className="bg-white border border-slate-200 rounded-3xl p-7 md:p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-6"><Send className="text-brand-blue" size={24} /><h2 className="text-2xl font-black text-slate-900">Send an inquiry</h2></div>
              <div className="grid md:grid-cols-2 gap-4">
                <label className="text-sm font-bold text-slate-700">Full name<input name="name" required className="mt-2 w-full border border-slate-300 rounded-xl px-4 py-3 font-normal" placeholder="Your name" /></label>
                <label className="text-sm font-bold text-slate-700">Phone / WhatsApp<input name="phone" required className="mt-2 w-full border border-slate-300 rounded-xl px-4 py-3 font-normal" placeholder="01711234567" /></label>
                <label className="text-sm font-bold text-slate-700">Email<input name="email" type="email" required className="mt-2 w-full border border-slate-300 rounded-xl px-4 py-3 font-normal" placeholder="name@email.com" /></label>
                <label className="text-sm font-bold text-slate-700">Inquiry type<select name="inquiry_type" className="mt-2 w-full border border-slate-300 rounded-xl px-4 py-3 font-normal bg-white"><option value="student">Student consultancy</option><option value="manpower">Manpower support</option><option value="partnership">Business partnership</option><option value="general">General inquiry</option></select></label>
              </div>
              <label className="block text-sm font-bold text-slate-700 mt-4">Preferred country / destination<input name="destination" className="mt-2 w-full border border-slate-300 rounded-xl px-4 py-3 font-normal" placeholder="e.g. South Korea, Malaysia, Romania" /></label>
              <label className="block text-sm font-bold text-slate-700 mt-4">Message<textarea name="message" rows={5} className="mt-2 w-full border border-slate-300 rounded-xl px-4 py-3 font-normal" placeholder="Tell us your goal, background, or question." /></label>
              <input name="_company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
              <label className="flex items-start gap-3 mt-4 text-sm text-slate-600"><input name="consent" type="checkbox" required className="mt-1" /><span>I agree that Keystone Overseas may use these details to contact me about this inquiry. See the <a href="/privacy" className="font-bold text-brand-blue">Privacy Policy</a>.</span></label>
              <button disabled={submitting} className="mt-6 w-full bg-brand-blue text-white rounded-xl py-3.5 font-black disabled:opacity-50">{submitting ? 'Saving inquiry…' : 'Submit inquiry'}</button>
              {notice && <div className="mt-4 rounded-xl bg-slate-50 border border-slate-200 p-4 text-sm text-slate-700">{notice}{fallbackUrl && <a href={fallbackUrl} target="_blank" rel="noreferrer" className="block mt-3 font-black text-emerald-700">Send on WhatsApp →</a>}</div>}
            </form>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-5">
              <a href={WHATSAPP_CONSULTATION} target="_blank" rel="noopener noreferrer" className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-lg transition-all">
                <MessageCircle className="text-emerald-600 mb-4" size={28} /><h2 className="font-bold text-xl text-slate-900 mb-2">WhatsApp</h2><p className="text-slate-600">{WHATSAPP_DISPLAY}</p><p className="text-sm text-slate-500 mt-2">Fastest channel for a new consultation.</p>
              </a>
              <div className="bg-white border border-slate-200 rounded-2xl p-6">
                <Mail className="text-brand-blue mb-4" size={28} /><h2 className="font-bold text-xl text-slate-900 mb-2">Email</h2><div className="space-y-1"><a href={`mailto:${CONTACT_EMAIL}`} className="block text-slate-600 break-all hover:text-brand-blue">{CONTACT_EMAIL}</a><a href={`mailto:${SECONDARY_CONTACT_EMAIL}`} className="block text-slate-600 break-all hover:text-brand-blue">{SECONDARY_CONTACT_EMAIL}</a></div><p className="text-sm text-slate-500 mt-2">For documents and detailed inquiries.</p>
              </div>
              <div className="bg-white border border-slate-200 rounded-2xl p-6">
                <MapPin className="text-brand-red mb-4" size={28} /><h2 className="font-bold text-xl text-slate-900 mb-2">Office</h2><p className="text-slate-600">{OFFICE_ADDRESS}</p>
              </div>
              <div className="bg-white border border-slate-200 rounded-2xl p-6">
                <Clock className="text-brand-blue mb-4" size={28} /><h2 className="font-bold text-xl text-slate-900 mb-2">Office hours</h2><p className="text-slate-600">{OFFICE_HOURS}</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Contact;
