import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';

import { Container } from './styled';
import { useTheme } from 'styled-components';
import { BorderlessButtonProps } from 'react-native-gesture-handler';

interface IBackButton extends BorderlessButtonProps {
  color?: string;
}

export function BackButton({ color, ...rest }: IBackButton) {
  const theme = useTheme();

  return (
    <>
      <Container {...rest}>
        <MaterialIcons
          name="chevron-left"
          size={24}
          color={color ? color : theme.colors.text}
        />
      </Container>
    </>
  );
}
