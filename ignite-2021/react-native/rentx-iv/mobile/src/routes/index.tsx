import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useAuth } from '../hooks/useAuth';
import { AppTabRoutes } from './app.tab.routes';
import { AuthRoutes } from './auth.routes';
import { Loading } from '../components/Loading';

export function Routes() {
  const { user, isLoading } = useAuth();

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <NavigationContainer>{user.id ? <AppTabRoutes /> : <AuthRoutes />}</NavigationContainer>
      )}
    </>
  );
}
