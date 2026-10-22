import { SectionHead, SplitHead, ULink } from '@/components/primitives';
import { journey, site } from '@/lib/data';

const statSerif = 'block font-display font-normal leading-none tracking-[-0.03em]';

export default function Impact() {
  return (
    <section
      id="journey"
      className="relative bg-[linear-gradient(180deg,#030303,#070605_30%,#070605_70%,#030303)] pt-[56px] md:pt-[80px]"
    >
      <div className="wrap">
        <SectionHead label="04 / The work, multiplied" aside="People. Products. Possibility." signal />
        <SplitHead
          className="mt-6 md:mt-8 [&_h2]:text-[clamp(34px,4.2vw,68px)]"
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
        <div data-reveal className="mt-6 grid items-center gap-5 border-b border-line pb-6 md:mt-8 md:grid-cols-[auto_minmax(0,420px)] md:justify-start md:gap-[clamp(40px,6vw,96px)]">
          <div className="font-display text-[28vw] leading-[0.88] tracking-[-0.02em] md:text-[clamp(80px,7.5vw,120px)]" aria-label="8 months">
            8
            <sup className="ml-[0.08em] align-[0.4em] text-[0.32em] text-ember">mo</sup>
          </div>
          <div className="">
            <h3 className="font-display text-[24px] leading-[1.15] font-normal tracking-[-0.5px] md:text-[clamp(22px,2vw,28px)]">
              From apprentice.
              <br />
              To full stack.
            </h3>
            <p className="mt-4 text-[13px] leading-[1.75] text-[#c2b7a8]">
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
        <div className="grid grid-cols-2 gap-x-5 gap-y-6 pt-6 md:grid-cols-[1fr_1fr_0.86fr] md:gap-10">
          {[
            { to: 4, sym: '×', title: 'SeloraX products shipped', body: 'The company dashboard, XCall’s chat interface, SeloraX EMS and Team Profile—frontend to database.' },
            { to: 4, sym: '+', title: 'User roles in one system', body: 'Attendance with shift-based late tracking, leave, payroll and QR employee cards in SeloraX EMS.' },
          ].map((s, i) => (
            <div key={s.title} data-reveal>
              <strong className={`${statSerif} text-[clamp(44px,4vw,60px)]`}>
                {s.to}
                <span className="text-[0.42em] tracking-normal text-ember">{s.sym}</span>
              </strong>
              <h4 className="mt-3 text-sm font-medium md:text-[15px]">{s.title}</h4>
              <p className="mt-2 max-w-[320px] text-xs leading-[1.7] text-[#bfb4a6] md:text-[13px] md:leading-[1.75]">{s.body}</p>
            </div>
          ))}
          <div data-reveal className="col-span-2 border-t border-line pt-7 text-center md:col-span-1 md:border-t-0 md:text-left md:border-l md:pt-2 md:pb-2 md:pl-10">
            <span className="caption text-[8px] text-[#c0a88c]">The common thread</span>
            <p className="mt-3.5 font-display text-[21px] leading-[1.35] text-[#e9e0d5] md:text-[clamp(18px,1.7vw,24px)]">
              Build something useful.
              <br />
              Make it reliable.
              <br />
              <em className="text-ink">Give it room to grow.</em>
            </p>
          </div>
        </div>

        {/* SeloraX story + timeline */}
        <div id="journey-story" className="mt-8 grid gap-9 border-t border-line pt-8 md:mt-10 md:grid-cols-[1.45fr_1fr] md:gap-[clamp(40px,5.5vw,80px)] md:pt-10">
          <div data-reveal>
            <span className="caption text-[#c4a88b]">SeloraX / Part of the building story</span>
            <h3 className="mt-5 font-display text-[clamp(32px,3.4vw,52px)] leading-[1.06] font-normal tracking-[-0.035em]">
              From an apprentice.
              <em className="block">To the full stack.</em>
            </h3>
            <p className="mt-6 max-w-[570px] text-sm leading-[1.75] text-[#bcb0a2]">
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
                data-reveal
                className="relative pb-7 before:absolute before:top-0.5 before:-left-[29px] before:size-[7px] before:border before:border-ember before:bg-bg"
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

        {/* GitHub reach */}
        <div className="mt-12 grid grid-cols-2 gap-x-5 gap-y-6 border-t border-line pt-9 md:grid-cols-3 md:gap-11">
          <div className="col-span-2 md:col-span-1">
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
            <div key={s.label} data-reveal>
              <strong className={`${statSerif} text-[clamp(56px,6.5vw,94px)] tracking-[-0.04em]`}>
                {s.to}
                <span className="text-[0.5em] tracking-normal text-[#c79a6f] italic">+</span>
              </strong>
              <span className="mt-3 block text-xs text-[#ccc0b1]">{s.label}</span>
            </div>
          ))}
        </div>
        <p className="mt-6 text-[10px] text-[#a99d90]">
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
