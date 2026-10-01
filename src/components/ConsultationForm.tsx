import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, EMAILJS_PUBLIC_KEY } from '../constants';

const ConsultationForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = formData.get('from_name')?.toString() || '';
    const phone = formData.get('phone')?.toString() || '';
    const education = formData.get('education_level')?.toString() || '';
    const country = formData.get('preferred_country')?.toString() || '';
    const msg = formData.get('message')?.toString() || '';

    try {
      if (EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID && EMAILJS_PUBLIC_KEY) {
        await emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, form, { publicKey: EMAILJS_PUBLIC_KEY });
        setIsSubmitted(true);
      } else {
        const text = encodeURIComponent(
          `Hi Keystone! I would like a consultation.\nName: ${name}\nPhone: ${phone}\nEducation: ${education}\nDestination: ${country}\nNote: ${msg}`
        );
        window.open(`https://wa.me/8801941646278?text=${text}`, '_blank');
        setIsSubmitted(true);
      }
    } catch {
      const text = encodeURIComponent(
        `Hi Keystone! I would like a consultation.\nName: ${name}\nPhone: ${phone}\nEducation: ${education}\nDestination: ${country}\nNote: ${msg}`
      );
      window.open(`https://wa.me/8801941646278?text=${text}`, '_blank');
      setIsSubmitted(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100">
      <AnimatePresence mode="wait">
        {!isSubmitted ? (
          <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-6 md:p-10">
            <h3 className="text-2xl font-bold text-slate-900 mb-6">Send an Inquiry</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                  <input required name="from_name" type="text"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-blue focus:border-transparent outline-none transition-all text-base"
                    placeholder="Your name" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
                  <input required name="phone" type="tel"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-blue focus:border-transparent outline-none transition-all text-base"
                    placeholder="+880 1XXX XXXXXX" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                <input required name="reply_to" type="email"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-blue focus:border-transparent outline-none transition-all text-base"
                  placeholder="your@email.com" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Education Level</label>
                  <select name="education_level"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-blue focus:border-transparent outline-none transition-all bg-white text-base">
                    <option>HSC / A-Level</option>
                    <option>Bachelor's</option>
                    <option>Master's</option>
                    <option>Diploma</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Preferred Country</label>
                  <select name="preferred_country"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-blue focus:border-transparent outline-none transition-all bg-white text-base">
                    <option>South Korea</option>
                    <option>Malaysia</option>
                    <option>Canada</option>
                    <option>Cyprus</option>
                    <option>Europe</option>
                    <option>Not sure yet</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Your Message</label>
                <textarea name="message" rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-blue focus:border-transparent outline-none transition-all resize-none text-base"
                  placeholder="Tell us about your study goals..." />
              </div>
              {error && (
                <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 p-3 rounded-xl">
                  <AlertCircle size={16} /> {error}
                </div>
              )}
              <button type="submit" disabled={isLoading}
                className="w-full bg-brand-blue text-white py-4 rounded-xl font-bold text-lg hover:bg-brand-red transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 disabled:opacity-70 min-h-[56px]">
                {isLoading
                  ? <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  : <><span>Submit Inquiry</span><Send size={20} /></>}
              </button>
            </form>
          </motion.div>
        ) : (
          <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="p-12 text-center">
            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle size={48} />
            </div>
            <h3 className="text-3xl font-bold text-slate-900 mb-4">Inquiry Received!</h3>
            <p className="text-slate-600 mb-8 text-lg">Our consultant will contact you within 24 hours.</p>
            <button onClick={() => setIsSubmitted(false)} className="text-brand-blue font-semibold hover:text-brand-red transition-colors">
              Send another inquiry
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ConsultationForm;
