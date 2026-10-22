const SUPABASE_URL = Deno.env.get('SUPABASE_URL') ?? '';
const SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';

const ALLOWED_ORIGINS = new Set([
  'https://keystoneoverseasbd.com',
  'https://www.keystoneoverseasbd.com',
  'http://localhost:3000',
  'http://localhost:5173',
]);

function cors(origin: string | null) {
  const allowed = origin && ALLOWED_ORIGINS.has(origin) ? origin : 'https://www.keystoneoverseasbd.com';
  return {
    'Access-Control-Allow-Origin': allowed,
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Vary': 'Origin',
  };
}

function json(body: unknown, status: number, origin: string | null) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...cors(origin), 'Content-Type': 'application/json; charset=utf-8' },
  });
}

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
  const v = value.trim();
  return v ? v.slice(0, max) : null;
}

async function rest(path: string, init: RequestInit) {
  const response = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    ...init,
    headers: {
      apikey: SERVICE_ROLE_KEY,
      Authorization: `Bearer ${SERVICE_ROLE_KEY}`,
      'Content-Type': 'application/json',
      ...(init.headers ?? {}),
    },
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Supabase REST ${response.status}: ${text.slice(0, 500)}`);
  }

  const text = await response.text();
  return text ? JSON.parse(text) : null;
}

Deno.serve(async (req) => {
  const origin = req.headers.get('origin');
  if (req.method === 'OPTIONS') return new Response('ok', { headers: cors(origin) });
  if (req.method !== 'POST') return json({ error: 'Method not allowed' }, 405, origin);
  if (origin && !ALLOWED_ORIGINS.has(origin)) return json({ error: 'Origin not allowed' }, 403, origin);
  if (!SUPABASE_URL || !SERVICE_ROLE_KEY) return json({ error: 'Backend not configured' }, 503, origin);

  try {
    const body = await req.json();

    // Honeypot for simple bot submissions.
    if (body?._company) return json({ ok: true }, 200, origin);

    const kind = stringValue(body?.kind, 40) ?? 'general';
    const name = stringValue(body?.name, 120);
    const phoneNormalized = normalizePhone(body?.phone);
    const email = normalizeEmail(body?.email);
    const sessionId = stringValue(body?.session_id, 120);
    const sourcePath = stringValue(body?.source_path, 300) ?? '/';
    const source = stringValue(body?.source, 80) ?? 'website';
    const leadType = stringValue(body?.lead_type, 40) ?? (kind === 'visa_score' ? 'visa_score' : 'general');
    const consent = body?.consent === true;
    const metadata = typeof body?.metadata === 'object' && body.metadata ? body.metadata : {};

    const eventOnly = kind === 'event' || kind === 'brochure_event';
    let leadId: string | null = null;

    if (!eventOnly) {
      if (!phoneNormalized && !email) return json({ error: 'A valid phone or email is required.' }, 400, origin);
      if (kind === 'visa_score' && !consent) return json({ error: 'Consent is required for Visa Score follow-up.' }, 400, origin);

      const dedupeKey = phoneNormalized ? `phone:${phoneNormalized}` : `email:${email}`;
      const leadPayload = {
        dedupe_key: dedupeKey,
        name,
        phone: stringValue(body?.phone, 50),
        phone_normalized: phoneNormalized,
        email,
        lead_type: leadType,
        source,
        source_path: sourcePath,
        country_interest: stringValue(body?.country_interest, 120),
        language: stringValue(body?.language, 10) ?? 'en',
        consent,
        consent_at: consent ? new Date().toISOString() : null,
        metadata,
        last_seen_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      const rows = await rest('leads?on_conflict=dedupe_key', {
        method: 'POST',
        headers: { Prefer: 'resolution=merge-duplicates,return=representation' },
        body: JSON.stringify(leadPayload),
      });
      leadId = rows?.[0]?.id ?? null;

      if (!leadId) throw new Error('Lead insert returned no id.');

      if (kind === 'visa_score') {
        const score = Number(body?.score);
        if (!Number.isFinite(score) || score < 0 || score > 100) return json({ error: 'Invalid score.' }, 400, origin);
        await rest('visa_score_profiles', {
          method: 'POST',
          headers: { Prefer: 'return=minimal' },
          body: JSON.stringify({
            lead_id: leadId,
            study_gap: stringValue(body?.study_gap, 40) ?? 'unknown',
            english_status: stringValue(body?.english_status, 40) ?? 'unknown',
            budget_band: stringValue(body?.budget_band, 40) ?? 'unknown',
            score: Math.round(score),
            score_band: stringValue(body?.score_band, 80) ?? 'Unclassified',
          }),
        });
      }

      if (kind === 'contact') {
        await rest('contact_inquiries', {
          method: 'POST',
          headers: { Prefer: 'return=minimal' },
          body: JSON.stringify({
            lead_id: leadId,
            inquiry_type: stringValue(body?.inquiry_type, 40) ?? 'general',
            preferred_destination: stringValue(body?.preferred_destination, 120),
            message: stringValue(body?.message, 3000),
          }),
        });
      }
    }

    const eventName = stringValue(body?.event_name, 80) ?? `${kind}_submitted`;
    await rest('lead_events', {
      method: 'POST',
      headers: { Prefer: 'return=minimal' },
      body: JSON.stringify({
        lead_id: leadId,
        session_id: sessionId,
        event_name: eventName,
        path: sourcePath,
        metadata,
      }),
    });

    return json({ ok: true, lead_id: leadId }, 200, origin);
  } catch (error) {
    console.error(error);
    return json({ error: 'Unable to save lead right now.' }, 500, origin);
  }
});
