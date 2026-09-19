import { useEffect, useRef } from 'react';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { runtime } from '../../state/runtime';

export default function CustomCursor() {
  const enabled = useMediaQuery('(hover: hover) and (pointer: fine)');
  const reducedMotion = useReducedMotion();
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const labelRef = useRef(null);

  useEffect(() => {
    if (!enabled) {
      document.body.classList.remove('has-custom-cursor');
      return undefined;
    }

    document.body.classList.add('has-custom-cursor');

    let raf = 0;
    let ringX = window.innerWidth / 2;
    let ringY = window.innerHeight / 2;
    let mode = '';

    const tick = () => {
      const dot = dotRef.current;
      const ring = ringRef.current;
      const label = labelRef.current;
      if (dot && ring) {
        const targetX = runtime.clientX;
        const targetY = runtime.clientY;
        const damp = reducedMotion ? 1 : 0.18;
        ringX += (targetX - ringX) * damp;
        ringY += (targetY - ringY) * damp;
        dot.style.transform = `translate3d(${targetX}px, ${targetY}px, 0)`;
        ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      }

      const hovered = document.elementFromPoint(runtime.clientX, runtime.clientY);
      const interactive = hovered?.closest('a, button, input, textarea, [data-cursor], [role="button"]');
      const nextMode = interactive?.getAttribute('data-cursor') || (interactive ? 'hover' : '');

      if (nextMode !== mode) {
        mode = nextMode;
        ring?.setAttribute('data-mode', mode);
        if (label) {
          label.textContent = mode === 'view' ? 'VIEW' : mode === 'explore' ? 'EXPLORE' : '';
          label.style.opacity = mode === 'view' || mode === 'explore' ? '1' : '0';
        }
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      document.body.classList.remove('has-custom-cursor');
    };
  }, [enabled, reducedMotion]);

  if (!enabled) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[90] hidden md:block" aria-hidden="true">
      <div
        ref={dotRef}
        className="absolute top-0 left-0 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white"
      />
      <div
        ref={ringRef}
        data-mode=""
        className="absolute top-0 left-0 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 transition-[width,height,background,border-color,box-shadow] duration-300 data-[mode=hover]:h-12 data-[mode=hover]:w-12 data-[mode=hover]:border-accent/80 data-[mode=hover]:bg-accent/10 data-[mode=hover]:shadow-[0_0_20px_rgba(79,140,255,0.35)] data-[mode=view]:h-16 data-[mode=view]:w-16 data-[mode=view]:border-accent data-[mode=view]:bg-accent/15 data-[mode=explore]:h-16 data-[mode=explore]:w-16 data-[mode=explore]:border-accent data-[mode=explore]:bg-accent/15"
      >
        <span ref={labelRef} className="font-mono text-[10px] tracking-[0.18em] text-white opacity-0" />
      </div>
    </div>
  );
}
