import { motion } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import { Star, GraduationCap, Quote, ArrowRight } from 'lucide-react';
import { WHATSAPP_CONSULTATION } from '../constants';

const successStories = [
  {
    id: 1,
    name: 'Tanvir Ahmed',
    country: 'South Korea',
    flag: '🇰🇷',
    university: 'Korea University, Seoul',
    program: 'BSc in Computer Science',
    year: '2023',
    scholarship: 'GKS Scholarship (Full)',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop',
    quote: "Keystone made my dream of studying in Korea a reality. Their guidance on the GKS scholarship was step-by-step and incredibly detailed. I couldn't have done it without them.",
    tags: ['GKS Scholarship', 'Full Funded', 'Computer Science'],
    rating: 5,
  },
  {
    id: 2,
    name: 'Nusrat Jahan',
    country: 'Canada',
    flag: '🇨🇦',
    university: 'Seneca College, Toronto',
    program: 'Diploma in Business Administration',
    year: '2023',
    scholarship: 'Partial Merit Scholarship',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop',
    quote: 'The Canadian visa process seemed so daunting, but Keystone handled everything professionally and kept me informed at every stage. Highly recommended for anyone going to Canada!',
    tags: ['Canada', 'Business', 'PR Pathway'],
    rating: 5,
  },
  {
    id: 3,
    name: 'Sabbir Hossain',
    country: 'Malaysia',
    flag: '🇲🇾',
    university: 'UCSI University, Kuala Lumpur',
    program: 'BEng in Mechanical Engineering',
    year: '2022',
    scholarship: 'University Scholarship (50%)',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop',
    quote: 'Fast admission processing and excellent pre-departure briefing. I felt completely prepared for life in Malaysia. The Keystone team went above and beyond.',
    tags: ['Malaysia', 'Engineering', 'Affordable'],
    rating: 5,
  },
  {
    id: 4,
    name: 'Roksana Akter',
    country: 'Cyprus',
    flag: '🇨🇾',
    university: 'University of Nicosia',
    program: 'MSc in International Business',
    year: '2023',
    scholarship: 'Early Bird Discount',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop',
    quote: "I wanted a European degree but was worried about costs. Keystone showed me Cyprus — a perfect solution I never would have found on my own. It's been life-changing.",
    tags: ['Europe', 'Masters', 'Affordable EU Degree'],
    rating: 5,
  },
  {
    id: 5,
    name: 'Imtiaz Khan',
    country: 'South Korea',
    flag: '🇰🇷',
    university: 'Sungkyunkwan University',
    program: 'Masters in Electrical Engineering',
    year: '2022',
    scholarship: 'TOPIK Scholarship',
    image: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?q=80&w=400&auto=format&fit=crop',
    quote: 'The team helped me with everything — Korean language prep, document translation, even scholarship essay writing. Their knowledge of Korean universities is unmatched.',
    tags: ['Korean Language', 'Masters', 'Scholarship'],
    rating: 5,
  },
  {
    id: 6,
    name: 'Tasnim Hossain',
    country: 'Malaysia',
    flag: '🇲🇾',
    university: 'Taylor\'s University',
    program: 'BSc in Pharmacy',
    year: '2024',
    scholarship: 'Academic Excellence Award',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&auto=format&fit=crop',
    quote: "Keystone found me a scholarship I didn't even know existed. Their attention to detail in my application made all the difference. Now I'm studying my dream course!",
    tags: ['Pharmacy', 'Scholarship', 'Malaysia'],
    rating: 5,
  },
];

const stats = [
  { value: '1,000+', label: 'Students Placed', icon: '🎓' },
  { value: '98%', label: 'Visa Success Rate', icon: '✅' },
  { value: '15+', label: 'Countries', icon: '🌍' },
  { value: '10+', label: 'Years Experience', icon: '⭐' },
];

const galleryImages = [
  'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1541339907198-e08756edd811?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1497486751825-1233686d5d80?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=600&auto=format&fit=crop',
];

