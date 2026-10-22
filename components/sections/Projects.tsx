import { ArrowUpRight, FileDown } from 'lucide-react';
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
    <section id="projects" className="relative pt-[50px] md:pt-[100px]">
      <div className="wrap">
        <SectionHead label="05 / Projects in the wild" aside="Deployed. Public. Open to explore." signal />
        <SplitHead
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

        <div className="mt-[70px] grid border-t border-line pt-[50px] md:mt-[100px] md:grid-cols-3">
          <div className="">
            <span className="caption text-[8px] text-[#c2ae97]">The conversation continues</span>
            <h3 className="mt-[30px] font-display text-4xl leading-[1.1] font-normal md:text-[clamp(28px,3vw,43px)]">
              Different formats.
              <em className="block">The same curiosity.</em>
            </h3>
          </div>
          {formats.map(({ Icon, ...f }, i) => (
            <div
              key={f.tag}
              className="group glitch-em mt-9 flex flex-col border-t border-line pt-9 transition-[border-color,background] duration-350 hover:border-[#be9062] hover:bg-[linear-gradient(110deg,#ac74400a,#0000_80%)] md:mt-0 md:border-t-0 md:border-l md:pt-0 md:pb-1.5 md:pl-[30px]"
            >
              <Icon className="size-[22px] text-[#e3c7a6]" />
              <span className="caption mt-[30px] text-[8px] text-[#bfad98]">{f.tag}</span>
              <h4 className="mt-[22px] font-display text-4xl leading-[1.12] tracking-[-1.08px] md:text-[clamp(28px,3vw,43px)]">
                {f.title}
                <em className="block transition-colors group-hover:text-[#ffb287]">{f.em}</em>
              </h4>
              <p className="mt-[26px] max-w-[290px] text-[13px] leading-[1.75] text-[#b7ada0]">{f.body}</p>
              <a href={f.href} target="_blank" rel="noreferrer" className="group mt-[38px] flex items-center justify-between text-xs text-[#e3d4c0]">
                {f.cta}
                <ArrowUpRight strokeWidth={1.5} className="size-3 transition-transform duration-400 ease-expo group-hover:translate-x-[3px] group-hover:-translate-y-[3px] group-hover:text-ember" />
              </a>
            </div>
          ))}
        </div>

        <a
          href={site.cv}
          target="_blank"
          rel="noreferrer"
          className="group mt-14 flex items-center gap-3.5 border-y border-line py-[22px] text-xs text-[#c7b7a2] transition-[color,padding] duration-500 ease-expo hover:pl-2.5 hover:text-ink md:gap-6 md:text-[13px]"
        >
          <FileDown strokeWidth={1.3} className="size-5 shrink-0" />
          Download my CV — experience, skills and projects on one page
          <ArrowUpRight strokeWidth={1.5} className="ml-auto size-3 shrink-0 transition-transform duration-400 ease-expo group-hover:translate-x-[3px] group-hover:-translate-y-[3px] group-hover:text-ember" />
        </a>
      </div>
    </section>
  );
}
