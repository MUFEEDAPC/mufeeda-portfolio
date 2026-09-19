import { useMemo } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const PARTICLE_COUNT = 48;

function createParticles(count) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 20 + 14,
    delay: Math.random() * -20,
    opacity: Math.random() * 0.5 + 0.15,
  }));
}

export default function ParticleField() {
  const reducedMotion = useReducedMotion();
  const particles = useMemo(() => createParticles(PARTICLE_COUNT), []);

  if (reducedMotion) return null;

  return (
    <div className="particle-field" aria-hidden="true">
      {particles.map((p) => (
        <span
          key={p.id}
          className="particle"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
