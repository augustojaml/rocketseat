import React, { useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { TextInputProps, View } from 'react-native';

import { useTheme } from 'styled-components';
import {
  Container,
  IconContainer,
  InputText,
  ToggleVisiblePassword,
} from './styled';

interface IInputPassword extends TextInputProps {
  iconName: React.ComponentProps<typeof Feather>['name'];
  value?: string;
}

export function InputPassword({ iconName, value, ...rest }: IInputPassword) {
  const theme = useTheme();
  const [showPassword, setShowPassword] = useState(true);

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  function handleInputFocus() {
    setIsFocused(true);
  }

  function handleInputBlur() {
    setIsFocused(false);
    setIsFilled(!!value);
  }

  return (
    <>
      <Container>
        <IconContainer>
          <Feather
            name={iconName}
            size={24}
            color={
              isFocused || isFilled
                ? theme.colors.main
                : theme.colors.text_detail
            }
          />
        </IconContainer>
        <InputText
          secureTextEntry={showPassword}
          {...rest}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
        />
        <ToggleVisiblePassword onPress={() => setShowPassword(!showPassword)}>
          <Feather
            name={showPassword ? 'eye' : 'eye-off'}
            size={24}
            color={theme.colors.text_detail}
          />
        </ToggleVisiblePassword>
      </Container>
      <View
        style={{
          borderBottomWidth: 2,
          borderBottomColor: isFocused ? theme.colors.main : 'transparent',
          width: '100%',
          marginBottom: 8,
        }}
      ></View>
    </>
  );
}
