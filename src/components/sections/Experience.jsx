import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { experience } from '../../data/portfolio';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import SectionHeader from '../ui/SectionHeader';
import Reveal from '../ui/Reveal';

export default function Experience() {
  const ref = useRef(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 75%', 'end 20%'],
  });
  const scaleY = useSpring(scrollYProgress, { stiffness: 70, damping: 22, restDelta: 0.001 });

  return (
    <section id="experience" className="relative px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeader number="04 — EXPERIENCE" title="Professional journey and impact" />

        <div ref={ref} className="relative mx-auto max-w-3xl pl-8">
          <div className="absolute top-2 bottom-2 left-[7px] w-px bg-white/8" />
          {!reducedMotion && (
            <motion.div
              className="absolute top-2 left-[7px] w-px origin-top bg-gradient-to-b from-accent to-accent/20"
              style={{ scaleY, height: 'calc(100% - 1rem)' }}
            />
          )}

          <div className="space-y-10">
            {experience.map((item) => (
              <Reveal key={item.company} className="relative">
                <span className="absolute top-2 -left-[29px] h-3.5 w-3.5 rounded-full border border-accent bg-void shadow-[0_0_16px_rgba(79,140,255,0.55)]" />
                <article className="rounded-3xl border border-white/8 bg-graphite/75 p-6 md:p-8">
                  <p className="font-mono text-xs tracking-[0.18em] text-accent uppercase">{item.period}</p>
                  <h3 className="mt-3 font-display text-2xl">{item.role}</h3>
                  <p className="mt-1 text-soft">{item.company}</p>
                  <ul className="mt-5 space-y-2 text-sm leading-relaxed text-muted">
                    {item.responsibilities.map((responsibility) => (
                      <li key={responsibility} className="flex gap-3">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                        <span>{responsibility}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {item.technologies.map((tech) => (
                      <span key={tech} className="rounded-full border border-white/8 px-3 py-1 text-xs text-accent-soft">
                        {tech}
                      </span>
                    ))}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
