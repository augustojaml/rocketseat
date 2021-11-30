import React, { useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { BackButton } from '../../../components/BackButton';

import {
  Container,
  Header,
  Steps,
  Title,
  SubTitle,
  Form,
  FormTitle,
} from './styled';
import { Bullet } from '../../../components/Bullet';
import { Button } from '../../../components/Button';
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  StatusBar,
  TouchableWithoutFeedback,
} from 'react-native';
import { InputPassword } from '../../../components/InputPassword';
import { useTheme } from 'styled-components';
import { api } from '../../../services/api';

interface IAddUserParams {
  addUser: IAddUserDTO;
}

export function SignUpSecondStep() {
  const navigation = useNavigation();
  const theme = useTheme();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { addUser: user } = useRoute().params as IAddUserParams;

  function handleBack() {
    navigation.goBack();
  }

  async function handleRegister() {
    if (!password || !confirmPassword) {
      return Alert.alert('Informe a senha e confirme');
    }

    if (password !== confirmPassword) {
      return Alert.alert('As senhas não são iguais');
    }

    await api
      .post('/users', {
        name: user.name,
        email: user.email,
        password: password,
        driver_license: String(user.driveLicense),
      })
      .then(() => {
        navigation.navigate('Confirmation', {
          title: 'Conta Criada',
          message: `Agora é só fazer login \n e aproveitar`,
          nextScreenRoute: 'SignIn',
        });
      })
      .catch(() => {
        Alert.alert('Opsss', 'Não foi possível cadastrar');
      });
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
              <BackButton onPress={handleBack} />
              <Steps>
                <Bullet active />
                <Bullet />
              </Steps>
            </Header>
            <Title>Crie{'\n'}Conta</Title>
            <SubTitle>Faça seu cadastro de{'\n'}forma rápida e fácil</SubTitle>
            <Form>
              <FormTitle>02. Dados</FormTitle>
              <InputPassword
                iconName="lock"
                placeholder="Senha"
                value={password}
                onChangeText={setPassword}
              />
              <InputPassword
                iconName="lock"
                placeholder="Repetir senha"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />
            </Form>
            <Button
              title="Cadastrar"
              color={theme.colors.success}
              onPress={handleRegister}
            />
          </Container>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </>
  );
}
