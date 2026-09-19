import { useRef } from 'react';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export default function TiltCard({
  as: Component = 'article',
  className = '',
  children,
  maxTilt = 6,
  ...props
}) {
  const ref = useRef(null);
  const glowRef = useRef(null);
  const canTilt = useMediaQuery('(hover: hover) and (pointer: fine)');
  const reducedMotion = useReducedMotion();
  const enabled = canTilt && !reducedMotion;

  const reset = () => {
    if (!ref.current) return;
    ref.current.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0)';
    if (glowRef.current) glowRef.current.style.opacity = '0';
  };

  const onMove = (event) => {
    if (!enabled || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    const rotateY = (x - 0.5) * maxTilt * 2;
    const rotateX = (0.5 - y) * maxTilt * 2;
    ref.current.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(8px)`;
    if (glowRef.current) {
      glowRef.current.style.opacity = '1';
      glowRef.current.style.background = `radial-gradient(420px circle at ${x * 100}% ${y * 100}%, rgba(79,140,255,0.22), transparent 52%)`;
    }
  };

  return (
    <Component
      ref={ref}
      className={`relative transform-gpu transition-transform duration-200 ease-out ${className}`}
      onMouseMove={onMove}
      onMouseLeave={reset}
      {...props}
    >
      <div ref={glowRef} className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300" />
      {typeof children === 'function' ? children() : children}
    </Component>
  );
}
