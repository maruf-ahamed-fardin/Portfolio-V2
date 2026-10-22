import Image from 'next/image';
import { ArrowRight, ArrowUpRight, Play } from 'lucide-react';
import { SectionHead, SplitHead, ULink } from '@/components/primitives';
import { featured, moreWork, site, type Featured } from '@/lib/data';

function RoundArrow() {
  return (
    <span
      aria-hidden="true"
      className="absolute right-3.5 bottom-3.5 z-10 grid size-9 place-items-center rounded-full border border-white/40 bg-[#0a0a0a]/70 text-ink transition-[background,color,transform] duration-500 ease-expo group-hover:rotate-45 group-hover:bg-ink group-hover:text-[#0a0a0a] md:right-[22px] md:bottom-[22px] md:size-12"
    >
      <ArrowUpRight strokeWidth={1.5} className="size-3.5" />
    </span>
  );
}

function Browser({ item }: { item: Featured }) {
  return (
    <a
      href={item.href}
      target="_blank"
      rel="noreferrer"
      className="group sweep-card relative block overflow-hidden border border-white/12 bg-[#121110] transition-colors duration-300 hover:border-[#999]"
    >
      <div className="grid h-[34px] grid-cols-[60px_1fr_60px] items-center border-b border-white/8 px-3 font-mono text-[8px] text-[#bdb2a8] md:h-11 md:px-6 md:text-[9px]">
        <span className="flex gap-[5px]" aria-hidden="true">
          {[0, 1, 2].map((i) => (
            <i key={i} className="size-1 rounded-full bg-[#8b8580]" />
          ))}
        </span>
        <span className="truncate text-center">{item.domain}</span>
        <ArrowUpRight strokeWidth={1.5} className="size-2 justify-self-end opacity-60" />
      </div>
      <div className="relative aspect-[16/9] overflow-hidden md:aspect-[16/8]">
        <Image
          src={item.image}
          alt={`${item.title} screenshot`}
          fill
          sizes="(max-width: 1024px) 100vw, 665px"
          className="object-cover object-top saturate-[0.65] transition-[transform,filter] duration-[650ms,500ms] group-hover:scale-[1.035] group-hover:saturate-100"
        />
        <RoundArrow />
      </div>
      <div className="flex h-7 items-center justify-between px-3 font-mono text-[6px] tracking-[0.6px] text-[#c0b3a4] uppercase md:h-9 md:text-[7px]">
        <span>{item.caption}</span>
        <span className="hidden md:inline">Live deployment</span>
      </div>
    </a>
  );
}

function FeatText({ item, className }: { item: Featured; className?: string }) {
  return (
    <div className={`grid grid-cols-[26px_1fr] md:grid-cols-[44px_1fr] ${className ?? ''}`}>
      <span className="pt-0.5 font-mono text-[11px] text-[#c8b5a4]">{item.no}</span>
      <div>
        <span className="font-mono text-[9px] leading-[1.65] tracking-[1.2px] text-[#b6a593]">{item.kind}</span>
        <h3 className="mt-2 font-display text-[30px] leading-[1.08] tracking-[-0.025em] md:text-[clamp(32px,3.1vw,50px)]">
          <a href={item.href} target="_blank" rel="noreferrer" className="title-glow transition-colors hover:text-[#ffb68e]">
            {item.title}
          </a>
        </h3>
        <p className="mt-3 max-w-[580px] text-[13px] leading-[1.7] text-[#b3ada4] md:mt-4 md:text-sm">{item.body}</p>
        {item.meta && <p className="mt-3 font-mono text-[8px] tracking-[0.8px] text-[#8f8a84] uppercase">{item.meta}</p>}
        <ULink href={item.href} className="mt-5">
          Explore the build
        </ULink>
      </div>
    </div>
  );
}

