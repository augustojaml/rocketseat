import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home } from '../screens/Home';
import { CarDetails } from '../screens/CarDetails';
import { Schedules } from '../screens/Schedules';
import { SchedulesDetails } from '../screens/SchedulesDetails';
import { Confirmation } from '../screens/Confirmation';
import { Splash } from '../screens/Splash';

import { MyCars } from '../screens/MyCars';
import { ICarDTO } from '../dtos/ICarDTO';
import { SignIn } from '../screens/SignIn';
import { SignUpFirstStep } from '../screens/SignUp/SignUpFirstStep';
import { SignUpSecondStep } from '../screens/SignUp/SignUpSecondStep';

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
      CarDetails: { car: ICarDTO };
      Schedules: { car: ICarDTO };
      SchedulesDetails: { car: ICarDTO; dates: string[] };
      Confirmation: IConfirmation;
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
        initialRouteName={'Home'}
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

        <Screen name="Confirmation" component={Confirmation} />

        <Screen name="MyCars" component={MyCars} />
      </Navigator>
    </>
  );
}
