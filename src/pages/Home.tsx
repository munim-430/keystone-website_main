import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Hero from '../components/Hero';
import Counter from '../components/Counter';
import ConsultationForm from '../components/ConsultationForm';
import { ArrowRight, CheckCircle, MessageCircle, Star, Globe, GraduationCap, Users, Award, Plane } from 'lucide-react';
import { countries } from '../data';
import { WHATSAPP_CONSULTATION, FACEBOOK_URL, WHATSAPP_DISPLAY, CONTACT_EMAIL, OFFICE_ADDRESS, OFFICE_HOURS } from '../constants';

const services = [
  { icon: <Users size={28} />, title: 'Student Counseling', desc: 'Personalized guidance matching your academic background, goals and budget to the right country and university.', color: 'bg-brand-blue/10 text-brand-blue' },
  { icon: <GraduationCap size={28} />, title: 'Admission Processing', desc: 'We handle every form, every deadline — from SOP writing to document attestation and offer letter follow-up.', color: 'bg-brand-red/10 text-brand-red' },
  { icon: <Award size={28} />, title: 'Visa Guidance', desc: 'Our 98% visa approval rate speaks for itself. We prepare every application with the highest level of precision.', color: 'bg-emerald-100 text-emerald-600' },
  { icon: <Plane size={28} />, title: 'Pre-Departure Briefing', desc: "Housing, travel insurance, airport procedures, banking abroad — we prepare you for everything before you fly.", color: 'bg-violet-100 text-violet-600' },
  { icon: <Globe size={28} />, title: 'Scholarship Assistance', desc: 'We actively find and apply for scholarships matching your profile — GKS, Erasmus+, Malaysian, and more.', color: 'bg-amber-100 text-amber-600' },
  { icon: <MessageCircle size={28} />, title: 'Post-Landing Support', desc: 'Our relationship continues after you land. We are always just a WhatsApp message away.', color: 'bg-cyan-100 text-cyan-600' },
];

