import { motion } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import { Users, BookOpen, Award, Plane, FileText, Globe, MessageCircle, ArrowRight, CheckCircle } from 'lucide-react';
import { WHATSAPP_CONSULTATION } from '../constants';

const services = [
  {
    id: 'counseling',
    icon: <Users size={36} />,
    title: 'Student Counseling',
    tagline: 'Your journey starts with the right conversation.',
    color: 'from-brand-blue to-brand-blue-light',
    lightColor: 'bg-brand-blue/10 text-brand-blue',
    description:
      'Our expert counselors take time to understand your academic background, career goals, financial situation, and personal preferences. We build a tailored roadmap that matches you with the right country, university, and program.',
    steps: [
      'Free initial consultation (in-person or WhatsApp)',
      'Academic profile evaluation',
      'Country and university shortlisting',
      'Personalized study plan creation',
      'Budget and scholarship planning',
    ],
    highlight: 'Completely free for the first session',
  },
  {
    id: 'admission',
    icon: <BookOpen size={36} />,
    title: 'Admission Processing',
    tagline: 'We take care of every form, every deadline.',
    color: 'from-brand-red to-brand-red-dark',
    lightColor: 'bg-brand-red/10 text-brand-red',
    description:
      'From drafting a compelling Statement of Purpose to submitting the final application, our team handles every step of the university admission process. We have deep relationships with admission offices across 15+ countries.',
    steps: [
      'University application form completion',
      'Statement of Purpose (SOP) writing',
      'Recommendation letter guidance',
      'Academic document attestation',
      'Offer letter follow-up and negotiation',
    ],
    highlight: '98% offer letter success rate',
  },
  {
    id: 'visa',
    icon: <Award size={36} />,
    title: 'Visa Guidance',
    tagline: 'The most critical step — handled with precision.',
    color: 'from-emerald-500 to-teal-600',
    lightColor: 'bg-emerald-100 text-emerald-700',
    description:
      'Visa rejections are costly and stressful. Our visa specialists have an unmatched 98% approval rate because we prepare every application with the highest level of care — financial documentation, cover letters, and embassy interview coaching included.',
    steps: [
      'Visa category determination',
      'Financial document preparation',
      'Cover letter and application filing',
      'Embassy interview preparation',
      'Visa tracking and status updates',
    ],
    highlight: '98% visa approval rate',
  },
  {
    id: 'predeparture',
    icon: <Plane size={36} />,
    title: 'Pre-Departure Briefing',
    tagline: "You're not alone — even after the visa.",
    color: 'from-violet-500 to-purple-700',
    lightColor: 'bg-violet-100 text-violet-700',
    description:
      'Many students feel lost after getting their visa — what to pack, how to find housing, airport procedures, bank accounts abroad. Our comprehensive pre-departure briefing leaves nothing to chance so you arrive confident and prepared.',
    steps: [
      'Accommodation and housing guidance',
      'Travel and health insurance advice',
      'Airport and arrival procedures',
      'Banking and finance setup abroad',
      'Cultural orientation and tips',
    ],
    highlight: 'Full orientation before you fly',
  },
  {
    id: 'scholarship',
    icon: <FileText size={36} />,
    title: 'Scholarship Assistance',
    tagline: 'Funding your dream — not just finding it.',
    color: 'from-amber-500 to-orange-600',
    lightColor: 'bg-amber-100 text-amber-700',
    description:
      'We actively search for scholarships that match your profile — including the GKS (Global Korea Scholarship), Erasmus+, Malaysian university scholarships, and more. Our team helps you write winning scholarship applications.',
    steps: [
      'Scholarship eligibility assessment',
      'GKS, Erasmus+ and country-specific scholarships',
      'Scholarship essay and portfolio preparation',
      'Application submission and follow-up',
      'Interview preparation for competitive scholarships',
    ],
    highlight: 'Hundreds of students on full scholarships',
  },
  {
    id: 'postlanding',
    icon: <Globe size={36} />,
    title: 'Post-Landing Support',
    tagline: 'Our relationship continues after you land.',
    color: 'from-cyan-500 to-blue-600',
    lightColor: 'bg-cyan-100 text-cyan-700',
    description:
      'We maintain ongoing communication with our students even after they arrive abroad. Whether you need help with registration, have an unexpected issue, or need guidance on part-time work regulations — we are always a WhatsApp message away.',
    steps: [
      'University registration and enrollment',
      'Part-time work permit guidance',
      'Emergency contact and support',
      'Home-stay and dormitory assistance',
      'Community connection with other Bangladeshi students',
    ],
    highlight: 'Lifetime WhatsApp support',
  },
  {
    id: 'academy',
    icon: <BookOpen size={36} />,
    title: 'Language & Consular Academy',
    tagline: 'Flagship Dhanmondi campus for IELTS & European prep.',
    color: 'from-brand-red to-red-700',
    lightColor: 'bg-brand-red/10 text-brand-red',
    description:
      'Our physical academy at House 7, Mirpur Road, Sobhanbag, Dhanmondi prepares students for language exams and consular interviews. We offer high-intensity IELTS 6.5 crash courses, Romanian & Korean language foundations, and mock consular defense.',
    steps: [
      'IELTS 6.5 Fast-Track (4-week & 8-week small batches)',
      '1-on-1 Daily Speaking Clinics with mock examiners',
      'European preparatory language basics (Romania Anul Pregătitor)',
      'Embassy mock interview training (study gaps, financials & SOP defense)',
      'Cambridge exam simulation with real-time analytics',
    ],
    highlight: 'Flagship Dhanmondi Physical Campus',
  },
];

