import type { Metadata, Viewport } from 'next';
import { Instrument_Serif, DM_Sans } from 'next/font/google';
import './globals.css';
import { site } from '@/lib/data';

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
  title: 'Maruf Ahamed Fardin — Full Stack Developer',
  description:
    'Full Stack Developer at SeloraX building production features with React, Next.js, TypeScript and Prisma, plus LLM and RAG applications.',
  openGraph: {
    title: 'Maruf Ahamed Fardin — Full Stack Developer',
    description: 'I build full-stack products, ship AI features, and turn designs into fast, real software.',
    images: ['/images/maruf.jpg'],
  },
  icons: { icon: '/icon.svg' },
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
      </head>
      <body>{children}</body>
    </html>
  );
}
