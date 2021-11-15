import React from 'react';
import { Container, Title, Icon } from './styled';

interface ICategorySelectButton {
  title: string;
  onPress: () => void;
}

export function CategorySelectButton({
  title,
  onPress,
}: ICategorySelectButton) {
  return (
    <>
      <Container onPress={onPress}>
        <Title>{title}</Title>
        <Icon name="chevron-down" />
      </Container>
    </>
  );
}
