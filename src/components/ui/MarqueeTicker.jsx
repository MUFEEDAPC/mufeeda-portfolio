import { useReducedMotion } from '../../hooks/useReducedMotion';

export default function MarqueeTicker({ items }) {
  const reducedMotion = useReducedMotion();
  const doubled = [...items, ...items];

  return (
    <div className="marquee-ticker" aria-hidden="true">
      <div className={`marquee-ticker__track ${reducedMotion ? 'marquee-ticker__track--paused' : ''}`}>
        {doubled.map((item, i) => (
          <span key={`${item}-${i}`} className="marquee-ticker__item">
            <span className="marquee-ticker__dot" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
