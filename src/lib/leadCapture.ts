export type LeadPayload = {
  kind: 'visa_score' | 'contact' | 'event' | 'brochure_event';
  name?: string;
  phone?: string;
  email?: string;
  lead_type?: 'student' | 'manpower' | 'visa_score' | 'general' | 'partnership';
  source?: string;
  source_path?: string;
  country_interest?: string;
  language?: string;
  consent?: boolean;
  inquiry_type?: string;
  preferred_destination?: string;
  message?: string;
  study_gap?: string;
  english_status?: string;
  budget_band?: string;
  score?: number;
  score_band?: string;
  event_name?: string;
  session_id?: string;
  metadata?: Record<string, unknown>;
  _company?: string;
};

export const SUPABASE_PROJECT_URL = import.meta.env.VITE_SUPABASE_URL || '';

// Public browsers submit to the same-origin Vercel function. The Supabase service key stays server-side.
export const LEAD_API_URL = import.meta.env.VITE_LEAD_API_URL || '/api/lead';

export const SUPABASE_PUBLISHABLE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || '';

export const COMPANY_PROFILE_URL =
  import.meta.env.VITE_COMPANY_PROFILE_URL || '/about#company-profile';

export function getLeadSessionId() {
  const key = 'keystone_lead_session';
  try {
    const existing = sessionStorage.getItem(key);
    if (existing) return existing;
    const created = crypto.randomUUID();
    sessionStorage.setItem(key, created);
    return created;
  } catch {
    return `web-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
  }
}

export function getAttribution() {
  if (typeof window === 'undefined') return {};
  const params = new URLSearchParams(window.location.search);
  return {
    utm_source: params.get('utm_source'),
    utm_medium: params.get('utm_medium'),
    utm_campaign: params.get('utm_campaign'),
    utm_content: params.get('utm_content'),
    utm_term: params.get('utm_term'),
    referrer: document.referrer || null,
  };
}

export async function captureLead(payload: LeadPayload) {
  const enriched: LeadPayload = {
    ...payload,
    source: payload.source || 'website',
    source_path: payload.source_path || window.location.pathname,
    session_id: payload.session_id || getLeadSessionId(),
    metadata: {
      ...getAttribution(),
      ...(payload.metadata || {}),
    },
  };

  try {
    const response = await fetch(LEAD_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(enriched),
    });

    if (!response.ok) return { ok: false as const, status: response.status };
    const data = await response.json().catch(() => ({}));
    return { ok: true as const, data };
  } catch {
    return { ok: false as const, status: 0 };
  }
}

export function trackLeadEvent(eventName: string, metadata: Record<string, unknown> = {}) {
  return captureLead({
    kind: 'event',
    event_name: eventName,
    metadata,
  });
}