const SuccessStories = () => {
  return (
    <>
    <Helmet>
      <title>Student Success Stories — Keystone Overseas</title>
      <meta name="description" content="Real stories from 500+ Bangladeshi students placed in Cyprus, Romania, Malaysia, South Korea, Canada and Europe with Keystone Overseas." />
    </Helmet>
    <div className="pt-24 pb-24 lg:pb-0 overflow-hidden">

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-brand-blue-dark to-brand-blue py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(#ffffff 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-block bg-brand-red/20 text-red-300 font-bold uppercase tracking-widest text-xs px-4 py-2 rounded-full mb-6 border border-red-400/20">
              Student Success
            </span>
            <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6">
              Real Students, <span className="text-brand-red">Real Dreams</span>
            </h1>
            <p className="text-xl text-blue-200 max-w-2xl mx-auto">
              Meet the students who trusted Keystone with their future — and are now thriving at universities around the world.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-slate-100">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="py-8 text-center"
              >
                <div className="text-3xl mb-1">{stat.icon}</div>
                <div className="text-3xl font-extrabold text-brand-blue">{stat.value}</div>
                <div className="text-slate-500 text-sm mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories Grid */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Student Stories</h2>
            <p className="text-slate-500 text-lg">Every success story starts with a single consultation.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {successStories.map((story, i) => (
              <motion.div
                key={story.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all border border-slate-100 group"
              >
                {/* Image + overlay */}
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={story.image}
                    alt={story.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-blue-dark/80 to-transparent" />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="bg-white/90 text-slate-700 text-xs font-bold px-3 py-1 rounded-full">
                      {story.flag} {story.country}
                    </span>
                    {story.scholarship && (
                      <span className="bg-brand-red/90 text-white text-xs font-bold px-3 py-1 rounded-full">
                        🏆 Scholarship
                      </span>
                    )}
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-white font-bold text-lg">{story.name}</p>
                    <p className="text-blue-200 text-sm">{story.university}</p>
                  </div>
                </div>

                <div className="p-6">
                  {/* Meta */}
                  <div className="flex items-center gap-3 mb-4 text-sm text-slate-500">
                    <div className="flex items-center gap-1">
                      <GraduationCap size={14} className="text-brand-blue" />
                      <span>{story.program}</span>
                    </div>
                  </div>

                  {/* Stars */}
                  <div className="flex gap-1 mb-3">
                    {Array(story.rating).fill(0).map((_, i) => (
                      <Star key={i} size={14} className="fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>

                  {/* Quote */}
                  <div className="relative">
                    <Quote size={20} className="text-slate-200 absolute -top-1 -left-1" />
                    <p className="text-slate-600 text-sm leading-relaxed pl-4 italic">
                      "{story.quote}"
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mt-4">
                    {story.tags.map((tag) => (
                      <span key={tag} className="bg-slate-100 text-slate-600 text-xs font-medium px-2.5 py-1 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Photo Gallery */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Our Gallery</h2>
            <p className="text-slate-500 text-lg">Moments from orientations, seminars, and student events.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {galleryImages.map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.08 }}
                viewport={{ once: true }}
                className={`rounded-2xl overflow-hidden ${i === 0 || i === 5 ? 'row-span-2' : ''} group cursor-pointer`}
              >
                <img
                  src={img}
                  alt={`Gallery ${i + 1}`}
                  className={`w-full object-cover group-hover:scale-105 transition-transform duration-500 ${
                    i === 0 || i === 5 ? 'h-full min-h-[300px]' : 'h-52'
                  }`}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-brand-red to-brand-red-dark text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-4xl font-extrabold mb-4">Ready to Write Your Success Story?</h2>
          <p className="text-red-100 text-lg mb-8">Join 1,000+ students who trusted Keystone to guide them to universities worldwide.</p>
          <a
            href={WHATSAPP_CONSULTATION}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white text-brand-red font-bold px-8 py-4 rounded-full hover:shadow-2xl hover:scale-105 transition-all"
          >
            Start Your Journey <ArrowRight size={18} />
          </a>
        </div>
      </section>
    </div>
    </>
  );
};

export default SuccessStories;
