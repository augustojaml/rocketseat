import { useNavigation } from '@react-navigation/native';
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

interface IMyCars {
  id: string;
  user_id: string;
  car: ICarDTO;
  startDate: string;
  endDate: string;
}

export function MyCars() {
  const theme = useTheme();
  const navigation = useNavigation();

  const [cars, setCars] = useState<IMyCars[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  function handleBack() {
    navigation.goBack();
  }

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const response = await api.get('schedules_byuser?user_id=1');
        setCars(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

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
                <AppointmentsQuantity>
                  {String(cars.length).padStart(2, '0')}
                </AppointmentsQuantity>
              </Appointments>
              <FlatList
                data={cars}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                  <CarWrapper>
                    <Car car={item.car} />
                    <CarFooter>
                      <CarFooterTitle>Período</CarFooterTitle>
                      <CarFooterPeriod>
                        <CarFooterDate>{item.startDate}</CarFooterDate>
                        <AntDesign
                          name="arrowright"
                          size={20}
                          color={theme.colors.title}
                          style={{ marginHorizontal: 10 }}
                        />
                        <CarFooterDate>{item.endDate}</CarFooterDate>
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
