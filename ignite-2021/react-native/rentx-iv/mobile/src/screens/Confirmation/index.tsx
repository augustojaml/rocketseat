import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';

import { StatusBar, useWindowDimensions } from 'react-native';
import { DoneSVG, LogoBackgroundGraySVG } from '../../assets';
import { ConfirmButton } from '../../components/ConfirmButton';

import { Container, Content, Title, Message, Footer } from './styled';

interface IConfirmation {
  title: string;
  message: string;
  nextScreenRoute: keyof ReactNavigation.RootParamList;
}

export function Confirmation() {
  const { width } = useWindowDimensions();
  const { title, message, nextScreenRoute } = useRoute()
    .params as IConfirmation;

  const navigation = useNavigation();

  function handleConfirm() {
    navigation.navigate(nextScreenRoute);
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
          <Title>{title}</Title>
          <Message>{message}</Message>
        </Content>
        <Footer>
          <ConfirmButton title="OK" onPress={handleConfirm} />
        </Footer>
      </Container>
    </>
  );
}
