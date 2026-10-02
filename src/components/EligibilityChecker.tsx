import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle, ArrowRight, ArrowLeft, RefreshCw } from 'lucide-react';
import { WHATSAPP_NUMBER } from '../constants';

type Step = {
  id: string;
  question: string;
  options: { label: string; value: string; icon: string }[];
};

const steps: Step[] = [
  {
    id: 'education',
    question: 'What is your current education level?',
    options: [
      { label: 'SSC / O-Level', value: 'ssc', icon: '📚' },
      { label: 'HSC / A-Level', value: 'hsc', icon: '🎓' },
      { label: "Bachelor's Degree", value: 'bachelor', icon: '🏛️' },
      { label: "Master's Degree", value: 'master', icon: '🔬' },
    ],
  },
  {
    id: 'gap',
    question: 'How long is your study gap?',
    options: [
      { label: 'No Gap / Fresh', value: 'none', icon: '✅' },
      { label: '1–2 Years', value: 'low', icon: '📅' },
      { label: '3–5 Years', value: 'medium', icon: '⏳' },
      { label: '5+ Years', value: 'high', icon: '📆' },
    ],
  },
  {
    id: 'budget',
    question: 'What is your approximate annual budget?',
    options: [
      { label: 'Under $5,000', value: 'low', icon: '💵' },
      { label: '$5,000 – $12,000', value: 'medium', icon: '💰' },
      { label: '$12,000 – $25,000', value: 'high', icon: '💎' },
      { label: 'Open / Scholarship', value: 'scholarship', icon: '🏆' },
    ],
  },
  {
    id: 'preference',
    question: 'What matters most to you?',
    options: [
      { label: 'Affordable Tuition', value: 'affordable', icon: '🎯' },
      { label: 'Scholarship Opportunities', value: 'scholarship', icon: '🌟' },
      { label: 'Work While Studying', value: 'work', icon: '💼' },
      { label: 'PR / Residency Path', value: 'pr', icon: '🏠' },
    ],
  },
  {
    id: 'language',
    question: 'What is your English proficiency?',
    options: [
      { label: 'No certificate yet', value: 'none', icon: '📝' },
      { label: 'IELTS 5.0–5.5', value: 'basic', icon: '📊' },
      { label: 'IELTS 6.0–6.5', value: 'good', icon: '✅' },
      { label: 'IELTS 7.0+', value: 'excellent', icon: '🌟' },
    ],
  },
];

const GAP_LABEL: Record<string, string> = {
  none: 'No Gap / Fresh',
  low: '1–2 Years',
  medium: '3–5 Years',
  high: '5+ Years',
};

const EDUCATION_LABEL: Record<string, string> = {
  ssc: 'SSC / O-Level',
  hsc: 'HSC / A-Level',
  bachelor: "Bachelor's Degree",
  master: "Master's Degree",
};

const BUDGET_LABEL: Record<string, string> = {
  low: 'Under $5,000',
  medium: '$5,000–$12,000',
  high: '$12,000–$25,000',
  scholarship: 'Scholarship / Open',
};

const PREFERENCE_LABEL: Record<string, string> = {
  affordable: 'Affordable Tuition',
  scholarship: 'Scholarship',
  work: 'Work While Studying',
  pr: 'PR / Residency Path',
};

const LANGUAGE_LABEL: Record<string, string> = {
  none: 'No Certificate',
  basic: 'IELTS 5.0–5.5',
  good: 'IELTS 6.0–6.5',
  excellent: 'IELTS 7.0+',
};

type Result = {
  country: string;
  flag: string;
  match: number;
  reason: string;
  color: string;
};

