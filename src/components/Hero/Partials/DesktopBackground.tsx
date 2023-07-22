import { Text } from '@react-three/drei';
import React from 'react';

import { colors } from '@/components/Hero/Partials/colors';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DesktopBackground = (props: any) => {
  return (
    <>
      <Text
        fontSize={7}
        letterSpacing={0}
        color={colors.whiteColor}
        {...props}
        position={[10, 17, -20]}
      >
        FRONTENDFRONTENDFRONTENDFRONTENDFRONTEND
      </Text>
      <Text
        fontSize={7}
        letterSpacing={0}
        color='#e4e4e4'
        {...props}
        position={[10, 12, -17]}
      >
        FRONTENDFRONTENDFRONTENDFRONTENDFRONTEND
      </Text>
      <Text
        fontSize={8}
        letterSpacing={0}
        color='#992210'
        {...props}
        position={[5, 8, -25]}
      >
        ENDENDENDENDENDENDENDENDENDENDENDEND
      </Text>
      <Text
        fontSize={6}
        letterSpacing={0}
        color='#e4e4e4'
        {...props}
        position={[2.5, 2, -15]}
      >
        FRONTFRONTFRONTFRONTFRONT
      </Text>

      <Text
        fontSize={6}
        letterSpacing={0}
        color='#801834'
        {...props}
        position={[0, -3, -23]}
        rotation={[0, 0, 0]}
      >
        DEVELOPERDEVELOPERDEVELOPERDEVELOPER
      </Text>
      <Text
        fontSize={6}
        letterSpacing={0}
        color='#820025'
        {...props}
        position={[5, -10, -25]}
      >
        DEVELOPERDEVELOPERDEVELOPERDEVELOPER
      </Text>

      <Text
        fontSize={6}
        letterSpacing={0}
        color='#801834'
        {...props}
        position={[-5, -13, -15]}
        rotation={[0, 0, 0]}
      >
        DEVELOPERDEVELOPERDEVELOPERDEVELOPER
      </Text>
    </>
  );
};

export default DesktopBackground;