const Services = () => {
  return (
    <>
    <Helmet>
      <title>Our Services — Keystone Overseas</title>
      <meta name="description" content="Student counseling, admission processing, visa guidance, scholarship assistance, and Dhanmondi Language Academy. 98% visa approval rate." />
      <link rel="canonical" href="https://www.keystoneeducations.com/services" />
    </Helmet>
    <div className="pt-24 pb-24 lg:pb-0 overflow-hidden">

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-brand-blue-dark to-brand-blue py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(#ffffff 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }}
        />
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-brand-red/10 blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-block bg-brand-red/20 text-red-300 font-bold uppercase tracking-widest text-xs px-4 py-2 rounded-full mb-6 border border-red-400/20">
              What We Offer
            </span>
            <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6">
              Our <span className="text-brand-red">Services</span>
            </h1>
            <p className="text-xl text-blue-200 max-w-2xl mx-auto">
              Complete end-to-end support for every stage of your international education journey — from the first question to landing in your dream country.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services List */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-24">
            {services.map((service, i) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${
                  i % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
                }`}
              >
                {/* Content */}
                <div className={i % 2 === 1 ? 'lg:col-start-2' : ''}>
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6 ${service.lightColor}`}>
                    {service.icon}
                  </div>
                  <p className="text-slate-400 font-medium italic mb-2">{service.tagline}</p>
                  <h2 className="text-4xl font-extrabold text-slate-900 mb-4">{service.title}</h2>
                  <p className="text-slate-600 text-lg leading-relaxed mb-8">{service.description}</p>

                  <div className="space-y-3 mb-8">
                    {service.steps.map((step) => (
                      <div key={step} className="flex items-start gap-3">
                        <CheckCircle size={18} className="text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-slate-700">{step}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center gap-4">
                    <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold ${service.lightColor}`}>
                      ⭐ {service.highlight}
                    </span>
                  </div>
                </div>

                {/* Visual Card */}
                <div className={i % 2 === 1 ? 'lg:col-start-1' : ''}>
                  <div className={`bg-gradient-to-br ${service.color} rounded-[2.5rem] p-8 text-white relative overflow-hidden`}>
                    <div className="absolute inset-0 opacity-10"
                      style={{ backgroundImage: 'radial-gradient(#ffffff 0.5px, transparent 0.5px)', backgroundSize: '20px 20px' }}
                    />
                    <div className="relative z-10">
                      <div className="bg-white/20 w-20 h-20 rounded-2xl flex items-center justify-center mb-8">
                        {service.icon}
                      </div>
                      <h3 className="text-3xl font-extrabold mb-4">{service.title}</h3>
                      <p className="text-white/80 text-lg mb-8">{service.tagline}</p>
                      <a
                        href={`https://wa.me/8801941646278?text=Hi%2C%20I%20want%20to%20know%20more%20about%20${encodeURIComponent(service.title)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-white text-slate-900 font-bold px-6 py-3 rounded-full hover:shadow-xl hover:scale-105 transition-all text-sm"
                      >
                        <MessageCircle size={16} className="text-green-600" />
                        Enquire via WhatsApp
                        <ArrowRight size={14} />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Overview */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">How It Works</h2>
            <p className="text-slate-500 text-lg">From your first message to your first day on campus.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: '01', title: 'Free Consultation', desc: 'Chat with us on WhatsApp or visit our office.' },
              { step: '02', title: 'Profile Assessment', desc: 'We evaluate your background and match you with options.' },
              { step: '03', title: 'Application & Visa', desc: 'We handle the paperwork, you focus on your future.' },
              { step: '04', title: 'Fly & Thrive', desc: 'Pre-departure briefing and ongoing support after landing.' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15 }}
                viewport={{ once: true }}
                className="text-center relative"
              >
                {i < 3 && (
                  <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-slate-200 z-0" />
                )}
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-brand-blue text-white rounded-full flex items-center justify-center font-extrabold text-xl mx-auto mb-4 shadow-lg">
                    {item.step}
                  </div>
                  <h4 className="font-bold text-slate-900 mb-2">{item.title}</h4>
                  <p className="text-slate-500 text-sm">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-brand-blue to-brand-blue-dark text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-4xl font-extrabold mb-4">Ready to Get Started?</h2>
          <p className="text-blue-200 text-lg mb-8">Your first consultation is free. No obligations, just honest advice.</p>
          <a
            href={WHATSAPP_CONSULTATION}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-brand-red hover:bg-red-600 text-white font-bold px-8 py-4 rounded-full transition-all hover:scale-105 hover:shadow-2xl"
          >
            <MessageCircle size={20} />
            Book Free Consultation
          </a>
        </div>
      </section>
    </div>
    </>
  );
};

export default Services;
