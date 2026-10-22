import Disciplines from '@/components/client/Disciplines';
import { SectionHead } from '@/components/primitives';

export default function HowIWork() {
  return (
    <section id="stack" className="relative pt-[50px] md:pt-[100px]">
      <div className="wrap">
        <SectionHead label="03 / How I think & work" aside="Depth meets perspective" />
        <Disciplines
          intro={
            <>
              <h2 className="display interfere">
                How I work.
                <em>From idea to impact.</em>
              </h2>
              <p className="mt-5 text-[13px] text-mute md:mt-[30px]">Choose a discipline. Follow the thinking.</p>
            </>
          }
        />
      </div>
    </section>
  );
}
