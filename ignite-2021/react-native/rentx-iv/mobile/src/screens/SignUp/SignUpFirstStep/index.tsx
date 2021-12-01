import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
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
import { Input } from '../../../components/Input';
import { Button } from '../../../components/Button';
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  StatusBar,
  TouchableWithoutFeedback,
} from 'react-native';

import * as YUP from 'yup';

export function SignUpFirstStep() {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [driveLicense, setDriveLicense] = useState('');

  function handleBack() {
    navigation.goBack();
  }

  async function handleNextBack() {
    try {
      const schema = YUP.object().shape({
        driveLicense: YUP.string().required('CNH obrigatório'),
        email: YUP.string().email('E-mail obrigatório'),
        name: YUP.string().required('Nome obrigatório'),
      });

      const addUser = { name, email, driveLicense };
      await schema.validate(addUser);

      navigation.navigate('SignUpSecondStep', { addUser: addUser });
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
              <FormTitle>01. Dados</FormTitle>
              <Input
                iconName="user"
                placeholder="Nome"
                value={name}
                onChangeText={setName}
              />
              <Input
                iconName="mail"
                keyboardType="email-address"
                placeholder="E-mail"
                value={email}
                onChangeText={setEmail}
              />
              <Input
                iconName="credit-card"
                keyboardType="numeric"
                placeholder="CNH"
                value={driveLicense}
                onChangeText={setDriveLicense}
              />
            </Form>
            <Button title="Proximo" onPress={handleNextBack} />
          </Container>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </>
  );
}
