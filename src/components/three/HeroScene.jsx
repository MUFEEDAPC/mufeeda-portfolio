import { Suspense, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Line } from '@react-three/drei';
import * as THREE from 'three';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { runtime } from '../../state/runtime';

const NODES = [
  [-2.2, 1.05, -0.7],
  [-1.7, -1.15, 0.35],
  [-0.75, 1.85, -0.25],
  [0.15, 2.05, -0.9],
  [1.05, 1.45, 0.45],
  [2.05, 0.7, -0.55],
  [2.2, -0.85, 0.25],
  [1.05, -1.7, -0.4],
  [0.05, -2.05, 0.3],
  [-1.2, -1.7, -0.55],
  [-2.25, -0.15, -1.05],
  [0.2, 0.1, 1.7],
];

const LINKS = [
  [0, 2], [0, 10], [1, 9], [1, 10], [2, 3], [2, 11],
  [3, 4], [4, 5], [4, 11], [5, 6], [6, 7], [7, 8],
  [8, 9], [9, 10], [0, 11], [1, 11], [5, 11], [7, 11],
];

const ORBITS = [
  { radius: 2.15, speed: 0.22, tilt: 0.4, size: 0.07 },
  { radius: 2.45, speed: -0.16, tilt: 1.1, size: 0.055 },
  { radius: 2.8, speed: 0.12, tilt: 2.1, size: 0.045 },
];

function Panel({ position, rotation, width = 1.1 }) {
  return (
    <group position={position} rotation={rotation}>
      <mesh>
        <planeGeometry args={[width, 0.68]} />
        <meshPhysicalMaterial
          color="#10151f"
          emissive="#1b3d66"
          emissiveIntensity={0.28}
          roughness={0.32}
          metalness={0.4}
          transparent
          opacity={0.7}
          side={THREE.DoubleSide}
        />
      </mesh>
      {[0.16, 0, -0.16].map((y, index) => (
        <mesh key={y} position={[-0.12 + index * 0.05, y, 0.012]}>
          <planeGeometry args={[width * (0.5 + index * 0.08), 0.024]} />
          <meshBasicMaterial color={index === 0 ? '#9ec2ff' : '#2a3d5c'} />
        </mesh>
      ))}
    </group>
  );
}

function Particles({ count }) {
  const ref = useRef(null);
  const positions = useMemo(() => {
    const data = new Float32Array(count * 3);
    for (let i = 0; i < count; i += 1) {
      data[i * 3] = (Math.random() - 0.5) * 10;
      data[i * 3 + 1] = (Math.random() - 0.5) * 8;
      data[i * 3 + 2] = (Math.random() - 0.5) * 6 - 1;
    }
    return data;
  }, [count]);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.y = clock.elapsedTime * 0.012;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#7aa3ff" size={0.018} sizeAttenuation transparent opacity={0.55} />
    </points>
  );
}

