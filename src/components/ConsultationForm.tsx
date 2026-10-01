import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, CheckCircle, MessageCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, EMAILJS_PUBLIC_KEY, WHATSAPP_NUMBER } from '../constants';

const ConsultationForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [whatsappUrl, setWhatsappUrl] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const form = e.currentTarget;
    const formData = new FormData(form);

    const name = formData.get('from_name')?.toString() || '';
    const phone = formData.get('phone')?.toString() || '';
    const email = formData.get('reply_to')?.toString() || '';
    const education = formData.get('education_level')?.toString() || '';
    const gap = formData.get('study_gap')?.toString() || 'None';
    const ielts = formData.get('ielts_status')?.toString() || 'Not Taken';
    const country = formData.get('preferred_country')?.toString() || 'Undecided';
    const message = formData.get('message')?.toString() || '';

    // Build structured WhatsApp inquiry payload
    const textLines = [
      `*New Student Inquiry — Keystone Overseas*`,
      `👤 *Name:* ${name}`,
      `📞 *Phone:* ${phone}`,
      `✉️ *Email:* ${email}`,
      `🎓 *Education:* ${education}`,
      `⏳ *Study Gap:* ${gap}`,
      `📊 *IELTS Status:* ${ielts}`,
      `🌍 *Target Country:* ${country}`,
    ];
    if (message) {
      textLines.push(`💬 *Note:* ${message}`);
    }

    const encodedText = encodeURIComponent(textLines.join('\n'));
    const generatedUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedText}`;
    setWhatsappUrl(generatedUrl);

    // Try sending email in the background if EmailJS is configured, without blocking user
    try {
      if (EMAILJS_SERVICE_ID && EMAILJS_SERVICE_ID !== 'YOUR_EMAILJS_SERVICE_ID') {
        await emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, form, { publicKey: EMAILJS_PUBLIC_KEY });
      }
    } catch {
      // Background email logging fail is non-fatal since WhatsApp carries the lead
    } finally {
      setIsLoading(false);
      setIsSubmitted(true);
      // Open WhatsApp automatically
      window.open(generatedUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100">
      <AnimatePresence mode="wait">
        {!isSubmitted ? (
          <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-6 md:p-10">
            <div className="mb-6">
              <span className="text-brand-red font-bold uppercase tracking-wider text-xs bg-red-50 px-3 py-1 rounded-full border border-red-100">
                Direct Counselor Line
              </span>
              <h3 className="text-2xl font-bold text-slate-900 mt-2">Free Profile Assessment</h3>
              <p className="text-slate-500 text-sm mt-1">Get instant guidance on visa eligibility, scholarships & Dhanmondi Academy batches.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Full Name *</label>
                  <input required name="from_name" type="text"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-blue focus:border-transparent outline-none transition-all text-base"
                    placeholder="e.g. Tanvir Ahmed" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number / WhatsApp *</label>
                  <input required name="phone" type="tel"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-blue focus:border-transparent outline-none transition-all text-base"
                    placeholder="019XXXXXXXX" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Email Address *</label>
                <input required name="reply_to" type="email"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-blue focus:border-transparent outline-none transition-all text-base"
                  placeholder="name@email.com" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Education Level</label>
                  <select name="education_level"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-blue focus:border-transparent outline-none transition-all bg-white text-base">
                    <option>HSC / Alim / A-Level</option>
                    <option>Polytechnic Diploma</option>
                    <option>Bachelor's Degree</option>
                    <option>Master's Degree</option>
                    <option>SSC / Dakhil / O-Level</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Study Gap</label>
                  <select name="study_gap"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-blue focus:border-transparent outline-none transition-all bg-white text-base">
                    <option>No Gap (Fresh Graduate)</option>
                    <option>1 – 2 Years Gap</option>
                    <option>3 – 5 Years Gap (Accepted)</option>
                    <option>5+ Years Gap (Cyprus/Romania)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">IELTS / English Status</label>
                  <select name="ielts_status"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-blue focus:border-transparent outline-none transition-all bg-white text-base">
                    <option>No IELTS (Need Zero-IELTS Country / Prep)</option>
                    <option>Want Keystone Academy IELTS Prep (Dhanmondi)</option>
                    <option>IELTS 5.0 – 5.5</option>
                    <option>IELTS 6.0 – 6.5</option>
                    <option>IELTS 7.0+</option>
                    <option>PTE / Duolingo / MOI Certificate</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Target Country</label>
                  <select name="preferred_country"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-blue focus:border-transparent outline-none transition-all bg-white text-base">
                    <option>🇨🇾 Cyprus (No India Trip / High Gap)</option>
                    <option>🇷🇴 Romania (Zero IELTS / Preparatory Year)</option>
                    <option>🇲🇾 Malaysia (Fast eVAL)</option>
                    <option>🇭🇺 Hungary (Full Schengen VFS Dhaka)</option>
                    <option>🇰🇷 South Korea (Founder Insider & GKS)</option>
                    <option>🇨🇦 Canada (Direct Pathways)</option>
                    <option>Not sure yet — Need Profile Assessment</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Your Questions or Goals</label>
                <textarea name="message" rows={3}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-blue focus:border-transparent outline-none transition-all resize-none text-base"
                  placeholder="Share any specific subjects, intake preferences, or questions..." />
              </div>

              <button type="submit" disabled={isLoading}
                className="w-full bg-brand-blue text-white py-4 rounded-xl font-bold text-lg hover:bg-brand-red transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 disabled:opacity-70 min-h-[56px] group">
                {isLoading
                  ? <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  : <>
                      <span>Submit & Connect on WhatsApp</span>
                      <Send size={20} className="transition-transform group-hover:translate-x-1" />
                    </>}
              </button>

              <p className="text-center text-xs text-slate-400">
                🔒 Your documents and personal information are strictly confidential.
              </p>
            </form>
          </motion.div>
        ) : (
          <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="p-10 md:p-12 text-center">
            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle size={48} />
            </div>
            <h3 className="text-3xl font-extrabold text-slate-900 mb-3">Inquiry Submitted!</h3>
            <p className="text-slate-600 mb-6 text-base leading-relaxed max-w-md mx-auto">
              Our chief counselor has received your inquiry. Connect on WhatsApp to discuss your options immediately.
            </p>

            {whatsappUrl && (
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold px-8 py-4 rounded-2xl transition-all shadow-lg hover:shadow-xl mb-6 text-base">
                <MessageCircle size={22} />
                Open WhatsApp Chat Now
              </a>
            )}

            <div>
              <button onClick={() => setIsSubmitted(false)} className="text-brand-blue font-semibold hover:text-brand-red transition-colors text-sm">
                ← Submit another inquiry
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ConsultationForm;
