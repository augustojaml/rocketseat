import React from 'react';
import { Container, Title, Amount } from './styled';

interface IHistoryCard {
  color: string;
  title: string;
  amount: string;
}

export function HistoryCard({ color, title, amount }: IHistoryCard) {
  return (
    <>
      <Container color={color}>
        <Title>{title}</Title>
        <Amount>{amount}</Amount>
      </Container>
    </>
  );
}