function DigitalEcosystem({ isMobile, isTablet, reducedMotion }) {
  const rootRef = useRef(null);
  const coreRef = useRef(null);
  const ringA = useRef(null);
  const ringB = useRef(null);
  const orbitRefs = useRef([]);
  const hovered = useRef(false);
  const nodeCount = isMobile ? 8 : NODES.length;

  const lines = useMemo(
    () => LINKS.map(([from, to]) => [NODES[from], NODES[to]]),
    []
  );

  useFrame((state, delta) => {
    if (!rootRef.current || !coreRef.current) return;

    const pointerScale = isMobile || reducedMotion ? 0 : 1;
    const scroll = runtime.heroProgress;
    const targetY =
      state.clock.elapsedTime * (isMobile ? 0.04 : 0.065) +
      runtime.pointerX * 0.32 * pointerScale +
      scroll * 0.2;
    const targetX = runtime.pointerY * -0.2 * pointerScale + scroll * 0.07;
    const hoverBoost = hovered.current && !isMobile ? 1.04 : 1;

    if (!reducedMotion) {
      rootRef.current.rotation.y = THREE.MathUtils.damp(rootRef.current.rotation.y, targetY, 3.2, delta);
      rootRef.current.rotation.x = THREE.MathUtils.damp(rootRef.current.rotation.x, targetX, 3.2, delta);
      rootRef.current.position.y = THREE.MathUtils.damp(rootRef.current.position.y, -scroll * 0.28, 2.8, delta);
      rootRef.current.position.z = THREE.MathUtils.damp(rootRef.current.position.z, scroll * 0.18, 2.8, delta);
      const nextScale = THREE.MathUtils.damp(rootRef.current.scale.x, hoverBoost, 4.5, delta);
      rootRef.current.scale.setScalar(nextScale);

      coreRef.current.rotation.x += delta * 0.08;
      coreRef.current.rotation.z -= delta * 0.05;
      if (ringA.current) ringA.current.rotation.z += delta * 0.18;
      if (ringB.current) ringB.current.rotation.x -= delta * 0.12;

      orbitRefs.current.forEach((mesh, index) => {
        if (!mesh) return;
        const orbit = ORBITS[index];
        const t = state.clock.elapsedTime * orbit.speed;
        mesh.position.set(
          Math.cos(t) * orbit.radius,
          Math.sin(t * 0.8) * 0.35,
          Math.sin(t) * orbit.radius * 0.72
        );
      });
    }

    state.camera.position.x = THREE.MathUtils.damp(
      state.camera.position.x,
      runtime.pointerX * 0.18 * pointerScale,
      2.4,
      delta
    );
    state.camera.position.y = THREE.MathUtils.damp(
      state.camera.position.y,
      runtime.pointerY * 0.1 * pointerScale,
      2.4,
      delta
    );
    state.camera.lookAt(0, 0, 0);
  });

  return (
    <>
      <ambientLight intensity={0.7} />
      <directionalLight position={[4.2, 5.2, 4.6]} intensity={1.8} color="#e8f0ff" />
      <pointLight position={[-3.2, -0.6, 2.8]} intensity={22} distance={9} color="#4f8cff" />
      <pointLight position={[3.1, 2.2, -1.4]} intensity={14} distance={8} color="#7aa3ff" />
      <spotLight position={[0, 5, 2]} angle={0.5} penumbra={0.55} intensity={14} color="#c5d8ff" />

      <Particles count={isMobile ? 40 : isTablet ? 70 : 110} />

      <gridHelper args={[14, isMobile ? 12 : 22, '#1a2b4a', '#101824']} position={[0, -2.7, -1.6]} />

      <group
        ref={rootRef}
        onPointerEnter={() => {
          hovered.current = true;
        }}
        onPointerLeave={() => {
          hovered.current = false;
        }}
      >
        <group ref={coreRef}>
          <mesh>
            <octahedronGeometry args={[0.72, 0]} />
            <meshPhysicalMaterial
              color="#15325a"
              emissive="#4f8cff"
              emissiveIntensity={1.1}
              roughness={0.16}
              metalness={0.72}
              clearcoat={1}
            />
          </mesh>
          <mesh scale={1.18}>
            <icosahedronGeometry args={[0.86, isMobile ? 0 : 1]} />
            <meshPhysicalMaterial
              color="#1a355c"
              emissive="#4f8cff"
              emissiveIntensity={0.35}
              roughness={0.2}
              metalness={0.5}
              transparent
              opacity={0.78}
            />
          </mesh>
          <mesh scale={1.42}>
            <icosahedronGeometry args={[0.86, 0]} />
            <meshBasicMaterial color="#9ec2ff" wireframe transparent opacity={0.38} />
          </mesh>
          <mesh ref={ringA} rotation={[Math.PI / 2.4, 0.2, 0]}>
            <torusGeometry args={[1.58, 0.012, 8, isMobile ? 48 : 96]} />
            <meshBasicMaterial color="#4f8cff" transparent opacity={0.55} />
          </mesh>
          <mesh ref={ringB} rotation={[0.4, Math.PI / 2.2, 0.55]}>
            <torusGeometry args={[1.86, 0.01, 8, isMobile ? 48 : 96]} />
            <meshBasicMaterial color="#6b7cff" transparent opacity={0.32} />
          </mesh>
          <mesh rotation={[1.1, 0.8, 0.2]}>
            <torusGeometry args={[2.12, 0.008, 8, isMobile ? 40 : 80]} />
            <meshBasicMaterial color="#9ec2ff" transparent opacity={0.16} />
          </mesh>
        </group>

        {ORBITS.slice(0, isMobile ? 1 : ORBITS.length).map((orbit, index) => (
          <mesh
            key={orbit.radius}
            ref={(node) => {
              orbitRefs.current[index] = node;
            }}
          >
            <octahedronGeometry args={[orbit.size, 0]} />
            <meshStandardMaterial color="#dce7ff" emissive="#4f8cff" emissiveIntensity={1.1} />
          </mesh>
        ))}

        {!isMobile && (
          <>
            <Panel position={[-2.15, 1.2, -0.15]} rotation={[0.06, 0.48, -0.08]} />
            <Panel position={[2.2, -1.05, -0.4]} rotation={[-0.08, -0.48, 0.06]} width={0.96} />
          </>
        )}

        {lines.slice(0, isMobile ? 8 : lines.length).map((points, index) => (
          <Line
            key={`${LINKS[index][0]}-${LINKS[index][1]}`}
            points={points}
            color="#4f8cff"
            lineWidth={isMobile ? 0.45 : 0.7}
            transparent
            opacity={index > 12 ? 0.5 : 0.22}
          />
        ))}

        {NODES.slice(0, nodeCount).map((position, index) => (
          <mesh key={position.join('-')} position={position}>
            <sphereGeometry args={[index === 11 ? 0.11 : 0.055, 10, 10]} />
            <meshStandardMaterial
              color={index % 3 === 0 ? '#eef4ff' : '#4f8cff'}
              emissive="#4f8cff"
              emissiveIntensity={index % 3 === 0 ? 1.6 : 0.8}
            />
          </mesh>
        ))}
      </group>
    </>
  );
}

function FallbackCore() {
  return (
    <div className="relative grid h-full w-full place-items-center overflow-hidden">
      <div className="absolute h-56 w-56 rounded-full border border-accent/20" />
      <div className="absolute h-40 w-40 rounded-full border border-accent/30" />
      <div className="h-16 w-16 rotate-45 rounded-lg bg-accent/20 shadow-[0_0_60px_rgba(79,140,255,0.35)]" />
    </div>
  );
}

export default function HeroScene() {
  const reducedMotion = useReducedMotion();
  const isMobile = useMediaQuery('(max-width: 767px)');
  const isTablet = useMediaQuery('(max-width: 1023px)');

  return (
    <div className="absolute inset-0" role="img" aria-label="Interactive three-dimensional digital ecosystem">
      <Canvas
        camera={{ position: [0, 0.15, isMobile ? 7.4 : 6.4], fov: isMobile ? 48 : 42 }}
        dpr={isMobile ? 1 : [1, 1.5]}
        frameloop={reducedMotion ? 'demand' : 'always'}
        gl={{ alpha: true, antialias: !isMobile, powerPreference: 'high-performance' }}
        performance={{ min: 0.55 }}
        fallback={<FallbackCore />}
        style={{ width: '100%', height: '100%' }}
      >
        <Suspense fallback={null}>
          <DigitalEcosystem isMobile={isMobile} isTablet={isTablet} reducedMotion={reducedMotion} />
        </Suspense>
      </Canvas>
    </div>
  );
}
