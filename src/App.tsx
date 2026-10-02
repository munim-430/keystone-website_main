import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import BottomTabBar from './components/BottomTabBar';
import ErrorBoundary from './components/ErrorBoundary';
import Home from './pages/Home';
import About from './pages/About';
import CountryDetail from './pages/CountryDetail';
import Services from './pages/Services';
import SuccessStories from './pages/SuccessStories';
import VisaGuide from './pages/VisaGuide';
import ScrollToTop from './components/ScrollToTop';
import { useEffect } from 'react';
import { TAWKTO_PROPERTY_ID, TAWKTO_WIDGET_ID } from './constants';

/** Hard-navigates to /districts so the Vercel rewrite to keystone-seo-engine takes effect.
 *  dangerouslySetInnerHTML scripts are inert on client-side React route transitions.
 */
function RedirectToDistricts() {
  useEffect(() => {
    window.location.replace('/districts');
  }, []);
  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-slate-500 font-semibold">Loading 64 Districts Directory…</p>
    </div>
  );
}

function TawkTo() {
  useEffect(() => {
    if (TAWKTO_PROPERTY_ID === 'YOUR_TAWKTO_PROPERTY_ID') return;
    const s = document.createElement('script');
    s.async = true;
    s.src = `https://embed.tawk.to/${TAWKTO_PROPERTY_ID}/${TAWKTO_WIDGET_ID}`;
    s.charset = 'UTF-8';
    s.setAttribute('crossorigin', '*');
    document.head.appendChild(s);
    return () => { document.head.removeChild(s); };
  }, []);
  return null;
}

export default function App() {
  return (
    <HelmetProvider>
      <Router>
        <ErrorBoundary>
          <ScrollToTop />
          <TawkTo />
          <div className="min-h-screen bg-slate-50 font-sans selection:bg-brand-blue/20 selection:text-brand-blue">
            <Navbar />
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<Services />} />
                <Route path="/success-stories" element={<SuccessStories />} />
                <Route path="/visa-guide" element={<VisaGuide />} />
                <Route path="/country/:id" element={<CountryDetail />} />
                <Route path="/districts" element={<RedirectToDistricts />} />
                <Route path="*" element={
                  <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 pt-24 pb-24 lg:pb-0">
                    <div className="text-8xl mb-6">🌍</div>
                    <h1 className="text-4xl font-extrabold text-slate-900 mb-4">Page Not Found</h1>
                    <p className="text-slate-500 mb-8 text-lg">This destination doesn't exist yet.</p>
                    <a href="/" className="bg-brand-blue text-white font-bold px-8 py-4 rounded-full hover:bg-brand-red transition-all">
                      Go Back Home
                    </a>
                  </div>
                } />
              </Routes>
            </main>
            <Footer />
            <WhatsAppButton />
            <BottomTabBar />
          </div>
        </ErrorBoundary>
      </Router>
    </HelmetProvider>
  );
}
