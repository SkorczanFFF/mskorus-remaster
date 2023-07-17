import {
  BakeShadows,
  CameraShake,
  Environment,
  Html,
  OrbitControls,
  RandomizedLight,
  Stars,
  useProgress,
} from '@react-three/drei';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { EffectComposer, Vignette } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
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
    <section className='font-mont -mt-[45px] flex h-[99vh] w-full flex-col items-center justify-center bg-[#001a25]'>
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
          {/* <ambientLight intensity={0.5} color='#ffffff' /> */}

          {/* <spotLight intensity={0.55} position={[600, -700, 700]} />
          <spotLight intensity={0.25} position={[-600, 700, -700]} /> */}
          <EffectComposer>
            <Vignette
              offset={0.5}
              darkness={0.5}
              eskil={false}
              blendFunction={BlendFunction.NORMAL}
            />
            <Stars
              radius={200}
              depth={1}
              count={1000}
              factor={2}
              saturation={154}
              speed={1}
            />
            {/* <Sparkles
              opacity={0.5}
              size={5}
              color='#972b1a'
              scale={8}
              position={[0, 0, -5]}
              count={100}
            /> */}
            <RandomizedLight
              castShadow
              amount={8}
              frames={100}
              position={[5, 5, -5]}
            />
            <Environment preset='warehouse' />
            <DesktopBackground />
          </EffectComposer>

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
