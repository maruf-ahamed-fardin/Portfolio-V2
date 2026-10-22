import { ArrowUp, ArrowUpRight } from 'lucide-react';
import { SectionHead } from '@/components/primitives';
import { site, socials } from '@/lib/data';

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
