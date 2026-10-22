import type { MetadataRoute } from 'next';
import { site } from '@/lib/data';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: site.url, lastModified: now, changeFrequency: 'monthly', priority: 1, images: [`${site.url}/images/maruf.jpg`] },
    { url: `${site.url}/llms.txt`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${site.url}/llms-full.txt`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${site.url}${site.cv}`, lastModified: now, changeFrequency: 'yearly', priority: 0.6 },
  ];
}
