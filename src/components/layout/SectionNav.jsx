import { navSections } from '../../data/portfolio';
import { useMediaQuery } from '../../hooks/useMediaQuery';

function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export default function SectionNav({ activeSection }) {
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  if (!isDesktop) return null;

  return (
    <aside className="section-nav" aria-label="Section navigation">
      {navSections.map((item) => (
        <button
          key={item.id}
          type="button"
          className={`section-nav__item ${activeSection === item.id ? 'section-nav__item--active' : ''}`}
          onClick={() => scrollToSection(item.id)}
          aria-label={`Go to ${item.label}`}
          aria-current={activeSection === item.id ? 'true' : undefined}
        >
          <span className="section-nav__dot" />
          <span className="section-nav__label">
            <span className="section-nav__num">{item.number}</span>
            {item.label}
          </span>
        </button>
      ))}
    </aside>
  );
}
