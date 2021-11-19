import React from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { Alert } from 'react-native';
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
  const { signInWithGoogle, signInWithApple } = useAuth();

  async function handleSignInWithGoogle() {
    try {
      await signInWithGoogle();
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
      Alert.alert('Não foi possivel se conectar com a conta Google');
    }
  }

  async function handleSignInWithApple() {
    try {
      await signInWithApple();
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
      Alert.alert('Não foi possivel se conectar com a conta Apple');
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
            <SignInSocialButton
              title="Entrar com Apple"
              svg={AppleSVG}
              onPress={handleSignInWithApple}
            />
          </FooterWrapper>
        </Footer>
      </Container>
    </>
  );
}
