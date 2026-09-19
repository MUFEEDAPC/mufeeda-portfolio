import { ArrowUpRight } from 'lucide-react';
import { projects } from '../../data/portfolio';
import { formatExternalUrl } from '../../utils/validators';
import SectionHeader from '../ui/SectionHeader';
import TiltCard from '../ui/TiltCard';
import ProjectFrame from '../ui/ProjectFrame';
import Reveal from '../ui/Reveal';

export default function Projects() {
  const [featured, ...rest] = projects;

  return (
    <section id="projects" className="relative px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          number="06 — SELECTED PROJECTS"
          title="Real-world products shipped across e-commerce, education, automotive, and enterprise"
        />

        <Reveal>
          <TiltCard
            as="article"
            maxTilt={4}
            className="group overflow-hidden rounded-[28px] border border-white/8 bg-graphite"
          >
            <a
              href={formatExternalUrl(featured.demo)}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="explore"
              className="grid lg:grid-cols-[1.15fr_0.85fr]"
            >
              <ProjectFrame project={featured} featured />
              <div className="flex flex-col justify-center p-6 md:p-10">
                <p className="font-mono text-[11px] tracking-[0.22em] text-accent uppercase">
                  {featured.number} · {featured.category}
                </p>
                <h3 className="mt-3 font-display text-3xl md:text-4xl">{featured.name}</h3>
                <p className="mt-4 text-base text-white">{featured.highlight}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted">{featured.description}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {featured.technologies.map((tech) => (
                    <span key={tech} className="rounded-full border border-white/8 px-3 py-1 text-xs text-accent-soft">
                      {tech}
                    </span>
                  ))}
                </div>
                <span className="mt-8 inline-flex items-center gap-2 text-sm text-white">
                  Explore live project
                  <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </div>
            </a>
          </TiltCard>
        </Reveal>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {rest.map((project, index) => (
            <Reveal key={project.name} delay={(index % 2) * 0.06}>
              <TiltCard
                as="article"
                maxTilt={5}
                className={`group overflow-hidden rounded-3xl border border-white/8 bg-graphite ${
                  index % 3 === 0 ? 'md:translate-y-4' : ''
                }`}
              >
                <a
                  href={formatExternalUrl(project.demo)}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="explore"
                  className="block"
                >
                  <ProjectFrame project={project} />
                  <div className="p-6">
                    <p className="font-mono text-[11px] tracking-[0.18em] text-accent uppercase">
                      {project.number} · {project.category}
                    </p>
                    <h3 className="mt-2 font-display text-2xl">{project.name}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted">{project.description}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <span key={tech} className="rounded-full border border-white/8 px-2.5 py-1 text-[11px] text-accent-soft">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <span className="mt-5 inline-flex items-center gap-2 text-sm text-white">
                      Explore live project
                      <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </a>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
