'use client';

import { useEffect, useRef } from 'react';
import { motionEnabled } from '@/lib/narrative';

/**
 * Stage banner motion (no entrance animation — content is static on arrival):
 *  - pointer: a soft colour/warm spotlight follows the cursor over the portrait
 *  - scroll: gentle parallax on the portrait layer
 */
export default function StageReveal({ children, className }: { children: React.ReactNode; className?: string }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current!;
    const media = el.querySelector<HTMLElement>('[data-stage-media]');
    if (!motionEnabled()) return;
    let ctx: { revert: () => void } | null = null;
    let cancelled = false;
    (async () => {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([import('gsap'), import('gsap/ScrollTrigger')]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {
        // scroll parallax: the oversized layer drifts through the frame and eases out of its zoom
        gsap.fromTo(
          media,
          { yPercent: -20 },
          { yPercent: 20, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: 1.2 } }
        );
        const img = media?.querySelectorAll('img');
        if (img?.length)
          gsap.fromTo(img, { scale: 1.12 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: 1.2 } });
      }, el);
    })();

    // spotlight: CSS variables drive a radial mask on the colour layer
    let raf = 0;
    const target = { x: 0.7, y: 0.4, o: 0 };
    const cur = { ...target };
    const tick = () => {
      cur.x += (target.x - cur.x) * 0.12;
      cur.y += (target.y - cur.y) * 0.12;
      cur.o += (target.o - cur.o) * 0.1;
      el.style.setProperty('--sx', `${(cur.x * 100).toFixed(2)}%`);
      el.style.setProperty('--sy', `${(cur.y * 100).toFixed(2)}%`);
      el.style.setProperty('--so', cur.o.toFixed(3));
      const settled = Math.abs(target.x - cur.x) + Math.abs(target.y - cur.y) + Math.abs(target.o - cur.o) < 0.002;
      raf = settled ? 0 : requestAnimationFrame(tick);
    };
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType === 'touch' || !motionEnabled()) return;
      const r = el.getBoundingClientRect();
      target.x = (e.clientX - r.left) / r.width;
      target.y = (e.clientY - r.top) / r.height;
      target.o = 1;
      kick();
    };
    const onLeave = () => {
      target.o = 0;
      kick();
    };
    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerleave', onLeave);
    return () => {
      cancelled = true;
      ctx?.revert();
      cancelAnimationFrame(raf);
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return (
    <div ref={root} className={className}>
      {children}
    </div>
  );
}
