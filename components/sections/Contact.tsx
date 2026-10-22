import { ArrowUp, ArrowUpRight } from 'lucide-react';
import ContactPanel from '@/components/client/ContactPanel';
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

        <ContactPanel />

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
