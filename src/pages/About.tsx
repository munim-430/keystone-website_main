import { motion } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import { Target, Globe, Heart, Award, Users, CheckCircle, Facebook, Mail } from 'lucide-react';

const teamMembers = [
  {
    name: 'Hasibul Munim',
    role: 'Founder & Chief Consultant',
    bio: 'Hasibul spent 9 transformative years living and studying in South Korea, giving him unparalleled firsthand knowledge of the Korean education system, culture, and visa process. He founded Keystone Overseas in 2022 with one mission: to make international education accessible to every Bangladeshi student who dares to dream. His personal journey from Bangladesh to Korea — and back — is the heart of everything Keystone stands for.',
    expertise: ['South Korea', 'GKS Scholarships', 'Student Counseling'],
    photo: '/hasibul.jpg',
    color: 'from-brand-blue to-brand-blue-light',
    avatar: 'HM',
  },
  {
    name: 'Nafis Fahim',
    role: 'Visa & Documentation Specialist',
    bio: 'Nafis brings 2 years of focused expertise in file processing and visa documentation, and has quickly become the backbone of Keystone\'s industry-leading 98% visa approval rate. His meticulous attention to detail ensures every student\'s application is embassy-ready. Nafis has a natural talent for connecting with students, making even the most stressful visa process feel manageable and clear.',
    expertise: ['Visa Processing', 'File Documentation', 'Embassy Prep'],
    photo: '/nafis.jpg',
    color: 'from-brand-red to-brand-red-dark',
    avatar: 'NF',
  },
];

const milestones = [
  { year: '2022', event: 'Keystone founded in Bangladesh by Hasibul Munim after 9 years in South Korea' },
  { year: '2022', event: 'First batch of students placed in South Korea with GKS scholarship support' },
  { year: '2023', event: 'Expanded to Malaysian and Canadian pathway programs' },
  { year: '2023', event: 'Crossed 200 successful student placements' },
  { year: '2024', event: 'Launched Cyprus and Europe high-conversion pathways' },
  { year: '2025', event: 'Surpassed 500+ students placed across 10+ countries' },
  { year: '2026', event: 'Rebranded to Keystone Overseas; launched flagship Dhanmondi Academy and European Prep Batches' },
];

