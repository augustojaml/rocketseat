import React, { useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { useTheme } from 'styled-components';
import { ArrowSVG } from '../../assets';
import { BackButton } from '../../components/BackButton';
import { Button } from '../../components/Button';
import { Calendar, generateInterval, IDayProps, IMarkedDates } from '../../components/Calendar';

import { Container, Header, Title, RentalPeriod, DateInfo, DateTitle, DateValue, Content, Footer } from './styled';
import { Util } from '../../utils';
import { format } from 'date-fns';
import { ICarParams } from '../CarDetails';
import { ICarDTO } from '../../dtos/ICarDTO';

interface IRentalPeriod {
  startFormatted: string;
  endFormatted: string;
}

import { Car as CarModel } from '../../database/model/Car';

interface Params {
  car: CarModel;
}

export function Schedules() {
  const [lastSelectedDate, setLastSelectedDate] = useState<IDayProps>({} as IDayProps);
  const [markedDates, setMarkedDates] = useState<IMarkedDates>({} as IMarkedDates);

  const [rentalPeriod, setRentalPeriod] = useState<IRentalPeriod>({} as IRentalPeriod);

  const theme = useTheme();
  const navigation = useNavigation();
  const { car } = useRoute().params as Params;

  function handleConfirmRental() {
    navigation.navigate('SchedulesDetails', {
      car,
      dates: Object.keys(markedDates),
    });
  }

  function handleBack() {
    navigation.goBack();
  }

  function handleChangerDate(date: IDayProps) {
    let start = !lastSelectedDate.timestamp ? date : lastSelectedDate;
    let end = date;

    if (start.timestamp > end.timestamp) {
      start = end;
      end = start;
    }

    setLastSelectedDate(end);
    const interval = generateInterval(start, end);
    setMarkedDates(interval);

    const firstDate = Object.keys(interval)[0];
    const endDate = Object.keys(interval)[Object.keys(interval).length - 1];

    setRentalPeriod({
      startFormatted: format(Util.getPlatformDate(new Date(firstDate)), 'dd/MM/yyyy'),
      endFormatted: format(Util.getPlatformDate(new Date(endDate)), 'dd/MM/yyyy'),
    });
  }

  return (
    <>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <Container>
        <Header>
          <BackButton onPress={handleBack} color={theme.colors.shape} />
          <Title>
            Escolha uma {'\n'}
            Data de início e {'\n'}
            fim do aluguel
          </Title>
          <RentalPeriod>
            <DateInfo>
              <DateTitle>DE</DateTitle>
              <DateValue selected={!!rentalPeriod.startFormatted}>{rentalPeriod.startFormatted}</DateValue>
            </DateInfo>
            <ArrowSVG />
            <DateInfo>
              <DateTitle>DE</DateTitle>
              <DateValue selected={!!rentalPeriod.endFormatted}>{rentalPeriod.endFormatted}</DateValue>
            </DateInfo>
          </RentalPeriod>
        </Header>
        <Content>
          <Calendar markedDates={markedDates} onDayPress={handleChangerDate} />
        </Content>
        <Footer>
          <Button title="Confirmar" enabled={!!rentalPeriod.endFormatted} onPress={handleConfirmRental} />
        </Footer>
      </Container>
    </>
  );
}
