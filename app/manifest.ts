import type { MetadataRoute } from 'next';
import { seo, site } from '@/lib/data';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: seo.shortTitle,
    short_name: site.name,
    description: seo.description,
    start_url: '/',
    display: 'standalone',
    background_color: '#030303',
    theme_color: '#030303',
    icons: [
      { src: '/icon.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
      { src: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  };
}
