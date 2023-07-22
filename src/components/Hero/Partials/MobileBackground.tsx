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
        FRONTEND FRONTEND FRONTEND FRONTEND
      </Text>
      <Text
        fontSize={5}
        letterSpacing={0}
        color={colors.whiteColor}
        {...props}
        position={[2, 2.75, -16]}
      >
        FRONTEND FRONTEND FRONTEND
      </Text>
      <Text
        fontSize={5}
        letterSpacing={0}
        color={colors.orangeColor}
        {...props}
        position={[2, -1.25, -16]}
      >
        DEVELOPER DEVELOPER DEVELOPER
      </Text>
      <Text
        fontSize={2}
        letterSpacing={0}
        color={colors.whiteColor}
        {...props}
        position={[-3, -3.5, -10]}
      >
        DEVELOPERDEVELOPERDEVELOPEREVELOPER
      </Text>
      <Text
        fontSize={4}
        letterSpacing={0}
        color={colors.whiteColor}
        {...props}
        position={[3, -7, -15]}
      >
        DEVELOPERDEVELOPERDEVELOPERDEVELOPER
      </Text>
      <Text
        fontSize={6}
        letterSpacing={0}
        color={colors.whiteColor}
        {...props}
        position={[3, -11, -12]}
      >
        DEVELOPERDEVELOPERDEVELOPER
      </Text>
    </>
  );
};

export default MobileBackground;
