import { lazy, Suspense, useState } from 'react';
import { Code2, LineChart, PlugZap, Sparkles } from 'lucide-react';
import { expertise, workflow } from '../../data/portfolio';
import { runtime } from '../../state/runtime';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import SectionHeader from '../ui/SectionHeader';
import Reveal from '../ui/Reveal';
import SceneBoundary from '../three/SceneBoundary';

const ExpertiseCore = lazy(() => import('../three/ExpertiseCore'));

const icons = {
  frontend: Code2,
  uiux: Sparkles,
  api: PlugZap,
  growth: LineChart,
};

export default function Expertise() {
  const [active, setActive] = useState(null);
  const isDesktop = useMediaQuery('(min-width: 1024px)');

  const setHover = (id) => {
    setActive(id);
    runtime.expertise = id;
  };

  return (
    <section id="expertise" className="relative px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          number="02 — EXPERTISE"
          heading="Expertise & Process"
          title="How I transform ideas into polished, production-ready digital products"
        />

        <div className="relative grid gap-4 lg:grid-cols-2 lg:grid-rows-2">
          <div className="pointer-events-none absolute inset-0 hidden items-center justify-center lg:flex">
            <div className="h-[280px] w-[280px]">
              <SceneBoundary fallback={null}>
                <Suspense fallback={null}>
                  <ExpertiseCore />
                </Suspense>
              </SceneBoundary>
            </div>
            {isDesktop && active && (
              <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <line
                  x1="50"
                  y1="50"
                  x2={active === 'frontend' || active === 'uiux' ? '18' : '82'}
                  y2={active === 'frontend' || active === 'api' ? '18' : '82'}
                  stroke="rgba(79,140,255,0.45)"
                  strokeWidth="0.4"
                />
              </svg>
            )}
          </div>

          {expertise.map((item, index) => {
            const Icon = icons[item.id];
            const isActive = active === item.id;
            return (
              <Reveal key={item.id} delay={index * 0.05} className={index % 2 === 1 ? 'lg:mt-10' : ''}>
                <article
                  className={`relative overflow-hidden rounded-3xl border p-6 transition-all duration-300 ${
                    isActive
                      ? '-translate-y-1 border-accent/40 bg-accent/8 shadow-[0_20px_50px_rgba(79,140,255,0.08)]'
                      : 'border-white/8 bg-graphite/70 hover:border-white/14'
                  }`}
                  onMouseEnter={() => setHover(item.id)}
                  onMouseLeave={() => setHover(null)}
                >
                  <div className="mb-4 flex items-center gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent/12 text-accent">
                      <Icon size={18} className={isActive ? 'scale-110' : ''} />
                    </span>
                    <h3 className="font-display text-xl">{item.title}</h3>
                  </div>
                  <p className="text-sm leading-relaxed text-soft">{item.description}</p>
                  <div className={`mt-5 flex flex-wrap gap-2 ${isActive ? 'opacity-100' : 'opacity-80'}`}>
                    {item.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-white/8 bg-void/50 px-3 py-1 font-mono text-[11px] tracking-wide text-accent-soft"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-4">
          {workflow.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.06}>
              <div className="relative h-full rounded-2xl border border-white/8 bg-white/3 p-5">
                {index < workflow.length - 1 && (
                  <span className="absolute top-8 -right-3 hidden h-px w-6 bg-accent/40 md:block" />
                )}
                <p className="font-mono text-xs tracking-[0.2em] text-accent">{item.step}</p>
                <h3 className="mt-3 font-display text-xl">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{item.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
