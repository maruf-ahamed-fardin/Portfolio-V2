'use client';

import { useState } from 'react';
import SignalField from './SignalField';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ULink } from '@/components/primitives';
import { perspectives } from '@/lib/data';
import { cn } from '@/lib/utils';

function PerspectiveTabs() {
  return (
    <TabsList className="flex h-auto w-full gap-2 rounded-none bg-transparent p-0">
      {perspectives.map((p) => (
        <TabsTrigger
          key={p.key}
          value={p.key}
          className={cn(
            // reference .signal-options button (+ light sweep on hover)
            'sweep h-auto min-h-12 flex-1 justify-between gap-2.5 rounded-none border-[#5f503e] bg-transparent px-2.5 py-2.5 text-[13px] font-normal text-[#c4b7a7] shadow-none transition-[background,color] duration-250 min-[901px]:px-[15px] min-[901px]:py-3',
            'data-[state=active]:border-[#e4d8c6] data-[state=active]:bg-[#e4d8c6] data-[state=active]:text-[#17120d] data-[state=active]:shadow-none',
            'dark:text-[#c4b7a7] dark:data-[state=active]:border-[#e4d8c6] dark:data-[state=active]:bg-[#e4d8c6] dark:data-[state=active]:text-[#17120d] after:hidden'
          )}
        >
          {p.label}
          <span aria-hidden="true">↗</span>
        </TabsTrigger>
      ))}
    </TabsList>
  );
}

function PerspectiveBodies() {
  return perspectives.map((p) => (
    <TabsContent key={p.key} value={p.key} className="mt-[25px]">
      <h3 className="font-display text-[27px] leading-[1.1] tracking-[-0.64px] md:text-[32px]">{p.title}</h3>
      <p className="mt-[13px] max-w-[520px] text-[13px] leading-[1.75] text-[#bdb0a0]">{p.body}</p>
      <ULink href={p.link.href} small icon={false} className="mt-4">
        {p.link.label} ↗
      </ULink>
      <p className="mt-[15px] font-mono text-[8px] leading-[1.6] text-[#b6a38d]">Choose a perspective.</p>
    </TabsContent>
  ));
}

/** About section: point-cloud visual on top, tabs + copy below. */
export function PerspectivePanel() {
  const [value, setValue] = useState(perspectives[0].key);
  const idx = perspectives.findIndex((p) => p.key === value);
  return (
    <Tabs value={value} onValueChange={setValue} className="block border-b border-[#776650]/33 pb-[22px]">
      <div className="flex justify-between gap-5 border-t border-line pt-[18px] font-mono text-[9px] text-tan">
        <span className="text-[8px] tracking-[1.2px] uppercase">Three disciplines. One perspective.</span>
        <span aria-hidden="true">0{idx + 1} / 03</span>
      </div>
      <SignalField index={idx} variant="about" />
      <PerspectiveTabs />
      <PerspectiveBodies />
    </Tabs>
  );
}

/** Impact section: framed variant with tabs on the left and the visual on the right. */
export function TravelPanel() {
  const [value, setValue] = useState(perspectives[1].key);
  const idx = perspectives.findIndex((p) => p.key === value);
  return (
    <Tabs
      value={value}
      onValueChange={setValue}
      className="mt-14 grid gap-10 border border-line-2 px-4 pt-5 pb-7 md:mt-20 md:grid-cols-[1fr_1.1fr] md:px-7 md:pt-7 md:pb-[34px]"
    >
      <div className="col-span-full flex justify-between font-mono text-[8px] tracking-[1.2px] text-tan">
        <span>HOW THE WORK TRAVELS</span>
        <span>0{idx + 1} / 03</span>
      </div>
      <div className="order-last md:order-none">
        <PerspectiveTabs />
        <PerspectiveBodies />
      </div>
      <SignalField index={idx} variant="impact" className="md:-mt-[30px]" />
    </Tabs>
  );
}
