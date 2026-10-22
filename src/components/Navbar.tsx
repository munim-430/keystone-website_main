import { motion, AnimatePresence } from 'motion/react';
import { Link, useLocation } from 'react-router-dom';
import { GraduationCap, ChevronDown, Languages } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { WHATSAPP_CONSULTATION } from '../constants';

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
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg py-2' : 'bg-white/90 backdrop-blur-sm py-3'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center gap-4">
          <Link to="/" className="flex items-center space-x-2 flex-shrink-0">
            <img src="/logo.png" alt="Keystone Overseas" className="h-10 w-auto"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.parentElement?.querySelector('.fallback-logo')?.classList.remove('hidden');
              }} />
            <div className="fallback-logo hidden bg-brand-blue p-2 rounded-lg"><GraduationCap className="text-white w-6 h-6" /></div>
            <span className="font-display font-extrabold text-lg tracking-tight text-brand-blue">Keystone<span className="text-brand-red">Overseas</span></span>
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

          <div className="xl:hidden flex items-center gap-2">
            <Link to="/visa-success-score" className="px-3 py-2 rounded-full border border-slate-200 text-slate-700 text-xs font-black">Visa Score</Link>
            <Link to="/bn/student-consultancy" className="p-2 rounded-full border border-slate-200 text-slate-600" aria-label="Bangla"><Languages size={18} /></Link>
            <a href={WHATSAPP_CONSULTATION} target="_blank" rel="noopener noreferrer" className="bg-green-500 text-white px-4 py-2 rounded-full text-sm font-bold hover:bg-green-600 transition-all shadow-md">WhatsApp</a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
