import React, { Component } from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';
import { GasolineSVG } from '../../assets';
import { ICarDTO } from '../../dtos/ICarDTO';
import { Util } from '../../utils';
import { Car as CarModel } from '../../database/model/Car';

import { Container, Details, Brand, Name, About, Rent, Period, Price, Type, CarImage } from './styled';
import { useNetInfo } from '@react-native-community/netinfo';

interface ICarProps extends RectButtonProps {
  car: CarModel;
}

export function Car({ car, ...rest }: ICarProps) {
  const MotorIcon = Util.getAccessoryIcon(car.fuel_type);
  const netInfo = useNetInfo();

  return (
    <>
      <Container {...rest}>
        <Details>
          <Brand>{car.brand}</Brand>
          <Name>{car.name}</Name>
          <About>
            <Rent>
              <Period>{car.period}</Period>
              <Price>{`R$ ${netInfo.isConnected === true ? car.price : '...'}`}</Price>
            </Rent>
            <Type>
              <MotorIcon />
            </Type>
          </About>
        </Details>
        <CarImage source={{ uri: String(car.thumbnail) }} resizeMode="contain" />
      </Container>
    </>
  );
}
