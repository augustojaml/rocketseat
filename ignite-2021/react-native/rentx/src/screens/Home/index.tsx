import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import { RFValue } from 'react-native-responsive-fontsize';
import { LogoSVG } from '../../assets';
import { Car } from '../../components/Car';

import {
  Container,
  HeaderContent,
  Header,
  TotalCars,
  CarList,
  MyCarsButton,
} from './styled';
import { api } from '../../services/api';
import { ICarDTO } from '../../dtos/ICarDTO';
import { Loading } from '../../components/Loading';
import { useTheme } from 'styled-components';

export function Home() {
  const navigation = useNavigation();
  const theme = useTheme();

  const [cars, setCars] = useState<ICarDTO[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  function handleCarDetails(car: ICarDTO) {
    navigation.navigate('CarDetails', { car: car });
  }

  function handleOpenMyCars() {
    navigation.navigate('MyCars');
  }

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const response = await api.get('cars');
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
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <Container>
        <Header>
          <HeaderContent>
            <LogoSVG width={RFValue(108)} height={RFValue(12)} />
            <TotalCars>
              Total de {String(cars.length).padStart(2, '0')} carros
            </TotalCars>
          </HeaderContent>
        </Header>
        {isLoading ? (
          <Loading />
        ) : (
          <CarList
            data={cars}
            keyExtractor={(item) => item.id}
            renderItem={({ item: car }) => (
              <Car car={car} onPress={() => handleCarDetails(car)} />
            )}
          />
        )}
        <MyCarsButton onPress={handleOpenMyCars}>
          <Ionicons name="ios-car-sport" size={32} color={theme.colors.shape} />
        </MyCarsButton>
      </Container>
    </>
  );
}
