import React from 'react';
import { ActivityIndicator } from 'react-native';
import { useTheme } from 'styled-components';
import { theme } from '../../styles/theme';
import { Container } from './styled';

export function Loading() {
  const {} = useTheme();
  return (
    <>
      <Container>
        <ActivityIndicator color={theme.colors.main} size="large" />
      </Container>
    </>
  );
}
