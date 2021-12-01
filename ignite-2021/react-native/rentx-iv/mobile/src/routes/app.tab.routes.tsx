import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Home } from '../screens/Home';
import { MyCars } from '../screens/MyCars';
import { AppStackRoutes } from './app.stack.routes';
import { useTheme } from 'styled-components';
import { Platform } from 'react-native';
import { CarSVG, HomeSVG, PeopleSVG } from '../assets';

const { Navigator, Screen } = createBottomTabNavigator();

interface IConfirmation {
  title: string;
  message: string;
  nextScreenRoute: keyof ReactNavigation.RootParamList;
}

declare global {
  namespace ReactNavigation {
    interface RootParamList {
      Splash: undefined;
      Home: undefined;
      Profile: undefined;

      MyCars: undefined;
    }
  }
}

export function AppTabRoutes() {
  const theme = useTheme();
  return (
    <>
      <Navigator
        initialRouteName={'Home'}
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: theme.colors.main,
          tabBarInactiveTintColor: theme.colors.text_detail,
          tabBarShowLabel: false,
          tabBarStyle: {
            paddingVertical: Platform.OS === 'ios' ? 20 : 0,
            height: 78,
            backgroundColor: theme.colors.background_primary,
          },
        }}
      >
        <Screen
          name="AppStackRoutes"
          component={AppStackRoutes}
          options={{
            tabBarIcon: ({ color }) => (
              <HomeSVG width={24} height={24} fill={color} />
            ),
          }}
        />

        <Screen
          name="Profile"
          component={Home}
          options={{
            tabBarIcon: ({ color }) => (
              <CarSVG width={24} height={24} fill={color} />
            ),
          }}
        />

        <Screen
          name="MyCars"
          component={MyCars}
          options={{
            tabBarIcon: ({ color }) => (
              <PeopleSVG width={24} height={24} fill={color} />
            ),
          }}
        />
      </Navigator>
    </>
  );
}
