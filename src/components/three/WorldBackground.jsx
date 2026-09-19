import { useGSAP } from '@gsap/react';
import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import GlassOrbField from '../ui/GlassOrbField';
import DepthGrid from './DepthGrid';
import FloatingPlanes from './FloatingPlanes';

gsap.registerPlugin(ScrollTrigger);

export default function WorldBackground() {
  const flowRef = useRef(null);
  const gridRef = useRef(null);
  const planeRefs = useRef([]);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (reducedMotion) return;

      const flow = flowRef.current;
      const grid = gridRef.current;

      if (grid) {
        gsap.to(grid, {
          y: 120,
          scale: 1.25,
          backgroundPosition: '0px 400px',
          ease: 'none',
          scrollTrigger: {
            trigger: document.body,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1.5,
          },
        });
      }

      gsap.to('.depth-grid--secondary', {
        y: 160,
        scale: 1.3,
        ease: 'none',
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 2,
        },
      });

      gsap.to('.ambient-backdrop', {
        scale: 1.08,
        ease: 'none',
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.8,
        },
      });

      planeRefs.current.filter(Boolean).forEach((plane, i) => {
        gsap.to(plane, {
          y: -80 - i * 40,
          rotateY: i % 2 === 0 ? 14 : -14,
          rotateX: i % 2 === 0 ? 6 : -4,
          scale: 1 + i * 0.06,
          ease: 'none',
          scrollTrigger: {
            trigger: document.body,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1.3 + i * 0.2,
          },
        });
      });

      gsap.utils.toArray('.mesh-orb').forEach((orb, i) => {
        gsap.to(orb, {
          y: -100 - i * 50,
          scale: 1.12 + i * 0.1,
          ease: 'none',
          scrollTrigger: {
            trigger: document.body,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1.1 + i * 0.25,
          },
        });
      });

      gsap.utils.toArray('.glass-orb').forEach((orb, i) => {
        gsap.to(orb, {
          y: -40 - i * 20,
          x: i % 2 === 0 ? 15 : -15,
          ease: 'none',
          scrollTrigger: {
            trigger: document.body,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1.5 + i * 0.15,
          },
        });
      });

      const mm = gsap.matchMedia();
      mm.add('(min-width: 768px)', () => {
        const onMove = (e) => {
          const x = (e.clientX / window.innerWidth - 0.5) * 2;
          const y = (e.clientY / window.innerHeight - 0.5) * 2;
          if (flow) {
            gsap.to(flow, {
              x: x * 24,
              y: y * 16,
              rotateY: x * 4,
              rotateX: -y * 3,
              duration: 1.4,
              ease: 'power2.out',
              overwrite: 'auto',
            });
          }
        };
        window.addEventListener('mousemove', onMove);
        return () => window.removeEventListener('mousemove', onMove);
      });

      return () => mm.revert();
    },
    { dependencies: [reducedMotion] }
  );

  return (
    <div className="world-bg" aria-hidden="true">
      <div className="world-bg__flow" ref={flowRef}>
        <div className="ambient-backdrop" aria-hidden="true" />
        <DepthGrid gridRef={gridRef} />
        <GlassOrbField />
        <FloatingPlanes planeRefs={planeRefs} />
        <div className="world-bg__vignette" />
      </div>
    </div>
  );
}
