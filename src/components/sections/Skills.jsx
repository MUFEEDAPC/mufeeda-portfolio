import { useMemo, useState } from 'react';
import { skillCategories, skills } from '../../data/portfolio';
import SectionHeader from '../ui/SectionHeader';
import Reveal from '../ui/Reveal';

export default function Skills() {
  const [category, setCategory] = useState('All');
  const [hovered, setHovered] = useState(null);

  const visible = useMemo(
    () => (category === 'All' ? skills : skills.filter((skill) => skill.category === category)),
    [category]
  );

  const reactSkill = skills.find((skill) => skill.featured);
  const satellites = visible.filter((skill) => !skill.featured);

  return (
    <section id="skills" className="relative px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          number="03 — SKILLS & TOOLS"
          title="Technologies I use to ship polished, production-ready products"
        />

        <div className="mb-10 flex flex-wrap gap-2">
          {skillCategories.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setCategory(item)}
              className={`rounded-full px-4 py-2 text-sm transition-colors ${
                category === item
                  ? 'bg-accent text-[#071225]'
                  : 'border border-white/8 bg-white/3 text-muted hover:text-white'
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        <Reveal>
          <div className="relative mx-auto hidden min-h-[520px] max-w-3xl lg:block">
            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" aria-hidden="true">
              {satellites.map((skill, index) => {
                const angle = (index / satellites.length) * Math.PI * 2 - Math.PI / 2;
                const x = 50 + Math.cos(angle) * 34;
                const y = 50 + Math.sin(angle) * 34;
                const active = !hovered || hovered === skill.name;
                return (
                  <line
                    key={skill.name}
                    x1="50"
                    y1="50"
                    x2={x}
                    y2={y}
                    stroke={hovered === skill.name ? 'rgba(79,140,255,0.7)' : 'rgba(79,140,255,0.16)'}
                    strokeWidth={hovered === skill.name ? '0.45' : '0.2'}
                    opacity={active ? 1 : 0.25}
                  />
                );
              })}
            </svg>

            <div className="absolute top-1/2 left-1/2 z-10 flex h-28 w-28 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-accent/40 bg-graphite shadow-[0_0_50px_rgba(79,140,255,0.18)]">
              <img src={reactSkill.icon} alt="" className="h-10 w-10" />
              <span className="mt-1 text-sm font-medium">{reactSkill.name}</span>
            </div>

            {satellites.map((skill, index) => {
              const angle = (index / satellites.length) * Math.PI * 2 - Math.PI / 2;
              const x = 50 + Math.cos(angle) * 34;
              const y = 50 + Math.sin(angle) * 34;
              return (
                <button
                  key={skill.name}
                  type="button"
                  onMouseEnter={() => setHovered(skill.name)}
                  onMouseLeave={() => setHovered(null)}
                  className="absolute flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-2xl border border-white/8 bg-ink/90 transition-transform duration-300 hover:-translate-y-[calc(50%+6px)] hover:border-accent/40"
                  style={{ left: `${x}%`, top: `${y}%` }}
                >
                  {skill.icon && <img src={skill.icon} alt="" className="h-7 w-7" />}
                  <span className="mt-1 px-1 text-center text-[11px] text-soft">{skill.name}</span>
                </button>
              );
            })}
          </div>
        </Reveal>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:hidden">
          {visible.map((skill) => (
            <div key={skill.name} className="flex items-center gap-3 rounded-2xl border border-white/8 bg-graphite/80 px-4 py-4">
              {skill.icon && <img src={skill.icon} alt="" className="h-7 w-7" />}
              <span className="text-sm">{skill.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
