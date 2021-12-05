import React, { useEffect, useState } from 'react';
import { Button, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useNetInfo } from '@react-native-community/netinfo';
import { RFValue } from 'react-native-responsive-fontsize';
import { synchronize } from '@nozbe/watermelondb/sync';
import { database } from '../../database';

import { LogoSVG } from '../../assets';
import { Car } from '../../components/Car';
import { Car as CarModel } from '../../database/model/Car';

import { Container, HeaderContent, Header, TotalCars, CarList } from './styled';
import { api } from '../../services/api';
import { CarAnimated } from '../../components/CarAnimated';

export function Home() {
  const navigation = useNavigation();
  const netInfo = useNetInfo();

  const [cars, setCars] = useState<CarModel[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  function handleCarDetails(car: CarModel) {
    navigation.navigate('CarDetails', { car: car });
  }

  function handleOpenMyCars() {
    navigation.navigate('MyCars');
  }

  async function offlineSynchronize() {
    await synchronize({
      database,
      pullChanges: async ({ lastPulledAt }) => {
        const response = await api.get(`cars/sync/pull?lastPulledVersion=${lastPulledAt || 0}`);
        const { changes, latestVersion } = response.data;

        return { changes, timestamp: latestVersion };
      },
      pushChanges: async ({ changes }) => {
        try {
          const user = changes.users;
          await api.post('/users/sync', user);
        } catch (error: any) {
          console.log(error.message);
        }
      },
    });
  }

  useEffect(() => {
    let isMounted = true;

    (async () => {
      try {
        setIsLoading(true);
        const carCollection = database.get<CarModel>('cars');
        const cars = await carCollection.query().fetch();
        if (isMounted) {
          setCars(cars);
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

  useEffect(() => {
    if (netInfo.isConnected === true) {
      offlineSynchronize();
    }
  }, [netInfo.isConnected]);

  return (
    <>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <Container>
        <Header>
          <HeaderContent>
            <LogoSVG width={RFValue(108)} height={RFValue(12)} />
            {!isLoading && <TotalCars>Total de {String(cars.length).padStart(2, '0')} carros</TotalCars>}
          </HeaderContent>
        </Header>
        {isLoading ? (
          <CarAnimated />
        ) : (
          <CarList
            data={cars}
            keyExtractor={(item) => item.id}
            renderItem={({ item: car }) => <Car car={car} onPress={() => handleCarDetails(car)} />}
          />
        )}
      </Container>
    </>
  );
}
