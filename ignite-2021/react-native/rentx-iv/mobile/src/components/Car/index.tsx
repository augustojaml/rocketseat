import React, { Component } from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';
import { GasolineSVG } from '../../assets';
import { ICarDTO } from '../../dtos/ICarDTO';
import { Util } from '../../utils';

import {
  Container,
  Details,
  Brand,
  Name,
  About,
  Rent,
  Period,
  Price,
  Type,
  CarImage,
} from './styled';

interface ICarProps extends RectButtonProps {
  car: ICarDTO;
}

export function Car({ car, ...rest }: ICarProps) {
  const MotorIcon = Util.getAccessoryIcon(car.fuel_type);

  return (
    <>
      <Container {...rest}>
        <Details>
          <Brand>{car.brand}</Brand>
          <Name>{car.name}</Name>
          <About>
            <Rent>
              <Period>{car.period}</Period>
              <Price>{`R$ ${car.price}`}</Price>
            </Rent>
            <Type>
              <MotorIcon />
            </Type>
          </About>
        </Details>
        <CarImage source={{ uri: car.thumbnail }} />
      </Container>
    </>
  );
}
