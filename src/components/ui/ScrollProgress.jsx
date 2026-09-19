import { useEffect, useRef } from 'react';
import { runtime } from '../../state/runtime';

export default function ScrollProgress() {
  const barRef = useRef(null);

  useEffect(() => {
    let raf = 0;
    const tick = () => {
      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${runtime.scrollProgress})`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div
      className="pointer-events-none fixed top-0 right-0 left-0 z-[70] h-[2px] bg-white/5"
      role="progressbar"
      aria-hidden="true"
    >
      <div
        ref={barRef}
        className="h-full origin-left bg-gradient-to-r from-accent via-accent-soft to-accent"
        style={{ transform: 'scaleX(0)' }}
      />
    </div>
  );
}
