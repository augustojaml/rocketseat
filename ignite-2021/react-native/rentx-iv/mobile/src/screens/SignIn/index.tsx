import React, { useState } from 'react';
import {
  StatusBar,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { useTheme } from 'styled-components';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { InputPassword } from '../../components/InputPassword';

import { Container, Header, SubTitle, Title, Form, Footer } from './styled';

export function SignIn() {
  const theme = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor="transparent"
      />
      <KeyboardAvoidingView behavior="position" enabled>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <Container>
            <Header>
              <Title>Estamos{'\n'}quase lá.</Title>
              <SubTitle>
                Faça seu login para começar{'\n'}uma experiência incrível
              </SubTitle>
            </Header>

            <Form>
              <Input
                iconName="mail"
                placeholder="E-mail"
                keyboardType="email-address"
                autoCorrect={false}
                autoCapitalize="none"
                onChangeText={setEmail}
                value={email}
              />
              <InputPassword
                iconName="lock"
                placeholder="Password"
                keyboardType="default"
                onChangeText={setPassword}
                value={password}
              />
            </Form>

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
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </>
  );
}
