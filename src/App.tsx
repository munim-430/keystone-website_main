import { BrowserRouter as Router, Routes, Route, Navigate, useParams } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import BottomTabBar from './components/BottomTabBar';
import ErrorBoundary from './components/ErrorBoundary';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Services from './pages/Services';
import VisaGuide from './pages/VisaGuide';
import { PrivacyPolicy, TermsOfService } from './pages/LegalPages';
import ScrollToTop from './components/ScrollToTop';
import { useEffect } from 'react';
import { TAWKTO_PROPERTY_ID, TAWKTO_WIDGET_ID } from './constants';
import {
  STUDY_DESTINATIONS,
  StudentConsultancy,
  StudyCountryLanding,
  ManpowerRecruitment,
  ManpowerRegionLanding,
} from './pages/SiloPages';
import {
  ComplianceStrip,
  HomepageTrust,
  VerifiedSuccessStories,
} from './components/TrustAndSchema';

function RedirectToDistricts() {
  useEffect(() => { window.location.replace('/districts'); }, []);
  return <div className="min-h-screen flex items-center justify-center"><p className="text-slate-500 font-semibold">Loading 64 Districts Directory…</p></div>;
}

function RedirectToCompare() {
  useEffect(() => { window.location.replace('/compare'); }, []);
  return <div className="min-h-screen flex items-center justify-center"><p className="text-slate-500 font-semibold">Loading Consultancy Comparisons Hub…</p></div>;
}

function LegacyCountryRedirect() {
  const { id } = useParams();
  const country = STUDY_DESTINATIONS.find((item) => item.id === id);
  return <Navigate to={country ? `/student-consultancy/${country.slug}` : '/student-consultancy'} replace />;
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

function HomeWithTrust() {
  return <><Home /><HomepageTrust /></>;
}

function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 pt-24 pb-24 lg:pb-0">
      <div className="text-7xl mb-6">↪</div>
      <h1 className="text-4xl font-extrabold text-slate-900 mb-4">This URL has no active page</h1>
      <p className="text-slate-500 mb-8 text-lg max-w-xl">Use the two primary service areas below. Legacy URLs are handled by server-side 301 redirects before this screen is reached.</p>
      <div className="flex flex-wrap justify-center gap-3">
        <a href="/student-consultancy" className="bg-brand-blue text-white font-bold px-6 py-3 rounded-full">Student Consultancy</a>
        <a href="/manpower-recruitment" className="bg-slate-900 text-white font-bold px-6 py-3 rounded-full">Manpower Recruitment</a>
      </div>
    </div>
  );
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
                <Route path="/" element={<HomeWithTrust />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/services" element={<Services />} />
                <Route path="/success-stories" element={<VerifiedSuccessStories />} />
                <Route path="/visa-guide" element={<VisaGuide />} />
                <Route path="/privacy" element={<PrivacyPolicy />} />
                <Route path="/terms" element={<TermsOfService />} />

                <Route path="/student-consultancy" element={<StudentConsultancy />} />
                <Route path="/student-consultancy/:slug" element={<StudyCountryLanding />} />
                <Route path="/bn/student-consultancy" element={<StudentConsultancy language="bn" />} />
                <Route path="/bn/study/:slug" element={<StudyCountryLanding language="bn" />} />

                <Route path="/manpower-recruitment" element={<ManpowerRecruitment />} />
                <Route path="/manpower-recruitment/:region" element={<ManpowerRegionLanding />} />
                <Route path="/bn/manpower-recruitment" element={<ManpowerRecruitment language="bn" />} />
                <Route path="/bn/manpower/:region" element={<ManpowerRegionLanding language="bn" />} />

                <Route path="/workforce" element={<Navigate to="/manpower-recruitment" replace />} />
                <Route path="/country/:id" element={<LegacyCountryRedirect />} />

                <Route path="/districts" element={<RedirectToDistricts />} />
                <Route path="/compare" element={<RedirectToCompare />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <ComplianceStrip />
            <Footer />
            <WhatsAppButton />
            <BottomTabBar />
          </div>
        </ErrorBoundary>
      </Router>
    </HelmetProvider>
  );
}
