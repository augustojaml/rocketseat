import AsyncStorage from '@react-native-async-storage/async-storage';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useFocusEffect } from '@react-navigation/core';
import { addMonths, format, subMonths } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';
import { VictoryPie } from 'victory-native';

import { HistoryCard } from '../../components/HistoryCard';
import { categories } from '../../utils/categories';
import { StorageKeys } from '../../utils/StorageKeys';

import {
  Container,
  Header,
  Title,
  ContentScroll,
  ChartContainer,
  MonthSelect,
  MonthSelectButton,
  MonthTitle,
  MonthSelectIcon,
  LoadContainer,
} from './styled';

interface IHistoryCardData {
  type: 'positive' | 'negative';
  name: string;
  amount: string;
  category: string;
  date: string;
}

interface ISumCategory {
  key: string;
  name: string;
  totalFormatted: string;
  total: number;
  color: string;
  percent: string;
}

export function Resumo() {
  const theme = useTheme();
  const [totalByCategories, setTotalByCategories] = useState<ISumCategory[]>(
    [],
  );
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);

  let newDate: Date;
  function handleDateChange(action: 'next' | 'prev') {
    if (action === 'next') {
      newDate = addMonths(selectedDate, 1);
    }

    if (action === 'prev') {
      newDate = subMonths(selectedDate, 1);
    }

    setSelectedDate(newDate);
  }

  async function loadingData() {
    setIsLoading(true);
    const getStorageData = await AsyncStorage.getItem(StorageKeys.transaction);
    const transactions: IHistoryCardData[] = getStorageData
      ? JSON.parse(getStorageData)
      : [];

    const totalByCategory: ISumCategory[] = [];

    const expensives = transactions.filter(
      expensive =>
        expensive.type === 'negative' &&
        new Date(expensive.date).getMonth() === selectedDate.getMonth() &&
        new Date(expensive.date).getFullYear() === selectedDate.getFullYear(),
    );

    const expensivesTotal = expensives.reduce(
      (accumulator: number, expensive: IHistoryCardData) => {
        return accumulator + Number(expensive.amount);
      },
      0,
    );

    categories.forEach(category => {
      let categorySum = 0;
      expensives.forEach(expensive => {
        if (expensive.category === category.key) {
          categorySum += Number(expensive.amount);
        }
      });

      if (categorySum > 0) {
        totalByCategory.push({
          key: category.key,
          name: category.name,
          totalFormatted: Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          })
            .format(Number(categorySum))
            .replace(/^(\D+)/, '$1 '),
          total: categorySum,
          color: category.color,
          percent: `${((categorySum / expensivesTotal) * 100).toFixed(0)}%`,
        });
      }
    });

    setTotalByCategories(totalByCategory);
    setIsLoading(false);
  }

  useFocusEffect(
    useCallback(() => {
      loadingData();
    }, [selectedDate]),
  );

  return (
    <>
      <Container>
        <Header>
          <Title>Resumo</Title>
        </Header>

        {isLoading ? (
          <LoadContainer>
            <ActivityIndicator color={theme.colors.primary} size="large" />
          </LoadContainer>
        ) : (
          <ContentScroll
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: 24,
              paddingBottom: useBottomTabBarHeight(),
            }}
          >
            <MonthSelect>
              <MonthSelectButton onPress={() => handleDateChange('prev')}>
                <MonthSelectIcon name="chevron-left" />
              </MonthSelectButton>

              <MonthTitle>
                {format(selectedDate, 'MMMM, yyyy', { locale: ptBR })}
              </MonthTitle>

              <MonthSelectButton onPress={() => handleDateChange('next')}>
                <MonthSelectIcon name="chevron-right" />
              </MonthSelectButton>
            </MonthSelect>
            <ChartContainer>
              <VictoryPie
                data={totalByCategories}
                x="percent"
                y="total"
                colorScale={totalByCategories.map(category => category.color)}
                style={{
                  labels: {
                    fontSize: RFValue(18),
                    fontWeight: 'bold',
                    fill: theme.colors.shape,
                  },
                }}
                labelRadius={50}
              />
            </ChartContainer>
            {totalByCategories.map(category => (
              <HistoryCard
                key={category.key}
                color={category.color}
                title={category.name}
                amount={category.totalFormatted}
              />
            ))}
          </ContentScroll>
        )}
      </Container>
    </>
  );
}
