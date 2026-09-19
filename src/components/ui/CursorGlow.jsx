import { useEffect, useRef } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export default function CursorGlow() {
  const glowRef = useRef(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion || !window.matchMedia('(pointer: fine)').matches) return undefined;

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const current = { ...target };
    let frameId = 0;

    const handlePointerMove = (event) => {
      target.x = event.clientX;
      target.y = event.clientY;
    };

    const render = () => {
      current.x += (target.x - current.x) * 0.12;
      current.y += (target.y - current.y) * 0.12;
      glowRef.current?.style.setProperty(
        'transform',
        `translate3d(${current.x}px, ${current.y}px, 0)`
      );
      frameId = requestAnimationFrame(render);
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    frameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      cancelAnimationFrame(frameId);
    };
  }, [reducedMotion]);

  if (reducedMotion) return null;

  return <div ref={glowRef} className="cursor-glow" aria-hidden="true" />;
}
