import Image from 'next/image';
import { ArrowUpRight, Code } from 'lucide-react';
import StageReveal from '@/components/client/StageReveal';
import { Button } from '@/components/ui/button';
import { SectionHead, ULink } from '@/components/primitives';
import { site, stackRows } from '@/lib/data';

export default function Stage() {
  return (
    <section id="beyond" className="relative pt-[50px] md:pt-[100px]">
      <div className="wrap">
        <SectionHead label="06 / From ideas to people" aside="From the editor to the user" />

        <StageReveal className="stage-banner relative -mx-[var(--gutter)] mt-10 h-[560px] overflow-hidden bg-[#070707] after:pointer-events-none after:absolute after:inset-0 after:bg-[linear-gradient(180deg,rgba(3,3,3,0.75)_0%,rgba(3,3,3,0.25)_55%,rgba(3,3,3,0.7)_100%)] md:mx-0 md:mt-[74px] md:h-[520px] md:after:bg-[linear-gradient(90deg,rgba(3,3,3,0.82)_0%,rgba(3,3,3,0.45)_45%,rgba(3,3,3,0.1)_100%)] lg:h-[570px]">
          <div data-stage-media className="stage-media absolute -top-[12%] -bottom-[12%] right-0 w-full will-change-transform md:w-[62%]">
            <Image
              src="/images/maruf.jpg"
              alt="Portrait of Maruf Ahamed Fardin"
              fill
              sizes="(max-width: 700px) 100vw, 62vw"
              className="object-cover object-[50%_20%] brightness-[0.62] contrast-[1.05] grayscale"
            />
            {/* colour layer revealed only inside the cursor spotlight */}
            <Image
              src="/images/maruf.jpg"
              alt=""
              aria-hidden="true"
              fill
              sizes="(max-width: 700px) 100vw, 62vw"
              className="stage-spot object-cover object-[50%_20%] brightness-[0.95] saturate-[0.85]"
            />
          </div>
          <div className="relative z-[1] px-6 py-16 md:px-[78px] md:py-[92px]">
            <span data-stage-fade className="caption block text-[8px] text-[#ccc]">
              A different kind of reach
            </span>
            <h2 className="display interfere mt-[26px] text-5xl md:text-[clamp(38px,5.5vw,92px)]">
              <span className="block overflow-hidden pb-[0.08em]">
                <span data-stage-line className="block">
                  Make it clear.
                </span>
              </span>
              <span className="-mt-[0.08em] block overflow-hidden pb-[0.08em]">
                <span data-stage-line className="block">
                  Make it <em className="inline!">ship.</em>
                </span>
              </span>
            </h2>
            <div data-stage-fade className="mt-10">
              <Button asChild variant="pill" size="pill" className="group sweep sweep-bright gap-9 border-[#e5cbb0]/50">
                <a href="#contact">
                  Start a project
                  <ArrowUpRight strokeWidth={1.5} className="size-[13px] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </Button>
            </div>
          </div>
          <span data-stage-fade className="absolute right-[26px] bottom-[26px] z-[1] font-mono text-[7px] tracking-[1px] text-[#ccc]">
            REAL PRODUCTS. REAL USERS.
          </span>
        </StageReveal>

        <div className="mt-14 grid gap-[60px] md:grid-cols-[1.1fr_1fr]">
          <div className="">
            <h3 className="text-[23px] leading-[1.25] font-[450] tracking-[-0.8px] md:text-[27px]">
              Building what I learn.
              <br />
              Learning what comes next.
            </h3>
            <p className="mt-5 max-w-[400px] text-[13px] leading-[1.75] text-mute">
              Production dashboards, AI assistants, PWAs and ML experiments—each one a reason to go deeper. Currently
              studying CSE at Uttara University while shipping at SeloraX.
            </p>
            <div className="mt-6 flex flex-wrap gap-x-4 gap-y-2.5 font-mono text-[8px] text-[#a6a6a6]">
              {['React & Next.js', 'TypeScript', 'Prisma & SQL', 'LLM & RAG', 'PWA'].map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
          </div>
          <div className="">
            <div>
              {stackRows.map((r) => (
                <a
                  key={r.kind}
                  href="#stack"
                  className="group flex items-center gap-[22px] border-b border-line pt-[18px] pb-[22px] transition-[padding] duration-500 ease-expo first:pt-0 hover:pl-2"
                >
                  <Code strokeWidth={1.5} className="size-3.5 shrink-0" />
                  <span>
                    <small className="block font-mono text-[7px] tracking-[0.7px] text-[#a6a6a6] uppercase">{r.kind}</small>
                    <span className="mt-1.5 block text-sm leading-normal">{r.title}</span>
                  </span>
                  <ArrowUpRight strokeWidth={1.5} className="ml-auto size-3 shrink-0 transition-transform duration-400 ease-expo group-hover:translate-x-[3px] group-hover:-translate-y-[3px] group-hover:text-ember" />
                </a>
              ))}
            </div>
            <p className="mt-[18px] max-w-[400px] text-xs leading-[1.75] text-[#b3aca3]">
              Plus the everyday toolkit: Git, GitHub, Vercel, Figma, Docker basics, Zustand, TanStack Query, React Hook
              Form and Zod.
            </p>
            <ULink href={site.cv} className="mt-[26px]">
              Full skills in my CV
            </ULink>
          </div>
        </div>
      </div>
    </section>
  );
}
