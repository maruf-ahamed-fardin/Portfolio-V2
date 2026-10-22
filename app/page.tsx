import Nav from '@/components/client/Nav';
import MotionSystem from '@/components/client/MotionSystem';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Work from '@/components/sections/Work';
import HowIWork from '@/components/sections/HowIWork';
import Impact from '@/components/sections/Impact';
import Projects from '@/components/sections/Projects';
import Stage from '@/components/sections/Stage';
import Interlude from '@/components/sections/Interlude';
import Contact from '@/components/sections/Contact';

// Rendered on the server for every request (SSR); only small interactive islands hydrate on the client.
export const dynamic = 'force-dynamic';

export default function Home() {
  return (
    <>
      <a
        href="#main"
        className="fixed -top-20 left-5 z-[100] rounded-[10px] bg-ink px-[18px] py-3 text-bg focus:top-5"
      >
        Skip to content
      </a>
      <Nav />
      <main id="main">
        <Hero />
        {/* everything after the hero sits above the fixed portrait backdrop */}
        <div className="relative z-[1] bg-bg">
        <About />
        <Work />
        <HowIWork />
        <Impact />
        <Projects />
        <Stage />
        <Interlude />
        <Contact />
        </div>
      </main>
      <MotionSystem />
    </>
  );
}
