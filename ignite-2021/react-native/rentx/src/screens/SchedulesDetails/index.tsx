import React, { useEffect, useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';

import { Util } from '../../utils';
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
import { ICarDTO } from '../../dtos/ICarDTO';
import { format } from 'date-fns';
import { api } from '../../services/api';
import { Alert } from 'react-native';

interface ICarParams {
  car: ICarDTO;
  dates: string[];
}

interface IRentalPeriod {
  start: string;
  end: string;
}

export function SchedulesDetails() {
  const navigation = useNavigation();
  const { car, dates } = useRoute().params as ICarParams;
  const [rentalPeriod, setRentalPeriod] = useState<IRentalPeriod>(
    {} as IRentalPeriod
  );
  const [isLoading, setIsLoading] = useState(false);

  const rentalTotal = Number(dates.length * car.rent.price);

  async function handleConfirmRental() {
    setIsLoading(true);
    const schedulesByCar = await api.get(`/schedules_bycars/${car.id}`);

    const unavailable_dates = [
      ...schedulesByCar.data.unavailable_dates,
      ...dates,
    ];

    await api.post('/schedules_byuser', {
      user_id: 1,
      car,
      startDate: format(Util.getPlatformDate(new Date(dates[0])), 'dd/MM/yyyy'),
      endDate: format(
        Util.getPlatformDate(new Date(dates[dates.length - 1])),
        'dd/MM/yyyy'
      ),
    });

    await api
      .put(`/schedules_bycars/${car.id}`, {
        id: car.id,
        unavailable_dates,
      })
      .then((response) => navigation.navigate('SchedulesCompleted'))
      .catch(() => {
        Alert.alert('Não foi possivel confirmar o agendamento');
        setIsLoading(false);
      });
  }

  function handleBack() {
    navigation.goBack();
  }

  useEffect(() => {
    setRentalPeriod({
      start: format(Util.getPlatformDate(new Date(dates[0])), 'dd/MM/yyyy'),
      end: format(
        Util.getPlatformDate(new Date(dates[dates.length - 1])),
        'dd/MM/yyyy'
      ),
    });
  }, []);

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
              <DateValue>{rentalPeriod.start}</DateValue>
            </DateInfo>

            <Feather
              name="chevron-right"
              size={RFValue(10)}
              color={theme.colors.text}
            />

            <DateInfo>
              <DateTitle>ATÉ</DateTitle>
              <DateValue>{rentalPeriod.end}</DateValue>
            </DateInfo>
          </RentalPeriod>
          <RentalPrice>
            <RentalPriceLabel>TOTAL</RentalPriceLabel>
            <RentalPriceDetails>
              <RentalPriceQuota>{`R$ ${car.rent.price} x${dates.length} diárias`}</RentalPriceQuota>
              <RentalPriceTotal>{`R$ ${rentalTotal}`}</RentalPriceTotal>
            </RentalPriceDetails>
          </RentalPrice>
        </Content>

        <Footer>
          <Button
            title="Alugar Agora"
            color={theme.colors.success}
            onPress={handleConfirmRental}
            enabled={!isLoading}
            isLoading={isLoading}
          />
        </Footer>
      </Container>
    </>
  );
}
