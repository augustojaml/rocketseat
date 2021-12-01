import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import Animated, {
  Extrapolate,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { BrandSVG, LogoSVG } from '../../assets';

import { Container } from './styled';

export function Splash() {
  console.log('Splash', 'splash');
  const navigation = useNavigation();

  const splashAnimation = useSharedValue(0);
  const brandStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        splashAnimation.value,
        [0, 25, 50],
        [1, 0.3, 0],
        Extrapolate.CLAMP
      ),
    };
  });
  const LogoStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        splashAnimation.value,
        [0, 25, 50],
        [0, 0.3, 1],
        Extrapolate.CLAMP
      ),
    };
  });

  function startApp() {
    navigation.navigate('SignIn');
  }

  useEffect(() => {
    splashAnimation.value = withTiming(50, { duration: 1000 }, () => {
      'worklet';
      runOnJS(startApp)();
    });
  }, []);

  return (
    <>
      <Container>
        <Animated.View style={[brandStyle, { position: 'absolute' }]}>
          <BrandSVG width={80} height={50} />
        </Animated.View>

        <Animated.View style={[LogoStyle, { position: 'absolute' }]}>
          <LogoSVG width={180} height={20} />
        </Animated.View>
      </Container>
    </>
  );
}
