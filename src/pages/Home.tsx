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
        <title>Keystone Overseas — Study Abroad &amp; Language Academy Dhanmondi Dhaka</title>
        <meta name="description" content="Study in Cyprus, Romania, Malaysia, South Korea, Hungary &amp; Canada from Bangladesh. Dhanmondi physical academy for IELTS 6.5 &amp; European language prep. 98% visa approval rate." />
        <meta property="og:title" content="Keystone Overseas — Global Education &amp; Academy" />
        <meta property="og:description" content="500+ Bangladeshi students placed in top universities worldwide. Flagship Dhanmondi office and Language Academy. 98% visa approval rate." />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "EducationalOrganization",
          "name": "Keystone Overseas",
          "description": "Study abroad consultancy and language academy for Bangladeshi students",
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
                { end: 6, suffix: '+', label: 'Study Corridors', icon: '🌍' },
                { end: 100, suffix: '%', label: 'Direct Guidance', icon: '🎯' },
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

        {/* Keystone Academy Section */}
        <section id="academy" className="py-20 bg-gradient-to-b from-white to-blue-50/40 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-14">
              <span className="inline-block bg-brand-red/10 text-brand-red font-bold uppercase tracking-widest text-xs px-4 py-1.5 rounded-full mb-3 border border-red-200">
                Flagship Dhanmondi Campus
              </span>
              <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mt-2 mb-4">
                Keystone <span className="text-brand-red">Language Academy</span>
              </h2>
              <p className="text-slate-600 text-lg max-w-2xl mx-auto">
                Direct in-person batches at Sobhanbag, Dhanmondi. Designed to bridge the English and consular gap so your study visa is guaranteed embassy-ready.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Card 1: IELTS 6.5 Fast-Track */}
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                className="bg-white rounded-3xl p-8 border border-slate-200 shadow-lg hover:shadow-2xl transition-all relative flex flex-col justify-between">
                <div>
                  <div className="inline-flex items-center gap-2 bg-brand-blue/10 text-brand-blue text-xs font-extrabold px-3 py-1 rounded-full mb-4">
                    4–8 Week Intensive
                  </div>
                  <h3 className="text-2xl font-extrabold text-slate-900 mb-2">IELTS 6.5 Fast-Track</h3>
                  <p className="text-slate-500 text-sm mb-6 leading-relaxed">
                    Designed for students with study gaps or urgent intakes. Intensive focus on Speaking &amp; Writing band improvement.
                  </p>
                  <div className="space-y-3 mb-8">
                    {[
                      'Daily 1-on-1 Speaking Clinics with mock examiners',
                      'Cambridge test papers & automated band scoring',
                      'Small batch size (max 12 students per class)',
                      'Weekend & Evening schedules for working students',
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-sm text-slate-700">
                        <CheckCircle size={16} className="text-green-500 flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <a href="https://wa.me/8801941646278?text=Hi%20Keystone%20Overseas!%20I%20want%20to%20enroll%20in%20the%20Dhanmondi%20IELTS%20Fast-Track%20batch."
                  target="_blank" rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 bg-brand-blue hover:bg-brand-red text-white font-bold py-3.5 px-6 rounded-2xl transition-all text-sm shadow-md">
                  <MessageCircle size={16} /> Enroll in Dhanmondi Batch
                </a>
              </motion.div>

              {/* Card 2: European Preparatory & Consular Masterclass */}
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} viewport={{ once: true }}
                className="bg-gradient-to-br from-brand-blue-dark to-brand-blue text-white rounded-3xl p-8 border border-blue-900 shadow-xl hover:shadow-2xl transition-all relative flex flex-col justify-between">
                <div>
                  <div className="inline-flex items-center gap-2 bg-brand-red text-white text-xs font-extrabold px-3 py-1 rounded-full mb-4">
                    Zero-IELTS European Route
                  </div>
                  <h3 className="text-2xl font-extrabold text-white mb-2">European Prep &amp; Consular Lab</h3>
                  <p className="text-blue-200 text-sm mb-6 leading-relaxed">
                    Tailored for Romania (Anul Pregătitor), Cyprus &amp; Hungary. Zero-IELTS foundation plus rigorous embassy interview coaching.
                  </p>
                  <div className="space-y-3 mb-8">
                    {[
                      'Embassy mock interviews (countering study gaps & finances)',
                      'Romanian & European cultural and survival language basics',
                      'Statement of Purpose (SOP) personalized drafting clinic',
                      'Hague Apostille & e-Apostille document verification guidance',
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-sm text-blue-100">
                        <CheckCircle size={16} className="text-green-400 flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <a href="https://wa.me/8801941646278?text=Hi%20Keystone%20Overseas!%20I%20want%20to%20enroll%20in%20the%20European%20Prep%20%26%20Consular%20Lab%20batch."
                  target="_blank" rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 bg-brand-red hover:bg-red-600 text-white font-bold py-3.5 px-6 rounded-2xl transition-all text-sm shadow-lg">
                  <MessageCircle size={16} /> Book Consular Prep Batch
                </a>
              </motion.div>

              {/* Card 3: Korean Language & GKS Masterclass */}
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} viewport={{ once: true }}
                className="bg-white rounded-3xl p-8 border border-slate-200 shadow-lg hover:shadow-2xl transition-all relative flex flex-col justify-between">
                <div>
                  <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 text-xs font-extrabold px-3 py-1 rounded-full mb-4">
                    Founder Mentored
                  </div>
                  <h3 className="text-2xl font-extrabold text-slate-900 mb-2">Korean Language &amp; GKS Prep</h3>
                  <p className="text-slate-500 text-sm mb-6 leading-relaxed">
                    Direct insider coaching from founder Hasibul Munim (9 years in Korea). Master Hangul, TOPIK Level 1–2, and Korean visa interviews.
                  </p>
                  <div className="space-y-3 mb-8">
                    {[
                      'Hangul literacy and conversational fluency for university life',
                      'TOPIK mock exams for 30%–100% university scholarships',
                      'Direct guidance on Korean D-2 / D-4 embassy interviews in Gulshan',
                      'Work-study adaptation and post-landing survival training',
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-sm text-slate-700">
                        <CheckCircle size={16} className="text-green-500 flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <a href="https://wa.me/8801941646278?text=Hi%20Keystone%20Overseas!%20I%20want%20to%20enroll%20in%20the%20Korean%20Language%20%26%20GKS%20batch."
                  target="_blank" rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 bg-brand-blue hover:bg-brand-red text-white font-bold py-3.5 px-6 rounded-2xl transition-all text-sm shadow-md">
                  <MessageCircle size={16} /> Join Korean Language Batch
                </a>
              </motion.div>
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
                  { value: '2022', label: 'Founded', sub: 'Flagship Dhanmondi' },
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
                  Your first consultation is completely free. Visit our flagship Dhanmondi office or send us a WhatsApp message directly.
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
