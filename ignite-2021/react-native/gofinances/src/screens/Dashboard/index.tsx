import React, { useCallback, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { ActivityIndicator } from 'react-native';
import { useTheme } from 'styled-components';
import { HighlightCard } from '../../components/HighlightCard';
import {
  ITransaction,
  TransactionCard,
} from '../../components/TransactionCard';
import {
  Container,
  Header,
  UserWrapper,
  UserInfo,
  Photo,
  User,
  UserGreeting,
  UserName,
  LogoutButton,
  FeatherIcon,
  HighlightCards,
  Transactions,
  Title,
  TransactionList,
  LoadContainer,
} from './styled';
import { StorageKeys } from '../../utils/StorageKeys';
import { useAuth } from '../../hooks/useAuth';

export interface ITransactionListProps extends ITransaction {
  id: string;
}

interface IHighLightProps {
  amount: string;
  lastTransaction: string;
}
interface IHighlightData {
  entries: IHighLightProps;
  expensives: IHighLightProps;
  total: IHighLightProps;
}

export function Dashboard() {
  const theme = useTheme();
  const { signIOut, user } = useAuth();

  const [transactions, setTransactions] = useState<ITransactionListProps[]>([]);
  const [highlightData, setHighlightData] = useState<IHighlightData>(
    {} as IHighlightData,
  );

  const [isLoading, setIsLoading] = useState(true);

  function getLastTransactionData(
    collection: ITransactionListProps[],
    type: 'positive' | 'negative',
  ) {
    if (collection.length === 0) {
      return null;
    }

    if (collection.length === 1) {
      return Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: 'long',
      }).format(new Date(collection[0].date).getTime());
    }

    const lastTransactions = new Date(
      Math.max.apply(
        Math,
        collection
          .filter(transaction => transaction.type === type)
          .map(transaction => new Date(transaction.date).getTime()),
      ),
    );

    return Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: 'long',
    }).format(lastTransactions);
  }

  async function loadingTransactions() {
    const getStorageData = await AsyncStorage.getItem(
      `@goFinances:transaction_user:${user.id}`,
    );
    const data = getStorageData ? JSON.parse(getStorageData) : [];

    let entriesTotal = 0;
    let expensiveTotal = 0;

    const dataFormatted: ITransactionListProps[] = data.map(
      (item: ITransactionListProps) => {
        if (item.type === 'positive') {
          entriesTotal += Number(item.amount);
        } else {
          expensiveTotal += Number(item.amount);
        }

        return {
          id: item.id,
          name: item.name,
          amount: Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          })
            .format(Number(item.amount))
            .replace(/^(\D+)/, '$1 '),
          type: item.type,
          category: item.category,
          date: Intl.DateTimeFormat('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: '2-digit',
          }).format(new Date(item.date)),
        };
      },
    );

    setTransactions(dataFormatted);

    const lastTransactionEntries = getLastTransactionData(data, 'positive');
    const lastTransactionExpensive = getLastTransactionData(data, 'negative');
    const totalInterval = `01 a ${lastTransactionExpensive}`;

    const total = entriesTotal - expensiveTotal;

    setHighlightData({
      entries: {
        amount: entriesTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }),
        lastTransaction: `Última entrada dia ${lastTransactionEntries}`,
      },
      expensives: {
        amount: expensiveTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }),
        lastTransaction: `Última entrada dia ${lastTransactionExpensive}`,
      },
      total: {
        amount: total.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }),
        lastTransaction: totalInterval,
      },
    });

    setIsLoading(false);
  }

  useEffect(() => {
    loadingTransactions();
    // AsyncStorage.removeItem(StorageKeys.transaction);
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadingTransactions();
    }, []),
  );

  return (
    <>
      <Container>
        {isLoading ? (
          <LoadContainer>
            <ActivityIndicator color={theme.colors.primary} size="large" />
          </LoadContainer>
        ) : (
          <>
            <Header>
              <UserWrapper>
                <UserInfo>
                  <Photo
                    source={{
                      uri: user.avatar
                        ? user.avatar
                        : `https://ui-avatars.com/api/?name=${user.name}`,
                    }}
                  />
                  <User>
                    <UserGreeting>Olá, </UserGreeting>
                    <UserName>{user?.name}</UserName>
                  </User>
                </UserInfo>
                <LogoutButton onPress={signIOut}>
                  <FeatherIcon name="power" />
                </LogoutButton>
              </UserWrapper>
            </Header>
            <HighlightCards>
              <HighlightCard
                data={{
                  type: 'up',
                  title: 'Entrada',
                  amount: highlightData.entries.amount,
                  lastTransaction: highlightData.entries.lastTransaction,
                }}
              />
              <HighlightCard
                data={{
                  type: 'down',
                  title: 'Saida',
                  amount: highlightData.expensives.amount,
                  lastTransaction: highlightData.expensives.lastTransaction,
                }}
              />
              <HighlightCard
                data={{
                  type: 'total',
                  title: 'total',
                  amount: highlightData.total.amount,
                  lastTransaction: highlightData.total.lastTransaction,
                }}
              />
            </HighlightCards>
            <Transactions>
              <Title>Listagem</Title>
              <TransactionList
                data={transactions}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                  <TransactionCard transaction={item} />
                )}
              />
            </Transactions>
          </>
        )}
      </Container>
    </>
  );
}
