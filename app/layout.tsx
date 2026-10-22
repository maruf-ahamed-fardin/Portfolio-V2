import type { Metadata, Viewport } from 'next';
import { Instrument_Serif, DM_Sans } from 'next/font/google';
import './globals.css';
import { seo, site } from '@/lib/data';

const serif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-instrument',
  display: 'swap',
});

const sans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-dm',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: seo.title, template: `%s — ${site.name}` },
  description: seo.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  keywords: [...seo.keywords],
  category: 'technology',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'profile',
    url: '/',
    siteName: site.name,
    locale: 'en_US',
    title: seo.shortTitle,
    description: seo.description,
    firstName: 'Maruf Ahamed',
    lastName: 'Fardin',
    username: 'maruf-ahamed-fardin',
  },
  twitter: {
    card: 'summary_large_image',
    title: seo.shortTitle,
    description: seo.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 },
  },
  formatDetection: { telephone: false },
  other: { 'llms-txt': '/llms.txt' },
};

export const viewport: Viewport = { themeColor: '#030303' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`dark ${serif.variable} ${sans.variable}`} suppressHydrationWarning>
      <head>
        {/* decide motion before first paint so the hero intro never flashes */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{var s=sessionStorage.getItem('motion'),r=matchMedia('(prefers-reduced-motion: reduce)').matches;document.documentElement.dataset.motion=s==='off'||r?'off':'on'}catch(e){}",
          }}
        />
        <link rel="alternate" type="text/plain" href="/llms.txt" title="LLM-readable profile" />
      </head>
      {/* browser extensions (e.g. ColorZilla) add attributes to <body> before React hydrates */}
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
