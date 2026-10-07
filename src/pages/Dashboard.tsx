import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, Users, Building2, Phone, CheckCircle, 
  AlertCircle, DollarSign, Calendar, Globe, Plus, 
  Trash2, FileText, ArrowUpRight, ShieldCheck, RefreshCw,
  Search, Filter
} from 'lucide-react';

interface Candidate {
  id: string;
  name: string;
  phone: string;
  type: 'Student' | 'Worker';
  corridor: string;
  status: 'Lead' | 'Called' | 'Office Visit' | 'Stage 1 Paid' | 'Approved' | 'Deployed';
  stage1Paid: boolean;
  notes: string;
  date: string;
}

interface Partner {
  id: string;
  name: string;
  country: string;
  type: 'European Staffing Agency' | 'University Partner' | 'Aggregator' | 'RL Consortia';
  contact: string;
  status: 'Active' | 'Outreach Sent' | 'Demand Received' | 'Contract Signed';
  quotaNotes: string;
}

const DEFAULT_CANDIDATES: Candidate[] = [
  { id: '1', name: 'Tanvir Ahmed', phone: '01712-345678', type: 'Student', corridor: 'South Cyprus', status: 'Stage 1 Paid', stage1Paid: true, notes: 'HSC 2020 (4-yr gap), Zero IELTS. Target: American College Nicosia.', date: '2026-10-06' },
  { id: '2', name: 'Md Sohel Rana', phone: '01823-456789', type: 'Worker', corridor: 'Croatia', status: 'Stage 1 Paid', stage1Paid: true, notes: 'BTEB Diploma (Electrical), 10-yr e-Passport ready. VFS Banani submission.', date: '2026-10-07' },
  { id: '3', name: 'Hasan Mahmud', phone: '01911-223344', type: 'Student', corridor: 'Hungary', status: 'Office Visit', stage1Paid: false, notes: 'GPA 4.8. Debrecen intake. Visiting Sobhanbag HQ Thursday.', date: '2026-10-07' },
  { id: '4', name: 'Rubel Hossain', phone: '01688-776655', type: 'Worker', corridor: 'Romania', status: 'Called', stage1Paid: false, notes: 'Warehouse logistics experience. Interested in 100k quota.', date: '2026-10-08' },
];

