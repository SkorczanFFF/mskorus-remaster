import { useBox } from '@react-three/cannon';
import { ThreeElements, useFrame } from '@react-three/fiber';
import React, { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';

import {
  AutodeskIcon,
  BlenderIcon,
  DockerIcon,
  PythonIcon,
  GithubIcon,
  GsapIcon,
  JavascriptIcon,
  LaravelIcon,
  MongodbIcon,
  MysqlIcon,
  NextjsIcon,
  NodejsIcon,
  NpmIcon,
  PostgresqlIcon,
  TailwindIcon,
  ThreejsIcon,
  PhotoshopIcon,
  FigmaIcon,
} from '@/lib/shared/Icons';
import { HeroIconComponent, useHeroIconGeometry } from '@/components/Hero/Partials/HeroIcon';

type HeroAtomsProps = ThreeElements['group'] & {
  count?: number;
  center?: [number, number, number];
  baseRadius?: number;
  attractionStrength?: number;
  pointerStrength?: number;
  repelRadius?: number;
  repelIntensity?: number;
};

type AtomConfig = {
  Icon: HeroIconComponent;
  baseColor: number;
  emissiveColor: number;
  scaleMultiplier: number;
  phase: number;
  radius: number;
  speed: number;
};

function Atom({
  index,
  config,
  apisRef,
  iconScale,
}: {
  index: number;
  config: AtomConfig;
  apisRef: React.MutableRefObject<any[]>;
  iconScale: number;
}) {
  const { geometry, size } = useHeroIconGeometry(config.Icon, 2.2);
  const scaledIconSize = iconScale * config.scaleMultiplier;
  const halfExtents = useMemo(() => {
    const w = Math.max(0.2, size.x * scaledIconSize);
    const h = Math.max(0.2, size.y * scaledIconSize);
    const d = Math.max(0.12, size.z * scaledIconSize);
    return [w / 2, h / 2, d / 2] as const;
  }, [scaledIconSize, size.x, size.y, size.z]);

  const [ref, api] = useBox<THREE.Group>(() => ({
    args: [halfExtents[0] * 2, halfExtents[1] * 2, halfExtents[2] * 2],
    type: 'Kinematic',
    mass: 0,
    position: [0, 0, 0],
    linearDamping: 0,
    angularDamping: 0,
    material: {
      friction: 0.3,
      restitution: 0.2,
    },
    allowSleep: false,
  }));

  useEffect(() => {
    apisRef.current[index] = api;
    return () => {
      apisRef.current[index] = undefined;
    };
  }, [api, apisRef, index]);

  const material = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color(config.baseColor),
        emissive: new THREE.Color(config.emissiveColor),
        emissiveIntensity: 1.1,
        roughness: 0.24,
        metalness: 0.4,
      }),
    [config.baseColor, config.emissiveColor],
  );

  useFrame(({ camera }) => {
    if (!ref.current) return;
    ref.current.lookAt(camera.position);
  });

  return (
    <group ref={ref}>
      <mesh
        castShadow
        receiveShadow
        geometry={geometry}
        material={material}
        scale={[scaledIconSize, scaledIconSize, scaledIconSize]}
      />
    </group>
  );
}

