import { Suspense, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Line, Sparkles } from '@react-three/drei';
import * as THREE from 'three';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const NODES = [
  [-2.15, 0.9, -0.8],
  [-1.65, -1.2, 0.2],
  [-0.85, 1.75, -0.4],
  [0, 2.05, -1],
  [0.9, 1.55, 0.35],
  [1.95, 0.8, -0.7],
  [2.15, -0.7, 0.15],
  [1.1, -1.65, -0.5],
  [0, -2, 0.25],
  [-1.15, -1.65, -0.65],
  [-2.3, -0.25, -1.15],
  [0.15, 0.15, 1.65],
];

const CONNECTIONS = [
  [0, 2], [0, 10], [1, 9], [1, 10], [2, 3], [2, 11],
  [3, 4], [4, 5], [4, 11], [5, 6], [6, 7], [7, 8],
  [8, 9], [9, 10], [0, 11], [1, 11], [5, 11], [7, 11],
];

function InterfacePanel({ position, rotation, width = 1.15 }) {
  return (
    <group position={position} rotation={rotation}>
      <mesh>
        <planeGeometry args={[width, 0.72]} />
        <meshPhysicalMaterial
          color="#0b1c2b"
          emissive="#123d52"
          emissiveIntensity={0.35}
          roughness={0.35}
          metalness={0.35}
          transparent
          opacity={0.72}
          side={THREE.DoubleSide}
        />
      </mesh>
      {[0.17, 0, -0.17].map((y, index) => (
        <mesh key={y} position={[-0.15 + index * 0.06, y, 0.012]}>
          <planeGeometry args={[width * (0.48 + index * 0.08), 0.025]} />
          <meshBasicMaterial color={index === 0 ? '#7ddffc' : '#28566b'} />
        </mesh>
      ))}
    </group>
  );
}

