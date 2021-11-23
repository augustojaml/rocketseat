import React from 'react';
import { StatusBar } from 'react-native';
import { useTheme } from 'styled-components';
import { ArrowSVG } from '../../assets';
import { BackButton } from '../../components/BackButton';
import { Button } from '../../components/Button';
import { Calendar } from '../../components/Calendar';

import {
  Container,
  Header,
  Title,
  RentalPeriod,
  DateInfo,
  DateTitle,
  DateValue,
  Content,
  Footer,
} from './styled';

export function Schedules() {
  const theme = useTheme();

  return (
    <>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <Container>
        <Header>
          <BackButton onPress={() => {}} color={theme.colors.shape} />
          <Title>
            Escolha uma {'\n'}
            Data de início e {'\n'}
            fim do aluguel
          </Title>
          <RentalPeriod>
            <DateInfo>
              <DateTitle>DE</DateTitle>
              <DateValue selected={false}>21/114/2021</DateValue>
            </DateInfo>
            <ArrowSVG />
            <DateInfo>
              <DateTitle>DE</DateTitle>
              <DateValue selected={false}>21/114/2021</DateValue>
            </DateInfo>
          </RentalPeriod>
        </Header>
        <Content>
          <Calendar />
        </Content>
        <Footer>
          <Button title="Confirmar" />
        </Footer>
      </Container>
    </>
  );
}
