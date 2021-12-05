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

import { useNetInfo } from '@react-native-community/netinfo';

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
  const [rentalPeriod, setRentalPeriod] = useState<IRentalPeriod>({} as IRentalPeriod);
  const [isLoading, setIsLoading] = useState(false);
  const [carUpdated, setCarUpdated] = useState<ICarDTO>({} as ICarDTO);
  const netInfo = useNetInfo();

  const rentalTotal = Number(dates.length * car.price);

  async function handleConfirmRental() {
    setIsLoading(true);
    await api
      .post('rentals', {
        user_id: 1,
        car_id: car.id,
        start_date: new Date(dates[0]),
        end_date: new Date(dates[dates.length - 1]),
        total: rentalTotal,
      })
      .then(() => {
        navigation.navigate('Confirmation', {
          nextScreenRoute: 'Home',
          title: 'Carro alugado!',
          message: `Agora você só precisa ir\naté a concessionária da RENTX\npegar o seu automóvel.`,
        });
      })
      .catch((error) => {
        setIsLoading(false);
        Alert.alert('Não foi possível confirmar o agendamento.');
      });
  }

  function handleBack() {
    navigation.goBack();
  }

  useEffect(() => {
    setRentalPeriod({
      start: format(Util.getPlatformDate(new Date(dates[0])), 'dd/MM/yyyy'),
      end: format(Util.getPlatformDate(new Date(dates[dates.length - 1])), 'dd/MM/yyyy'),
    });
  }, []);

  useEffect(() => {
    (async () => {
      if (netInfo.isConnected === true) {
        const response = await api.get(`/cars/${car.id}`);
        setCarUpdated(response.data);
      }
    })();
  }, [netInfo.isConnected]);

  return (
    <>
      <Container>
        <Header>
          <BackButton onPress={handleBack} />
        </Header>
        <CarImages>
          <ImageSlider
            imagesUrl={!!carUpdated.photos ? carUpdated.photos : [{ id: car.thumbnail, photo: car.thumbnail }]}
          />
        </CarImages>
        <Content>
          <Details>
            <Description>
              <Brand>{car.brand}</Brand>
              <Name>{car.name}</Name>
            </Description>

            <Rent>
              <Period>{car.period}</Period>
              <Price>{`R$ ${car.price}`}</Price>
            </Rent>
          </Details>
          <Accessories>
            {carUpdated.accessories &&
              carUpdated.accessories.map((accessory) => (
                <Accessory key={accessory.type} name={accessory.name} icon={Util.getAccessoryIcon(accessory.type)} />
              ))}
          </Accessories>
          <RentalPeriod>
            <CalendarIcon>
              <Feather name="calendar" size={RFValue(24)} color={theme.colors.shape} />
            </CalendarIcon>

            <DateInfo>
              <DateTitle>DE</DateTitle>
              <DateValue>{rentalPeriod.start}</DateValue>
            </DateInfo>

            <Feather name="chevron-right" size={RFValue(10)} color={theme.colors.text} />

            <DateInfo>
              <DateTitle>ATÉ</DateTitle>
              <DateValue>{rentalPeriod.end}</DateValue>
            </DateInfo>
          </RentalPeriod>
          <RentalPrice>
            <RentalPriceLabel>TOTAL</RentalPriceLabel>
            <RentalPriceDetails>
              <RentalPriceQuota>{`R$ ${car.price} x${dates.length} diárias`}</RentalPriceQuota>
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
