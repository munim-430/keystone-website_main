const ALLOWED_ORIGINS = new Set([
  'https://keystoneoverseasbd.com',
  'https://www.keystoneoverseasbd.com',
  'http://localhost:3000',
  'http://localhost:5173',
]);

function normalizePhone(value: unknown) {
  if (typeof value !== 'string') return null;
  const cleaned = value.replace(/[\s\-()]/g, '');
  const match = cleaned.match(/^(?:\+?880|0)?(1[3-9]\d{8})$/);
  return match ? `880${match[1]}` : null;
}

function normalizeEmail(value: unknown) {
  if (typeof value !== 'string') return null;
  const email = value.trim().toLowerCase();
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? email : null;
}

function stringValue(value: unknown, max = 500) {
  if (typeof value !== 'string') return null;
  const trimmed = value.trim();
  return trimmed ? trimmed.slice(0, max) : null;
}

async function supabaseRest(path: string, init: RequestInit) {
  const url = process.env.SUPABASE_URL;
  const secretKey = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !secretKey) throw new Error('Supabase server environment is not configured.');

  const response = await fetch(`${url}/rest/v1/${path}`, {
    ...init,
    headers: {
      apikey: secretKey,
      'Content-Type': 'application/json',
      ...(init.headers || {}),
    },
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Supabase REST ${response.status}: ${text.slice(0, 500)}`);
  }

  const text = await response.text();
  return text ? JSON.parse(text) : null;
}

export default async function handler(req: any, res: any) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Allow', 'POST, OPTIONS');
    return res.status(204).end();
  }
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const origin = req.headers?.origin as string | undefined;
  if (origin && !ALLOWED_ORIGINS.has(origin) && !origin.endsWith('.vercel.app')) {
    return res.status(403).json({ error: 'Origin not allowed' });
  }

  const secretKey = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!process.env.SUPABASE_URL || !secretKey) {
    return res.status(503).json({ error: 'Lead backend not configured yet' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
    if (body?._company) return res.status(200).json({ ok: true });

    const kind = stringValue(body.kind, 40) || 'general';
    const name = stringValue(body.name, 120);
    const phoneNormalized = normalizePhone(body.phone);
    const email = normalizeEmail(body.email);
    const sessionId = stringValue(body.session_id, 120);
    const sourcePath = stringValue(body.source_path, 300) || '/';
    const source = stringValue(body.source, 80) || 'website';
    const leadType = stringValue(body.lead_type, 40) || (kind === 'visa_score' ? 'visa_score' : 'general');
    const consent = body.consent === true;
    const metadata = body.metadata && typeof body.metadata === 'object' ? body.metadata : {};
    const eventOnly = kind === 'event' || kind === 'brochure_event';

    let leadId: string | null = null;

    if (!eventOnly) {
      if (!phoneNormalized && !email) return res.status(400).json({ error: 'A valid phone or email is required.' });
      if (kind === 'visa_score' && !consent) return res.status(400).json({ error: 'Consent is required.' });

      const dedupeKey = phoneNormalized ? `phone:${phoneNormalized}` : `email:${email}`;
      const rows = await supabaseRest('leads?on_conflict=dedupe_key', {
        method: 'POST',
        headers: { Prefer: 'resolution=merge-duplicates,return=representation' },
        body: JSON.stringify({
          dedupe_key: dedupeKey,
          name,
          phone: stringValue(body.phone, 50),
          phone_normalized: phoneNormalized,
          email,
          lead_type: leadType,
          source,
          source_path: sourcePath,
          country_interest: stringValue(body.country_interest, 120),
          language: stringValue(body.language, 10) || 'en',
          consent,
          consent_at: consent ? new Date().toISOString() : null,
          metadata,
          last_seen_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }),
      });

      leadId = rows?.[0]?.id || null;
      if (!leadId) throw new Error('Lead insert returned no id.');

      if (kind === 'visa_score') {
        const score = Number(body.score);
        if (!Number.isFinite(score) || score < 0 || score > 100) {
          return res.status(400).json({ error: 'Invalid score.' });
        }
        await supabaseRest('visa_score_profiles', {
          method: 'POST',
          headers: { Prefer: 'return=minimal' },
          body: JSON.stringify({
            lead_id: leadId,
            study_gap: stringValue(body.study_gap, 40) || 'unknown',
            english_status: stringValue(body.english_status, 40) || 'unknown',
            budget_band: stringValue(body.budget_band, 40) || 'unknown',
            score: Math.round(score),
            score_band: stringValue(body.score_band, 80) || 'Unclassified',
          }),
        });
      }

      if (kind === 'contact') {
        await supabaseRest('contact_inquiries', {
          method: 'POST',
          headers: { Prefer: 'return=minimal' },
          body: JSON.stringify({
            lead_id: leadId,
            inquiry_type: stringValue(body.inquiry_type, 40) || 'general',
            preferred_destination: stringValue(body.preferred_destination, 120),
            message: stringValue(body.message, 3000),
          }),
        });
      }
    }

    await supabaseRest('lead_events', {
      method: 'POST',
      headers: { Prefer: 'return=minimal' },
      body: JSON.stringify({
        lead_id: leadId,
        session_id: sessionId,
        event_name: stringValue(body.event_name, 80) || `${kind}_submitted`,
        path: sourcePath,
        metadata,
      }),
    });

    return res.status(200).json({ ok: true, lead_id: leadId });
  } catch (error) {
    console.error('lead-api', error);
    return res.status(500).json({ error: 'Unable to save lead right now.' });
  }
}