function DigitalEcosystem({ isMobile, reducedMotion }) {
  const systemRef = useRef(null);
  const coreRef = useRef(null);
  const hoveredRef = useRef(false);
  const linePoints = useMemo(
    () => CONNECTIONS.map(([from, to]) => [NODES[from], NODES[to]]),
    []
  );

  useFrame((state, delta) => {
    if (!systemRef.current || !coreRef.current || reducedMotion) return;

    const pointerScale = isMobile ? 0 : 1;
    const scrollProgress = Math.min(window.scrollY / Math.max(window.innerHeight, 1), 1);
    const autoRotation = state.clock.elapsedTime * (isMobile ? 0.045 : 0.07);
    const targetRotationY = autoRotation + state.pointer.x * 0.28 * pointerScale + scrollProgress * 0.22;
    const targetRotationX = state.pointer.y * -0.18 * pointerScale + scrollProgress * 0.08;
    const targetScale = hoveredRef.current && !isMobile ? 1.045 : 1;

    systemRef.current.rotation.y = THREE.MathUtils.damp(
      systemRef.current.rotation.y,
      targetRotationY,
      3.4,
      delta
    );
    systemRef.current.rotation.x = THREE.MathUtils.damp(
      systemRef.current.rotation.x,
      targetRotationX,
      3.4,
      delta
    );
    systemRef.current.position.y = THREE.MathUtils.damp(
      systemRef.current.position.y,
      -scrollProgress * 0.24,
      3,
      delta
    );
    const nextScale = THREE.MathUtils.damp(systemRef.current.scale.x, targetScale, 5, delta);
    systemRef.current.scale.setScalar(nextScale);

    coreRef.current.rotation.x += delta * 0.09;
    coreRef.current.rotation.z -= delta * 0.055;
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[4, 5, 5]} intensity={1.5} color="#d8f7ff" />
      <pointLight position={[-3, -1, 3]} intensity={16} distance={8} color="#36c5f0" />
      <pointLight position={[3, 2, -1]} intensity={10} distance={7} color="#3159a8" />

      <Sparkles
        count={isMobile ? 24 : 58}
        scale={isMobile ? [5, 5, 3] : [7, 6, 4]}
        size={isMobile ? 1.2 : 1.6}
        speed={reducedMotion ? 0 : 0.16}
        opacity={0.34}
        color="#7ddffc"
      />

      <gridHelper
        args={[12, isMobile ? 14 : 24, '#17465c', '#0c2635']}
        position={[0, -2.65, -1.8]}
        rotation={[0, 0, 0]}
      />

      <group
        ref={systemRef}
        onPointerEnter={() => { hoveredRef.current = true; }}
        onPointerLeave={() => { hoveredRef.current = false; }}
      >
        <group ref={coreRef}>
          <mesh>
            <icosahedronGeometry args={[1.15, isMobile ? 1 : 2]} />
            <meshPhysicalMaterial
              color="#0a1e2d"
              emissive="#36c5f0"
              emissiveIntensity={0.28}
              roughness={0.24}
              metalness={0.72}
              clearcoat={0.8}
              clearcoatRoughness={0.2}
            />
          </mesh>
          <mesh scale={1.28}>
            <icosahedronGeometry args={[1.15, 1]} />
            <meshBasicMaterial color="#7ddffc" wireframe transparent opacity={0.24} />
          </mesh>
          <mesh rotation={[Math.PI / 2.7, 0.2, 0]}>
            <torusGeometry args={[1.65, 0.018, 6, isMobile ? 48 : 96]} />
            <meshBasicMaterial color="#36c5f0" transparent opacity={0.55} />
          </mesh>
          <mesh rotation={[0.35, Math.PI / 2.1, 0.5]}>
            <torusGeometry args={[1.88, 0.012, 6, isMobile ? 48 : 96]} />
            <meshBasicMaterial color="#4775c8" transparent opacity={0.38} />
          </mesh>
        </group>

        {!isMobile && (
          <>
            <InterfacePanel position={[-2.2, 1.15, -0.2]} rotation={[0.05, 0.45, -0.08]} />
            <InterfacePanel position={[2.25, -1.05, -0.5]} rotation={[-0.08, -0.5, 0.06]} width={1} />
          </>
        )}

        {linePoints.map((points, index) => (
          <Line
            key={`${CONNECTIONS[index][0]}-${CONNECTIONS[index][1]}`}
            points={points}
            color="#36c5f0"
            lineWidth={isMobile ? 0.45 : 0.65}
            transparent
            opacity={index > 13 ? 0.48 : 0.25}
          />
        ))}

        {NODES.slice(0, isMobile ? 8 : NODES.length).map((position, index) => (
          <mesh key={position.join('-')} position={position}>
            <sphereGeometry args={[index === 11 ? 0.12 : 0.065, 10, 10]} />
            <meshStandardMaterial
              color={index % 3 === 0 ? '#d8f7ff' : '#36c5f0'}
              emissive="#36c5f0"
              emissiveIntensity={index % 3 === 0 ? 1.8 : 0.9}
            />
          </mesh>
        ))}
      </group>
    </>
  );
}

export default function HeroVisual() {
  const reducedMotion = useReducedMotion();
  const isMobile = useMediaQuery('(max-width: 767px)');

  return (
    <div
      className="hero-visual"
      role="img"
      aria-label="Interactive three-dimensional digital network"
    >
      <Canvas
        className="hero-visual__canvas"
        camera={{ position: [0, 0, isMobile ? 7.3 : 6.5], fov: isMobile ? 48 : 44 }}
        dpr={isMobile ? 1 : [1, 1.5]}
        frameloop={reducedMotion ? 'demand' : 'always'}
        gl={{
          alpha: true,
          antialias: !isMobile,
          powerPreference: 'high-performance',
        }}
        performance={{ min: 0.6 }}
        fallback={<div className="hero-visual__fallback" aria-hidden="true" />}
      >
        <Suspense fallback={null}>
          <DigitalEcosystem isMobile={isMobile} reducedMotion={reducedMotion} />
        </Suspense>
      </Canvas>
      <span className="hero-visual__caption" aria-hidden="true">
        WEBGL / DIGITAL ECOSYSTEM
      </span>
    </div>
  );
}
