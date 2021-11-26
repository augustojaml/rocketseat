import React, { useEffect, useState } from 'react';
import { StatusBar, BackHandler } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

import { RFValue } from 'react-native-responsive-fontsize';
import { LogoSVG } from '../../assets';
import { Car } from '../../components/Car';

import {
  Container,
  HeaderContent,
  Header,
  TotalCars,
  CarList,
  MyCarsButton,
} from './styled';
import { api } from '../../services/api';
import { ICarDTO } from '../../dtos/ICarDTO';
import { Loading } from '../../components/Loading';
import { useTheme } from 'styled-components';
import { PanGestureHandler, RectButton } from 'react-native-gesture-handler';
import { CarAnimated } from '../../components/CarAnimated';

const ButtonAnimated = Animated.createAnimatedComponent(RectButton);

export function Home() {
  const navigation = useNavigation();
  const theme = useTheme();

  const positionX = useSharedValue(0);
  const positionY = useSharedValue(0);

  const myCarsButtonStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: positionX.value },
        { translateY: positionY.value },
      ],
    };
  });

  const onGestureEvent = useAnimatedGestureHandler({
    onStart(_, ctx: any) {
      ctx.positionX = positionX.value;
      ctx.positionY = positionY.value;
    },
    onActive(event, ctx: any) {
      positionX.value = withSpring(ctx.positionX + event.translationX);
      positionY.value = withSpring(ctx.positionY + event.translationY);
    },
    onEnd() {
      // positionX.value = withSpring(0);
      // positionY.value = withSpring(0);
    },
  });

  const [cars, setCars] = useState<ICarDTO[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  function handleCarDetails(car: ICarDTO) {
    navigation.navigate('CarDetails', { car: car });
  }

  function handleOpenMyCars() {
    navigation.navigate('MyCars');
  }

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const response = await api.get('cars');
        setCars(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      return true;
    });
  }, []);

  return (
    <>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <Container>
        <Header>
          <HeaderContent>
            <LogoSVG width={RFValue(108)} height={RFValue(12)} />
            {!isLoading && (
              <TotalCars>
                Total de {String(cars.length).padStart(2, '0')} carros
              </TotalCars>
            )}
          </HeaderContent>
        </Header>
        {isLoading ? (
          <CarAnimated />
        ) : (
          <CarList
            data={cars}
            keyExtractor={(item) => item.id}
            renderItem={({ item: car }) => (
              <Car car={car} onPress={() => handleCarDetails(car)} />
            )}
          />
        )}
        <PanGestureHandler onGestureEvent={onGestureEvent}>
          <Animated.View
            style={[
              myCarsButtonStyle,
              {
                position: 'absolute',
                bottom: 24,
                right: 24,
              },
            ]}
          >
            <ButtonAnimated
              onPress={handleOpenMyCars}
              style={[
                {
                  width: 60,
                  height: 60,
                  borderRadius: 30,
                  backgroundColor: theme.colors.main,
                  alignItems: 'center',
                  justifyContent: 'center',
                },
              ]}
            >
              <Ionicons
                name="ios-car-sport"
                size={32}
                color={theme.colors.shape}
              />
            </ButtonAnimated>
          </Animated.View>
        </PanGestureHandler>
      </Container>
    </>
  );
}

/**
 * width: 60,
  height: 60,
  borderRadius: 30,
  background-color: theme.colors.main,
  alignItems: 'center',
  justifyContent: 'center',
  position: 'absolute',
  bottom: 24,
  right: 24
 */
