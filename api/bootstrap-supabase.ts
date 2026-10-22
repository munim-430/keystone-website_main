async function runSql(sql: string) {
  const base = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!base || !key) throw new Error('Supabase server environment is not configured.');

  const response = await fetch(`${base}/pg/query`, {
    method: 'POST',
    headers: {
      apikey: key,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query: sql }),
  });

  const text = await response.text();
  if (!response.ok) throw new Error(`Supabase pg-meta ${response.status}: ${text.slice(0, 1200)}`);
  return text;
}

async function fetchMigration(path: string) {
  const url = `https://raw.githubusercontent.com/munim-430/keystone-website_main/main/${path}`;
  const response = await fetch(url, { headers: { 'User-Agent': 'keystone-bootstrap' } });
  if (!response.ok) throw new Error(`Unable to load ${path}: ${response.status}`);
  return response.text();
}

export default async function handler(req: any, res: any) {
  if (process.env.VERCEL_ENV !== 'preview') return res.status(404).json({ error: 'Not found' });
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const acquisition = await fetchMigration('supabase/migrations/20261023_acquisition_backend.sql');
    const cms = await fetchMigration('supabase/migrations/20261023_content_cms.sql');
    await runSql(acquisition);
    await runSql(cms);
    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error('bootstrap-supabase', error);
    return res.status(500).json({ ok: false, error: String(error).slice(0, 1500) });
  }
}
