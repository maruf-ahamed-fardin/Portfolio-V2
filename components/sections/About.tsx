import { PerspectivePanel } from '@/components/client/Perspective';
import { SectionHead, ULink } from '@/components/primitives';

export default function About() {
  return (
    <section id="about" className="relative pt-[50px] md:pt-[100px]">
      <div className="wrap">
        <SectionHead label="01 / The person behind the code" aside="A connected perspective" />

        <div className="mt-8 grid gap-10 md:mt-12 md:grid-cols-[1.35fr_1fr] md:gap-[clamp(32px,5.4vw,78px)]">
          <div className="order-last md:order-none">
            <PerspectivePanel />
          </div>

          <div className="self-center" data-reveal>
            <h2 className="interfere font-display text-4xl leading-[1.03] tracking-[-1.4px] md:text-[clamp(36px,3.8vw,64px)] md:tracking-[-2px]">
              Code is
              <br />
              the starting point.
              <em className="block">Products are the point.</em>
            </h2>
            <p className="mt-5 text-[15px] leading-[1.75] text-[#d6d6d6] md:text-[17px]">
              I connect interfaces, data, and intelligence.
            </p>
            <p className="mt-5 max-w-[470px] text-sm leading-[1.75] text-mute">
              Since November 2025, I’ve grown from apprentice to Junior Full Stack Developer at SeloraX—working across{' '}
              <strong className="border-b border-ember/60 font-medium text-[#f0dfc8]">
                the interface, the database, and the AI behind it.
              </strong>
            </p>
            <ULink href="#journey" className="mt-5">
              Read my story
            </ULink>
            <div className="mt-8 flex flex-wrap gap-3.5 font-mono text-[7px] tracking-[1.2px] text-[#969696]">
              <span>FRONTEND MIND.</span>
              <span>BACKEND DISCIPLINE.</span>
              <span>AI CURIOSITY.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
