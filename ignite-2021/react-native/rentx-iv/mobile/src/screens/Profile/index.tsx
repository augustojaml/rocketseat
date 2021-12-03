import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import * as ImagePicker from 'expo-image-picker';

import { useTheme } from 'styled-components';
import { BackButton } from '../../components/BackButton';
import { Feather } from '@expo/vector-icons';

import {
  Container,
  Header,
  HeaderTop,
  LogoutButton,
  PhotoContainer,
  Photo,
  HeaderTitle,
  PhotoButton,
  Content,
  Options,
  Option,
  OptionTitle,
  Section,
} from './styled';
import { Input } from '../../components/Input';
import {
  Keyboard,
  KeyboardAvoidingView,
  StatusBar,
  TouchableWithoutFeedback,
} from 'react-native';
import { InputPassword } from '../../components/InputPassword';
import { useAuth } from '../../hooks/useAuth';

export function Profile() {
  const theme = useTheme();
  const navigation = useNavigation();
  const { user } = useAuth();

  const [option, setOption] = useState<'dataEdit' | 'passwordEdit'>('dataEdit');
  const [name, setName] = useState(user.name);
  const [driverLicense, setDriverLicense] = useState(user.driver_license);
  const [avatar, setAvatar] = useState(user.avatar);

  function handleBack() {
    navigation.goBack();
  }

  function handleSignOut() {
    console.log('handleSignOut');
  }

  function handleOptionChange(option: 'dataEdit' | 'passwordEdit') {
    setOption(option);
  }

  async function handleChangeAvatar() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (result.cancelled) {
      return;
    }

    if (result.uri) {
      setAvatar(result.uri);
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
              <HeaderTop>
                <BackButton color={theme.colors.shape} onPress={handleBack} />
                <HeaderTitle>Editar Perfil</HeaderTitle>
                <LogoutButton onPress={handleSignOut}>
                  <Feather name="power" size={24} color={theme.colors.shape} />
                </LogoutButton>
              </HeaderTop>
              <PhotoContainer>
                {avatar && <Photo source={{ uri: avatar }} />}
                <PhotoButton onPress={handleChangeAvatar}>
                  <Feather name="camera" size={24} color={theme.colors.shape} />
                </PhotoButton>
              </PhotoContainer>
            </Header>
            <Content
              style={{
                marginBottom: useBottomTabBarHeight(),
              }}
            >
              <Options>
                <Option
                  active={option === 'dataEdit'}
                  onPress={() => handleOptionChange('dataEdit')}
                >
                  <OptionTitle active={option === 'dataEdit'}>
                    Dados
                  </OptionTitle>
                </Option>
                <Option
                  active={option === 'passwordEdit'}
                  onPress={() => handleOptionChange('passwordEdit')}
                >
                  <OptionTitle active={option === 'passwordEdit'}>
                    Trocar Senha
                  </OptionTitle>
                </Option>
              </Options>

              {option === 'dataEdit' ? (
                <Section>
                  <Input
                    iconName="user"
                    placeholder="Nome"
                    autoCorrect={false}
                    defaultValue={user.name}
                    onChangeText={setName}
                  />
                  <Input
                    iconName="mail"
                    editable={false}
                    defaultValue={user.email}
                  />
                  <Input
                    iconName="credit-card"
                    placeholder="CNH"
                    keyboardType="numeric"
                    defaultValue={user.driver_license}
                    onChangeText={setDriverLicense}
                  />
                </Section>
              ) : (
                <Section>
                  <InputPassword iconName="lock" placeholder="Senha atual" />
                  <InputPassword iconName="mail" placeholder="Nova senha" />
                  <InputPassword
                    iconName="credit-card"
                    placeholder="Repedir senha"
                  />
                </Section>
              )}
            </Content>
          </Container>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </>
  );
}