export default function Work() {
  const [a, b, c] = featured;
  return (
    <section id="work" className="relative pt-[44px] md:pt-[72px]">
      <div className="wrap">
        <SectionHead label="02 / Selected work" aside="Built. Shipped. Put into the world." signal />
        <SplitHead
          className="mt-6 md:mt-7 [&_h2]:text-[clamp(34px,4.4vw,72px)]"
          title={
            <>
              Ideas are a start.
              <em>This is the work.</em>
            </>
          }
        >
          From the dashboards teams run on
          <br />
          to the AI that answers for them.
          <br />A few things I’ve helped bring to life.
        </SplitHead>

        <div className="mt-5 border-t border-line md:mt-7">
          {/* 01 — large feature */}
          <div className="grid items-center gap-[30px] border-b border-line pt-6 pb-8 md:pt-8 md:grid-cols-[1.15fr_1fr] md:gap-[clamp(30px,5vw,72px)] md:pb-10">
            <div data-reveal>
              <Browser item={a} />
            </div>
            <div data-reveal>
              <FeatText item={a} />
            </div>
          </div>

          {/* 02 + 03 — side by side */}
          <div className="grid gap-10 border-b border-line pt-8 pb-10 md:pt-10 md:grid-cols-2 md:gap-[clamp(24px,3.75vw,54px)] md:pb-12">
            <div data-reveal className="md:pl-[7px]">
              <Browser item={b} />
              <FeatText item={b} className="mt-5 md:mt-6 md:grid-cols-[47px_1fr]" />
            </div>
            <div data-reveal>
              <a
                href={c.href}
                target="_blank"
                rel="noreferrer"
                className="group sweep-card relative block overflow-hidden border border-white/10 bg-[#0e0d0c]"
              >
                <div className="relative aspect-[16/9] overflow-hidden md:aspect-[16/8] after:absolute after:inset-0 after:bg-[linear-gradient(180deg,transparent_55%,rgba(5,5,5,0.85))]">
                  <Image
                    src={c.image}
                    alt={`${c.title} screenshot`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 620px"
                    className="object-cover object-top saturate-[0.65] transition-[transform,filter] duration-[650ms,500ms] group-hover:scale-[1.035] group-hover:saturate-100"
                  />
                </div>
                <div className="absolute inset-x-0 bottom-0 z-[1] flex items-center gap-5 bg-[#080808]/80 px-4 py-3 md:px-6 md:py-[18px]">
                  <Play strokeWidth={1.5} className="size-4 shrink-0" />
                  <div>
                    <span className="block font-mono text-[11px] leading-[1.8] text-[#efdfc7] uppercase">{c.caption}</span>
                    <small className="block font-mono text-[8px] text-[#beb6a9] uppercase">{c.sub}</small>
                  </div>
                </div>
                <RoundArrow />
              </a>
              <FeatText item={c} className="mt-5 md:mt-6 md:grid-cols-[47px_1fr]" />
            </div>
          </div>

          {/* more ways I build */}
          <div className="pt-7">
            <p className="caption text-[10px] text-[#ac9a86]">More ways I build</p>
            <div className="mt-6 md:mt-8">
              {moreWork.map((w) => (
                <a
                  key={w.no}
                  href={w.href}
                  target="_blank"
                  rel="noreferrer"
                  data-reveal
                  className="group mb-4 flex items-start justify-between border-b border-line pb-4 md:mb-5 md:pb-5"
                >
                  <div>
                    <small className="block font-mono text-[9px] leading-[1.6] text-[#b6a998] uppercase">
                      {w.no} / {w.kind}
                    </small>
                    <span className="mt-1 flex items-center gap-3.5 font-display text-[26px] leading-[1.2] transition-colors duration-200 group-hover:text-[#ffb68e] md:gap-[22px] md:text-[clamp(32px,3vw,43px)]">
                      {w.title}
                      <em className="rounded-full border border-ember/55 px-2.5 py-1.5 font-mono text-[9px] leading-none text-[#ffac82] not-italic">
                        {w.badge}
                      </em>
                    </span>
                  </div>
                  <ArrowUpRight
                    strokeWidth={1.5}
                    className="mt-[22px] size-3.5 transition-[transform,color] duration-500 ease-expo group-hover:rotate-45 group-hover:text-ember md:mt-[30px]"
                  />
                </a>
              ))}
            </div>

            <details className="group/d -mt-4 border-b border-line md:-mt-5">
              <summary className="flex cursor-pointer list-none justify-between py-[22px] text-[13px] text-[#b9afa3] [&::-webkit-details-marker]:hidden">
                Inside the Alora project
                <b className="font-normal transition-transform duration-400 ease-expo group-open/d:rotate-45">+</b>
              </summary>
              <div className="max-w-[650px] pb-7 text-sm leading-[1.75] text-[#b9afa3]">
                Alora answers customer questions from a shop’s own information and past replies using RAG with local
                embeddings, pgvector and the Claude API—complete with a retrieval evaluation script and tenant-isolation
                checks so one shop never sees another’s data.
                <br />
                <ULink href={moreWork[0].href} small icon={false} className="mt-3.5">
                  Read the code on GitHub ↗
                </ULink>
              </div>
            </details>

            <a
              href={`${site.github}?tab=repositories`}
              target="_blank"
              rel="noreferrer"
              className="group mt-6 inline-flex items-center gap-5 text-[13px]"
            >
              Explore all work
              <ArrowRight strokeWidth={1.5} className="size-3.5 transition-transform duration-400 ease-expo group-hover:translate-x-1.5" />
            </a>
          </div>

          <div data-reveal className="mt-10 flex flex-nowrap justify-between gap-x-3 sm:justify-start sm:gap-x-[30px] md:mt-14">
            {[
              { label: 'GitHub ↗', href: site.github },
              { label: 'Projects in the wild ↗', href: '#projects' },
              { label: 'Stack & skills ↗', href: '#stack' },
            ].map((l) => (
              <a
                key={l.label}
                href={l.href}
                {...(l.href.startsWith('#') ? {} : { target: '_blank', rel: 'noreferrer' })}
                className="border-b border-ink/40 pb-2 text-[12px] whitespace-nowrap transition-colors sm:text-[13px] hover:border-ember hover:text-[#f6dcc6]"
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
