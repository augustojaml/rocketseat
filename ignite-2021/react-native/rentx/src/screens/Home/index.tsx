import React from 'react';
import { StatusBar } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { LogoSVG } from '../../assets';
import { Car } from '../../components/Car';

import { Container, HeaderContent, Header, TotalCars } from './styled';

export function Home() {
  //https://cdn.picpng.com/audi/audi-face-28582.png
  const car1 = {
    brand: 'Audi',
    name: 'RS 5 Coupé',
    rent: {
      period: 'AO DIA',
      price: 120,
    },
    thumbnail: 'https://cdn.picpng.com/audi/audi-face-28582.png',
  };

  const car2 = {
    brand: 'Porsche',
    name: 'Panamera',
    rent: {
      period: 'AO DIA',
      price: 340,
    },
    thumbnail:
      'https://purepng.com/public/uploads/large/purepng.com-red-porsche-panamera-carcarvehicletransportporsche-961524659425kg33i.png',
  };

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
            <TotalCars>Total de 12 carros</TotalCars>
          </HeaderContent>
        </Header>
        <Car car={car1} />
        <Car car={car2} />
      </Container>
    </>
  );
}
