'use client';

import { useState } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ULink } from '@/components/primitives';
import { disciplines } from '@/lib/data';
import SignalText from './SignalText';

/** Left: numbered steps of the open discipline. Right: the discipline accordion. */
export default function Disciplines({ intro }: { intro: React.ReactNode }) {
  const [open, setOpen] = useState('01');
  const current = disciplines.find((d) => d.no === open) ?? disciplines[0];

  return (
    <div className="mt-8 grid gap-10 md:mt-[86px] md:grid-cols-[1.1fr_1fr] md:gap-[clamp(30px,4.2vw,60px)]">
      <div>
        {intro}
        <div data-reveal className="mt-8 max-w-[430px] border-t border-line pt-8 md:mt-[46px] md:pt-10">
          <span className="caption text-[10px] text-[#cda882]">
            <SignalText key={current.kind}>{current.kind.toUpperCase()}</SignalText>
          </span>
          <ol key={current.no} className="mt-6">
            {current.steps.map((s, i) => (
              <li
                key={s}
                className="relative flex h-[58px] items-center gap-5 font-display text-[22px] tracking-[-0.4px] not-first:before:absolute not-first:before:bottom-[45px] not-first:before:left-4 not-first:before:h-[26px] not-first:before:w-px not-first:before:bg-[#e0b58a]/45 md:h-[65px] md:text-[27px] md:not-first:before:bottom-[49px] md:not-first:before:h-8"
              >
                <span className="relative z-[1] grid size-[33px] shrink-0 place-items-center rounded-full border border-[#e0b58a]/60 bg-bg font-mono text-[9px] text-[#e0b58a]">
                  0{i + 1}
                </span>
                {s}
              </li>
            ))}
          </ol>
          <ULink href="#work" small icon={false} className="mt-[30px]">
            Explore the engineering ↗
          </ULink>
        </div>
      </div>

      <Accordion type="single" collapsible value={open} onValueChange={setOpen} className="self-start border-t border-line">
        {disciplines.map((d) => (
          <AccordionItem
            key={d.no}
            value={d.no}
            className="border-b border-line transition-[background] duration-500 last:border-b data-[state=open]:bg-[linear-gradient(110deg,#9867370b,#0000_70%)]"
          >
            <AccordionTrigger
              className="group/t glitch-host rounded-none pt-7 pb-[26px] hover:no-underline focus-visible:ring-0"
              icon={
                <i
                  aria-hidden="true"
                  className="relative mt-[30px] mr-2 size-[13px] shrink-0 before:absolute before:top-1.5 before:left-0 before:h-px before:w-[13px] before:bg-ink after:absolute after:top-1.5 after:left-0 after:h-px after:w-[13px] after:rotate-90 after:bg-ink after:transition-transform after:duration-400 after:ease-expo group-data-[state=open]/t:after:rotate-0"
                />
              }
            >
              <span>
                <small className="block font-mono text-[7px] font-normal tracking-[0.8px] text-[#a8a8a8] uppercase">
                  <SignalText>{`${d.no} / ${d.kind.toUpperCase()}`}</SignalText>
                </small>
                <span className="mt-3.5 block font-display text-[27px] leading-[1.1] font-normal tracking-[-0.7px] md:text-[32px]">
                  {d.title}
                </span>
              </span>
            </AccordionTrigger>
            <AccordionContent className="pt-1 pb-10 md:pr-10 md:pb-14">
              <p className="text-[13px] leading-[1.75] text-mute">{d.body}</p>
              <p className="mt-5 border-l-2 border-ember pl-[18px] text-[13px] leading-[1.9] text-[#d2d2d2]">{d.stack}</p>
              <ULink href="#projects" small tone="warm" icon={false} className="mt-[22px]">
                See it in the projects ↗
              </ULink>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
