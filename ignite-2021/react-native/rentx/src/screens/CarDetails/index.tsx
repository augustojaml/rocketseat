import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';

import {
  AccelerationSVG,
  ExchangeSVG,
  ForceSVG,
  GasolineSVG,
  PeopleSVG,
  SpeedSVG,
} from '../../assets';
import { Accessory } from '../../components/Accessory';
import { BackButton } from '../../components/BackButton';
import { Button } from '../../components/Button';
import { ImageSlider } from '../../components/ImageSlider';

import {
  Container,
  Header,
  CarImages,
  Content,
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

export interface ICarParams {
  car: ICarDTO;
}

export function CarDetails() {
  const navigation = useNavigation();
  const { car } = useRoute().params as ICarParams;

  function handleConfirmRental() {
    navigation.navigate('Schedules', { car });
  }

  function handleBack() {
    navigation.goBack();
  }

  return (
    <>
      <Container>
        <Header>
          <BackButton onPress={handleBack} />
        </Header>
        <CarImages>
          <ImageSlider imagesUrl={car.photos} />
        </CarImages>
        <Content>
          <Details>
            <Description>
              <Brand>{car.brand}</Brand>
              <Name>{car.name}</Name>
            </Description>

            <Rent>
              <Period>{car.rent.period}</Period>
              <Price>{`R$ ${car.rent.price}`}</Price>
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

          <About>{car.about}</About>
        </Content>
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
