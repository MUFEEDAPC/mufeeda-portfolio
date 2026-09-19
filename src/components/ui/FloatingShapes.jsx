import { useReducedMotion } from '../../hooks/useReducedMotion';

const SHAPES = [
  { className: 'shape shape--ring shape--1', size: 120 },
  { className: 'shape shape--diamond shape--2', size: 48 },
  { className: 'shape shape--cross shape--3', size: 64 },
  { className: 'shape shape--ring shape--4', size: 80 },
  { className: 'shape shape--dot-grid shape--5', size: 100 },
];

export default function FloatingShapes() {
  const reducedMotion = useReducedMotion();

  return (
    <div className={`floating-shapes ${reducedMotion ? 'floating-shapes--static' : ''}`} aria-hidden="true">
      {SHAPES.map((shape) => (
        <div
          key={shape.className}
          className={shape.className}
          style={{ width: shape.size, height: shape.size }}
        />
      ))}
    </div>
  );
}