const testimonials = [
  { name: 'Tanvir Ahmed', country: '🇰🇷 Korea University', quote: "Keystone made my dream of studying in Korea a reality. Their GKS scholarship guidance was step-by-step and incredibly detailed.", avatar: 'https://i.pravatar.cc/100?img=11', rating: 5 },
  { name: 'Nusrat Jahan', country: '🇨🇦 Seneca College, Toronto', quote: 'The Canadian visa process seemed so daunting, but Keystone handled everything professionally. Highly recommended!', avatar: 'https://i.pravatar.cc/100?img=25', rating: 5 },
  { name: 'Sabbir Hossain', country: '🇲🇾 UCSI University, KL', quote: 'Fast admission processing and excellent pre-departure briefing. I felt completely prepared for life in Malaysia.', avatar: 'https://i.pravatar.cc/100?img=15', rating: 5 },
];

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Keystone Education Consultancy — Study Abroad from Bangladesh</title>
        <meta name="description" content="Bangladesh's trusted study abroad consultancy. 500+ students placed in South Korea, Malaysia, Canada, Cyprus & Europe. 98% visa approval rate. Free consultation." />
        <meta property="og:title" content="Keystone Education Consultancy" />
        <meta property="og:description" content="500+ Bangladeshi students placed in top universities worldwide. 98% visa approval rate. Free first consultation." />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "EducationalOrganization",
          "name": "Keystone Education Consultancy",
          "description": "Study abroad consultancy for Bangladeshi students",
          "address": { "@type": "PostalAddress", "streetAddress": OFFICE_ADDRESS, "addressCountry": "BD" },
          "telephone": WHATSAPP_DISPLAY,
          "email": CONTACT_EMAIL,
        })}</script>
      </Helmet>

      <div className="overflow-hidden pb-16 lg:pb-0">
        <Hero />

        {/* Stats */}
        <section className="py-14 bg-brand-blue-dark relative overflow-hidden">
          <div className="absolute inset-0 opacity-10"
            style={{ backgroundImage: 'radial-gradient(#ffffff 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }} />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { end: 500, suffix: '+', label: 'Students Placed', icon: '🎓' },
                { end: 98, suffix: '%', label: 'Visa Approval Rate', icon: '✅' },
                { end: 10, suffix: '+', label: 'Countries', icon: '🌍' },
                { end: 3, suffix: '', label: 'Office Locations', icon: '📍' },
              ].map((stat, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }} viewport={{ once: true }} className="text-center">
                  <div className="text-3xl mb-2">{stat.icon}</div>
                  <div className="text-4xl font-extrabold text-white mb-1">
                    <Counter end={stat.end} suffix={stat.suffix} />
                  </div>
                  <div className="text-blue-300 text-sm font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Destinations */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-brand-red font-bold uppercase tracking-widest text-sm">Where Will You Go?</span>
              <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mt-2 mb-4">Study Destinations</h2>
              <p className="text-slate-500 text-lg max-w-2xl mx-auto">From the tech hubs of Seoul to the historic streets of Nicosia — we open doors to the world's finest universities.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {countries.map((country, i) => (
                <motion.div key={country.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }} viewport={{ once: true }}
                  className="group relative rounded-3xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500">
                  <div className="h-64 overflow-hidden">
                    <img src={country.image} alt={country.name} loading="lazy" width={600} height={400}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/30 to-transparent" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h3 className="text-xl font-extrabold text-white mb-1">{country.name}</h3>
                    <p className="text-slate-300 text-sm mb-3 line-clamp-2">{country.shortDescription}</p>
                    <Link to={`/country/${country.id}`}
                      className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 text-white text-sm font-semibold px-4 py-2 rounded-full hover:bg-brand-red hover:border-brand-red transition-all">
                      Learn More <ArrowRight size={14} />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="py-20 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-brand-red font-bold uppercase tracking-widest text-sm">What We Do</span>
              <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mt-2 mb-4">Our Services</h2>
              <p className="text-slate-500 text-lg max-w-2xl mx-auto">Complete end-to-end support for every stage of your international education journey.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((s, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }} viewport={{ once: true }}
                  className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all border border-slate-100 group">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-5 ${s.color} group-hover:scale-110 transition-transform`}>
                    {s.icon}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{s.title}</h3>
                  <p className="text-slate-500 leading-relaxed mb-4 text-sm">{s.desc}</p>
                  <Link to="/services" className="inline-flex items-center gap-1 text-brand-blue font-semibold text-sm hover:text-brand-red transition-colors">
                    Learn more <ArrowRight size={14} />
                  </Link>
                </motion.div>
              ))}
            </div>
            <div className="text-center mt-10">
              <Link to="/services"
                className="inline-flex items-center gap-2 bg-brand-blue text-white px-8 py-4 rounded-full font-bold hover:bg-brand-red transition-all shadow-lg hover:scale-105">
                View All Services <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </section>

        {/* Why Keystone */}
        <section className="py-20 bg-gradient-to-br from-brand-blue-dark via-[#1a2b6d] to-brand-blue text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10"
            style={{ backgroundImage: 'radial-gradient(#ffffff 0.5px, transparent 0.5px)', backgroundSize: '28px 28px' }} />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                <span className="inline-block bg-brand-red/20 text-red-300 font-bold uppercase tracking-widest text-xs px-4 py-2 rounded-full mb-6 border border-red-400/20">
                  Why Choose Us
                </span>
                <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
                  Founded by someone who <span className="text-brand-red">lived the journey.</span>
                </h2>
                <p className="text-blue-200 text-lg leading-relaxed mb-6">
                  Our founder Hasibul Munim spent 9 years in South Korea. That firsthand experience means every student at Keystone gets advice that's real, not read from a brochure.
                </p>
                <div className="space-y-3 mb-8">
                  {[
                    '9 years in South Korea — real insider knowledge',
                    '98% visa approval rate since 2022',
                    'Free first consultation — no commitment needed',
                    'WhatsApp support even after you land abroad',
                    'Transparent process — no hidden fees ever',
                  ].map((point, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <CheckCircle size={18} className="text-green-400 flex-shrink-0" />
                      <span className="text-blue-100">{point}</span>
                    </div>
                  ))}
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a href={WHATSAPP_CONSULTATION} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-brand-red hover:bg-red-600 text-white font-bold px-8 py-4 rounded-full transition-all hover:scale-105">
                    <MessageCircle size={18} /> Start Your Journey
                  </a>
                  <Link to="/about"
                    className="inline-flex items-center justify-center gap-2 bg-white/10 border border-white/20 hover:bg-white/20 text-white font-bold px-8 py-4 rounded-full transition-all">
                    Meet Our Team <ArrowRight size={18} />
                  </Link>
                </div>
              </motion.div>
              <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="grid grid-cols-2 gap-4">
                {[
                  { value: '2022', label: 'Founded', sub: 'Est. in Dhaka' },
                  { value: '500+', label: 'Students', sub: 'Successfully placed' },
                  { value: '98%', label: 'Visa Rate', sub: 'Industry leading' },
                  { value: '10+', label: 'Countries', sub: 'Global network' },
                ].map((stat, i) => (
                  <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 }} viewport={{ once: true }}
                    className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-5 text-center">
                    <div className="text-3xl font-extrabold text-white mb-1">{stat.value}</div>
                    <div className="text-brand-red font-bold text-sm uppercase tracking-wider">{stat.label}</div>
                    <div className="text-blue-300 text-xs mt-1">{stat.sub}</div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-brand-red font-bold uppercase tracking-widest text-sm">Student Reviews</span>
              <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mt-2 mb-4">What Our Students Say</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((t, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.12 }} viewport={{ once: true }}
                  className="bg-slate-50 rounded-3xl p-6 border border-slate-100 hover:shadow-xl transition-all relative">
                  <div className="text-5xl text-slate-200 font-serif absolute top-4 right-6">"</div>
                  <div className="flex gap-1 mb-3">
                    {Array(t.rating).fill(0).map((_, j) => <Star key={j} size={14} className="fill-yellow-400 text-yellow-400" />)}
                  </div>
                  <p className="text-slate-600 leading-relaxed italic mb-5 text-sm">"{t.quote}"</p>
                  <div className="flex items-center gap-3">
                    <img src={t.avatar} alt={t.name} loading="lazy" className="w-11 h-11 rounded-full object-cover border-2 border-brand-blue/20" />
                    <div>
                      <p className="font-bold text-slate-900 text-sm">{t.name}</p>
                      <p className="text-xs text-brand-blue">{t.country}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="text-center mt-10">
              <Link to="/success-stories" className="inline-flex items-center gap-2 text-brand-blue font-bold hover:text-brand-red transition-colors">
                Read all success stories <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="py-20 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                <span className="text-brand-red font-bold uppercase tracking-widest text-sm">Get In Touch</span>
                <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mt-2 mb-6">Start Your Journey Today</h2>
                <p className="text-slate-500 text-lg leading-relaxed mb-8">
                  Your first consultation is completely free. Visit us at any of our 3 locations, or just send a WhatsApp message.
                </p>
                <div className="space-y-5">
                  {[
                    { icon: '📍', title: 'Main Office', desc: OFFICE_ADDRESS },
                    { icon: '📞', title: 'WhatsApp', desc: WHATSAPP_DISPLAY },
                    { icon: '📧', title: 'Email', desc: CONTACT_EMAIL },
                    { icon: '🕐', title: 'Office Hours', desc: OFFICE_HOURS },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <div className="text-2xl">{item.icon}</div>
                      <div>
                        <p className="font-bold text-slate-900">{item.title}</p>
                        <p className="text-slate-500">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex flex-col sm:flex-row gap-4 mt-8">
                  <a href={WHATSAPP_CONSULTATION} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold px-6 py-4 rounded-full transition-all hover:scale-105 min-h-[52px]">
                    <MessageCircle size={20} /> WhatsApp Us
                  </a>
                  <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-4 rounded-full transition-all hover:scale-105 min-h-[52px]">
                    Facebook Page
                  </a>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                <ConsultationForm />
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
