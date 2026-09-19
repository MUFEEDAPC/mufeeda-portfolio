import { useReducedMotion } from '../../hooks/useReducedMotion';
import ParticleField from './ParticleField';

export default function GradientMesh() {
  const reducedMotion = useReducedMotion();

  return (
    <div className="gradient-mesh" aria-hidden="true">
      <div className={`mesh-orb mesh-orb--1 ${reducedMotion ? 'mesh-orb--static' : ''}`} />
      <div className={`mesh-orb mesh-orb--2 ${reducedMotion ? 'mesh-orb--static' : ''}`} />
      <div className={`mesh-orb mesh-orb--3 ${reducedMotion ? 'mesh-orb--static' : ''}`} />
      <div className="mesh-grid" />
      <div className="mesh-noise" />
      <ParticleField />
    </div>
  );
}
