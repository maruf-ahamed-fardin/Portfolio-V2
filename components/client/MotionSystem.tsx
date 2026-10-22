'use client';

import { useEffect, useRef, useState } from 'react';
import type Lenis from 'lenis';
import { motionConfig, narrative } from '@/lib/narrative';

declare global {
  interface Window {
    __lenis?: Lenis | null;
    __st?: { update: () => void };
  }
}

const readStored = () => {
  try {
    return sessionStorage.getItem('motion');
  } catch {
    return null;
  }
};

/**
 * Global motion layer, ported from the reference:
 * hero line reveal, description blur-in, [data-reveal] slide-ups, hero parallax, scroll progress,
 * Lenis smooth wheel (fine pointers only) and the MOTION ON/OFF toggle.
 */
export default function MotionSystem() {
  const bar = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState<boolean | null>(null);

  // initial preference (the inline head script already set data-motion to avoid a flash)
  useEffect(() => {
    const reduce = matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setOn(!reduce.matches && readStored() !== 'off');
    sync();
    reduce.addEventListener('change', sync);
    return () => reduce.removeEventListener('change', sync);
  }, []);

  // GSAP timelines
  useEffect(() => {
    if (on === null) return;
    document.documentElement.dataset.motion = on ? 'on' : 'off';
    window.dispatchEvent(new CustomEvent('motionchange', { detail: on }));
    narrative.hero = 0;
    let cancelled = false;
    let ctx: { revert: () => void } | null = null;

    // GSAP is loaded after first paint so it never delays the hero
    (async () => {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([import('gsap'), import('gsap/ScrollTrigger')]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);
      window.__st = ScrollTrigger;
      ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        onUpdate: (s) => {
          narrative.hero = s.progress;
        },
      });
      ScrollTrigger.create({
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: (s) => {
          narrative.progress = s.progress;
          if (bar.current) bar.current.style.transform = `scaleX(${s.progress})`;
        },
      });
      if (!on) return;

      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) =>
        gsap.fromTo(
          el,
          { y: 35 },
          {
            y: 0,
            opacity: 1,
            duration: motionConfig.revealDuration,
            ease: motionConfig.ease,
            scrollTrigger: { trigger: el, start: 'top 92%', once: true },
            clearProps: 'transform,opacity',
          }
        )
      );
      gsap.to('.hero-content', {
        y: -65,
        opacity: 0.35,
        ease: 'none',
        scrollTrigger: { trigger: '.hero', start: '25% top', end: 'bottom top', scrub: 1 },
      });
      });
      document.documentElement.classList.add('motion-ready');
    })();

    const onPointer = (e: PointerEvent) => {
      narrative.pointerX = e.clientX / innerWidth - 0.5;
      narrative.pointerY = e.clientY / innerHeight - 0.5;
    };
    addEventListener('pointermove', onPointer, { passive: true });
    return () => {
      cancelled = true;
      ctx?.revert();
      removeEventListener('pointermove', onPointer);
    };
  }, [on]);

  // Lenis: smooth wheel for mouse/trackpad only, like the reference
  useEffect(() => {
    if (!on) return;
    const fine = matchMedia('(pointer: fine)');
    let lenis: Lenis | null = null;
    let cancelled = false;
    const start = async () => {
      lenis?.destroy();
      lenis = null;
      window.__lenis = null;
      if (!fine.matches) return;
      const { default: L } = await import('lenis');
      if (cancelled) return;
      lenis = new L({ autoRaf: true, lerp: 0.13, smoothWheel: true, syncTouch: false, anchors: false });
      lenis.on('scroll', () => window.__st?.update());
      window.__lenis = lenis;
    };
    start();
    fine.addEventListener('change', start);
    return () => {
      cancelled = true;
      fine.removeEventListener('change', start);
      lenis?.destroy();
      window.__lenis = null;
    };
  }, [on]);

  // in-page anchors glide through lenis
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute('href')!;
      const el = id === '#top' ? document.body : document.querySelector<HTMLElement>(id);
      if (!el) return;
      e.preventDefault();
      window.dispatchEvent(new Event('closemenu'));
      if (window.__lenis) window.__lenis.scrollTo(el, { offset: id === '#top' ? 0 : -20 });
      else el.scrollIntoView({ behavior: on ? 'smooth' : 'auto' });
      history.replaceState(null, '', id);
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, [on]);

  const toggle = () => {
    const next = !on;
    try {
      sessionStorage.setItem('motion', next ? 'on' : 'off');
    } catch {}
    setOn(next);
  };

  return (
    <>
      <div ref={bar} className="pointer-events-none fixed top-0 left-0 z-70 h-0.5 w-full origin-left scale-x-0 bg-ember" aria-hidden="true" />
      <button
        onClick={toggle}
        aria-pressed={!!on}
        aria-label={on ? 'Motion on — disable animations' : 'Motion off — enable animations'}
        className="fixed right-3 bottom-4 z-55 inline-flex items-center gap-[9px] border border-white/15 bg-[#141312]/90 font-mono text-[8px] tracking-[1px] text-[#d2c6ba] backdrop-blur-md transition-colors hover:border-ember/60 max-md:size-9 max-md:justify-center max-md:rounded-full md:right-[22px] md:bottom-5 md:h-9 md:rounded-[4px] md:px-3.5"
      >
        <i className="inline-flex h-2 items-end gap-0.5" aria-hidden="true">
          {[0, 0.2, 0.4].map((d) => (
            <b key={d} className="h-full w-px animate-eq bg-current" style={{ animationDelay: `${d}s` }} />
          ))}
        </i>
        <span className="max-md:hidden">MOTION {on === false ? 'OFF' : 'ON'}</span>
      </button>
    </>
  );
}
