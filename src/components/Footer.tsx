import { Link } from 'react-router-dom';
import { Facebook, Mail, Phone, MapPin, GraduationCap, ChevronRight } from 'lucide-react';
import { CONTACT_EMAIL, OFFICE_ADDRESS, WHATSAPP_DISPLAY, WHATSAPP_NUMBER, FACEBOOK_URL } from '../constants';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-blue-dark text-slate-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">

          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <img src="/logo.png" alt="Keystone Logo" className="h-10 w-auto"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.parentElement?.querySelector('.fallback-logo')?.classList.remove('hidden');
                }}
              />
              <div className="fallback-logo hidden bg-brand-blue p-2 rounded-lg">
                <GraduationCap className="text-white w-5 h-5" />
              </div>
              <span className="font-bold text-2xl text-white tracking-tight">
                Keystone<span className="text-brand-red">Overseas</span>
              </span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              Where global dreams begin. We empower Bangladeshi students to achieve their international higher education goals with transparent, street-smart counseling and Keystone Academy language preparation.
            </p>
            <div className="flex space-x-4">
              <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer" className="bg-slate-800 p-3 rounded-full hover:bg-brand-blue transition-colors">
                <Facebook size={20} className="text-white" />
              </a>
              <a href={`mailto:${CONTACT_EMAIL}`} className="bg-slate-800 p-3 rounded-full hover:bg-brand-blue transition-colors">
                <Mail size={20} className="text-white" />
              </a>
              <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="bg-slate-800 p-3 rounded-full hover:bg-brand-blue transition-colors">
                <Phone size={20} className="text-white" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-bold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-4">
              {[
                { label: 'Home', to: '/' },
                { label: 'All 64 Districts', to: '/districts' },
                { label: 'About Us', to: '/about' },
                { label: 'Services', to: '/services' },
                { label: 'Visa Guide', to: '/visa-guide' },
                { label: 'Success Stories', to: '/success-stories' },
                { label: 'Dhanmondi Desk', to: '/#contact' },
              ].map((item) => (
                <li key={item.label}>
                  <Link to={item.to} className="flex items-center hover:text-brand-red transition-colors group">
                    <ChevronRight size={14} className="mr-2 opacity-0 group-hover:opacity-100 transition-all -ml-4 group-hover:ml-0" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold text-lg mb-6">Dhanmondi Office</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <MapPin className="text-brand-red mt-1 flex-shrink-0" size={20} />
                <span>{OFFICE_ADDRESS}</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="text-brand-red flex-shrink-0" size={20} />
                <span>{WHATSAPP_DISPLAY} (Direct / WhatsApp)</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="text-brand-red flex-shrink-0" size={20} />
                <span>{CONTACT_EMAIL}</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold text-lg mb-6">Keystone Academy</h3>
            <p className="text-slate-400 mb-6">
              IELTS 6.5 Fast-Track &amp; European Vocational Language preparation batches starting every month at our Dhanmondi campus.
            </p>
            <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hi%2C%20I%20want%20to%20enroll%20in%20Keystone%20Academy%20batches%20at%20Dhanmondi.`} target="_blank" rel="noopener noreferrer"
              className="inline-block bg-brand-blue text-white px-6 py-3 rounded-lg font-semibold hover:bg-brand-red transition-all">
              Join Academy Batch
            </a>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-sm text-slate-500">
            © 2022–{currentYear} Keystone Overseas &amp; Keystone Academy. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm text-slate-500">
            <a href="#" className="hover:text-blue-400">Privacy Policy</a>
            <a href="#" className="hover:text-blue-400">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
