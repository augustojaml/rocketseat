import React from 'react';
import { StatusBar } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { LogoSVG } from '../../assets';

import { Container, HeaderContent, Header, TotalCars } from './styled';

export function Home() {
  return (
    <>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <Container>
        <Header>
          <HeaderContent>
            <LogoSVG width={RFValue(108)} height={RFValue(12)} />
            <TotalCars>Total de 12 carros</TotalCars>
          </HeaderContent>
        </Header>
      </Container>
    </>
  );
}
