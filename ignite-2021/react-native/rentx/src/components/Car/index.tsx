import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';
import { GasolineSVG } from '../../assets';

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

interface ICar {
  brand: string;
  name: string;
  rent: {
    period: string;
    price: number;
  };
  thumbnail: string;
}

interface ICarProps extends RectButtonProps {
  car: ICar;
}

export function Car({ car, ...rest }: ICarProps) {
  return (
    <>
      <Container {...rest}>
        <Details>
          <Brand>{car.brand}</Brand>
          <Name>{car.name}</Name>
          <About>
            <Rent>
              <Period>{car.rent.period}</Period>
              <Price>{`R$ ${car.rent.price}`}</Price>
            </Rent>
            <Type>
              <GasolineSVG />
            </Type>
          </About>
        </Details>
        <CarImage source={{ uri: car.thumbnail }} />
      </Container>
    </>
  );
}
