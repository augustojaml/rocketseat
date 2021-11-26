import React from 'react';
import { StatusBar } from 'react-native';
import { useTheme } from 'styled-components';
import { Button } from '../../components/Button';

import { Container, Header, SubTitle, Title, Footer } from './styled';

export function SignIn() {
  const theme = useTheme();

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor="transparent"
      />
      <Container>
        <Header>
          <Title>Estamos{'\n'}quase lá.</Title>
          <SubTitle>
            Faça seu login para começar{'\n'}uma experiência incrível
          </SubTitle>
        </Header>
        <Footer>
          <Button
            title="login"
            onPress={() => {}}
            enabled={false}
            isLoading={false}
          />
          <Button
            color={theme.colors.background_secondary}
            title="Criar conta gratuita"
            onPress={() => {}}
            enabled={true}
            isLoading={false}
            light={true}
          />
        </Footer>
      </Container>
    </>
  );
}
