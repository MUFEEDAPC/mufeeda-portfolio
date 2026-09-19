import { useEffect, useMemo } from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import CustomCursor from './components/ui/CustomCursor';
import ScrollProgress from './components/ui/ScrollProgress';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Expertise from './components/sections/Expertise';
import Skills from './components/sections/Skills';
import Experience from './components/sections/Experience';
import Education from './components/sections/Education';
import Projects from './components/sections/Projects';
import Contact from './components/sections/Contact';
import { navSections } from './data/portfolio';
import { useActiveSection } from './hooks/useActiveSection';
import { bindRuntime } from './state/runtime';

const SECTION_IDS = ['hero', ...navSections.map((section) => section.id)];

export default function App() {
  const sectionIds = useMemo(() => SECTION_IDS, []);
  const activeSection = useActiveSection(sectionIds);

  useEffect(() => bindRuntime(), []);

  return (
    <div className="bg-page min-h-screen">
      <a href="#hero" className="skip-link">
        Skip to content
      </a>
      <ScrollProgress />
      <CustomCursor />
      <Navbar activeSection={activeSection} />
      <main>
        <Hero />
        <About />
        <Expertise />
        <Skills />
        <Experience />
        <Education />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
