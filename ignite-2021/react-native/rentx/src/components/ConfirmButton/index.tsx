import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';

import { Container, Title } from './styled';

interface IConfirmButton extends RectButtonProps {
  title: string;
}

export function ConfirmButton({ title, ...rest }: IConfirmButton) {
  return (
    <>
      <Container {...rest}>
        <Title>{title}</Title>
      </Container>
    </>
  );
}
