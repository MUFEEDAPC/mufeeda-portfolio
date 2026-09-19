import { Rocket, Target, Wrench, Zap } from 'lucide-react';
import { about } from '../../data/portfolio';
import SectionHeader from '../ui/SectionHeader';
import TiltCard from '../ui/TiltCard';
import Reveal from '../ui/Reveal';

const icons = {
  zap: Zap,
  target: Target,
  wrench: Wrench,
  rocket: Rocket,
};

export default function About() {
  return (
    <section id="about" className="relative px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeader number={about.eyebrow} heading={about.heading} title={about.title} />

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
          <Reveal>
            <div className="space-y-5 text-base leading-relaxed text-soft">
              {about.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              <p className="font-display text-xl text-white">{about.cta}</p>
            </div>
          </Reveal>

          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {about.principles.map((item, index) => {
              const Icon = icons[item.icon];
              return (
                <Reveal key={item.title} delay={index * 0.06}>
                  <TiltCard className="h-full overflow-hidden rounded-2xl border border-white/8 bg-graphite/80 p-5">
                    <div className="relative">
                      <div className="mb-4 grid h-10 w-10 place-items-center rounded-xl bg-accent/12 text-accent">
                        <Icon size={18} />
                      </div>
                      <h3 className="font-display text-lg text-white">{item.title}</h3>
                      <p className="mt-1 text-sm text-muted">{item.detail}</p>
                    </div>
                  </TiltCard>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
