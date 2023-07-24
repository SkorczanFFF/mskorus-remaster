import { Text } from '@react-three/drei';
import React from 'react';

import { colors } from '@/components/Hero/Partials/colors';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const MobileBackground = (props: any) => {
  return (
    <>
      <Text
        fontSize={9}
        letterSpacing={0}
        color={colors.whiteColor}
        {...props}
        position={[0, 17, -22]}
      >
        ENDENDEND
      </Text>
      <Text
        fontSize={5.25}
        letterSpacing={0}
        color={colors.raspberryColor}
        {...props}
        position={[0, 9, -14]}
      >
        FRONTFRONTFRONT
      </Text>
      <Text
        fontSize={3}
        letterSpacing={0}
        color={colors.whiteColor}
        {...props}
        position={[-2, 6.5, -18]}
      >
        FRONTENDFRONTENDFRONTENDFRONTEND
      </Text>
      <Text
        fontSize={5}
        letterSpacing={0}
        color={colors.whiteColor}
        {...props}
        position={[2, 2.75, -16]}
      >
        FRONTENDFRONTENDFRONTEND
      </Text>
      <Text
        fontSize={5}
        letterSpacing={0}
        color={colors.orangeColor}
        {...props}
        position={[2, -2.5, -13]}
      >
        DEVELOPERDEVELOPERDEVELOPER
      </Text>
      <Text
        fontSize={2}
        letterSpacing={0}
        color={colors.whiteColor}
        {...props}
        position={[0, -5, -10]}
      >
        DEVELOPERDEVELOPERDEVELOPEREVELOPER
      </Text>
      <Text
        fontSize={4}
        letterSpacing={0}
        color={colors.whiteColor}
        {...props}
        position={[3, -9, -17]}
      >
        DEVELOPERDEVELOPERDEVELOPERDEVELOPER
      </Text>
      <Text
        fontSize={6}
        letterSpacing={0}
        color={colors.whiteColor}
        {...props}
        position={[3, -12, -13]}
      >
        DEVELOPERDEVELOPERDEVELOPER
      </Text>
      <Text
        fontSize={3}
        letterSpacing={0}
        color={colors.whiteColor}
        {...props}
        position={[3, -16, -15]}
      >
        DEVELOPERDEVELOPERDEVELOPER
      </Text>
    </>
  );
};

export default MobileBackground;
