import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { useReducedMotion } from '../../hooks/useReducedMotion';

function Object3D({ reducedMotion }) {
  const ref = useRef(null);

  useFrame((_, delta) => {
    if (!ref.current || reducedMotion) return;
    ref.current.rotation.y += delta * 0.12;
    ref.current.rotation.x += delta * 0.04;
  });

  return (
    <>
      <ambientLight intensity={0.35} />
      <pointLight position={[2, 2, 2]} intensity={8} color="#4f8cff" />
      <group ref={ref}>
        <mesh>
          <torusKnotGeometry args={[1.05, 0.18, 96, 12]} />
          <meshStandardMaterial color="#121826" emissive="#4f8cff" emissiveIntensity={0.18} metalness={0.6} roughness={0.3} />
        </mesh>
        <mesh scale={1.12}>
          <torusKnotGeometry args={[1.05, 0.18, 48, 8]} />
          <meshBasicMaterial color="#4f8cff" wireframe transparent opacity={0.16} />
        </mesh>
      </group>
    </>
  );
}

export default function ContactScene() {
  const reducedMotion = useReducedMotion();
  const isMobile = useMediaQuery('(max-width: 767px)');

  return (
    <div className="absolute inset-0 opacity-40" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 5.2], fov: 40 }}
        dpr={1}
        frameloop={reducedMotion ? 'demand' : 'always'}
        gl={{ alpha: true, antialias: false, powerPreference: 'low-power' }}
      >
        <Object3D reducedMotion={reducedMotion} />
      </Canvas>
    </div>
  );
}
