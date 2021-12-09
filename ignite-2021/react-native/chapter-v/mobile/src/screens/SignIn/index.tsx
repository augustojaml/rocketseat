/* eslint-disable consistent-return */
import React, { useState } from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { ActivityIndicator, Alert, Platform } from 'react-native';
import { useTheme } from 'styled-components';
import {
  Container,
  Header,
  TitleWrapper,
  Title,
  SignInTitle,
  FooterWrapper,
  Footer,
} from './styled';

import AppleSVG from '../../assets/apple.svg';
import GoogleSVG from '../../assets/google.svg';
import LogoSVG from '../../assets/logo.svg';
import { SignInSocialButton } from '../../components/SignInSocialButton';
import { useAuth } from '../../hooks/useAuth';

export function SignIn() {
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const { signInWithGoogle, signInWithApple } = useAuth();

  async function handleSignInWithGoogle() {
    try {
      setIsLoading(true);
      return await signInWithGoogle();
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
      Alert.alert('Não foi possivel se conectar com a conta Google');
      setIsLoading(false);
    }
  }

  async function handleSignInWithApple() {
    try {
      setIsLoading(true);
      return await signInWithApple();
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
      Alert.alert('Não foi possivel se conectar com a conta Apple');
      setIsLoading(false);
    }
  }

  return (
    <>
      <Container>
        <Header>
          <TitleWrapper>
            <LogoSVG width={RFValue(120)} height={RFValue(68)} />
            <Title>
              Controle suas {'\n'} finanças de forma {'\n'} muito simples
            </Title>
          </TitleWrapper>
          <SignInTitle>
            Faça seu login com {'\n'} uma das contas abaixo
          </SignInTitle>
        </Header>
        <Footer>
          <FooterWrapper>
            <SignInSocialButton
              title="Entrar com Google"
              svg={GoogleSVG}
              onPress={handleSignInWithGoogle}
            />
            {Platform.OS === 'ios' && (
              <SignInSocialButton
                title="Entrar com Apple"
                svg={AppleSVG}
                onPress={handleSignInWithApple}
              />
            )}
          </FooterWrapper>
          {isLoading && (
            <ActivityIndicator
              color={theme.colors.shape}
              size={30}
              style={{ marginTop: 18 }}
            />
          )}
        </Footer>
      </Container>
    </>
  );
}