function getResults(answers: Record<string, string>): Result[] {
  const results: Result[] = [];
  const gap = answers.gap ?? 'none';

  // Cyprus (EU) — specialist in high study gaps & zero IELTS
  let cyprusScore = 20;
  if (['hsc', 'bachelor', 'ssc'].includes(answers.education)) cyprusScore += 25;
  if (['low', 'medium'].includes(answers.budget)) cyprusScore += 20;
  if (['affordable', 'work'].includes(answers.preference)) cyprusScore += 15;
  if (['none', 'basic'].includes(answers.language)) cyprusScore += 20;
  // Gap scoring: Cyprus accepts 5–8 yr gap — strongly favour high gap applicants
  if (gap === 'high') cyprusScore += 20;
  else if (gap === 'medium') cyprusScore += 15;
  else if (gap === 'low') cyprusScore += 8;
  results.push({
    country: 'Cyprus (EU)',
    flag: '🇨🇾',
    match: Math.min(cyprusScore, 98),
    reason: 'Zero IELTS required & study gaps up to 8 years accepted. Direct CRMD Entry Permit with NO visa interview in India.',
    color: 'from-amber-500 to-orange-600',
  });

  // Romania (EU) — zero IELTS preparatory year, gap tolerant
  let romaniaScore = 20;
  if (['hsc', 'bachelor'].includes(answers.education)) romaniaScore += 25;
  if (['low', 'medium'].includes(answers.budget)) romaniaScore += 20;
  if (['affordable', 'pr'].includes(answers.preference)) romaniaScore += 15;
  if (['none', 'basic'].includes(answers.language)) romaniaScore += 20;
  // Gap scoring: Romania Preparatory Year (Anul Pregătitor) designed for gap students
  if (gap === 'high') romaniaScore += 18;
  else if (gap === 'medium') romaniaScore += 15;
  else if (gap === 'low') romaniaScore += 8;
  results.push({
    country: 'Romania (EU)',
    flag: '🇷🇴',
    match: Math.min(romaniaScore, 96),
    reason: 'Official 1-Year Preparatory Language Year (Anul Pregătitor) with zero IELTS requirement and low statutory tuition (€2,200/yr).',
    color: 'from-blue-600 to-indigo-700',
  });

  // Malaysia
  let malaysiaScore = 0;
  if (['hsc', 'bachelor'].includes(answers.education)) malaysiaScore += 25;
  if (['low', 'medium'].includes(answers.budget)) malaysiaScore += 35;
  if (answers.preference === 'affordable') malaysiaScore += 25;
  if (['none', 'basic', 'good'].includes(answers.language)) malaysiaScore += 15;
  if (['none', 'low'].includes(gap)) malaysiaScore += 10; // Malaysia prefers low gap
  results.push({
    country: 'Malaysia',
    flag: '🇲🇾',
    match: Math.min(malaysiaScore, 92),
    reason: 'Very affordable costs ($2,500–$4,500/yr), 95%+ visa ratio via EMGS, and fast eVAL issuance in Dhaka.',
    color: 'from-emerald-500 to-teal-600',
  });

  // South Korea (IEQAS)
  let koreaScore = 20;
  if (['hsc', 'bachelor', 'master'].includes(answers.education)) koreaScore += 25;
  if (['low', 'medium', 'scholarship'].includes(answers.budget)) koreaScore += 25;
  if (['scholarship', 'work', 'affordable'].includes(answers.preference)) koreaScore += 25;
  if (['none', 'basic', 'good'].includes(answers.language)) koreaScore += 15;
  if (['none', 'low'].includes(gap)) koreaScore += 10; // Korea generally prefers lower gap
  results.push({
    country: 'South Korea (IEQAS)',
    flag: '🇰🇷',
    match: Math.min(koreaScore, 97),
    reason: 'Official IEQAS Accredited Universities with automated VIC, 30%–100% tuition scholarships, and legal 25–30 hrs/week part-time work rights.',
    color: 'from-blue-600 to-indigo-800',
  });

  // Hungary (Schengen)
  let hungaryScore = 0;
  if (['hsc', 'bachelor', 'master'].includes(answers.education)) hungaryScore += 25;
  if (['medium', 'high'].includes(answers.budget)) hungaryScore += 25;
  if (['affordable', 'pr'].includes(answers.preference)) hungaryScore += 20;
  if (['basic', 'good'].includes(answers.language)) hungaryScore += 20;
  if (['none', 'low'].includes(gap)) hungaryScore += 10;
  results.push({
    country: 'Hungary (Schengen)',
    flag: '🇭🇺',
    match: Math.min(hungaryScore, 89),
    reason: 'Full 29-Nation Schengen visa. Direct biometric submission at VFS Global Dhaka (Gulshan) with zero Indian transit.',
    color: 'from-violet-500 to-purple-700',
  });

  // Canada
  let canadaScore = 0;
  if (['bachelor', 'master'].includes(answers.education)) canadaScore += 30;
  if (['high', 'scholarship'].includes(answers.budget)) canadaScore += 30;
  if (['pr', 'work'].includes(answers.preference)) canadaScore += 25;
  if (['good', 'excellent'].includes(answers.language)) canadaScore += 15;
  results.push({
    country: 'Canada',
    flag: '🇨🇦',
    match: Math.min(canadaScore, 87),
    reason: 'Post-Graduation Work Permit (PGWP) pathways and permanent residency opportunities for eligible graduates.',
    color: 'from-red-500 to-rose-600',
  });

  return results.sort((a, b) => b.match - a.match);
}

