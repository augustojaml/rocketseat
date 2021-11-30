import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';

import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { StatusBar, StyleSheet } from 'react-native';

import { Accessory } from '../../components/Accessory';
import { BackButton } from '../../components/BackButton';
import { Button } from '../../components/Button';
import { ImageSlider } from '../../components/ImageSlider';

import {
  Container,
  Header,
  CarImages,
  Details,
  Description,
  Brand,
  Name,
  Rent,
  Period,
  Price,
  Accessories,
  About,
  Footer,
} from './styled';
import { ICarDTO } from '../../dtos/ICarDTO';
import { Util } from '../../utils';
import { useTheme } from 'styled-components';

export interface ICarParams {
  car: ICarDTO;
}

export function CarDetails() {
  const navigation = useNavigation();
  const theme = useTheme();
  const { car } = useRoute().params as ICarParams;

  const scrollY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });

  const headerStyleAnimation = useAnimatedStyle(() => {
    return {
      height: interpolate(
        scrollY.value,
        [0, 200],
        [200, 70],
        Extrapolate.CLAMP
      ),
    };
  });

  const sliderCarsStyleAnimation = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scrollY.value, [0, 150], [1, 0], Extrapolate.CLAMP),
    };
  });

  function handleConfirmRental() {
    navigation.navigate('Schedules', { car });
  }

  function handleBack() {
    navigation.goBack();
  }

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor="transparent"
      />
      <Container>
        <Animated.View
          style={[
            headerStyleAnimation,
            styles.header,
            {
              backgroundColor: theme.colors.background_secondary,
            },
          ]}
        >
          <Header>
            <BackButton onPress={handleBack} />
          </Header>
          <Animated.View style={sliderCarsStyleAnimation}>
            <CarImages>
              <ImageSlider imagesUrl={car.photos} />
            </CarImages>
          </Animated.View>
        </Animated.View>
        <Animated.ScrollView
          contentContainerStyle={{
            paddingHorizontal: 24,
            paddingTop: getStatusBarHeight() + 160,
          }}
          showsVerticalScrollIndicator={false}
          onScroll={scrollHandler}
          scrollEventThrottle={16}
        >
          <Details>
            <Description>
              <Brand>{car.brand}</Brand>
              <Name>{car.name}</Name>
            </Description>

            <Rent>
              <Period>{car.period}</Period>
              <Price>{`R$ ${car.price}`}</Price>
            </Rent>
          </Details>
          <Accessories>
            {car.accessories.map((accessory) => (
              <Accessory
                key={accessory.type}
                name={accessory.name}
                icon={Util.getAccessoryIcon(accessory.type)}
              />
            ))}
          </Accessories>

          <About>
            {car.about}
            {car.about}
            {car.about}
            {car.about}
            {car.about}
            {car.about}
            {car.about}
          </About>
        </Animated.ScrollView>
        <Footer>
          <Button
            title="Escolher período do aluguel"
            onPress={handleConfirmRental}
          />
        </Footer>
      </Container>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    overflow: 'hidden',
    zIndex: 1,
  },
});
