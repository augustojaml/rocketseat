import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  StatusBar,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';
import { useTheme } from 'styled-components';
import * as YUP from 'yup';

import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { InputPassword } from '../../components/InputPassword';

import { Container, Header, SubTitle, Title, Form, Footer } from './styled';

export function SignIn() {
  const theme = useTheme();
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleSignIn() {
    try {
      const schema = YUP.object().shape({
        email: YUP.string()
          .required('E-mail obrigatório ou inválido')
          .email('E-mail obrigatório ou inválido'),
        password: YUP.string().required('Password obrigatório'),
      });

      await schema.validate({ email, password });
      Alert.alert('Tudo certo');
    } catch (err) {
      if (err instanceof YUP.ValidationError) {
        return Alert.alert('Opa', err.message);
      } else {
        Alert.alert(
          'Error na autenticação',
          'Ocorreu um erro ao fazer login, verifique as credenciais'
        );
      }
    }
  }

  function handleNewAccount() {
    navigation.navigate('SignUpFirstStep');
  }

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
                onPress={handleSignIn}
                enabled={true}
                isLoading={false}
              />
              <Button
                color={theme.colors.background_secondary}
                title="Criar conta gratuita"
                onPress={handleNewAccount}
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
