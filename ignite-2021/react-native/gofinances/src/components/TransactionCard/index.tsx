/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { categories } from '../../utils/categories';

import {
  Container,
  Title,
  Amount,
  Footer,
  Category,
  FeatherIcon,
  Name,
  Date,
} from './styled';

export interface ITransaction {
  type: 'positive' | 'negative';
  name: string;
  amount: string;
  category: string;
  date: string;
}

interface ITransactionCard {
  transaction: ITransaction;
}

export function TransactionCard({ transaction }: ITransactionCard) {
  const category = categories.filter(
    item => item.key === transaction.category,
  )[0];
  return (
    <>
      <Container>
        <Title>{transaction.name}</Title>
        <Amount type={transaction.type}>
          {transaction.type === 'positive'
            ? transaction.amount
            : `- ${transaction.amount}`}
        </Amount>
        <Footer>
          <Category>
            <FeatherIcon name={category.icon} />
            <Name>{category.name}</Name>
          </Category>
          <Date>{transaction.date}</Date>
        </Footer>
      </Container>
    </>
  );
}
