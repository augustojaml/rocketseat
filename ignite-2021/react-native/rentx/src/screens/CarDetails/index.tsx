import React from 'react';
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
} from './styled';

export function CarDetails() {
  return (
    <>
      <Container>
        <Header>
          <BackButton onPress={() => {}} />
        </Header>
        <CarImages>
          <ImageSlider
            imagesUrl={['https://pngimg.com/uploads/audi/audi_PNG99491.png']}
          />
        </CarImages>
        <Content>
          <Details>
            <Description>
              <Brand>Lamborghini</Brand>
              <Name>Huracan</Name>
            </Description>

            <Rent>
              <Period>Ao dia</Period>
              <Price>R$ 580</Price>
            </Rent>
          </Details>
          <Accessories>
            <Accessory name="380Km/h" icon={SpeedSVG} />
            <Accessory name="3.2s" icon={AccelerationSVG} />
            <Accessory name="800 HP" icon={ForceSVG} />
            <Accessory name="Gasolina" icon={GasolineSVG} />
            <Accessory name="Auto" icon={ExchangeSVG} />
            <Accessory name="2 Pessoa" icon={PeopleSVG} />
          </Accessories>

          <About>
            Este é automóvel desportivo. Surgiu do lendário touro de lide
            indultado na praça Real Maestranza de Sevilla. É um belíssimo carro
            para quem gosta de acelerar.
          </About>
        </Content>
      </Container>
    </>
  );
}
