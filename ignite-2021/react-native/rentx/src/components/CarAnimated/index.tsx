import React from 'react';
import LottieView from 'lottie-react-native';

import { Container } from './styled';
import { car_animated } from '../../assets';

export function CarAnimated() {
  return (
    <>
      <Container>
        <LottieView
          source={car_animated}
          autoPlay
          loop
          style={{ height: 200 }}
          resizeMode="contain"
        />
      </Container>
    </>
  );
}
