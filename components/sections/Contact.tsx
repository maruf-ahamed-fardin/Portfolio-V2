import type { ComponentProps } from 'react';
import { ArrowUp, ArrowUpRight } from 'lucide-react';
import { FacebookIcon, GitHubIcon, InstagramIcon, LinkedInIcon, SectionHead } from '@/components/primitives';
import { site, socials, type SocialKey } from '@/lib/data';

const icons: Record<SocialKey, (p: ComponentProps<'svg'>) => React.ReactNode> = {
  linkedin: LinkedInIcon,
  github: GitHubIcon,
  facebook: FacebookIcon,
  instagram: InstagramIcon,
};

const footerLinks = [
  ...socials.map((s) => ({ label: s.label, href: s.href })),
  { label: 'Email', href: `mailto:${site.email}` },
  { label: 'CV', href: site.cv },
];

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden pt-[70px] before:pointer-events-none before:absolute before:top-[30%] before:-right-[10%] before:size-[70vw] before:rounded-full before:bg-[radial-gradient(circle,rgba(70,50,30,0.22),transparent_62%)] md:pt-[110px]"
    >
      <div className="wrap relative">
        <SectionHead label="07 / The next chapter" aside="Let’s make it matter" />

        <div className="grid gap-14 lg:grid-cols-[1fr_minmax(0,360px)] lg:items-end lg:gap-12">
        <div data-reveal>
        <p className="mt-8 flex items-center gap-2.5 font-mono text-[8px] tracking-[1.2px] text-[#b2b2b2] before:size-[5px] before:rounded-full before:bg-ember md:mt-12">
          OPEN TO MEANINGFUL OPPORTUNITIES
        </p>
        <h2 className="interfere mt-5 font-display text-[clamp(46px,13vw,80px)] leading-[1.03] font-normal tracking-[-0.035em] md:text-[clamp(54px,7vw,112px)]">
          Something great
          <br />
          starts with <em className="pr-[0.05em]">a hello.</em>
        </h2>
        <a
          href={`mailto:${site.email}`}
          className="group mt-5 inline-flex items-center gap-11 border-b border-ink/65 pt-2 pb-4 text-[21px] tracking-[-0.7px] transition-colors hover:text-ember md:text-[25px]"
        >
          Let’s connect
          <ArrowUpRight strokeWidth={1.5} className="size-4 transition-transform duration-500 ease-expo group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-ember" />
        </a>
        <p className="mt-[18px] text-xs leading-[1.75] text-mute">
          Full-time roles, freelance builds, AI products.
          <br />
          If our worlds overlap, I’d love to hear from you.
        </p>
        <div className="mt-4 flex flex-wrap gap-x-[26px] gap-y-2.5 font-mono text-[9px] tracking-[1px] text-[#bfb2a3]">
          <a href={`mailto:${site.email}`} className="hover:text-ember">
            {site.email.toUpperCase()}
          </a>
          <a href={`tel:${site.phone.replace(/\s/g, '')}`} className="hover:text-ember">
            {site.phone}
          </a>
        </div>
        </div>

        <nav aria-label="Social profiles" data-reveal>
          <span className="caption text-[8px] text-[#c2ae97]">Find me elsewhere</span>
          <ul className="mt-5 border-b border-line">
            {socials.map((s) => {
              const Icon = icons[s.key];
              return (
                <li key={s.key} className="border-t border-line">
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group grid grid-cols-[22px_1fr_auto] items-center gap-4 py-4 transition-[background] duration-350 hover:bg-[linear-gradient(110deg,#ac74400f,#0000_80%)] md:py-[18px]"
                  >
                    <Icon className="size-[18px] text-[#e3c7a6] transition-colors duration-300 group-hover:text-ember" />
                    <span className="min-w-0">
                      <span className="block font-display text-[26px] leading-none tracking-[-0.6px] transition-colors duration-300 group-hover:text-[#ffb287]">
                        {s.label}
                      </span>
                      <span className="mt-1.5 block truncate font-mono text-[8px] tracking-[1px] text-[#9d9387] uppercase">
                        {s.handle || s.note}
                      </span>
                    </span>
                    <ArrowUpRight
                      strokeWidth={1.5}
                      className="size-3.5 text-[#bfb2a3] transition-[transform,color] duration-400 ease-expo group-hover:translate-x-[3px] group-hover:-translate-y-[3px] group-hover:text-ember"
                    />
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
        </div>

        <footer className="mt-14 border-t border-line md:mt-16">
          <div className="flex flex-wrap items-center justify-between gap-5 border-b border-line py-[34px] md:flex-nowrap">
            <a href="#top" className="font-display text-xl tracking-[-0.7px]">
              Maruf Ahamed Fardin<span className="text-ember">.</span>
            </a>
            <div className="order-3 flex w-full flex-wrap items-center gap-x-6 gap-y-2.5 md:order-none md:ml-auto md:w-auto">
              {footerLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  {...(s.href.startsWith('mailto') ? {} : { target: '_blank', rel: 'noreferrer' })}
                  className="inline-flex items-center gap-1.5 text-[11px] text-[#afafaf] transition-colors hover:text-ink md:text-[10px]"
                >
                  {s.label} <ArrowUpRight strokeWidth={1.5} className="size-2" />
                </a>
              ))}
            </div>
            <a
              href="#top"
              aria-label="Back to top"
              className="ml-auto grid size-10 place-items-center rounded-full border border-white/40 transition-colors duration-300 hover:bg-ink hover:text-bg md:ml-3"
            >
              <ArrowUp strokeWidth={1.5} className="size-[13px]" />
            </a>
          </div>
          <div className="grid grid-cols-2 pt-[22px] pb-20 font-mono text-[7px] tracking-[0.6px] text-[#929292] uppercase md:grid-cols-[1fr_auto_1fr] md:pb-[30px] md:text-[6px]">
            <span>© 2026 Maruf Ahamed Fardin</span>
            <span className="hidden md:block">Built with intent. Always evolving.</span>
            <span className="justify-self-end md:mr-[124px]">Dhaka, Bangladesh ↗ The world</span>
          </div>
        </footer>
      </div>
    </section>
  );
}
