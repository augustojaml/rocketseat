import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home } from '../screens/Home';
import { CarDetails } from '../screens/CarDetails';
import { Schedules } from '../screens/Schedules';
import { SchedulesDetails } from '../screens/SchedulesDetails';
import { SchedulesCompleted } from '../screens/SchedulesCompleted';
import { ICarDTO } from '../dtos/ICarDTO';

const { Navigator, Screen } = createNativeStackNavigator();

declare global {
  namespace ReactNavigation {
    interface RootParamList {
      Home: undefined;
      CarDetails: { car: ICarDTO };
      Schedules: undefined;
      SchedulesDetails: undefined;
      SchedulesCompleted: undefined;
    }
  }
}

export function StackRoutes() {
  return (
    <>
      <Navigator screenOptions={{ headerShown: false }}>
        <Screen name="Home" component={Home} />
        <Screen name="CarDetails" component={CarDetails} />
        <Screen name="Schedules" component={Schedules} />
        <Screen name="SchedulesDetails" component={SchedulesDetails} />
        <Screen name="SchedulesCompleted" component={SchedulesCompleted} />
      </Navigator>
    </>
  );
}
