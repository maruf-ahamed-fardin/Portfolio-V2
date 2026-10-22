'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { nav } from '@/lib/data';
import { cn } from '@/lib/utils';
import SignalText from './SignalText';

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [active, setActive] = useState('top');
  const header = useRef<HTMLElement>(null);
  const openRef = useRef(false);
  openRef.current = open;

  // highlight the section in view (same root margins as the reference)
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-15% 0px -65% 0px' }
    );
    ['top', ...nav.map((n) => n.href.slice(1)), 'contact'].forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    // hide after ~28px of downward travel, reveal after ~8px up; always shown near the top
    let lastY = scrollY, travel = 0, raf = 0;
    const tick = () => {
      raf = 0;
      const y = Math.max(0, Math.min(scrollY, document.documentElement.scrollHeight - innerHeight));
      const d = y - lastY;
      if (Math.abs(d) < 0.5) return;
      lastY = y;
      travel = Math.sign(d) === Math.sign(travel) ? travel + d : d;
      const focused = header.current?.contains(document.activeElement) && document.activeElement?.matches(':focus-visible');
      if (y < 100 || openRef.current || focused) {
        setHidden(false);
        travel = 0;
        return;
      }
      if (travel > 28) {
        setHidden(true);
        setOpen(false);
        travel = 0;
      } else if (travel < -8) {
        setHidden(false);
        travel = 0;
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const close = () => setOpen(false);
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    const onDown = (e: PointerEvent) => {
      if (header.current && !header.current.contains(e.target as Node)) setOpen(false);
    };
    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('closemenu', close);
    addEventListener('keydown', onKey);
    addEventListener('pointerdown', onDown);
    return () => {
      removeEventListener('scroll', onScroll);
      removeEventListener('closemenu', close);
      removeEventListener('keydown', onKey);
      removeEventListener('pointerdown', onDown);
    };
  }, []);

  return (
    <header
      ref={header}
      className={cn(
        'fixed top-3 left-1/2 z-50 flex h-[62px] w-[calc(100%-32px)] max-w-[1120px] -translate-x-1/2 items-center justify-between rounded-[18px] border border-white/14 px-5 shadow-[0_20px_60px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.05)] backdrop-blur-xl backdrop-saturate-[1.2] transition-transform duration-600 ease-expo md:top-4 md:h-[68px] md:rounded-[22px] md:pr-[22px] md:pl-7',
        'bg-[linear-gradient(180deg,rgba(34,32,30,0.82),rgba(18,17,16,0.82))]',
        hidden && !open && '-translate-y-[120px]'
      )}
    >
      <a href="#top" className="mr-auto font-display text-2xl leading-[0.95] tracking-[-0.6px] md:text-[26px]">
        Maruf Ahamed Fardin
      </a>

      {/* desktop links */}
      <nav className="hidden items-center gap-0.5 min-[901px]:flex min-[1101px]:gap-1" aria-label="Primary">
        {nav.map((n) => (
          <a
            key={n.href}
            href={n.href}
            aria-current={active === n.href.slice(1) ? 'location' : undefined}
            className="relative flex items-center rounded-[7px] px-[17px] py-3.5 text-xs leading-none tracking-[0.1px] text-[#c9c2b8] transition-[background,color] duration-200 hover:bg-[#e9e3d5]/6 hover:text-[#fff5e5] hover:shadow-[inset_0_1px_0_#ffffff0d] aria-[current]:bg-[#e9e3d5]/6 aria-[current]:text-[#fff5e5] aria-[current]:shadow-[inset_0_1px_0_#ffffff0d] aria-[current]:after:absolute aria-[current]:after:bottom-[5px] aria-[current]:after:left-1/2 aria-[current]:after:size-[3px] aria-[current]:after:rounded-full aria-[current]:after:bg-[#dfac7c] max-[1100px]:px-3"
          >
            <SignalText>{n.label}</SignalText>
          </a>
        ))}
        <Button asChild variant="glass" size="nav" className="group ml-6 rounded-[7px]">
          <a href="#contact">
            <SignalText>Let’s talk</SignalText>
            <ArrowUpRight strokeWidth={1.5} className="size-3 transition-transform duration-250 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </Button>
      </nav>

      {/* mobile / tablet toggle */}
      <button
        className="-mr-[7px] ml-2 inline-flex items-center gap-2.5 p-3 font-mono text-[10px] text-[#ded0bb] min-[901px]:hidden"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="mobile-menu"
      >
        {open ? 'Close' : 'Menu'}
        <span className="relative grid size-4 place-items-center" aria-hidden="true">
          <span className={cn('absolute h-[1.5px] w-4 bg-ink transition-transform duration-400 ease-expo', open ? 'rotate-45' : '-translate-y-[5px]')} />
          <span className={cn('absolute h-[1.5px] w-4 bg-ink transition-opacity duration-200', open && 'opacity-0')} />
          <span className={cn('absolute h-[1.5px] w-4 bg-ink transition-transform duration-400 ease-expo', open ? '-rotate-45' : 'translate-y-[5px]')} />
        </span>
      </button>

      {/* dropdown panel right under the bar (reference: glass card, serif links, arrows) */}
      <nav
        id="mobile-menu"
        aria-label="Mobile"
        aria-hidden={!open}
        className={cn(
          'absolute inset-x-0 top-[calc(100%+10px)] flex max-h-[calc(100svh-108px)] flex-col overflow-y-auto rounded-[20px] border border-[#e7e1d5]/17 px-[22px] pt-3.5 pb-[22px] shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_12px_32px_rgba(0,0,0,0.33)] backdrop-blur-[20px] min-[901px]:hidden',
          'bg-[#0b0a09]/[0.98] bg-[image:linear-gradient(145deg,rgba(231,223,211,0.06),transparent_65%)]',
          'origin-top transition-[opacity,transform,visibility] duration-400 ease-expo',
          open ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-2 opacity-0'
        )}
      >
        {nav.map((n) => (
          <a
            key={n.href}
            href={n.href}
            tabIndex={open ? 0 : -1}
            className="group flex items-center justify-between border-b border-[#8e7963]/20 py-5 font-display text-[30px] leading-none transition-colors hover:text-[#f6dcc6]"
          >
            <SignalText>{n.label}</SignalText>
            <span className="font-sans text-[17px] text-[#b69b78] transition-transform duration-400 ease-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true">
              ↗
            </span>
          </a>
        ))}
        <Button asChild variant="glass" className="mt-[22px] h-12 w-full justify-between px-3.5 text-xs">
          <a href="#contact" tabIndex={open ? 0 : -1}>
            Let’s talk <ArrowUpRight strokeWidth={1.5} className="size-3" />
          </a>
        </Button>
      </nav>
    </header>
  );
}
