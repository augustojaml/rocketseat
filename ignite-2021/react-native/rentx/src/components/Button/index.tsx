import React from 'react';
import { ActivityIndicator } from 'react-native';
import { RectButtonProps } from 'react-native-gesture-handler';
import { useTheme } from 'styled-components';

import { Container, Title } from './styled';

interface IButton extends RectButtonProps {
  title: string;
  color?: string;
  enabled?: boolean;
  isLoading?: boolean;
}

export function Button({
  title,
  color,
  enabled = true,
  isLoading = false,
  ...rest
}: IButton) {
  const theme = useTheme();

  return (
    <>
      <Container
        {...rest}
        color={color ? color : theme.colors.main}
        enabled={enabled}
        style={{ opacity: enabled === false || isLoading === true ? 0.5 : 1 }}
      >
        {isLoading ? (
          <ActivityIndicator color={theme.colors.shape} />
        ) : (
          <Title>{title}</Title>
        )}
      </Container>
    </>
  );
}
