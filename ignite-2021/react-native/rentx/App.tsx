import React from 'react';
import AppLoading from 'expo-app-loading';

import { useTheme } from 'styled-components';
import { ThemeProvider } from 'styled-components/native';

import { useFonts, Inter_400Regular, Inter_500Medium } from '@expo-google-fonts/inter';
import { Archivo_400Regular, Archivo_500Medium, Archivo_600SemiBold } from '@expo-google-fonts/archivo';

import { Home } from './src/screens/Home';
import { theme } from './src/styles/theme';

export function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Archivo_400Regular,
    Archivo_500Medium,
    Archivo_600SemiBold,
  });

  if (!fontsLoaded) {
    <AppLoading />;
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <Home />
      </ThemeProvider>
    </>
  );
}
