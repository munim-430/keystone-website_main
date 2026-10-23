import { motion, AnimatePresence } from 'motion/react';
import { Link, useLocation } from 'react-router-dom';
import { GraduationCap, ChevronDown, Languages, MessageCircle } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { BRAND_SLOGAN, WHATSAPP_CONSULTATION } from '../constants';

const countries = [
  { name: '🇲🇾 Malaysia', path: '/student-consultancy/study-in-malaysia-from-bangladesh' },
  { name: '🇰🇷 South Korea', path: '/student-consultancy/study-in-south-korea-from-bangladesh' },
  { name: '🇷🇴 Romania', path: '/student-consultancy/study-in-romania-from-bangladesh' },
  { name: '🇨🇾 Cyprus', path: '/student-consultancy/study-in-cyprus-from-bangladesh' },
  { name: '🇭🇺 Hungary', path: '/student-consultancy/study-in-hungary-from-bangladesh' },
  { name: '🇬🇧 United Kingdom', path: '/student-consultancy/study-in-uk-from-bangladesh' },
  { name: '🇨🇦 Canada', path: '/student-consultancy/study-in-canada-from-bangladesh' },
  { name: '🇺🇸 United States', path: '/student-consultancy/study-in-usa-from-bangladesh' },
  { name: '🇬🇷 Greece', path: '/student-consultancy/study-in-greece-from-bangladesh' },
];

const mainLinks = [
  { name: 'Home', path: '/' },
  { name: 'Student Consultancy', path: '/student-consultancy' },
  { name: 'Visa Score', path: '/visa-success-score' },
  { name: 'Manpower Recruitment', path: '/manpower-recruitment' },
  { name: 'Success Stories', path: '/success-stories' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) setDropdownOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => { setDropdownOpen(false); }, [location]);

  const isActive = (path: string) => path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

  return (
    <nav className={`fixed w-full z-50 border-b border-slate-100/80 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-xl shadow-sm py-2' : 'bg-white/95 backdrop-blur-md py-2.5 sm:py-3'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center gap-3 min-w-0">
          <Link to="/" className="flex items-center gap-2 sm:gap-2.5 min-w-0 flex-1 xl:flex-none">
            <img src="/logo.png" alt="Keystone Overseas" className="h-7 sm:h-10 w-auto flex-shrink-0"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.parentElement?.querySelector('.fallback-logo')?.classList.remove('hidden');
              }} />
            <div className="fallback-logo hidden bg-brand-blue p-1.5 sm:p-2 rounded-lg"><GraduationCap className="text-white w-5 h-5 sm:w-6 sm:h-6" /></div>
            <div className="leading-none min-w-0">
              <div className="font-display font-extrabold text-[17px] sm:text-lg tracking-tight text-brand-blue whitespace-nowrap">Keystone<span className="text-brand-red">Overseas</span></div>
              <div className="hidden sm:block text-[10px] uppercase tracking-[0.14em] font-bold text-slate-500 mt-1">{BRAND_SLOGAN}</div>
            </div>
          </Link>

          <div className="hidden xl:flex items-center gap-0.5">
            {mainLinks.map((link) => (
              <Link key={link.path} to={link.path}
                className={`text-sm font-semibold px-2.5 py-2 rounded-lg transition-colors hover:text-brand-red hover:bg-slate-50 ${isActive(link.path) ? 'text-brand-red' : 'text-gray-700'}`}>
                {link.name}
              </Link>
            ))}

            <div className="relative" ref={dropdownRef}>
              <button onClick={() => setDropdownOpen(!dropdownOpen)} className="flex items-center gap-1 text-sm font-semibold px-2.5 py-2 rounded-lg text-gray-700 hover:text-brand-red hover:bg-slate-50 transition-colors">
                Study Destinations <ChevronDown size={14} className={`transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div initial={{ opacity: 0, y: 8, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 8, scale: 0.97 }} transition={{ duration: 0.15 }}
                    className="absolute top-full right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50">
                    {countries.map((c) => (
                      <Link key={c.path} to={c.path} onClick={() => setDropdownOpen(false)} className="block px-4 py-2.5 text-sm text-gray-700 hover:text-brand-red hover:bg-slate-50 transition-colors">{c.name}</Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link to="/bn/student-consultancy" className="flex items-center gap-1.5 ml-1 px-3 py-2 rounded-full border border-slate-200 text-sm font-bold text-slate-700 hover:border-brand-blue hover:text-brand-blue"><Languages size={15} /> বাংলা</Link>
            <a href={WHATSAPP_CONSULTATION} target="_blank" rel="noopener noreferrer" className="ml-2 bg-brand-blue text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-brand-red transition-all shadow-md">Free Consultation</a>
          </div>

          <div className="xl:hidden flex items-center gap-1.5 flex-shrink-0">
            <Link to="/bn/student-consultancy" className="h-9 px-2.5 sm:px-3 rounded-full border border-slate-200 bg-white flex items-center gap-1.5 text-xs font-bold text-slate-700 shadow-sm hover:border-brand-blue hover:text-brand-blue transition-colors" aria-label="বাংলা ভাষা">
              <Languages size={16} /><span className="hidden min-[390px]:inline">বাংলা</span>
            </Link>
            <a href={WHATSAPP_CONSULTATION} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp" className="h-9 w-9 rounded-full bg-green-500 text-white flex items-center justify-center shadow-sm hover:bg-green-600 transition-colors">
              <MessageCircle size={18} strokeWidth={2.4} />
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
