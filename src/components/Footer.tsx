import { Link } from 'react-router-dom';
import { Facebook, Mail, Phone, MapPin, GraduationCap, ChevronRight } from 'lucide-react';

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
                Keystone<span className="text-brand-red">Education</span>
              </span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              Where global dreams begin. Founded in 2022, we empower Bangladeshi students to achieve their international education goals with expert guidance and support.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/share/187gaTjhFD/" target="_blank" rel="noopener noreferrer" className="bg-slate-800 p-3 rounded-full hover:bg-brand-blue transition-colors">
                <Facebook size={20} className="text-white" />
              </a>
              <a href="mailto:contact@keystoneeducations.com" className="bg-slate-800 p-3 rounded-full hover:bg-brand-blue transition-colors">
                <Mail size={20} className="text-white" />
              </a>
              <a href="https://wa.me/8801941646278" target="_blank" rel="noopener noreferrer" className="bg-slate-800 p-3 rounded-full hover:bg-brand-blue transition-colors">
                <Phone size={20} className="text-white" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-bold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-4">
              {[
                { label: 'Home', to: '/' },
                { label: 'About', to: '/about' },
                { label: 'Services', to: '/services' },
                { label: 'Success Stories', to: '/success-stories' },
                { label: 'Contact', to: '/#contact' },
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
            <h3 className="text-white font-bold text-lg mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <MapPin className="text-brand-red mt-1 flex-shrink-0" size={20} />
                <span>Dhaka Headquarters, Bangladesh</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="text-brand-red flex-shrink-0" size={20} />
                <span>+8801941646278 (WhatsApp)</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="text-brand-red flex-shrink-0" size={20} />
                <span>contact@keystoneeducations.com</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold text-lg mb-6">Our Mission</h3>
            <p className="text-slate-400 mb-6">
              Dedicated to providing transparent and professional consultancy services for students seeking higher education abroad since 2022.
            </p>
            <a href="https://forms.gle/grR8xEBQG9rUCmjV7" target="_blank" rel="noopener noreferrer"
              className="inline-block bg-brand-blue text-white px-6 py-3 rounded-lg font-semibold hover:bg-brand-red transition-all">
              Start Application
            </a>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-sm text-slate-500">
            © 2022–{currentYear} Keystone Education Consultancy. All rights reserved.
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
