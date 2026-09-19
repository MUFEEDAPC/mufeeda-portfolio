import { useGSAP } from '@gsap/react';
import { useRef } from 'react';
import { initScrollAnimations } from '../animations/gsapScene';
import { useReducedMotion } from '../hooks/useReducedMotion';

export default function ScrollAnimations({ children }) {
  const ref = useRef(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => initScrollAnimations({ reducedMotion }),
    { scope: ref, dependencies: [reducedMotion] }
  );

  return (
    <div className="site-content" ref={ref}>
      {children}
    </div>
  );
}
