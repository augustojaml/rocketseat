import { useNavigation, useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { useTheme } from 'styled-components';
import { BackButton } from '../../components/BackButton';
import { AntDesign } from '@expo/vector-icons';
import { Car } from '../../components/Car';
import { ICarDTO } from '../../dtos/ICarDTO';
import { api } from '../../services/api';

import {
  Container,
  Header,
  Title,
  SubTitle,
  Content,
  Appointments,
  AppointmentsTitle,
  AppointmentsQuantity,
  CarWrapper,
  CarFooter,
  CarFooterTitle,
  CarFooterPeriod,
  CarFooterDate,
} from './styled';
import { Loading } from '../../components/Loading';
import { CarAnimated } from '../../components/CarAnimated';

import { Car as CarModel } from '../../database/model/Car';
import { format, parseISO } from 'date-fns';

interface IMyCars {
  id: string;
  user_id: string;
  car: ICarDTO;
  startDate: string;
  endDate: string;
}

interface IMyCar {
  id: string;
  car: CarModel;
  start_date: string;
  end_date: string;
}

export function MyCars() {
  const theme = useTheme();
  const navigation = useNavigation();
  const screenIsFocus = useIsFocused();

  const [cars, setCars] = useState<IMyCar[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  function handleBack() {
    navigation.goBack();
  }

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const response = await api.get('rentals');
        const dataFormatted = response.data.map((data: IMyCar) => {
          return {
            id: data.id,
            car: data.car,
            start_date: format(parseISO(data.start_date), 'dd/MM/yyyy'),
            end_date: format(parseISO(data.end_date), 'dd/MM/yyyy'),
          };
        });
        setCars(dataFormatted);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [screenIsFocus]);

  return (
    <>
      <Container>
        <Header>
          <BackButton onPress={handleBack} color={theme.colors.shape} />
          <Title>
            Seus agendamentos {'\n'}
            estão aqui.
          </Title>
          <SubTitle>Conforto, segurança e praticidade</SubTitle>
        </Header>
        <Content>
          {isLoading ? (
            <CarAnimated />
          ) : (
            <>
              <Appointments>
                <AppointmentsTitle>Agendamentos Feitos</AppointmentsTitle>
                <AppointmentsQuantity>{String(cars.length).padStart(2, '0')}</AppointmentsQuantity>
              </Appointments>
              <FlatList
                data={cars}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                  <CarWrapper>
                    <Car key={item.id} car={item.car} />
                    <CarFooter>
                      <CarFooterTitle>Período</CarFooterTitle>
                      <CarFooterPeriod>
                        <CarFooterDate>{item.start_date}</CarFooterDate>
                        <AntDesign
                          name="arrowright"
                          size={20}
                          color={theme.colors.title}
                          style={{ marginHorizontal: 10 }}
                        />
                        <CarFooterDate>{item.end_date}</CarFooterDate>
                      </CarFooterPeriod>
                    </CarFooter>
                  </CarWrapper>
                )}
              />
            </>
          )}
        </Content>
      </Container>
    </>
  );
}
