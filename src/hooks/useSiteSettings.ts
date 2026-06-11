// src/hooks/useSiteSettings.ts — React hook to fetch and cache siteSettings

import { useState, useEffect } from 'react';
import { client } from '../lib/sanity';
import { SITE_SETTINGS_QUERY } from '../lib/seoQueries';
import type { SiteSettings } from '../types/seo';

// Module-level cache so we only fetch once per session
let settingsCache: SiteSettings | null = null;
let fetchPromise: Promise<SiteSettings | null> | null = null;

export function useSiteSettings() {
  const [settings, setSettings] = useState<SiteSettings | null>(settingsCache);
  const [loading, setLoading] = useState(!settingsCache);

  useEffect(() => {
    if (settingsCache) {
      setSettings(settingsCache);
      setLoading(false);
      return;
    }

    if (!fetchPromise) {
      fetchPromise = client.fetch<SiteSettings>(SITE_SETTINGS_QUERY).then((data) => {
        settingsCache = data;
        return data;
      });
    }

    fetchPromise.then((data) => {
      setSettings(data);
      setLoading(false);
    });
  }, []);

  return { settings, loading };
}
