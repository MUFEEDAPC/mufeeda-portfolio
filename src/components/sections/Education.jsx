import { education } from '../../data/portfolio';
import SectionHeader from '../ui/SectionHeader';
import Reveal from '../ui/Reveal';

export default function Education() {
  return (
    <section id="education" className="relative px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          number="05 — EDUCATION"
          title="Academic foundation in communication engineering"
        />

        <div className="grid gap-4 md:grid-cols-2">
          {education.map((item, index) => (
            <Reveal key={item.degree} delay={index * 0.08}>
              <article className="h-full rounded-3xl border border-white/8 bg-white/3 p-6 md:p-8">
                <p className="font-mono text-xs tracking-[0.18em] text-accent uppercase">{item.period}</p>
                <h3 className="mt-4 font-display text-xl leading-snug md:text-2xl">{item.degree}</h3>
                <p className="mt-3 text-soft">{item.institution}</p>
                <p className="mt-4 text-sm text-muted">{item.grade}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
