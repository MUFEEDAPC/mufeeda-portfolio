import { lazy, Suspense, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Download, Mail } from 'lucide-react';
import { heroLabels, personal, stats } from '../../data/portfolio';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { supportsWebGL } from '../../utils/validators';
import CountUp from '../ui/CountUp';
import MagneticButton from '../ui/MagneticButton';
import SceneBoundary from '../three/SceneBoundary';

const HeroScene = lazy(() => import('../three/HeroScene'));

const labels = [
  { text: heroLabels[0], className: 'top-[12%] left-[4%]' },
  { text: heroLabels[1], className: 'top-[22%] right-[6%]' },
  { text: heroLabels[2], className: 'bottom-[28%] left-[8%]' },
  { text: heroLabels[3], className: 'bottom-[16%] right-[10%]' },
];

function VisualFallback() {
  return (
    <div className="relative grid h-full min-h-[320px] w-full place-items-center">
      <div className="absolute h-64 w-64 rounded-full border border-accent/15" />
      <div className="absolute h-44 w-44 rounded-full border border-accent/25" />
      <div className="h-20 w-20 rotate-45 rounded-xl bg-accent/20 shadow-[0_0_80px_rgba(79,140,255,0.35)]" />
    </div>
  );
}

export default function Hero() {
  const reducedMotion = useReducedMotion();
  const canRender3D = useMemo(() => supportsWebGL(), []);

  return (
    <section id="hero" className="relative overflow-hidden pt-28 pb-8 md:pt-32 lg:pt-36">
      <div className="pointer-events-none absolute inset-0 grid-fade opacity-70" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-6">
        <div>
          <motion.p
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent/10 px-3 py-1.5 font-mono text-[11px] tracking-[0.22em] text-accent"
            initial={reducedMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
            {personal.availability}
          </motion.p>

          <motion.h1
            className="mb-3 font-display text-4xl leading-none font-semibold sm:text-5xl lg:text-6xl"
            initial={reducedMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.22 }}
          >
            {personal.name}
          </motion.h1>

          <motion.p
            className="mb-5 text-sm text-muted sm:text-base"
            initial={reducedMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.28 }}
          >
            {personal.role}
          </motion.p>

          <motion.p
            className="font-display text-2xl leading-snug font-semibold text-balance sm:text-3xl lg:text-[2.15rem]"
            initial={reducedMotion ? false : { opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.34 }}
          >
            {personal.headline}
          </motion.p>

          <motion.p
            className="mt-6 max-w-xl text-base leading-relaxed text-soft"
            initial={reducedMotion ? false : { opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.42 }}
          >
            {personal.description}
          </motion.p>

          <motion.div
            className="mt-8 flex flex-wrap gap-3"
            initial={reducedMotion ? false : { opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <MagneticButton
              href="#projects"
              className="bg-accent text-[#071225] shadow-[0_0_28px_rgba(79,140,255,0.28)] hover:shadow-[0_0_36px_rgba(79,140,255,0.42)]"
              data-cursor="view"
            >
              {(iconRef) => (
                <>
                  View Projects
                  <ArrowUpRight ref={iconRef} size={16} />
                </>
              )}
            </MagneticButton>
            <MagneticButton href="#contact" className="border border-white/12 bg-white/4 text-white hover:border-accent/40 hover:bg-accent/10">
              {(iconRef) => (
                <>
                  <Mail ref={iconRef} size={16} />
                  Contact Me
                </>
              )}
            </MagneticButton>
            <MagneticButton
              href={personal.resume}
              download="Mufeeda-Pc-Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-soft hover:text-white"
            >
              {(iconRef) => (
                <>
                  <Download ref={iconRef} size={16} />
                  View Resume
                </>
              )}
            </MagneticButton>
          </motion.div>
        </div>

        <motion.div
          className="relative h-[380px] sm:h-[440px] lg:h-[560px]"
          initial={reducedMotion ? false : { opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <div className="absolute inset-6 rounded-full bg-accent/10 blur-3xl" />
          <SceneBoundary fallback={<VisualFallback />}>
            {canRender3D ? (
              <Suspense fallback={<VisualFallback />}>
                <HeroScene />
              </Suspense>
            ) : (
              <VisualFallback />
            )}
          </SceneBoundary>
          {labels.map((label) => (
            <span
              key={label.text}
              className={`pointer-events-none absolute hidden rounded-full border border-white/10 bg-void/70 px-3 py-1 font-mono text-[10px] tracking-[0.2em] text-accent-soft md:block ${label.className}`}
            >
              {label.text}
            </span>
          ))}
        </motion.div>
      </div>

      <div className="relative mx-auto mt-10 grid max-w-6xl grid-cols-2 gap-3 px-6 md:grid-cols-4 md:gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-2xl border border-white/8 bg-white/3 px-5 py-5">
            <p className="font-display text-3xl font-semibold text-white">
              {stat.value !== null ? <CountUp value={stat.value} suffix={stat.suffix} /> : stat.label}
            </p>
            <p className="mt-1 text-sm text-muted">{stat.value !== null ? stat.label : stat.detail}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
