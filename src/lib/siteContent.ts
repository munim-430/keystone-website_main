import { useEffect, useState } from 'react';

export type SiteContentRow<T = Record<string, unknown>> = {
  content_key: string;
  locale: string;
  content_type: string;
  route: string | null;
  title: string | null;
  data: T;
  seo: Record<string, unknown>;
  sort_order: number;
  updated_at: string;
};

const cache = new Map<string, SiteContentRow | null>();

export async function fetchSiteContent<T = Record<string, unknown>>(
  key: string,
  locale = 'en',
): Promise<SiteContentRow<T> | null> {
  const cacheKey = `${locale}:${key}`;
  if (cache.has(cacheKey)) return cache.get(cacheKey) as SiteContentRow<T> | null;

  try {
    const response = await fetch(`/api/content?key=${encodeURIComponent(key)}&locale=${encodeURIComponent(locale)}`);
    if (!response.ok) return null;
    const row = (await response.json()) as SiteContentRow<T> | null;
    cache.set(cacheKey, row as SiteContentRow | null);
    return row;
  } catch {
    return null;
  }
}

export function useSiteContent<T extends Record<string, unknown>>(
  key: string,
  fallback: T,
  locale = 'en',
) {
  const [data, setData] = useState<T>(fallback);
  const [source, setSource] = useState<'fallback' | 'supabase'>('fallback');

  useEffect(() => {
    let active = true;
    fetchSiteContent<T>(key, locale).then((row) => {
      if (!active || !row?.data) return;
      setData({ ...fallback, ...row.data });
      setSource('supabase');
    });
    return () => {
      active = false;
    };
  }, [key, locale]);

  return { data, source };
}
