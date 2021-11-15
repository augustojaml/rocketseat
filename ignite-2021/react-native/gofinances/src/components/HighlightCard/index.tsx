import React from 'react';
import {
  Container,
  Header,
  Title,
  FeatherIcon,
  Footer,
  Amount,
  LastTransaction,
} from './styled';

interface IHighlightCardProps {
  data: {
    type: 'up' | 'down' | 'total';
    title: string;
    amount: string;
    lastTransaction: string;
  };
}

const icon = {
  up: 'arrow-up-circle',
  down: 'arrow-down-circle',
  total: 'dollar-sign',
};

export function HighlightCard({ data }: IHighlightCardProps) {
  return (
    <>
      <Container type={data.type}>
        <Header>
          <Title type={data.type}>{data.title}</Title>
          <FeatherIcon name={icon[data.type]} type={data.type} />
        </Header>
        <Footer>
          <Amount type={data.type}>{data.amount}</Amount>
          <LastTransaction type={data.type}>
            {data.lastTransaction}
          </LastTransaction>
        </Footer>
      </Container>
    </>
  );
}
