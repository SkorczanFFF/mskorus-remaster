import { Text } from '@react-three/drei';
import React from 'react';

import { colors } from '@/components/Hero/Partials/colors';

const DesktopBackground = (props: any) => {
  return (
    <>
      <Text
        fontSize={8}
        letterSpacing={0}
        color={colors.whiteColor}
        {...props}
        position={[10, 24, -23]}
      >
        ENDENDENDENDENDENDENDENDENDENDEN
      </Text>
      <Text
        fontSize={7}
        letterSpacing={0}
        color={colors.whiterColor}
        {...props}
        position={[10, 17, -20]}
      >
        FRONTENDFRONTENDFRONTENDFRONTEND
      </Text>
      <Text
        fontSize={8}
        letterSpacing={0}
        color='#e4e4e4'
        {...props}
        position={[10, 11, -17]}
      >
        FRONTFRONTFRONTFRONTFRONTFRONTFR
      </Text>
      <Text
        fontSize={8}
        letterSpacing={0}
        color={colors.whiterColor}
        {...props}
        position={[5, 8, -25]}
      >
        ENDENDENDENDENDENDENDENDENDENDEN
      </Text>
      <Text
        fontSize={6}
        letterSpacing={0}
        color='#e4e4e4'
        {...props}
        position={[2.5, 2, -15]}
      >
        FRONTFRONTFRONTFRONTFRONTFRONTFR
      </Text>

      <Text
        fontSize={6}
        letterSpacing={0}
        color='#801834'
        {...props}
        position={[0, -3, -17]}
        rotation={[0, 0, 0]}
      >
        DEVELOPERDEVELOPERDEVELOPERDEVELOPER
      </Text>
      <Text
        fontSize={6}
        letterSpacing={0}
        color='#801834'
        {...props}
        position={[0, -7.5, -15]}
        rotation={[0, 0, 0]}
      >
        DEVDEVDEVDEVDEVDEVDEVDEVDEVDEVDEV
      </Text>
      <Text
        fontSize={7}
        letterSpacing={0}
        color='#801834'
        {...props}
        position={[0, -13.5, -18]}
        rotation={[0, 0, 0]}
      >
        ELOELOELOELOELOELOELOELOELOELOELO
      </Text>
      <Text
        fontSize={7}
        letterSpacing={0}
        color='#801834'
        {...props}
        position={[0, -20, -20]}
        rotation={[0, 0, 0]}
      >
        PERPERPERPERPERPERPERPERPERPERPER
      </Text>
      <Text
        fontSize={10}
        letterSpacing={0}
        color='#801834'
        {...props}
        position={[0, -30, -25]}
        rotation={[0, 0, 0]}
      >
        DEVELOPERDEVELOPERDEVELOPERDEVEL
      </Text>
    </>
  );
};

export default DesktopBackground;
