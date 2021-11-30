import React, { useEffect } from 'react';
import AppLoading from 'expo-app-loading';
import * as SplashScreen from 'expo-splash-screen';

import { ThemeProvider } from 'styled-components/native';

import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
} from '@expo-google-fonts/inter';
import {
  Archivo_400Regular,
  Archivo_500Medium,
  Archivo_600SemiBold,
} from '@expo-google-fonts/archivo';

import { theme } from './src/styles/theme';
import { Routes } from './src/routes';
import { AppProvider } from './src/hooks';

export function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Archivo_400Regular,
    Archivo_500Medium,
    Archivo_600SemiBold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <AppProvider>
          <Routes />
        </AppProvider>
      </ThemeProvider>
    </>
  );
}
