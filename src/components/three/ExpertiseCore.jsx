import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { runtime } from '../../state/runtime';

function Core({ reducedMotion }) {
  const group = useRef(null);
  const glow = useRef(null);

  useFrame((state, delta) => {
    if (!group.current) return;
    const active = Boolean(runtime.expertise);
    const speed = active ? 0.55 : 0.18;
    if (!reducedMotion) {
      group.current.rotation.y += delta * speed;
      group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, active ? 0.35 : 0.18, 3, delta);
    }
    const scale = THREE.MathUtils.damp(group.current.scale.x, active ? 1.08 : 1, 4, delta);
    group.current.scale.setScalar(scale);
    if (glow.current) {
      glow.current.material.emissiveIntensity = THREE.MathUtils.damp(
        glow.current.material.emissiveIntensity,
        active ? 0.9 : 0.35,
        4,
        delta
      );
    }
  });

  return (
    <>
      <ambientLight intensity={0.45} />
      <pointLight position={[2, 2, 3]} intensity={10} color="#4f8cff" />
      <group ref={group}>
        <mesh ref={glow}>
          <icosahedronGeometry args={[1, 1]} />
          <meshStandardMaterial color="#101826" emissive="#4f8cff" emissiveIntensity={0.35} metalness={0.7} roughness={0.25} />
        </mesh>
        <mesh scale={1.22}>
          <icosahedronGeometry args={[1, 0]} />
          <meshBasicMaterial color="#7aa3ff" wireframe transparent opacity={0.28} />
        </mesh>
        <mesh rotation={[Math.PI / 2, 0.2, 0]}>
          <torusGeometry args={[1.45, 0.012, 8, 64]} />
          <meshBasicMaterial color="#4f8cff" transparent opacity={0.5} />
        </mesh>
      </group>
    </>
  );
}

export default function ExpertiseCore() {
  const reducedMotion = useReducedMotion();
  const isMobile = useMediaQuery('(max-width: 767px)');

  return (
    <div className="h-[280px] w-full" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 4.2], fov: 45 }}
        dpr={isMobile ? 1 : [1, 1.4]}
        frameloop={reducedMotion ? 'demand' : 'always'}
        gl={{ alpha: true, antialias: !isMobile, powerPreference: 'high-performance' }}
      >
        <Core reducedMotion={reducedMotion} />
      </Canvas>
    </div>
  );
}
