import { Text } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { easing } from 'maath';
import React, { useRef } from 'react';
import * as THREE from 'three';

import { colors } from '@/components/Hero/Partials/colors';

export type Vector3Tuple = [number, number, number];

interface TextConfig {
  text: string;
  fontSize: number;
  color: number | string;
  position: Vector3Tuple;
}

const FONT_URL = '/fonts/UnicaOne-Regular.ttf';
const SHIFT_STRENGTH = 4;
const DAMP_SMOOTHING = 0.25;

function AnimatedTextRow({ item, index }: { item: TextConfig; index: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const direction = index % 2 === 0 ? 1 : -1;

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const target = state.pointer.x * SHIFT_STRENGTH * direction;
    easing.damp(groupRef.current.position, 'x', target, DAMP_SMOOTHING, delta);
  });

  return (
    <group ref={groupRef}>
      <Text
        font={FONT_URL}
        fontSize={item.fontSize}
        letterSpacing={0}
        color={item.color}
        position={item.position}
      >
        {item.text}
      </Text>
    </group>
  );
}

const desktopConfig: TextConfig[] = [
  {
    text: 'MOBILEMOBILEMOBILEMOBILEMOBILEMOB',
    fontSize: 8,
    color: colors.whiterColor,
    position: [10, 24, -23],
  },
  {
    text: 'FRONTENDFRONTENDFRONTENDFRONTENDF',
    fontSize: 6,
    color: colors.whiterColor,
    position: [10, 17, -20],
  },
  {
    text: 'FULLSTACKFULLSTACKFULLSTACKFULLST',
    fontSize: 7,
    color: colors.whiterColor,
    position: [10, 11, -17],
  },
  {
    text: 'BACKENDBACKENDBACKENDBACKENDBACKEND',
    fontSize: 7,
    color: colors.whiterColor,
    position: [5, 8, -25],
  },
  {
    text: 'FRONTENDFRONTENDFRONTENDFRONTENDFRONT',
    fontSize: 6.5,
    color: colors.whiterColor,
    position: [2.5, 2, -15],
  },
  {
    text: 'DEVELOPERDEVELOPERDEVELOPERDEVELO',
    fontSize: 6.5,
    color: colors.raspberryColor,
    position: [0, -3, -17],
  },
  {
    text: 'DEVDEVDEVDEVDEVDEVDEVDEVDEVDEVDEV',
    fontSize: 6.5,
    color: colors.raspberryColor,
    position: [0, -7.5, -15],
  },
  {
    text: 'ELOELOELOELOELOELOELOELOELOELOELO',
    fontSize: 7,
    color: colors.raspberryColor,
    position: [0, -13.5, -18],
  },
  {
    text: 'PERPERPERPERPERPERPERPERPERPERPER',
    fontSize: 7,
    color: colors.raspberryColor,
    position: [0, -20, -20],
  },
  {
    text: 'DEVELOPERDEVELOPERDEVELOPERDEVELO',
    fontSize: 10,
    color: colors.raspberryColor,
    position: [0, -30, -25],
  },
];

const mobileConfig: TextConfig[] = [
  {
    text: 'FRONTENDFRONTENDFRONTEND',
    fontSize: 6,
    color: colors.whiteColor,
    position: [-2, 20.5, -11],
  },
  {
    text: 'FRONTENDFRONTENDFRONTEND',
    fontSize: 4,
    color: colors.whiteColor,
    position: [-2, 16.5, -11],
  },
  {
    text: 'FRONTENDFRONTENDFRONTFRO',
    fontSize: 4,
    color: colors.whiteColor,
    position: [2, 13.5, -11],
  },
  {
    text: 'ENDENDENDENDENDENDENDEND',
    fontSize: 5,
    color: colors.whiteColor,
    position: [2, 11.5, -16],
  },
  {
    text: 'FRONTFRONTFRONTFRONTFRON',
    fontSize: 5,
    color: colors.whiteColor,
    position: [2, 6.5, -11],
  },
  {
    text: 'FRONTENDFRONTENDFRONTEND',
    fontSize: 5,
    color: colors.whiteColor,
    position: [2, 2.75, -13],
  },
  {
    text: 'DEVELOPERDEVELOPERDEVELO',
    fontSize: 5,
    color: colors.raspberryColor,
    position: [2, -1.5, -13],
  },
  {
    text: 'DEVDEVDEVDEVDEVDEVDEVDEV',
    fontSize: 5,
    color: colors.raspberryColor,
    position: [2, -5.5, -13],
  },
  {
    text: 'ELOELOELOELOELOELOELOELO',
    fontSize: 5,
    color: colors.raspberryColor,
    position: [2, -9.5, -13],
  },
  {
    text: 'PERPERPERPERPERPERPERPER',
    fontSize: 5,
    color: colors.raspberryColor,
    position: [-2, -13.5, -13],
  },
  {
    text: 'DEVELOPERDEVELOPERDEVELO',
    fontSize: 3,
    color: colors.raspberryColor,
    position: [0, -16.5, -13],
  },
  {
    text: 'DEVELOPERDEVELOPERDEVELO',
    fontSize: 6,
    color: colors.raspberryColor,
    position: [2, -20.5, -13],
  },
];

interface BackgroundProps {
  variant: 'desktop' | 'mobile';
}

const Background = ({ variant }: BackgroundProps) => {
  const config = variant === 'desktop' ? desktopConfig : mobileConfig;

  return (
    <>
      {config.map((item, index) => (
        <AnimatedTextRow key={index} item={item} index={index} />
      ))}
    </>
  );
};

export default Background;
