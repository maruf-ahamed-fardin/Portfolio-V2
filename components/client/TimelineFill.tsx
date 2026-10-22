'use client';

import { useEffect, useRef } from 'react';

/** Vertical timeline whose accent line fills as it scrolls past. */
export default function TimelineFill({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const fill = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current!;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        const p = Math.min(1, Math.max(0, (innerHeight * 0.6 - r.top) / r.height));
        if (fill.current) fill.current.style.transform = `scaleY(${p})`;
      });
    };
    onScroll();
    addEventListener('scroll', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="relative pl-[30px] before:absolute before:top-2.5 before:bottom-0 before:left-0 before:w-px before:bg-white/20 md:pl-[37px]"
    >
      <span ref={fill} aria-hidden="true" className="absolute top-2.5 left-0 h-[calc(100%-10px)] w-px origin-top scale-y-0 bg-ember" />
      {children}
    </div>
  );
}
