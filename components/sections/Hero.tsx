import { ArrowDown, ArrowUpRight, Download } from 'lucide-react';
import HeroCanvas from '@/components/client/HeroCanvas';
import SignalText from '@/components/client/SignalText';
import { Button } from '@/components/ui/button';
import { ULink } from '@/components/primitives';
import { socialIcons } from '@/components/socialIcons';
import { heroStats, site, socials } from '@/lib/data';

export default function Hero() {
  return (
    <>
      <HeroCanvas src="/images/maruf-signal-v2.jpg" alt="" />

      <section id="top" className="hero">
        <div className="hero-grid" aria-hidden="true" />

        <div className="hero-topline">
          <span>Developer. Builder. Learner.</span>
          <span>Based in Dhaka · Building beyond</span>
        </div>

        <div className="hero-side-note" aria-hidden="true">
          <span>01 / Presence</span>
          <span>
            Frontend
            <br />
            Backend
            <br />
            AI &amp; LLM
          </span>
        </div>

        <nav
          aria-label="Social profiles"
          className="absolute top-[28%] right-(--gutter) z-[2] hidden w-[170px] lg:block [@media(max-height:780px)]:top-[24%]"
        >
          <span className="caption text-[8px] text-[#c2ae97]">Find me elsewhere</span>
          <ul className="mt-3 border-b border-line">
            {socials.map((s) => {
              const Icon = socialIcons[s.key];
              return (
                <li key={s.key} className="border-t border-line">
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group grid grid-cols-[18px_1fr_auto] items-center gap-3.5 py-3 transition-[background] [@media(max-height:780px)]:py-2 duration-350 hover:bg-[linear-gradient(110deg,#ac74400f,#0000_80%)]"
                  >
                    <Icon className="size-[15px] text-[#e3c7a6] transition-colors duration-300 group-hover:text-ember" />
                    <span className="min-w-0">
                      <span className="block font-display text-[21px] leading-none tracking-[-0.5px] transition-colors duration-300 group-hover:text-[#ffb287]">
                        {s.label}
                      </span>
                      <span className="mt-1 block truncate font-mono text-[7px] tracking-[1px] text-[#9d9387] uppercase [@media(max-height:780px)]:hidden">
                        {s.handle || s.note}
                      </span>
                    </span>
                    <ArrowUpRight
                      strokeWidth={1.5}
                      className="size-3 text-[#bfb2a3] transition-[transform,color] duration-400 ease-expo group-hover:translate-x-[3px] group-hover:-translate-y-[3px] group-hover:text-ember"
                    />
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="hero-content">
          <span className="hero-kicker">
            <SignalText>A DEVELOPER’S PERSPECTIVE ON PRODUCT</SignalText>
          </span>
          <h1>
            <span className="line-mask">
              <span className="reveal-line">
                {site.first} <em>{site.last}</em>
              </span>
            </span>
          </h1>
          <div className="hero-description">
            <p>
              I build full-stack products, ship AI features,
              <br />
              and turn designs into real software.
            </p>
            <div className="hero-actions">
              <Button asChild variant="pill" size="pill" className="group sweep sweep-bright max-md:h-10 max-md:gap-2 max-md:px-4 max-md:text-[11px]">
                <a href="#work">
                  <SignalText>Explore my work</SignalText>
                  <ArrowDown strokeWidth={1.5} className="size-[13px] transition-transform duration-300 group-hover:translate-y-[3px]" />
                </a>
              </Button>
              <ULink href="#contact" className="text-[11px] whitespace-nowrap max-md:order-last">
                <SignalText>Start a conversation</SignalText>
              </ULink>
              <Button asChild variant="pill" size="pill" className="group sweep sweep-bright max-md:h-10 max-md:gap-2 max-md:px-4 max-md:text-[11px]">
                <a href={site.cv} download>
                  <SignalText>Download CV</SignalText>
                  <Download strokeWidth={1.5} className="size-[13px] transition-transform duration-300 group-hover:translate-y-[3px]" />
                </a>
              </Button>
            </div>
            <ul
              aria-label="Social profiles"
              className="mt-1 flex lg:hidden items-center gap-2.5 before:mr-2 before:h-px before:w-7 before:bg-line-2 after:ml-2 after:h-px after:w-7 after:bg-line-2 max-md:mt-0 max-md:gap-2 max-md:before:w-5 max-md:after:w-5"
            >
              {socials.map((s) => {
                const Icon = socialIcons[s.key];
                return (
                  <li key={s.key}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={s.label}
                      title={s.label}
                      className="grid size-9 place-items-center rounded-full max-md:size-8 border border-white/20 bg-[#030303]/35 text-[#e3c7a6] backdrop-blur-sm transition-[color,border-color,background,transform] duration-300 ease-expo hover:-translate-y-0.5 hover:border-ember/70 hover:bg-ember/10 hover:text-ember"
                    >
                      <Icon className="size-[15px]" />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="hero-bottom">
          <a href="#stats">
            Scroll to discover <ArrowDown strokeWidth={1.5} className="size-2.5" />
          </a>
          <span>Shipping code since 2024</span>
          <a href={site.github} target="_blank" rel="noreferrer" className="hero-edition hover:text-ink">
            An ongoing build ↗
          </a>
        </div>
      </section>

      <section id="stats" aria-label="Highlights" className="relative z-[1] border-y border-line bg-[#101010]/90 backdrop-blur-sm">
        <div className="wrap grid grid-cols-[1.25fr_1fr_1fr] gap-4 py-[27px] md:grid-cols-[1fr_1.2fr_0.9fr] md:gap-0 md:py-[37px] lg:grid-cols-[1fr_1.2fr_0.9fr_0.95fr]">
          {heroStats.map((s, i) => (
            <div key={s.label} className="md:pr-10 md:not-first:border-l md:not-first:border-line md:not-first:pl-9">
              <strong className="block font-display text-[30px] leading-[1.3] font-normal tracking-[-1px] md:text-[46px] md:tracking-[-1.8px]">
                {s.value}
                <span className="tracking-normal text-ember">{s.suffix}</span>
              </strong>
              <p className="mt-1 max-w-[210px] text-[9px] leading-[1.6] text-[#b0aaa2] md:text-[11px]">{s.label}</p>
            </div>
          ))}
          <a
            href="#work"
            className="group hidden items-center justify-between border-l border-line pl-9 font-mono text-[9px] leading-[1.9] tracking-[1px] text-[#c9c9c9] lg:flex"
          >
            <span>
              THE CODE.
              <br />
              THE REAL-WORLD PRODUCT.
            </span>
            <ArrowUpRight strokeWidth={1.5} className="size-3 transition-transform duration-400 ease-expo group-hover:translate-x-[3px] group-hover:-translate-y-[3px] group-hover:text-ember" />
          </a>
        </div>
      </section>
    </>
  );
}
