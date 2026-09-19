import { useEffect, useState } from 'react';

export function useActiveSection(sectionIds) {
  const [active, setActive] = useState(sectionIds[0] ?? 'about');

  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (!elements.length) return undefined;

    const ratios = new Map(sectionIds.map((id) => [id, 0]));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          ratios.set(entry.target.id, entry.intersectionRatio);
        });

        let next = sectionIds[0];
        let best = 0;

        ratios.forEach((ratio, id) => {
          if (ratio > best) {
            best = ratio;
            next = id;
          }
        });

        if (window.scrollY < 80) {
          next = sectionIds[0];
        }

        const nearBottom =
          window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 48;
        if (nearBottom) {
          next = sectionIds[sectionIds.length - 1];
        }

        setActive((prev) => (prev === next ? prev : next));
      },
      {
        threshold: [0.18, 0.32, 0.48, 0.64],
        rootMargin: '-18% 0px -42% 0px',
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [sectionIds]);

  return active;
}
