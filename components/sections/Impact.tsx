import { TravelPanel } from '@/components/client/Perspective';
import { SectionHead, SplitHead, ULink } from '@/components/primitives';
import { journey, site } from '@/lib/data';

const statSerif = 'block font-display font-normal leading-none tracking-[-0.03em]';

export default function Impact() {
  return (
    <section
      id="journey"
      className="relative bg-[linear-gradient(180deg,#030303,#070605_30%,#070605_70%,#030303)] pt-[110px] md:pt-[190px]"
    >
      <div className="wrap">
        <SectionHead label="04 / The work, multiplied" aside="People. Products. Possibility." signal />
        <SplitHead
          title={
            <>
              Growth is a number.
              <em>Craft is personal.</em>
            </>
          }
        >
          Every feature, fix, and release
          <br />
          is a chance to make someone’s day easier.
        </SplitHead>

        {/* the big number */}
        <div className="mt-[60px] grid items-center gap-[30px] border-b border-line pb-[54px] md:mt-[110px] md:grid-cols-[1.5fr_1fr] md:gap-10">
          <div className="font-display text-[35vw] leading-[0.88] tracking-[-0.02em] md:text-[clamp(120px,15vw,240px)]" aria-label="8 months">
            8
            <sup className="ml-[0.08em] align-[0.4em] text-[0.32em] text-ember">mo</sup>
          </div>
          <div className="">
            <h3 className="font-display text-[32px] leading-[1.15] font-normal tracking-[-0.5px] md:text-[clamp(28px,2.9vw,42px)]">
              From apprentice.
              <br />
              To full stack.
            </h3>
            <p className="mt-[22px] text-[13px] leading-[1.75] text-[#c2b7a8]">
              Two promotions in eight months at SeloraX.
              <br />
              Real responsibility, shipped one feature at a time.
            </p>
            <ULink href="#journey-story" className="mt-1">
              The story behind the number
            </ULink>
          </div>
        </div>

        {/* trio */}
        <div className="grid gap-11 pt-[54px] md:grid-cols-[1fr_1fr_0.86fr] md:gap-10">
          {[
            { to: 4, sym: '×', title: 'SeloraX products shipped', body: 'The company dashboard, XCall’s chat interface, SeloraX EMS and Team Profile—frontend to database.' },
            { to: 4, sym: '+', title: 'User roles in one system', body: 'Attendance with shift-based late tracking, leave, payroll and QR employee cards in SeloraX EMS.' },
          ].map((s, i) => (
            <div key={s.title} className="">
              <strong className={`${statSerif} text-[clamp(80px,8vw,115px)]`}>
                {s.to}
                <span className="text-[0.42em] tracking-normal text-ember">{s.sym}</span>
              </strong>
              <h4 className="mt-8 text-[15px] font-medium">{s.title}</h4>
              <p className="mt-3.5 max-w-[320px] text-[13px] leading-[1.75] text-[#bfb4a6]">{s.body}</p>
            </div>
          ))}
          <div className="border-t border-line pt-10 md:border-t-0 md:border-l md:pt-11 md:pb-[30px] md:pl-10">
            <span className="caption text-[8px] text-[#c0a88c]">The common thread</span>
            <p className="mt-3.5 font-display text-[28px] leading-[1.35] text-[#e9e0d5] md:text-[clamp(22px,2.4vw,34px)]">
              Build something useful.
              <br />
              Make it reliable.
              <br />
              <em className="text-ink">Give it room to grow.</em>
            </p>
          </div>
        </div>

        {/* SeloraX story + timeline */}
        <div id="journey-story" className="mt-14 grid gap-[50px] border-t border-line pt-14 md:mt-20 md:grid-cols-[1.45fr_1fr] md:gap-[clamp(40px,5.5vw,80px)] md:pt-[90px]">
          <div className="">
            <span className="caption text-[#c4a88b]">SeloraX / Part of the building story</span>
            <h3 className="mt-[30px] font-display text-[clamp(38px,4.2vw,68px)] leading-[1.06] font-normal tracking-[-0.035em]">
              From an apprentice.
              <em className="block">To the full stack.</em>
            </h3>
            <p className="mt-[34px] max-w-[570px] text-sm leading-[1.75] text-[#bcb0a2]">
              Since November 2025, I’ve grown with SeloraX—from building my first responsive screens to delivering{' '}
              <strong className="font-medium text-[#f0dfc8]">production features end-to-end.</strong> Building its
              dashboard. Shaping its AI calling assistant. Creating the systems the team runs on.
            </p>
            <ULink href="https://selorax.io" className="mt-1.5">
              Visit SeloraX
            </ULink>
          </div>
          <ol className="relative pl-[25px] before:absolute before:top-2 before:bottom-0 before:left-0 before:w-px before:bg-[linear-gradient(180deg,rgba(255,140,89,0.5),rgba(255,255,255,0.12))]">
            {journey.map((j) => (
              <li
                key={j.date}
                className="relative pb-[38px] before:absolute before:top-0.5 before:-left-[29px] before:size-[7px] before:border before:border-ember before:bg-bg"
              >
                <span className="font-mono text-[10px] text-[#dcab84]">{j.date}</span>
                <p className="mt-3 text-[13px] leading-[1.75] text-[#bcb0a2]">
                  <b className="font-medium text-[#e6ddd2]">{j.lead}</b> {j.body}
                </p>
                {j.link && (
                  <ULink href={j.link.href} small tone="warm" icon={false} className="mt-2.5">
                    {j.link.label} ↗
                  </ULink>
                )}
              </li>
            ))}
          </ol>
        </div>

        <TravelPanel />

        {/* GitHub reach */}
        <div className="mt-[66px] grid gap-[30px] border-t border-line pt-[52px] md:grid-cols-3 md:gap-11">
          <div className="">
            <span className="caption leading-[2.3] text-[#c3aa91]">
              An open codebase.
              <br />A lasting habit.
            </span>
            <p className="mt-3 text-[13px] leading-[1.75] text-[#bcb0a2]">
              Building in public on GitHub,
              <br />
              one repository at a time.
            </p>
          </div>
          {[
            { to: 24, label: 'Public GitHub repositories' },
            { to: 60, label: 'Stars across my projects' },
          ].map((s, i) => (
            <div key={s.label} className="">
              <strong className={`${statSerif} text-[clamp(64px,6.5vw,94px)] tracking-[-0.04em]`}>
                {s.to}
                <span className="text-[0.5em] tracking-normal text-[#c79a6f] italic">+</span>
              </strong>
              <span className="mt-[22px] block text-xs text-[#ccc0b1]">{s.label}</span>
            </div>
          ))}
        </div>
        <p className="mt-[38px] text-[10px] text-[#a99d90]">
          Public snapshot from{' '}
          <a href={site.github} target="_blank" rel="noreferrer" className="underline">
            github.com/maruf-ahamed-fardin
          </a>
          , October 2026. Company work at SeloraX lives in private repositories.
        </p>
      </div>
    </section>
  );
}