/** Build a zero-drop WhatsApp URL containing every student answer. */
function buildWhatsAppUrl(answers: Record<string, string>, topCountry: string): string {
  const lines = [
    `*Student Eligibility Result — Keystone Overseas*`,
    `🏆 *Best Match:* ${topCountry}`,
    `🎓 *Education:* ${EDUCATION_LABEL[answers.education] ?? answers.education}`,
    `⏳ *Study Gap:* ${GAP_LABEL[answers.gap] ?? answers.gap ?? 'Not specified'}`,
    `💰 *Budget:* ${BUDGET_LABEL[answers.budget] ?? answers.budget}`,
    `🎯 *Priority:* ${PREFERENCE_LABEL[answers.preference] ?? answers.preference}`,
    `📊 *English Level:* ${LANGUAGE_LABEL[answers.language] ?? answers.language}`,
    ``,
    `Please guide me on my best study abroad options.`,
  ];
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join('\n'))}`;
}

const EligibilityChecker = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);

  const handleSelect = (value: string) => {
    const newAnswers = { ...answers, [steps[currentStep].id]: value };
    setAnswers(newAnswers);

    setTimeout(() => {
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        setShowResults(true);
      }
    }, 300);
  };

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const handleReset = () => {
    setCurrentStep(0);
    setAnswers({});
    setShowResults(false);
  };

  const results = showResults ? getResults(answers) : [];
  const whatsappUrl = showResults && results.length > 0
    ? buildWhatsAppUrl(answers, `${results[0].flag} ${results[0].country}`)
    : '';

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-brand-blue to-brand-blue-light p-6 text-white">
        <h3 className="text-xl font-bold mb-1">🎯 Student Eligibility Checker</h3>
        <p className="text-blue-200 text-sm">Answer {steps.length} quick questions to find your best destination</p>
        {!showResults && (
          <div className="mt-4 flex gap-2">
            {steps.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${
                  i <= currentStep ? 'bg-white' : 'bg-white/30'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      <div className="p-6">
        <AnimatePresence mode="wait">
          {!showResults ? (
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.25 }}
            >
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
                Step {currentStep + 1} of {steps.length}
              </p>
              <h4 className="text-lg font-bold text-slate-900 mb-5">{steps[currentStep].question}</h4>

              <div className="grid grid-cols-2 gap-3">
                {steps[currentStep].options.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => handleSelect(opt.value)}
                    className={`flex flex-col items-center justify-center gap-2 p-4 rounded-2xl border-2 text-center transition-all hover:border-brand-blue hover:bg-blue-50 hover:shadow-md active:scale-95 ${
                      answers[steps[currentStep].id] === opt.value
                        ? 'border-brand-blue bg-blue-50'
                        : 'border-slate-200'
                    }`}
                  >
                    <span className="text-2xl">{opt.icon}</span>
                    <span className="text-sm font-semibold text-slate-700">{opt.label}</span>
                  </button>
                ))}
              </div>

              {currentStep > 0 && (
                <button
                  onClick={handleBack}
                  className="mt-4 flex items-center gap-1 text-sm text-slate-400 hover:text-slate-600 transition-colors"
                >
                  <ArrowLeft size={14} /> Back
                </button>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h4 className="text-lg font-bold text-slate-900">Your Best Matches</h4>
                  <p className="text-sm text-slate-500">Based on your profile</p>
                </div>
                <button
                  onClick={handleReset}
                  className="flex items-center gap-1 text-xs text-slate-400 hover:text-brand-blue transition-colors"
                >
                  <RefreshCw size={12} /> Retake
                </button>
              </div>

              <div className="space-y-3">
                {results.map((r, i) => (
                  <motion.div
                    key={r.country}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className={`rounded-2xl p-4 ${i === 0 ? 'ring-2 ring-brand-blue' : ''}`}
                    style={{ background: i === 0 ? '#f0f4ff' : '#f8fafc' }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{r.flag}</span>
                        <span className="font-bold text-slate-900 text-sm">{r.country}</span>
                        {i === 0 && (
                          <span className="bg-brand-blue text-white text-xs px-2 py-0.5 rounded-full font-bold">
                            Best Match
                          </span>
                        )}
                      </div>
                      <span className="font-extrabold text-brand-blue">{r.match}%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-1.5 mb-2">
                      <motion.div
                        className={`h-1.5 rounded-full bg-gradient-to-r ${r.color}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${r.match}%` }}
                        transition={{ delay: i * 0.1 + 0.2, duration: 0.6 }}
                      />
                    </div>
                    {i === 0 && (
                      <p className="text-xs text-slate-500 mt-1">{r.reason}</p>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Zero-Drop WhatsApp CTA — all answers packaged in query string */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 flex items-center justify-center gap-2 w-full bg-brand-blue hover:bg-brand-red text-white py-3 rounded-2xl font-bold text-sm transition-all"
              >
                Talk to a Counselor <ArrowRight size={16} />
              </a>

              {/* Summary of captured answers */}
              <div className="mt-4 bg-slate-50 rounded-xl p-3 text-xs text-slate-500 space-y-1">
                <p className="font-semibold text-slate-700 mb-1">📋 Your Profile Summary</p>
                <p>🎓 Education: {EDUCATION_LABEL[answers.education] ?? '—'}</p>
                <p>⏳ Study Gap: {GAP_LABEL[answers.gap] ?? '—'}</p>
                <p>💰 Budget: {BUDGET_LABEL[answers.budget] ?? '—'}</p>
                <p>🎯 Priority: {PREFERENCE_LABEL[answers.preference] ?? '—'}</p>
                <p>📊 English: {LANGUAGE_LABEL[answers.language] ?? '—'}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default EligibilityChecker;

