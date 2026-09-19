import { useRef } from 'react';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export default function MagneticButton({
  as: Component = 'a',
  className = '',
  children,
  strength = 10,
  ...props
}) {
  const ref = useRef(null);
  const iconRef = useRef(null);
  const canMagnet = useMediaQuery('(hover: hover) and (pointer: fine)');
  const reducedMotion = useReducedMotion();
  const enabled = canMagnet && !reducedMotion;

  const reset = () => {
    if (!ref.current) return;
    ref.current.style.transform = 'translate3d(0,0,0)';
    if (iconRef.current) iconRef.current.style.transform = 'translate3d(0,0,0)';
  };

  const onMove = (event) => {
    if (!enabled || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * strength;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * strength;
    ref.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    if (iconRef.current) {
      iconRef.current.style.transform = `translate3d(${x * 0.45}px, ${y * 0.45}px, 0)`;
    }
  };

  return (
    <Component
      ref={ref}
      className={`inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-medium transition-[transform,box-shadow,background,border-color] duration-300 will-change-transform ${className}`}
      onMouseMove={onMove}
      onMouseLeave={reset}
      {...props}
    >
      {typeof children === 'function' ? children(iconRef) : children}
    </Component>
  );
}
