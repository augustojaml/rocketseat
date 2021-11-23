import React from 'react';
import { useNavigation } from '@react-navigation/native';

import { StatusBar, useWindowDimensions } from 'react-native';
import { DoneSVG, LogoBackgroundGraySVG } from '../../assets';
import { ConfirmButton } from '../../components/ConfirmButton';

import { Container, Content, Title, Message, Footer } from './styled';

export function SchedulesCompleted() {
  const { width } = useWindowDimensions();

  const navigation = useNavigation();

  function handleConfirm() {
    navigation.navigate('Home');
  }

  return (
    <>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <Container>
        <LogoBackgroundGraySVG width={width} />
        <Content>
          <DoneSVG width={80} height={80} />
          <Title>Carro Alugado</Title>
          <Message>
            Agora você só precisa ir {'\n'}
            Até a concessionária da RENTX {'\n'}
            pegar o seu automóvel
          </Message>
        </Content>
        <Footer>
          <ConfirmButton title="OK" onPress={handleConfirm} />
        </Footer>
      </Container>
    </>
  );
}
