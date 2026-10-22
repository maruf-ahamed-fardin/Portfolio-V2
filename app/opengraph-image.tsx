import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { ImageResponse } from 'next/og';
import { seo, site } from '@/lib/data';

export const alt = seo.shortTitle;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OpengraphImage() {
  const photo = await readFile(join(process.cwd(), 'public/images/maruf-signal-v2.jpg'));
  const src = `data:image/jpeg;base64,${photo.toString('base64')}`;
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', background: '#030303', color: '#f1eee8', position: 'relative' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt="" width={504} height={630} style={{ position: 'absolute', right: 30, top: 0, width: 504, height: 630, objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', background: 'linear-gradient(90deg, #030303 45%, rgba(3,3,3,0.2) 75%, rgba(3,3,3,0) 100%)' }} />
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 72px', width: 760, position: 'relative' }}>
          <div style={{ display: 'flex', alignItems: 'center', fontSize: 20, letterSpacing: 4, color: '#e5cbb0', textTransform: 'uppercase' }}>
            <div style={{ width: 10, height: 10, background: '#ff8c59', marginRight: 16 }} />
            Portfolio · Dhaka, Bangladesh
          </div>
          <div style={{ display: 'flex', fontSize: 92, lineHeight: 1, marginTop: 34, letterSpacing: -3, fontFamily: 'Georgia, serif' }}>Maruf Ahamed</div>
          <div style={{ display: 'flex', fontSize: 92, lineHeight: 1.05, letterSpacing: -3, fontStyle: 'italic', fontFamily: 'Georgia, serif' }}>Fardin</div>
          <div style={{ display: 'flex', fontSize: 30, marginTop: 34, color: '#dedad4' }}>{`${site.role} · React · Next.js · AI`}</div>
          <div style={{ display: 'flex', fontSize: 20, marginTop: 18, color: '#ff8c59' }}>maruf-ahamed-fardin.vercel.app</div>
        </div>
      </div>
    ),
    size
  );
}