const DEFAULT_PARTNERS: Partner[] = [
  { id: '1', name: 'EWL Group Poland', country: 'Poland', type: 'European Staffing Agency', contact: 'warsaw@ewl.com.pl', status: 'Outreach Sent', quotaNotes: 'Automotive and warehouse assembly operators (KRAZ #11148)' },
  { id: '2', name: 'DEKRA Arbeit Croatia', country: 'Croatia', type: 'European Staffing Agency', contact: 'zagreb@dekra-arbeit.hr', status: 'Demand Received', quotaNotes: 'Logistics and hotel seasonal staff (VFS Dhaka submission)' },
  { id: '3', name: 'International Work Finder', country: 'Romania', type: 'European Staffing Agency', contact: 'bucharest@work-finder.ro', status: 'Active', quotaNotes: 'Construction and food processing lines' },
  { id: '4', name: 'ApplyBoard Europe Division', country: 'Global', type: 'Aggregator', contact: 'support@applyboard.com', status: 'Active', quotaNotes: 'Direct admission portal for Cyprus, Hungary & UK partners' },
  { id: '5', name: 'Kyungdong University (KDU)', country: 'South Korea', type: 'University Partner', contact: 'global@kdu.ac.kr', status: 'Active', quotaNotes: 'Direct D-2 / D-4 intake with 50% scholarships' },
];

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<'planning' | 'candidates' | 'partners'>('planning');
  const [candidates, setCandidates] = useState<Candidate[]>(() => {
    const saved = localStorage.getItem('keystone_candidates');
    return saved ? JSON.parse(saved) : DEFAULT_CANDIDATES;
  });
  const [partners, setPartners] = useState<Partner[]>(() => {
    const saved = localStorage.getItem('keystone_partners');
    return saved ? JSON.parse(saved) : DEFAULT_PARTNERS;
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'All' | 'Student' | 'Worker'>('All');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newCandidate, setNewCandidate] = useState<Partial<Candidate>>({
    name: '', phone: '', type: 'Student', corridor: 'South Cyprus', status: 'Lead', stage1Paid: false, notes: ''
  });

  useEffect(() => {
    localStorage.setItem('keystone_candidates', JSON.stringify(candidates));
  }, [candidates]);

  useEffect(() => {
    localStorage.setItem('keystone_partners', JSON.stringify(partners));
  }, [partners]);

  // Financial Calculations
  const monthlyBurn = 400000;
  const stage1FeePerFile = 20000;
  const stage1PaidFiles = candidates.filter(c => c.stage1Paid).length;
  const cashCollected = stage1PaidFiles * stage1FeePerFile;
  const burnCoveragePct = Math.min(100, Math.round((cashCollected / monthlyBurn) * 100));
  const remainingFilesToBreakeven = Math.max(0, 20 - stage1PaidFiles);
  const runwayDaysAdded = Math.round(stage1PaidFiles * 1.5);

  const toggleStage1Paid = (id: string) => {
    setCandidates(candidates.map(c => {
      if (c.id === id) {
        const nextPaid = !c.stage1Paid;
        return {
          ...c,
          stage1Paid: nextPaid,
          status: nextPaid ? 'Stage 1 Paid' : 'Office Visit'
        };
      }
      return c;
    }));
  };

  const handleAddCandidate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCandidate.name || !newCandidate.phone) return;
    const item: Candidate = {
      id: Date.now().toString(),
      name: newCandidate.name,
      phone: newCandidate.phone,
      type: newCandidate.type as 'Student' | 'Worker',
      corridor: newCandidate.corridor || 'South Cyprus',
      status: (newCandidate.stage1Paid ? 'Stage 1 Paid' : newCandidate.status || 'Lead') as any,
      stage1Paid: !!newCandidate.stage1Paid,
      notes: newCandidate.notes || '',
      date: new Date().toISOString().split('T')[0]
    };
    setCandidates([item, ...candidates]);
    setShowAddModal(false);
    setNewCandidate({ name: '', phone: '', type: 'Student', corridor: 'South Cyprus', status: 'Lead', stage1Paid: false, notes: '' });
  };

  const deleteCandidate = (id: string) => {
    setCandidates(candidates.filter(c => c.id !== id));
  };

  const filteredCandidates = candidates.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) || c.phone.includes(searchTerm) || c.corridor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'All' || c.type === filterType;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      {/* Top Header Banner */}
      <div className="max-w-7xl mx-auto mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 bg-red-500/20 text-red-400 border border-red-500/30 rounded-full text-xs font-bold uppercase tracking-wider">
              Executive Command Center
            </span>
            <span className="text-slate-400 text-xs">Sobhanbag, Dhanmondi HQ</span>
          </div>
          <h1 className="text-3xl font-black text-white mt-2 tracking-tight">Keystone Operational Cockpit</h1>
          <p className="text-slate-400 text-sm mt-1">Multi-Laptop Operations • Real-Time Financial Burn • Pipeline Automation</p>
        </div>

        {/* 3 Pillar Nav Tabs */}
        <div className="flex bg-slate-800/80 p-1.5 rounded-xl border border-slate-700/60 shadow-inner">
          <button
            onClick={() => setActiveTab('planning')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold transition-all ${
              activeTab === 'planning' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            1. Strategy & Burn
          </button>
          <button
            onClick={() => setActiveTab('candidates')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold transition-all ${
              activeTab === 'candidates' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Users className="w-4 h-4" />
            2. Candidates ({candidates.length})
          </button>
          <button
            onClick={() => setActiveTab('partners')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold transition-all ${
              activeTab === 'partners' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Building2 className="w-4 h-4" />
            3. Global Partners ({partners.length})
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* ========================================================= */}
        {/* PILLAR 1: STRATEGIC PLANNING & 4 LAKH BURN RECOVERY */}
        {/* ========================================================= */}
        {activeTab === 'planning' && (
          <div className="space-y-8">
            {/* Live Financial Metrics Banner */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-slate-800/60 border border-slate-700/70 p-6 rounded-2xl relative overflow-hidden">
                <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Monthly Burn</div>
                <div className="text-3xl font-black text-rose-400">4,00,000 <span className="text-sm font-medium text-slate-400">BDT</span></div>
                <div className="text-xs text-slate-400 mt-2">Dhanmondi HQ Rent, Utilities & Staff</div>
                <div className="absolute right-3 top-3 text-rose-500/10"><DollarSign className="w-16 h-16" /></div>
              </div>

              <div className="bg-slate-800/60 border border-slate-700/70 p-6 rounded-2xl relative overflow-hidden">
                <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Upfront Cash in Hand</div>
                <div className="text-3xl font-black text-emerald-400">{cashCollected.toLocaleString()} <span className="text-sm font-medium text-slate-400">BDT</span></div>
                <div className="text-xs text-emerald-400/80 mt-2">✓ {stage1PaidFiles} Files Paid @ 20,000 BDT</div>
                <div className="absolute right-3 top-3 text-emerald-500/10"><ShieldCheck className="w-16 h-16" /></div>
              </div>

              <div className="bg-slate-800/60 border border-slate-700/70 p-6 rounded-2xl relative overflow-hidden">
                <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Burn Neutralized</div>
                <div className="text-3xl font-black text-blue-400">{burnCoveragePct}%</div>
                <div className="text-xs text-blue-300 mt-2">{remainingFilesToBreakeven} files needed for 100% Breakeven</div>
                <div className="absolute right-3 top-3 text-blue-500/10"><TrendingUp className="w-16 h-16" /></div>
              </div>

              <div className="bg-slate-800/60 border border-slate-700/70 p-6 rounded-2xl relative overflow-hidden">
                <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Runway Added</div>
                <div className="text-3xl font-black text-amber-400">+{runwayDaysAdded} <span className="text-sm font-medium text-slate-400">Days</span></div>
                <div className="text-xs text-amber-300/80 mt-2">1.5 Days runway per 20k BDT file</div>
                <div className="absolute right-3 top-3 text-amber-500/10"><Calendar className="w-16 h-16" /></div>
              </div>
            </div>

            {/* The 20-File Breakeven Progress Bar */}
            <div className="bg-slate-800/80 border border-slate-700 p-6 rounded-2xl shadow-xl">
              <div className="flex justify-between items-center mb-3">
                <span className="font-bold text-white text-base">The 20-File Breakeven Ladder (October 2026)</span>
                <span className="text-sm font-bold text-blue-400">{stage1PaidFiles} / 20 Files Closed ({burnCoveragePct}%)</span>
              </div>
              <div className="w-full bg-slate-950 h-5 rounded-full overflow-hidden p-1 border border-slate-700">
                <div 
                  className="bg-gradient-to-r from-blue-600 via-indigo-500 to-emerald-400 h-full rounded-full transition-all duration-500" 
                  style={{ width: `${Math.min(100, (stage1PaidFiles / 20) * 100)}%` }} 
                />
              </div>
              <div className="flex justify-between text-xs text-slate-400 mt-3 font-mono">
                <span>0 Files (0 BDT)</span>
                <span>5 Files (1 Lakh)</span>
                <span>10 Files (2 Lakh)</span>
                <span>15 Files (3 Lakh)</span>
                <span className="text-emerald-400 font-bold">20 Files = Breakeven (4 Lakhs)</span>
              </div>
            </div>

            {/* 3 High-Converting Hero Corridors Strategy Matrix */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-slate-800/50 border border-slate-700/80 p-6 rounded-2xl">
                <div className="flex items-center justify-between mb-4">
                  <span className="px-2.5 py-1 bg-emerald-500/20 text-emerald-400 rounded-md text-xs font-bold">#1 Instant Cashflow</span>
                  <span className="text-xs text-slate-400">Students</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">🇨🇾 South Cyprus</h3>
                <p className="text-sm text-slate-300 mb-4">80-85% visa rate. Tolerates 5-10 yr study gap. Zero IELTS. CRMD Blue Paper pre-approved in Nicosia.</p>
                <div className="text-xs bg-slate-900 p-3 rounded-lg border border-slate-700/60 text-slate-300 space-y-1">
                  <div>• <strong>Dhaka Direct Departure</strong> (Zero India travel)</div>
                  <div>• Tuition: €3,800 – €4,500 / year</div>
                  <div>• Commission: €800 – €1,200 per head</div>
                </div>
              </div>

              <div className="bg-slate-800/50 border border-slate-700/80 p-6 rounded-2xl">
                <div className="flex items-center justify-between mb-4">
                  <span className="px-2.5 py-1 bg-blue-500/20 text-blue-400 rounded-md text-xs font-bold">#1 European Labor</span>
                  <span className="text-xs text-slate-400">Workforce</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">🇭🇷 Croatia</h3>
                <p className="text-sm text-slate-300 mb-4">Severe construction & logistics shortage. Clean profiles enjoy 80-85% success.</p>
                <div className="text-xs bg-slate-900 p-3 rounded-lg border border-slate-700/60 text-slate-300 space-y-1">
                  <div>• <strong>VFS Banani in Dhaka</strong> (New Dec 2024 VAC!)</div>
                  <div>• MUP Stay & Work Permit approved</div>
                  <div>• BTEB Diploma holders convert instantly</div>
                </div>
              </div>

              <div className="bg-slate-800/50 border border-slate-700/80 p-6 rounded-2xl">
                <div className="flex items-center justify-between mb-4">
                  <span className="px-2.5 py-1 bg-purple-500/20 text-purple-400 rounded-md text-xs font-bold">Premier Schengen</span>
                  <span className="text-xs text-slate-400">Students</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">🇭🇺 Hungary</h3>
                <p className="text-sm text-slate-300 mb-4">Top European universities (Debrecen, IBS Budapest). Affordable €3.5k tuition.</p>
                <div className="text-xs bg-slate-900 p-3 rounded-lg border border-slate-700/60 text-slate-300 space-y-1">
                  <div>• <strong>VFS Gulshan (Nafi Tower)</strong> in Dhaka</div>
                  <div>• Direct submission without India travel</div>
                  <div>• Internal Skype test accepted</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* PILLAR 2: CANDIDATE & CUSTOMER MANAGEMENT CRM */}
        {/* ========================================================= */}
        {activeTab === 'candidates' && (
          <div className="space-y-6">
            {/* Action Bar */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-slate-800/70 p-4 rounded-xl border border-slate-700">
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <div className="relative flex-1 sm:w-64">
                  <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search name, phone, corridor..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-9 pr-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div className="flex bg-slate-900 p-1 rounded-lg border border-slate-700 text-xs font-bold">
                  {(['All', 'Student', 'Worker'] as const).map(t => (
                    <button
                      key={t}
                      onClick={() => setFilterType(t)}
                      className={`px-3 py-1.5 rounded-md transition-all ${filterType === t ? 'bg-blue-600 text-white' : 'text-slate-400'}`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setShowAddModal(true)}
                className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-2 rounded-lg text-sm transition-all shadow-lg shadow-emerald-900/30 w-full sm:w-auto justify-center"
              >
                <Plus className="w-4 h-4" />
                Add New Candidate
              </button>
            </div>

            {/* Candidates Table */}
            <div className="bg-slate-800/80 border border-slate-700 rounded-2xl overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-950/80 text-slate-400 text-xs uppercase font-semibold border-b border-slate-700">
                    <tr>
                      <th className="py-3 px-4">Candidate Profile</th>
                      <th className="py-3 px-4">Type & Corridor</th>
                      <th className="py-3 px-4">Pipeline Status</th>
                      <th className="py-3 px-4">Stage 1 Fee (20k BDT)</th>
                      <th className="py-3 px-4">Notes / Background</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700/60">
                    {filteredCandidates.map((c) => (
                      <tr key={c.id} className="hover:bg-slate-700/30 transition-colors">
                        <td className="py-3.5 px-4">
                          <div className="font-bold text-white">{c.name}</div>
                          <div className="text-xs text-slate-400 font-mono flex items-center gap-1 mt-0.5">
                            <Phone className="w-3 h-3" /> {c.phone}
                          </div>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className={`inline-block px-2 py-0.5 rounded text-xs font-semibold mr-2 ${
                            c.type === 'Student' ? 'bg-blue-500/20 text-blue-300' : 'bg-amber-500/20 text-amber-300'
                          }`}>
                            {c.type}
                          </span>
                          <span className="font-medium text-slate-200">{c.corridor}</span>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${
                            c.status === 'Stage 1 Paid' ? 'bg-emerald-500/20 text-emerald-300' :
                            c.status === 'Office Visit' ? 'bg-indigo-500/20 text-indigo-300' :
                            c.status === 'Approved' ? 'bg-purple-500/20 text-purple-300' :
                            'bg-slate-700 text-slate-300'
                          }`}>
                            {c.status}
                          </span>
                        </td>
                        <td className="py-3.5 px-4">
                          <button
                            onClick={() => toggleStage1Paid(c.id)}
                            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all border flex items-center gap-1.5 ${
                              c.stage1Paid 
                                ? 'bg-emerald-600/30 border-emerald-500 text-emerald-300 hover:bg-emerald-600/40' 
                                : 'bg-slate-800 border-slate-600 text-slate-400 hover:border-slate-400'
                            }`}
                          >
                            <CheckCircle className={`w-3.5 h-3.5 ${c.stage1Paid ? 'text-emerald-400' : 'text-slate-500'}`} />
                            {c.stage1Paid ? '✓ Paid (20,000 BDT)' : 'Mark Paid (20k)'}
                          </button>
                        </td>
                        <td className="py-3.5 px-4 text-xs text-slate-300 max-w-xs truncate">
                          {c.notes || '—'}
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <button
                            onClick={() => deleteCandidate(c.id)}
                            className="text-slate-500 hover:text-red-400 p-1.5 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* PILLAR 3: GLOBAL PARTNERS, RECRUITERS & UNIVERSITIES */}
        {/* ========================================================= */}
        {activeTab === 'partners' && (
          <div className="space-y-6">
            <div className="bg-slate-800/80 border border-slate-700 p-6 rounded-2xl shadow-xl">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <div>
                  <h3 className="text-xl font-bold text-white">European Manpower Aggregators & University Network</h3>
                  <p className="text-slate-400 text-sm mt-1">Official staffing representation agreements, university quotas & RL syndications.</p>
                </div>
                <div className="px-3 py-1.5 bg-blue-500/20 text-blue-300 border border-blue-500/30 rounded-lg text-xs font-semibold">
                  RL Partner License: Verified Active
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {partners.map(p => (
                  <div key={p.id} className="bg-slate-900/80 border border-slate-700/80 p-5 rounded-xl hover:border-slate-600 transition-all">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="text-base font-bold text-white">{p.name}</h4>
                        <div className="text-xs text-slate-400 flex items-center gap-1.5 mt-0.5">
                          <Globe className="w-3.5 h-3.5 text-blue-400" /> {p.country} • <span className="text-blue-400 font-semibold">{p.type}</span>
                        </div>
                      </div>
                      <span className={`px-2.5 py-1 rounded text-xs font-bold ${
                        p.status === 'Active' ? 'bg-emerald-500/20 text-emerald-400' :
                        p.status === 'Demand Received' ? 'bg-purple-500/20 text-purple-400' :
                        'bg-slate-800 text-slate-400'
                      }`}>
                        {p.status}
                      </span>
                    </div>
                    <div className="text-xs bg-slate-950 p-3 rounded-lg text-slate-300 mt-3 border border-slate-800">
                      <strong>Quota & Specialization:</strong> {p.quotaNotes}
                    </div>
                    <div className="mt-3 flex justify-between items-center text-xs text-slate-400">
                      <span>Contact: <code className="text-slate-300">{p.contact}</code></span>
                      <a 
                        href={`mailto:${p.contact}`} 
                        className="text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1"
                      >
                        Send Outreach <ArrowUpRight className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Add Candidate Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-800 border border-slate-700 rounded-2xl max-w-md w-full p-6 shadow-2xl">
            <h3 className="text-xl font-bold text-white mb-4">Add New Candidate Profile</h3>
            <form onSubmit={handleAddCandidate} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">Candidate Name</label>
                <input
                  type="text"
                  required
                  value={newCandidate.name}
                  onChange={e => setNewCandidate({ ...newCandidate, name: e.target.value })}
                  placeholder="e.g. Hasibul Hasan"
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">Phone Number (BD Mobile)</label>
                <input
                  type="text"
                  required
                  value={newCandidate.phone}
                  onChange={e => setNewCandidate({ ...newCandidate, phone: e.target.value })}
                  placeholder="e.g. 017XXXXXXXX"
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">Profile Type</label>
                  <select
                    value={newCandidate.type}
                    onChange={e => setNewCandidate({ ...newCandidate, type: e.target.value as any })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="Student">Student (Education)</option>
                    <option value="Worker">Worker (Manpower)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">Target Corridor</label>
                  <select
                    value={newCandidate.corridor}
                    onChange={e => setNewCandidate({ ...newCandidate, corridor: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="South Cyprus">South Cyprus</option>
                    <option value="Croatia">Croatia</option>
                    <option value="Hungary">Hungary</option>
                    <option value="South Korea">South Korea</option>
                    <option value="Romania">Romania</option>
                    <option value="Malaysia">Malaysia</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">Counseling Notes</label>
                <textarea
                  value={newCandidate.notes}
                  onChange={e => setNewCandidate({ ...newCandidate, notes: e.target.value })}
                  placeholder="e.g. 5-yr gap, BTEB diploma, e-passport ready..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500 h-20"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="stage1Check"
                  checked={newCandidate.stage1Paid}
                  onChange={e => setNewCandidate({ ...newCandidate, stage1Paid: e.target.checked })}
                  className="w-4 h-4 text-blue-600 rounded"
                />
                <label htmlFor="stage1Check" className="text-xs font-bold text-emerald-400">
                  Candidate Paid Stage 1 Intake Fee (20,000 BDT)
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-700">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-sm text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-5 py-2 rounded-lg text-sm"
                >
                  Save Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
