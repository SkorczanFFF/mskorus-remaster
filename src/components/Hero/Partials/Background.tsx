import { Text } from '@react-three/drei';
import React from 'react';

import { colors } from '@/components/Hero/Partials/colors';

type Vector3Tuple = [number, number, number];

interface TextConfig {
  text: string;
  fontSize: number;
  color: number | string;
  position: Vector3Tuple;
}

const desktopConfig: TextConfig[] = [
  { text: 'ENDENDENDENDENDENDENDENDENDENDEN', fontSize: 8, color: colors.whiteColor, position: [10, 24, -23] },
  { text: 'FRONTENDFRONTENDFRONTENDFRONTEND', fontSize: 7, color: colors.whiterColor, position: [10, 17, -20] },
  { text: 'FRONTFRONTFRONTFRONTFRONTFRONTFR', fontSize: 8, color: colors.whiterColor, position: [10, 11, -17] },
  { text: 'ENDENDENDENDENDENDENDENDENDENDEN', fontSize: 8, color: colors.whiterColor, position: [5, 8, -25] },
  { text: 'FRONTFRONTFRONTFRONTFRONTFRONTFR', fontSize: 6, color: colors.whiterColor, position: [2.5, 2, -15] },
  { text: 'DEVELOPERDEVELOPERDEVELOPERDEVELOPER', fontSize: 6, color: colors.raspberryColor, position: [0, -3, -17] },
  { text: 'DEVDEVDEVDEVDEVDEVDEVDEVDEVDEVDEV', fontSize: 6, color: colors.raspberryColor, position: [0, -7.5, -15] },
  { text: 'ELOELOELOELOELOELOELOELOELOELOELO', fontSize: 7, color: colors.raspberryColor, position: [0, -13.5, -18] },
  { text: 'PERPERPERPERPERPERPERPERPERPERPER', fontSize: 7, color: colors.raspberryColor, position: [0, -20, -20] },
  { text: 'DEVELOPERDEVELOPERDEVELOPERDEVEL', fontSize: 10, color: colors.raspberryColor, position: [0, -30, -25] },
];

const mobileConfig: TextConfig[] = [
  { text: 'FRONTENDFRONTENDFRONTEND', fontSize: 6, color: colors.whiteColor, position: [-2, 20.5, -11] },
  { text: 'FRONTENDFRONTEND', fontSize: 4, color: colors.whiteColor, position: [-2, 16.5, -11] },
  { text: 'FRONTENDFRONTENDFRO', fontSize: 4, color: colors.whiteColor, position: [2, 13.5, -11] },
  { text: 'ENDENDENDENDENDEND', fontSize: 5, color: colors.whiteColor, position: [2, 11.5, -16] },
  { text: 'FRONTFRONTFRONTFRONT', fontSize: 5, color: colors.whiteColor, position: [2, 6.5, -11] },
  { text: 'FRONTENDFRONTENDF', fontSize: 5, color: colors.whiteColor, position: [2, 2.75, -13] },
  { text: 'DEVELOPERDEVELOPE', fontSize: 5, color: colors.raspberryColor, position: [2, -1.5, -13] },
  { text: 'DEVDEVDEVDEVDEVDEV', fontSize: 5, color: colors.raspberryColor, position: [2, -5.5, -13] },
  { text: 'ELOELOELOELOELOELO', fontSize: 5, color: colors.raspberryColor, position: [2, -9.5, -13] },
  { text: 'PERPERPERPERPERPER', fontSize: 5, color: colors.raspberryColor, position: [-2, -13.5, -13] },
  { text: 'DEVELOPERDEVELOPERDEVELOPERDEVELOPER', fontSize: 3, color: colors.raspberryColor, position: [0, -16.5, -13] },
  { text: 'DEVELOPERDEVELOPER', fontSize: 6, color: colors.raspberryColor, position: [2, -20.5, -13] },
];

interface BackgroundProps {
  variant: 'desktop' | 'mobile';
}

const Background = ({ variant }: BackgroundProps) => {
  const config = variant === 'desktop' ? desktopConfig : mobileConfig;

  return (
    <>
      {config.map((item, index) => (
        <Text
          key={index}
          fontSize={item.fontSize}
          letterSpacing={0}
          color={item.color}
          position={item.position}
        >
          {item.text}
        </Text>
      ))}
    </>
  );
};

export default Background;
