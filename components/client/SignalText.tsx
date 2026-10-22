'use client';

import { useEffect, useRef } from 'react';
import { motionEnabled } from '@/lib/narrative';

const GLYPHS = '01/·—';

/**
 * Text that "decodes" from signal glyphs (01/·—) over 550ms when it first scrolls into view
 * and whenever its link/button is hovered or focused (1s cooldown). Same behaviour as the reference.
 */
export default function SignalText({ children }: { children: string }) {
  const live = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = live.current;
    if (!el) return;
    const text = children;
    let raf = 0, start = 0, lastPaint = 0, lastRun = -Infinity;

    const reset = () => {
      cancelAnimationFrame(raf);
      el.textContent = text;
    };
    const step = (t: number) => {
      if (!motionEnabled() || document.hidden) return reset();
      if (!start) start = t;
      const p = Math.min((t - start) / 550, 1);
      if (t - lastPaint > 32) {
        el.textContent = [...text]
          .map((ch, i) => (ch === ' ' || i < text.length * p ? ch : GLYPHS[(i + Math.floor(t / 50)) % 5]))
          .join('');
        lastPaint = t;
      }
      if (p < 1) raf = requestAnimationFrame(step);
      else reset();
    };
    const run = () => {
      if (!motionEnabled() || performance.now() - lastRun < 1000) return;
      reset();
      start = 0;
      lastPaint = 0;
      lastRun = performance.now();
      raf = requestAnimationFrame(step);
    };

    const host = el.closest('button, a') ?? el.parentElement;
    host?.addEventListener('pointerenter', run);
    host?.addEventListener('focusin', run);
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          run();
          io.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    io.observe(el);
    const mo = new MutationObserver(() => !motionEnabled() && reset());
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-motion'] });
    document.addEventListener('visibilitychange', reset);
    return () => {
      reset();
      host?.removeEventListener('pointerenter', run);
      host?.removeEventListener('focusin', run);
      io.disconnect();
      mo.disconnect();
      document.removeEventListener('visibilitychange', reset);
    };
  }, [children]);

  return (
    <span className="signal-text">
      <span className="sr-only">{children}</span>
      <span aria-hidden="true" className="signal-text-size">
        {children}
      </span>
      <span aria-hidden="true" className="signal-text-live" ref={live}>
        {children}
      </span>
    </span>
  );
}
