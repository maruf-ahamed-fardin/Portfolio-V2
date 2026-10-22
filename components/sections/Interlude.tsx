import TimelineFill from '@/components/client/TimelineFill';
import { SectionHead } from '@/components/primitives';
import { interlude } from '@/lib/data';

export default function Interlude() {
  return (
    <section id="interlude" className="relative pt-[50px] md:pt-[100px]">
      <div className="wrap">
        <SectionHead label="Interlude / Still becoming" aside="A journey in motion" />

        <div className="mt-[50px] grid gap-[60px] md:mt-[86px] md:grid-cols-[1.1fr_1fr]">
          <h2 className="display interfere self-start md:sticky md:top-[140px]" data-reveal>
            Started with code.
            <em>Kept asking why.</em>
          </h2>
          <TimelineFill>
            <ol>
              {interlude.map((s, i) => (
                <li
                  data-reveal
                  key={s.date}
                  className="relative pb-[50px] before:absolute before:top-px before:-left-[33px] before:size-[7px] before:rounded-full before:bg-[#cfcfcf] md:before:-left-10"
                >
                  <span className="font-mono text-[8px] tracking-[1.2px] text-[#bfbfbf] uppercase">{s.date}</span>
                  <h3 className="mt-[13px] text-[19px] font-[450] tracking-[-0.5px]">{s.title}</h3>
                  <p className="mt-2.5 max-w-[440px] text-[13px] leading-[1.75] text-mute">{s.body}</p>
                </li>
              ))}
            </ol>
          </TimelineFill>
        </div>
      </div>
    </section>
  );
}
