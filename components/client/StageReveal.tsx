'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motionEnabled } from '@/lib/narrative';

/**
 * Stage banner motion:
 *  - on enter: portrait wipes open left→right while settling from a slight zoom,
 *    then the headline lines rise out of blur (same feel as the hero) and the CTA follows
 *  - pointer: a soft colour/warm spotlight follows the cursor over the portrait
 *  - scroll: gentle parallax on the portrait layer
 */
export default function StageReveal({ children, className }: { children: React.ReactNode; className?: string }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current!;
    const media = el.querySelector<HTMLElement>('[data-stage-media]');
    const lines = el.querySelectorAll<HTMLElement>('[data-stage-line]');
    const fade = el.querySelectorAll<HTMLElement>('[data-stage-fade]');
    if (!motionEnabled()) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: 'top 78%', once: true } });
      tl.fromTo(
        media,
        { clipPath: 'inset(0 100% 0 0)', scale: 1.18 },
        { clipPath: 'inset(0 0% 0 0)', scale: 1.08, duration: 1.4, ease: 'power4.inOut', clearProps: 'clipPath' }
      )
        .fromTo(
          lines,
          { yPercent: 105, filter: 'blur(5px)' },
          { yPercent: 0, filter: 'blur(0px)', duration: 1.1, stagger: 0.12, ease: 'power4.out', clearProps: 'transform,filter' },
          '-=0.75'
        )
        .fromTo(fade, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.08, ease: 'power3.out', clearProps: 'transform,opacity' }, '-=0.6');

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
      ctx.revert();
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
