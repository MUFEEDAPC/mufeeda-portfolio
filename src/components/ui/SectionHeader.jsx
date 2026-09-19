import Reveal from './Reveal';

export default function SectionHeader({ number, title, heading, description, className = '' }) {
  return (
    <Reveal className={`mb-12 max-w-3xl md:mb-16 ${className}`}>
      <p className="mb-4 font-mono text-[11px] tracking-[0.28em] text-accent uppercase">
        {number}
      </p>
      {heading && (
        <p className="mb-3 text-sm font-medium tracking-wide text-muted uppercase">{heading}</p>
      )}
      <h2 className="font-display text-3xl leading-tight font-semibold text-balance sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description && <p className="mt-5 max-w-2xl text-base leading-relaxed text-soft">{description}</p>}
    </Reveal>
  );
}
