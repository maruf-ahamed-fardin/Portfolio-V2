'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Play } from 'lucide-react';
import { ULink } from '@/components/primitives';
import { projects, type Project } from '@/lib/data';
import { cn } from '@/lib/utils';

const FILTERS: { key: 'all' | Project['tag']; label: string }[] = [
  { key: 'all', label: 'All builds' },
  { key: 'fullstack', label: 'Full-stack' },
  { key: 'frontend', label: 'Frontend' },
];

export default function ProjectGrid() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]['key']>('all');
  const shown = projects.filter((p) => filter === 'all' || p.tag === filter);

  return (
    <>
      <div className="mt-7 flex flex-wrap items-center gap-2 border-b border-line pb-5 md:mt-8 md:flex-nowrap">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            aria-pressed={filter === f.key}
            onClick={() => setFilter(f.key)}
            className={cn(
              'sweep min-h-11 rounded-[40px] border border-[#4a443b] px-[21px] py-[11px] text-xs text-[#bdb5ab] transition-[background,color] duration-200 hover:text-ink',
              filter === f.key && 'border-[#e5dccd] bg-[#e5dccd] text-[#100c08] hover:text-[#100c08]'
            )}
          >
            {f.label}
          </button>
        ))}
        <span className="caption mt-2.5 w-full text-[#b8a68f] md:mt-0 md:ml-auto md:w-auto">0{shown.length} SELECTED BUILDS</span>
      </div>

      <div className="mt-9 grid gap-[50px] md:grid-cols-2 md:gap-x-[25px] md:gap-y-[70px] lg:grid-cols-3">
        {shown.map((p) => (
          <article key={p.title} className="group card-interfere">
            <a
              href={p.live}
              target="_blank"
              rel="noreferrer"
              className="relative block aspect-video overflow-hidden border border-white/8 bg-[#111] after:absolute after:inset-0 after:bg-[linear-gradient(180deg,transparent_60%,rgba(0,0,0,0.55))]"
            >
              <Image
                src={p.image}
                alt={`${p.chip} screenshot`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 415px"
                className="object-cover object-top brightness-[0.85] saturate-[0.7] transition-[filter,transform] duration-[500ms,650ms] group-hover:scale-[1.035] group-hover:brightness-100 group-hover:saturate-100"
              />
              <span
                aria-hidden="true"
                className="absolute top-1/2 left-1/2 z-[1] grid size-[52px] -translate-1/2 place-items-center rounded-full border border-[#eee3cb]/50 bg-[#090909]/85 shadow-[0_4px_30px_#0008] transition-[background,color] duration-200 group-hover:bg-[#e7dcc8] group-hover:text-[#0c0906]"
              >
                <Play strokeWidth={1.5} className="size-[15px]" />
              </span>
              <span className="absolute bottom-[13px] left-[13px] z-[1] rounded-[3px] bg-[#080808]/85 px-2 py-[5px] font-mono text-[8px] tracking-[0.6px] text-[#e7dcc8]">
                {p.chip}
              </span>
            </a>
            <p className="mt-[25px] font-mono text-[8px] tracking-[0.6px] text-[#bdab97]">{p.meta}</p>
            <h3 className="card-title mt-3 font-display text-[clamp(30px,2.6vw,38px)] leading-[1.15] font-normal tracking-[-0.3px]">{p.title}</h3>
            <p className="mt-2 text-xs leading-[1.75] text-[#b9afa3]">{p.body}</p>
            <div className="mt-3.5 flex gap-[22px]">
              <ULink href={p.live} tone="cream" className="gap-[18px] text-[11px] hover:gap-[22px]">
                Visit live
              </ULink>
              <ULink href={p.code} tone="cream" className="gap-[18px] text-[11px] hover:gap-[22px]">
                Code
              </ULink>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
