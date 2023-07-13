import {
  BakeShadows,
  CameraShake,
  Environment,
  Html,
  OrbitControls,
  Stars,
  useProgress,
} from '@react-three/drei';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import React, { Suspense } from 'react';
import * as THREE from 'three';

import DesktopBackground from '@/components/Hero/Partials/DesktopBackground';
import DesktopScene from '@/components/Hero/Partials/DesktopScene';
import ScrollButton from '@/components/Hero/Partials/ScrollButton';

// function ViewportWidth() {
//   const [viewportSize, setViewportSize] = useState([window.innerWidth]);
//   useEffect(() => {
//     const handleResize = () => setViewportSize([window.innerWidth]);
//     window.addEventListener('resize', handleResize);
//     return () => {
//       window.removeEventListener('resize', handleResize);
//     };
//   }, []);
//   return viewportSize;
// }

function Rig() {
  const { camera, mouse } = useThree();
  const vec = new THREE.Vector3();
  return useFrame(() =>
    camera.position.lerp(
      vec.set(mouse.x * 1, mouse.y * 0.5, camera.position.z),
      0.02
    )
  );
}

function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <b
        style={{
          color: '#801834',
          fontSize: '3em',
          margin: 'auto',
          borderBottom: '2em',
          fontWeight: 400,
        }}
      >
        {Math.round(progress)}%
      </b>
    </Html>
  );
}

export default function Hero(): JSX.Element {
  // const [width] = ViewportWidth();
  // const canvasRef = useRef<HTMLCanvasElement>(null);
  return (
    <section className='font-mont bg-primary-blue -mt-[45px] flex h-[99vh] w-full flex-col items-center justify-center'>
      <Canvas shadows dpr={[1, 1.5]} id='canvas' gl={{ antialias: true }}>
        <Suspense fallback={<Loader />}>
          <OrbitControls
            enableZoom={false}
            enablePan={true}
            enableRotate={false}
          />
          <CameraShake
            yawFrequency={0.01}
            pitchFrequency={0.03}
            rollFrequency={0.02}
          />
          <Rig />
          <Environment preset='city' />
          <spotLight intensity={0.5} position={[600, -700, 700]} />
          <spotLight intensity={0.5} position={[-600, 700, -700]} />
          <Stars radius={0.2} depth={150} count={1000} factor={3} fade />
          <DesktopBackground />
          {/* <mesh
            receiveShadow
            rotation={[-Math.PI / 2, 0, 0]}
            position={[0, -3, 20]}
          >
            <planeGeometry args={[30, 100]} />
            <MeshReflectorMaterial
              blur={[100, 30]}
              resolution={2048}
              mixBlur={1}
              mixStrength={120}
              roughness={1}
              depthScale={1.3}
              minDepthThreshold={0.3}
              maxDepthThreshold={1.4}
              color='#141827'
              metalness={0.7}
              mirror={0}
            />
          </mesh> */}
          <DesktopScene />
          <BakeShadows />
        </Suspense>
      </Canvas>
      <ScrollButton />
      <div className='flex w-full'>
        <div className='z-20 -mt-[20px] h-[20px] w-full bg-white' />
        <div className='arrow-down blue-hero' />
        <div className='z-20 -mt-[20px] h-[20px] w-full bg-white' />
      </div>
    </section>
  );
}
