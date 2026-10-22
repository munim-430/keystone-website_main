function safe(value: unknown, max = 160) {
  if (typeof value !== 'string') return '';
  return value.trim().slice(0, max);
}

export default async function handler(req: any, res: any) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceKey) return res.status(503).json({ error: 'Content backend not configured yet' });

  const key = safe(req.query?.key, 180);
  const locale = safe(req.query?.locale, 10) || 'en';
  const type = safe(req.query?.type, 80);

  if (!key && !type) return res.status(400).json({ error: 'Provide key or type' });

  const filters = ['published=eq.true', `locale=eq.${encodeURIComponent(locale)}`];
  if (key) filters.push(`content_key=eq.${encodeURIComponent(key)}`);
  if (type) filters.push(`content_type=eq.${encodeURIComponent(type)}`);

  try {
    const response = await fetch(
      `${supabaseUrl}/rest/v1/site_content?select=content_key,locale,content_type,route,title,data,seo,sort_order,updated_at&${filters.join('&')}&order=sort_order.asc`,
      {
        headers: {
          apikey: serviceKey,
          Authorization: `Bearer ${serviceKey}`,
          Accept: 'application/json',
        },
      },
    );

    if (!response.ok) {
      const text = await response.text();
      console.error('content-api', response.status, text.slice(0, 500));
      return res.status(502).json({ error: 'Content service unavailable' });
    }

    const rows = await response.json();
    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=600');
    if (key) return res.status(200).json(rows?.[0] || null);
    return res.status(200).json(rows || []);
  } catch (error) {
    console.error('content-api', error);
    return res.status(500).json({ error: 'Unable to load content' });
  }
}
