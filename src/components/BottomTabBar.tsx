import { Link, useLocation } from 'react-router-dom';
import { Home, Briefcase, Globe, Star, HardHat } from 'lucide-react';

const tabs = [
  { label: 'Home', path: '/', icon: Home },
  { label: 'Services', path: '/services', icon: Briefcase },
  { label: 'Visa Guide', path: '/visa-guide', icon: Globe },
  { label: 'Stories', path: '/success-stories', icon: Star },
  { label: 'Workforce', path: '/workforce', icon: HardHat, highlight: true },
];

const BottomTabBar = () => {
  const { pathname } = useLocation();

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-200 shadow-[0_-4px_24px_rgba(0,0,0,0.08)]"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
      <div className="grid grid-cols-5 h-16">
        {tabs.map(({ label, path, icon: Icon, highlight }) => {
          const active = pathname === path;
          return (
            <Link key={path} to={path}
              className={`flex flex-col items-center justify-center gap-0.5 text-[10px] font-semibold transition-colors ${
                active 
                  ? 'text-brand-blue' 
                  : highlight 
                    ? 'text-amber-600 hover:text-amber-700' 
                    : 'text-slate-400 hover:text-slate-600'
              }`}>
              <div className={highlight && !active ? 'bg-amber-50 text-amber-600 p-1 rounded-xl' : ''}>
                <Icon size={21} strokeWidth={active ? 2.5 : 2} />
              </div>
              <span>{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomTabBar;
