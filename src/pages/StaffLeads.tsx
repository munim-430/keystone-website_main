import { FormEvent, useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { SUPABASE_PROJECT_URL, SUPABASE_PUBLISHABLE_KEY } from '../lib/leadCapture';

type Lead = {
  id: string;
  name: string | null;
  phone: string | null;
  email: string | null;
  lead_type: string;
  status: string;
  source: string;
  source_path: string | null;
  country_interest: string | null;
  created_at: string;
  updated_at: string;
};

const statuses = ['new', 'contacted', 'qualified', 'application', 'closed', 'spam'];

function authHeaders(token: string) {
  return {
    apikey: SUPABASE_PUBLISHABLE_KEY,
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
}

const StaffLeads = () => {
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  const [message, setMessage] = useState('');
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const hash = new URLSearchParams(window.location.hash.replace(/^#/, ''));
    const accessToken = hash.get('access_token');
    if (accessToken) {
      sessionStorage.setItem('keystone_staff_token', accessToken);
      setToken(accessToken);
      history.replaceState(null, '', window.location.pathname);
      return;
    }
    const saved = sessionStorage.getItem('keystone_staff_token');
    if (saved) setToken(saved);
  }, []);

  async function loadLeads(activeToken = token) {
    if (!activeToken || !SUPABASE_PUBLISHABLE_KEY) return;
    setLoading(true);
    setMessage('');
    try {
      const response = await fetch(
        `${SUPABASE_PROJECT_URL}/rest/v1/leads?select=id,name,phone,email,lead_type,status,source,source_path,country_interest,created_at,updated_at&order=created_at.desc&limit=100`,
        { headers: authHeaders(activeToken) },
      );
      if (response.status === 401) {
        sessionStorage.removeItem('keystone_staff_token');
        setToken('');
        setMessage('Your staff session expired. Request a new sign-in link.');
        return;
      }
      if (!response.ok) throw new Error(await response.text());
      setLeads(await response.json());
    } catch {
      setMessage('Unable to load leads. Confirm Supabase is active and this account is in staff_members.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (token) loadLeads(token);
  }, [token]);

  async function requestMagicLink(e: FormEvent) {
    e.preventDefault();
    setMessage('');
    if (!SUPABASE_PUBLISHABLE_KEY) {
      setMessage('Staff dashboard activation is pending the Supabase publishable key.');
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(`${SUPABASE_PROJECT_URL}/auth/v1/otp`, {
        method: 'POST',
        headers: {
          apikey: SUPABASE_PUBLISHABLE_KEY,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          create_user: false,
          options: { emailRedirectTo: `${window.location.origin}/staff/leads` },
        }),
      });
      if (!response.ok) throw new Error(await response.text());
      setMessage('Check your email for the staff sign-in link.');
    } catch {
      setMessage('Could not send the sign-in link. The account must already exist in Supabase Auth.');
    } finally {
      setLoading(false);
    }
  }

  async function updateStatus(id: string, status: string) {
    if (!token) return;
    const response = await fetch(`${SUPABASE_PROJECT_URL}/rest/v1/leads?id=eq.${id}`, {
      method: 'PATCH',
      headers: {
        ...authHeaders(token),
        Prefer: 'return=minimal',
      },
      body: JSON.stringify({ status }),
    });
    if (response.ok) {
      setLeads((current) => current.map((lead) => (lead.id === id ? { ...lead, status } : lead)));
    } else {
      setMessage('Status update failed. Check staff permissions.');
    }
  }

  const counts = useMemo(() => {
    const result: Record<string, number> = {};
    for (const status of statuses) result[status] = leads.filter((lead) => lead.status === status).length;
    return result;
  }, [leads]);

  if (!token) {
    return (
      <div className="min-h-screen bg-slate-50 pt-32 px-4 pb-24">
        <Helmet><title>Staff Leads — Keystone Overseas</title><meta name="robots" content="noindex,nofollow" /></Helmet>
        <div className="max-w-md mx-auto bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
          <div className="text-xs font-black uppercase tracking-widest text-brand-red mb-3">Internal only</div>
          <h1 className="text-3xl font-black text-slate-900 mb-3">Keystone Leads</h1>
          <p className="text-slate-600 mb-6">Sign in with an approved staff email. This page is intentionally not linked from public navigation.</p>
          <form onSubmit={requestMagicLink} className="space-y-4">
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="staff@keystoneoverseasbd.com" className="w-full border border-slate-300 rounded-xl px-4 py-3" />
            <button disabled={loading} className="w-full rounded-xl bg-brand-blue text-white font-bold py-3 disabled:opacity-50">{loading ? 'Sending…' : 'Email me a sign-in link'}</button>
          </form>
          {message && <p className="mt-4 text-sm text-slate-600">{message}</p>}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-28 px-4 pb-24">
      <Helmet><title>Staff Leads — Keystone Overseas</title><meta name="robots" content="noindex,nofollow" /></Helmet>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
          <div><div className="text-xs font-black uppercase tracking-widest text-brand-red">Internal CRM</div><h1 className="text-4xl font-black text-slate-900 mt-2">Website Leads</h1></div>
          <div className="flex gap-2">
            <button onClick={() => loadLeads()} className="px-4 py-2 rounded-xl border border-slate-300 bg-white font-bold">Refresh</button>
            <button onClick={() => { sessionStorage.removeItem('keystone_staff_token'); setToken(''); }} className="px-4 py-2 rounded-xl bg-slate-900 text-white font-bold">Sign out</button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-6 gap-3 mb-8">
          {statuses.map((status) => <div key={status} className="bg-white border border-slate-200 rounded-2xl p-4"><div className="text-xs uppercase font-bold text-slate-500">{status}</div><div className="text-3xl font-black text-slate-900 mt-1">{counts[status] || 0}</div></div>)}
        </div>

        {message && <div className="mb-4 bg-amber-50 border border-amber-200 text-amber-900 rounded-xl p-4">{message}</div>}
        <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-100 text-slate-600"><tr><th className="text-left p-4">Lead</th><th className="text-left p-4">Type</th><th className="text-left p-4">Source</th><th className="text-left p-4">Status</th><th className="text-left p-4">Created</th></tr></thead>
              <tbody>
                {loading && <tr><td colSpan={5} className="p-8 text-center text-slate-500">Loading leads…</td></tr>}
                {!loading && leads.length === 0 && <tr><td colSpan={5} className="p-8 text-center text-slate-500">No leads found.</td></tr>}
                {!loading && leads.map((lead) => (
                  <tr key={lead.id} className="border-t border-slate-100 align-top">
                    <td className="p-4"><div className="font-bold text-slate-900">{lead.name || 'Unnamed lead'}</div><div className="text-slate-500">{lead.phone || '—'}</div><div className="text-slate-500">{lead.email || '—'}</div>{lead.country_interest && <div className="text-xs text-brand-blue mt-1">{lead.country_interest}</div>}</td>
                    <td className="p-4 font-semibold">{lead.lead_type}</td>
                    <td className="p-4"><div>{lead.source}</div><div className="text-xs text-slate-400 max-w-xs truncate">{lead.source_path}</div></td>
                    <td className="p-4"><select value={lead.status} onChange={(e) => updateStatus(lead.id, e.target.value)} className="border border-slate-300 rounded-lg px-3 py-2 bg-white">{statuses.map((status) => <option key={status} value={status}>{status}</option>)}</select></td>
                    <td className="p-4 text-slate-500 whitespace-nowrap">{new Date(lead.created_at).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffLeads;
