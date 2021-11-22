import React from 'react';

import { Container, Title } from './styled';

interface IButton {
  title: string;
  color?: string;
}

export function Button({ title, color, ...rest }: IButton) {
  return (
    <>
      <Container {...rest} color={color}>
        <Title>{title}</Title>
      </Container>
    </>
  );
}
