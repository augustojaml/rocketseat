import React from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
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
  const { user } = useAuth();
  console.log(user);

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
            <SignInSocialButton title="Entrar com Google" svg={GoogleSVG} />
            <SignInSocialButton title="Entrar com Apple" svg={AppleSVG} />
          </FooterWrapper>
        </Footer>
      </Container>
    </>
  );
}
