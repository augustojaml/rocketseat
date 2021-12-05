import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home } from '../screens/Home';
import { CarDetails } from '../screens/CarDetails';
import { Schedules } from '../screens/Schedules';
import { SchedulesDetails } from '../screens/SchedulesDetails';
import { Confirmation } from '../screens/Confirmation';

import { MyCars } from '../screens/MyCars';
import { ICarDTO } from '../dtos/ICarDTO';
import { Car } from '../database/model/Car';

const { Navigator, Screen } = createNativeStackNavigator();

interface IConfirmation {
  title: string;
  message: string;
  nextScreenRoute: keyof ReactNavigation.RootParamList;
}

declare global {
  namespace ReactNavigation {
    interface RootParamList {
      Home: undefined;
      CarDetails: { car: Car };
      Schedules: { car: Car };
      SchedulesDetails: { car: Car; dates: string[] };
      Confirmation: IConfirmation;
      MyCars: undefined;
    }
  }
}

export function AppStackRoutes() {
  return (
    <>
      <Navigator initialRouteName={'Home'} screenOptions={{ headerShown: false }}>
        <Screen name="Home" component={Home} options={{ gestureEnabled: false }} />

        <Screen name="CarDetails" component={CarDetails} />

        <Screen name="Schedules" component={Schedules} />

        <Screen name="SchedulesDetails" component={SchedulesDetails} />

        <Screen name="Confirmation" component={Confirmation} />

        <Screen name="MyCars" component={MyCars} />
      </Navigator>
    </>
  );
}