const About = () => {
  return (
    <>
    <Helmet>
      <title>About Us — Keystone Overseas</title>
      <meta name="description" content="Meet the team behind Keystone Overseas. Founded by Hasibul Munim — 9 years in South Korea — helping 500+ Bangladeshi students study abroad." />
      <link rel="canonical" href="https://www.keystoneeducations.com/about" />
    </Helmet>
    <div className="pt-24 pb-24 lg:pb-0 overflow-hidden">

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-brand-blue-dark via-[#1a2b6d] to-brand-blue-dark py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(#ffffff 0.5px, transparent 0.5px)', backgroundSize: '28px 28px' }}
        />
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-brand-red/10 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] rounded-full bg-blue-400/10 blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <span className="inline-block bg-brand-red/20 text-red-300 font-bold uppercase tracking-widest text-xs px-4 py-2 rounded-full mb-6 border border-red-400/20">
                About Keystone
              </span>
              <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
                Turning Dreams Into <span className="text-brand-red">Destinations</span>
              </h1>
              <p className="text-xl text-blue-200 leading-relaxed mb-8">
                Since 2022, Keystone Overseas has been Bangladesh's trusted partner for international student placement — guiding 500+ students to universities across 10+ countries.
              </p>
              <div className="grid grid-cols-3 gap-6">
                {[
                  { value: '500+', label: 'Students Placed' },
                  { value: '98%', label: 'Visa Approval' },
                  { value: '10+', label: 'Countries' },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="text-3xl font-extrabold text-white mb-1">{stat.value}</div>
                    <div className="text-blue-300 text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }} className="relative">
              <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white/10">
                <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1000&auto=format&fit=crop"
                  alt="Keystone Team"
                  className="w-full h-[420px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-blue-dark/60 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20">
                  <p className="text-white font-bold">"Where global dreams begin."</p>
                  <p className="text-blue-200 text-sm mt-1">— Keystone Overseas, est. 2022</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">What Drives Us</h2>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto">Our mission and vision shape every conversation, every application, and every visa we process.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: <Target size={28} />, title: 'Our Mission', text: 'To provide transparent, professional, and personalized consultancy that bridges the gap between Bangladeshi students and world-class international education.', color: 'bg-brand-blue/10 text-brand-blue' },
              { icon: <Globe size={28} />, title: 'Our Vision', text: "To be Bangladesh's most trusted education consultancy, recognized for our commitment to student success, ethical practices, and global reach.", color: 'bg-brand-red/10 text-brand-red' },
              { icon: <Heart size={28} />, title: 'Our Values', text: 'Integrity, excellence, and a student-first approach. We succeed when our students succeed — every decision we make reflects this belief.', color: 'bg-emerald-100 text-emerald-600' },
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.15 }} viewport={{ once: true }} className="bg-slate-50 p-8 rounded-3xl border border-slate-100 hover:shadow-xl transition-all">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${item.color}`}>{item.icon}</div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">{item.title}</h3>
                <p className="text-slate-600 leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-brand-red font-bold uppercase tracking-widest text-sm">The People Behind Keystone</span>
            <h2 className="text-4xl font-bold text-slate-900 mt-2 mb-4">Meet Our Founders</h2>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto">
              Real lived experience, real results. Our founders have walked the path your students are about to take.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto">
            {teamMembers.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15 }}
                viewport={{ once: true }}
                className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all group border border-slate-100"
              >
                {/* Photo */}
                <div className="h-72 relative overflow-hidden">
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
                  <div className={`absolute top-4 right-4 bg-gradient-to-br ${member.color} text-white text-xs font-bold px-3 py-1 rounded-full`}>
                    {member.role}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-1">{member.name}</h3>
                  <p className="text-brand-red font-semibold text-sm mb-3">{member.role}</p>
                  <p className="text-slate-500 text-sm leading-relaxed mb-4">{member.bio}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {member.expertise.map((tag) => (
                      <span key={tag} className="bg-slate-100 text-slate-600 text-xs font-medium px-2.5 py-1 rounded-full">{tag}</span>
                    ))}
                  </div>

                  <div className="flex gap-2 pt-2 border-t border-slate-100">
                    <a href="https://www.facebook.com/share/187gaTjhFD/" target="_blank" rel="noopener noreferrer"
                      className="p-2 text-slate-400 hover:text-brand-blue hover:bg-slate-50 rounded-lg transition-colors">
                      <Facebook size={16} />
                    </a>
                    <a href="mailto:munim.m247@gmail.com"
                      className="p-2 text-slate-400 hover:text-brand-blue hover:bg-slate-50 rounded-lg transition-colors">
                      <Mail size={16} />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Our Journey</h2>
            <p className="text-slate-500 text-lg">Growing fast, one student at a time — since 2022.</p>
          </div>
          <div className="relative">
            <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 bg-slate-200" />
            <div className="space-y-12">
              {milestones.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className={`flex items-center gap-8 ${i % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                >
                  <div className={`flex-1 ${i % 2 === 0 ? 'text-right' : 'text-left'}`}>
                    <div className="bg-slate-50 border border-slate-200 p-5 rounded-2xl hover:shadow-md transition-all inline-block max-w-xs">
                      <p className="text-slate-700 font-medium">{m.event}</p>
                    </div>
                  </div>
                  <div className="flex-shrink-0 w-14 h-14 bg-brand-blue text-white rounded-full flex items-center justify-center font-extrabold text-sm z-10 shadow-lg">
                    {m.year}
                  </div>
                  <div className="flex-1" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-gradient-to-br from-brand-blue-dark to-brand-blue text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Students Choose Keystone</h2>
            <p className="text-blue-200 text-lg">We don't just process applications — we change lives.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: <Award size={24} />, title: '98% Visa Approval Rate', desc: 'Our meticulous documentation process ensures the highest success rates in the industry.' },
              { icon: <Users size={24} />, title: 'Personalized Counseling', desc: 'Every student gets a dedicated counselor who understands their unique goals and budget.' },
              { icon: <Globe size={24} />, title: '10+ Country Network', desc: 'From South Korea to Canada, our partnerships span the globe for maximum opportunities.' },
              { icon: <CheckCircle size={24} />, title: 'End-to-End Support', desc: 'From the first consultation to pre-departure briefing — we are with you every step.' },
              { icon: <Heart size={24} />, title: 'Transparent Process', desc: 'No hidden fees, no false promises. We tell you exactly what to expect and when.' },
              { icon: <Target size={24} />, title: 'Founded by Students, For Students', desc: 'Our founder spent 9 years in Korea — he knows exactly what you are about to go through.' },
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }}
                className="flex items-start gap-4 p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
                <div className="bg-brand-red/20 text-red-300 p-3 rounded-xl flex-shrink-0">{item.icon}</div>
                <div>
                  <h4 className="font-bold text-white mb-2">{item.title}</h4>
                  <p className="text-blue-200 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
    </>
  );
};

export default About;
