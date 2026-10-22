import { Link } from 'react-router-dom';
import { Facebook, Mail, Phone, MapPin, GraduationCap, BriefcaseBusiness } from 'lucide-react';
import { BRAND_SLOGAN, CONTACT_EMAIL, SECONDARY_CONTACT_EMAIL, OFFICE_ADDRESS, WHATSAPP_DISPLAY, WHATSAPP_NUMBER, FACEBOOK_URL } from '../constants';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-blue-dark text-slate-300 pt-14 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <img src="/logo.png" alt="Keystone Overseas" className="h-10 w-auto" />
              <span className="font-black text-xl text-white">Keystone<span className="text-brand-red">Overseas</span></span>
            </div>
            <p className="text-white font-bold tracking-wide mb-4">{BRAND_SLOGAN}</p>
            <p className="text-slate-400 leading-relaxed mb-5">Overseas education and manpower support from Bangladesh, operated as two separate workflows with evidence-first public claims.</p>
            <div className="flex gap-3">
              <a href={FACEBOOK_URL} target="_blank" rel="noreferrer" aria-label="Facebook" className="bg-slate-800 p-3 rounded-full hover:bg-brand-blue"><Facebook size={18} /></a>
              <a href={`mailto:${CONTACT_EMAIL}`} aria-label="Email" className="bg-slate-800 p-3 rounded-full hover:bg-brand-blue"><Mail size={18} /></a>
              <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer" aria-label="WhatsApp" className="bg-slate-800 p-3 rounded-full hover:bg-brand-blue"><Phone size={18} /></a>
            </div>
          </div>

          <div>
            <h3 className="font-black text-white text-lg mb-5 flex items-center gap-2"><GraduationCap size={20} /> Student Consultancy</h3>
            <ul className="space-y-3 text-sm">
              <li><Link className="hover:text-white" to="/student-consultancy">Study Abroad Hub</Link></li>
              <li><Link className="hover:text-white" to="/student-consultancy/study-in-malaysia-from-bangladesh">Study in Malaysia</Link></li>
              <li><Link className="hover:text-white" to="/student-consultancy/study-in-south-korea-from-bangladesh">Study in South Korea</Link></li>
              <li><Link className="hover:text-white" to="/student-consultancy/study-in-romania-from-bangladesh">Study in Romania</Link></li>
              <li><Link className="hover:text-white" to="/bn/student-consultancy">বাংলা স্টুডেন্ট গাইড</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-black text-white text-lg mb-5 flex items-center gap-2"><BriefcaseBusiness size={20} /> Manpower</h3>
            <ul className="space-y-3 text-sm">
              <li><Link className="hover:text-white" to="/manpower-recruitment">Manpower Recruitment</Link></li>
              <li><Link className="hover:text-white" to="/manpower-recruitment/middle-east">Middle East Recruitment</Link></li>
              <li><Link className="hover:text-white" to="/manpower-recruitment/malaysia">Malaysia Recruitment</Link></li>
              <li><Link className="hover:text-white" to="/manpower-recruitment/europe">Europe Recruitment</Link></li>
              <li><Link className="hover:text-white" to="/bn/manpower-recruitment">বাংলা ম্যানপাওয়ার গাইড</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-black text-white text-lg mb-5">Contact & Trust</h3>
            <div className="space-y-4 text-sm">
              <div className="flex gap-3"><MapPin className="text-brand-red flex-shrink-0" size={18} /><span>{OFFICE_ADDRESS}</span></div>
              <div className="flex gap-3"><Phone className="text-brand-red flex-shrink-0" size={18} /><span>{WHATSAPP_DISPLAY}</span></div>
              <div className="flex gap-3"><Mail className="text-brand-red flex-shrink-0" size={18} /><div className="space-y-1"><a className="block break-all hover:text-white" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a><a className="block break-all hover:text-white" href={`mailto:${SECONDARY_CONTACT_EMAIL}`}>{SECONDARY_CONTACT_EMAIL}</a></div></div>
            </div>
            <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-sm">
              <Link to="/contact" className="hover:text-white">Contact</Link>
              <Link to="/success-stories" className="hover:text-white">Verified Stories</Link>
              <Link to="/about" className="hover:text-white">About</Link>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-7 flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-sm text-slate-500">
          <p>© 2022–{currentYear} Keystone Overseas. {BRAND_SLOGAN}. All rights reserved.</p>
          <div className="flex gap-5"><Link to="/privacy" className="hover:text-slate-300">Privacy Policy</Link><Link to="/terms" className="hover:text-slate-300">Terms of Service</Link></div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
