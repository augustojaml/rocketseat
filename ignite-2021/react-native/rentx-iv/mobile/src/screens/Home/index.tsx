import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { RFValue } from 'react-native-responsive-fontsize';
import { LogoSVG } from '../../assets';
import { Car } from '../../components/Car';

import { Container, HeaderContent, Header, TotalCars, CarList } from './styled';
import { api } from '../../services/api';
import { ICarDTO } from '../../dtos/ICarDTO';
import { CarAnimated } from '../../components/CarAnimated';

export function Home() {
  const navigation = useNavigation();

  const [cars, setCars] = useState<ICarDTO[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  function handleCarDetails(car: ICarDTO) {
    navigation.navigate('CarDetails', { car: car });
  }

  function handleOpenMyCars() {
    navigation.navigate('MyCars');
  }

  useEffect(() => {
    let isMounted = true;

    (async () => {
      try {
        setIsLoading(true);
        const response = await api.get('cars');
        if (isMounted) {
          setCars(response.data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    })();

    return () => {
      isMounted = false;
    };
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
            {!isLoading && (
              <TotalCars>
                Total de {String(cars.length).padStart(2, '0')} carros
              </TotalCars>
            )}
          </HeaderContent>
        </Header>
        {isLoading ? (
          <CarAnimated />
        ) : (
          <CarList
            data={cars}
            keyExtractor={(item) => item.id}
            renderItem={({ item: car }) => (
              <Car car={car} onPress={() => handleCarDetails(car)} />
            )}
          />
        )}
      </Container>
    </>
  );
}
