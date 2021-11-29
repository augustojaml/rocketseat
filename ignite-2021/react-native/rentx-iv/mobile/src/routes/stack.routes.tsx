import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home } from '../screens/Home';
import { CarDetails } from '../screens/CarDetails';
import { Schedules } from '../screens/Schedules';
import { SchedulesDetails } from '../screens/SchedulesDetails';
import { SchedulesCompleted } from '../screens/SchedulesCompleted';
import { Splash } from '../screens/Splash';

import { MyCars } from '../screens/MyCars';
import { ICarDTO } from '../dtos/ICarDTO';
import { SignIn } from '../screens/SignIn';
import { SignUpFirstStep } from '../screens/SignUp/SignUpFirstStep';
import { SignUpSecondStep } from '../screens/SignUp/SignUpSecondStep';

const { Navigator, Screen } = createNativeStackNavigator();

declare global {
  namespace ReactNavigation {
    interface RootParamList {
      Home: undefined;
      CarDetails: { car: ICarDTO };
      Schedules: { car: ICarDTO };
      SchedulesDetails: { car: ICarDTO; dates: string[] };
      SchedulesCompleted: undefined;
      MyCars: undefined;
      Splash: undefined;
      SignIn: undefined;
      SignUpFirstStep: undefined;
      SignUpSecondStep: { addUser: IAddUserDTO };
    }
  }
}

export function StackRoutes() {
  return (
    <>
      <Navigator
        initialRouteName={'SignIn'}
        screenOptions={{ headerShown: false }}
      >
        <Screen name="SignIn" component={SignIn} />

        <Screen name="SignUpFirstStep" component={SignUpFirstStep} />
        <Screen name="SignUpSecondStep" component={SignUpSecondStep} />

        <Screen name="Splash" component={Splash} />

        <Screen
          name="Home"
          component={Home}
          options={{ gestureEnabled: false }}
        />

        <Screen name="CarDetails" component={CarDetails} />

        <Screen name="Schedules" component={Schedules} />

        <Screen name="SchedulesDetails" component={SchedulesDetails} />

        <Screen name="SchedulesCompleted" component={SchedulesCompleted} />

        <Screen name="MyCars" component={MyCars} />
      </Navigator>
    </>
  );
}