const HeroAtoms = ({
  count = 16,
  center = [0, -0.2, -3.2],
  baseRadius = 2.4,
  attractionStrength = 0,
  pointerStrength = 11,
  repelRadius = 3.4,
  repelIntensity = 1.6,
  ...props
}: HeroAtomsProps) => {
  const apisRef = useRef<any[]>([]);

  const getIconColors = (Icon: HeroIconComponent): { base: number; emissive: number } => {
    if (Icon === JavascriptIcon) return { base: 0x05030a, emissive: 0xf7df1e };
    if (Icon === NextjsIcon) return { base: 0x05050a, emissive: 0xffffff };
    if (Icon === TailwindIcon) return { base: 0x03111a, emissive: 0x38bdf8 };
    if (Icon === ThreejsIcon) return { base: 0x050914, emissive: 0xffffff };
    if (Icon === GsapIcon) return { base: 0x071808, emissive: 0x88ce02 };
    if (Icon === NodejsIcon) return { base: 0x050c07, emissive: 0x68a063 };
    if (Icon === LaravelIcon) return { base: 0x1a0505, emissive: 0xff2d20 };
    if (Icon === MysqlIcon) return { base: 0x050c14, emissive: 0x00758f };
    if (Icon === PostgresqlIcon) return { base: 0x050914, emissive: 0x336791 };
    if (Icon === MongodbIcon) return { base: 0x041408, emissive: 0x47a248 };
    if (Icon === DockerIcon) return { base: 0x041018, emissive: 0x0db7ed };
    if (Icon === GithubIcon) return { base: 0x020108, emissive: 0xffffff };
    if (Icon === PythonIcon) return { base: 0x06110f, emissive: 0x3776ab };
    if (Icon === AutodeskIcon) return { base: 0x06120f, emissive: 0x2dbf8e };
    if (Icon === BlenderIcon) return { base: 0x120b04, emissive: 0xf5792a };
    if (Icon === PhotoshopIcon) return { base: 0x020716, emissive: 0x31a8ff };
    if (Icon === FigmaIcon) return { base: 0x05050a, emissive: 0x1abcfe };
    return { base: 0x05030a, emissive: 0xffffff };
  };

  const iconSet = useMemo<HeroIconComponent[]>(() => {
    // Mixed set (frontend/backend/tools), pulled from existing `src/lib/shared/Icons.tsx`.
    return [
      JavascriptIcon,
      NextjsIcon,
      TailwindIcon,
      ThreejsIcon,
      GsapIcon,
      NodejsIcon,
      LaravelIcon,
      PythonIcon,
      MysqlIcon,
      PostgresqlIcon,
      MongodbIcon,
      DockerIcon,
      GithubIcon,
      AutodeskIcon,
      BlenderIcon,
      PhotoshopIcon,
      FigmaIcon,
      NpmIcon,
    ];
  }, []);

  const iconScale = 1.9;

  const atoms = useMemo<AtomConfig[]>(() => {
    const out: AtomConfig[] = [];
    for (let i = 0; i < count; i++) {
      const Icon = iconSet[i % iconSet.length];
      const { base, emissive } = getIconColors(Icon);
      out.push({
        Icon,
        baseColor: base,
        emissiveColor: emissive,
        scaleMultiplier:
          Icon === AutodeskIcon
              ? 0.8
              : Icon === TailwindIcon
                ? 0.9
                : 1,
        phase: (i / Math.max(1, count)) * Math.PI * 2,
        // Two well-spaced tracks to reduce visual overlap.
        radius: baseRadius * (2.55 + (i % 2) * 0.35),
        // Keep uniform speed so icons do not drift into each other over time.
        speed: 0.42,
      });
    }
    return out;
  }, [baseRadius, count, iconSet]);

  const tmp = useMemo(() => new THREE.Vector3(), []);
  const centerVec = useRef(new THREE.Vector3(center[0], center[1], center[2]));
  const tilt = useMemo(() => new THREE.Euler(0.35, 0.1, 0), []);
  const tiltQ = useMemo(() => new THREE.Quaternion().setFromEuler(tilt), [tilt]);

  useFrame((state) => {
    centerVec.current.set(center[0], center[1], center[2]);
    const t = state.clock.getElapsedTime();

    for (let i = 0; i < atoms.length; i++) {
      const a = atoms[i];
      const angle = t * a.speed + a.phase;

      // Elliptical orbit: wider in X, narrower in Y.
      // Extra "top squish": compress Y a bit more on the top half (sin > 0).
      const s = Math.sin(angle);
      const c = Math.cos(angle);
      const x = c * a.radius * 1.35;
      const yScale = s > 0 ? 0.42 : 0.55;
      const y = s * a.radius * yScale;
      const z = s * (a.radius * 0.07);
      tmp.set(x, y, z);
      tmp.applyQuaternion(tiltQ).add(centerVec.current);

      const api = apisRef.current[i];
      api?.wakeUp?.();
      api?.position.set(tmp.x, tmp.y, tmp.z);
    }
  });

  return (
    <group {...props}>
      {atoms.map((config, i) => (
        <Atom
          key={i}
          index={i}
          config={config}
          apisRef={apisRef}
          iconScale={iconScale}
        />
      ))}
    </group>
  );
};

export default React.memo(HeroAtoms);

