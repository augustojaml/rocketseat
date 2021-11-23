import React from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

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
  RentalPeriod,
  CalendarIcon,
  DateInfo,
  DateTitle,
  DateValue,
  RentalPrice,
  RentalPriceLabel,
  RentalPriceDetails,
  RentalPriceQuota,
  RentalPriceTotal,
  Footer,
} from './styled';
import { RFValue } from 'react-native-responsive-fontsize';
import { theme } from '../../styles/theme';

export function SchedulesDetails() {
  const navigation = useNavigation();

  function handleConfirmRental() {
    navigation.navigate('SchedulesCompleted');
  }

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
          <RentalPeriod>
            <CalendarIcon>
              <Feather
                name="calendar"
                size={RFValue(24)}
                color={theme.colors.shape}
              />
            </CalendarIcon>

            <DateInfo>
              <DateTitle>DE</DateTitle>
              <DateValue>18/06/2021</DateValue>
            </DateInfo>

            <Feather
              name="chevron-right"
              size={RFValue(10)}
              color={theme.colors.text}
            />

            <DateInfo>
              <DateTitle>DE</DateTitle>
              <DateValue>18/06/2021</DateValue>
            </DateInfo>
          </RentalPeriod>
          <RentalPrice>
            <RentalPriceLabel>TOTAL</RentalPriceLabel>
            <RentalPriceDetails>
              <RentalPriceQuota>R$ 580 x3 diárias</RentalPriceQuota>
              <RentalPriceTotal>R$ 2.900</RentalPriceTotal>
            </RentalPriceDetails>
          </RentalPrice>
        </Content>

        <Footer>
          <Button
            title="Alugar Agora"
            color={theme.colors.success}
            onPress={handleConfirmRental}
          />
        </Footer>
      </Container>
    </>
  );
}
