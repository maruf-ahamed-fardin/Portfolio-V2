import { ArrowUpRight } from 'lucide-react';
import ProjectGrid from '@/components/client/ProjectGrid';
import { GitHubIcon, LinkedInIcon, SectionHead, SplitHead, ULink } from '@/components/primitives';
import { site } from '@/lib/data';

const formats = [
  {
    Icon: GitHubIcon,
    tag: 'GitHub / @maruf-ahamed-fardin',
    title: 'Code, in',
    em: 'the open.',
    body: 'Full-stack apps, AI experiments, and the commits behind every project.',
    cta: 'Explore my GitHub',
    href: site.github,
  },
  {
    Icon: LinkedInIcon,
    tag: 'LinkedIn / Maruf Ahamed Fardin',
    title: 'The thinking',
    em: 'behind the work.',
    body: 'Career updates, lessons from shipping, and the people building alongside me.',
    cta: 'Connect on LinkedIn',
    href: site.linkedin,
  },
];

export default function Projects() {
  return (
    <section id="projects" className="relative pt-[44px] md:pt-[72px]">
      <div className="wrap">
        <SectionHead label="05 / Projects in the wild" aside="Deployed. Public. Open to explore." signal />
        <SplitHead
          className="mt-6 md:mt-7 [&_h2]:text-[clamp(34px,4.4vw,72px)]"
          title={
            <>
              A builder.
              <em>With things to show.</em>
            </>
          }
        >
          I learn by shipping.
          <br />
          Side projects, experiments, and tools
          <br />
          that ended up live on the internet.
          <br />
          <ULink href={site.github} className="mt-1.5">
            My GitHub profile
          </ULink>
        </SplitHead>

        <ProjectGrid />

        <div className="mt-12 grid border-t border-line pt-8 md:mt-16 md:grid-cols-3">
          <div className="">
            <span className="caption text-[8px] text-[#c2ae97]">The conversation continues</span>
            <h3 className="mt-4 font-display text-4xl leading-[1.1] font-normal md:text-[clamp(28px,3vw,43px)]">
              Different formats.
              <em className="block">The same curiosity.</em>
            </h3>
          </div>
          {formats.map(({ Icon, ...f }, i) => (
            <div
              key={f.tag}
              className="group glitch-em mt-7 flex flex-col border-t border-line pt-7 transition-[border-color,background] duration-350 hover:border-[#be9062] hover:bg-[linear-gradient(110deg,#ac74400a,#0000_80%)] md:mt-0 md:border-t-0 md:border-l md:pt-0 md:pb-1.5 md:pl-[30px]"
            >
              <Icon className="size-[22px] text-[#e3c7a6]" />
              <span className="caption mt-4 text-[8px] text-[#bfad98]">{f.tag}</span>
              <h4 className="mt-3 font-display text-4xl leading-[1.08] tracking-[-1.08px] md:text-[clamp(26px,2.6vw,38px)]">
                {f.title}
                <em className="block transition-colors group-hover:text-[#ffb287]">{f.em}</em>
              </h4>
              <p className="mt-4 max-w-[290px] text-[13px] leading-[1.75] text-[#b7ada0]">{f.body}</p>
              <a href={f.href} target="_blank" rel="noreferrer" className="group mt-5 flex items-center justify-between text-xs text-[#e3d4c0]">
                {f.cta}
                <ArrowUpRight strokeWidth={1.5} className="size-3 transition-transform duration-400 ease-expo group-hover:translate-x-[3px] group-hover:-translate-y-[3px] group-hover:text-ember" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
