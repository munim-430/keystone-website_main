import { motion, AnimatePresence } from 'motion/react';
import { Link, useLocation } from 'react-router-dom';
import { GraduationCap, ChevronDown } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { WHATSAPP_CONSULTATION } from '../constants';

const countries = [
  { name: '🇬🇧 United Kingdom', path: '/country/uk' },
  { name: '🇬🇷 Greece (Schengen)', path: '/country/greece' },
  { name: '🇨🇾 Cyprus (No India Trip)', path: '/country/cyprus' },
  { name: '🇷🇴 Romania (Zero IELTS)', path: '/country/romania' },
  { name: '🇲🇾 Malaysia (Fast Visa)', path: '/country/malaysia' },
  { name: '🇭🇺 Hungary (Schengen)', path: '/country/hungary' },
  { name: '🇰🇷 South Korea', path: '/country/south-korea' },
  { name: '🇨🇦 Canada', path: '/country/canada' },
];

const mainLinks = [
  { name: 'Home', path: '/' },
  { name: 'Workforce', path: '/workforce' },
  { name: '64 Districts', path: '/districts' },
  { name: 'Compare Agencies', path: '/compare' },
  { name: 'Academy', path: '/#academy' },
  { name: 'About', path: '/about' },
  { name: 'Services', path: '/services' },
  { name: 'Visa Guide', path: '/visa-guide' },
  { name: 'Success Stories', path: '/success-stories' },
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
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => { setDropdownOpen(false); }, [location]);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg py-2' : 'bg-transparent py-4'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">

          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 flex-shrink-0">
            <img src="/logo.png" alt="Keystone Logo" className="h-10 w-auto"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.parentElement?.querySelector('.fallback-logo')?.classList.remove('hidden');
              }} />
            <div className="fallback-logo hidden bg-brand-blue p-2 rounded-lg">
              <GraduationCap className="text-white w-6 h-6" />
            </div>
            <span className="font-display font-extrabold text-lg tracking-tight text-brand-blue">
              Keystone<span className="text-brand-red">Overseas</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center space-x-1">
            {mainLinks.map((link) => (
              link.path.startsWith('/districts') || link.path.startsWith('/compare') ? (
                <a key={link.name} href={link.path}
                  className={`text-sm font-medium px-3 py-2 rounded-lg transition-colors hover:text-brand-red hover:bg-slate-50 ${location.pathname === link.path ? 'text-brand-red' : 'text-gray-700'}`}>
                  {link.name}
                </a>
              ) : (
                <Link key={link.name} to={link.path}
                  className={`text-sm font-medium px-3 py-2 rounded-lg transition-colors hover:text-brand-red hover:bg-slate-50 ${location.pathname === link.path ? 'text-brand-red' : 'text-gray-700'}`}>
                  {link.name}
                </Link>
              )
            ))}

            <div className="relative" ref={dropdownRef}>
              <button onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-1 text-sm font-medium px-3 py-2 rounded-lg text-gray-700 hover:text-brand-red hover:bg-slate-50 transition-colors">
                Destinations <ChevronDown size={14} className={`transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div initial={{ opacity: 0, y: 8, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }} transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50">
                    {countries.map((c) => (
                      <Link key={c.path} to={c.path} onClick={() => setDropdownOpen(false)}
                        className="block px-4 py-2.5 text-sm text-gray-700 hover:text-brand-red hover:bg-slate-50 transition-colors">
                        {c.name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <a href={WHATSAPP_CONSULTATION} target="_blank" rel="noopener noreferrer"
              className="ml-2 bg-brand-blue text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-brand-red transition-all shadow-md hover:shadow-lg">
              Free Consultation
            </a>
          </div>

          {/* Mobile — just logo + CTA button, bottom tab bar handles nav */}
          <a href={WHATSAPP_CONSULTATION} target="_blank" rel="noopener noreferrer"
            className="lg:hidden bg-green-500 text-white px-4 py-2 rounded-full text-sm font-bold hover:bg-green-600 transition-all shadow-md">
            WhatsApp Us
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
