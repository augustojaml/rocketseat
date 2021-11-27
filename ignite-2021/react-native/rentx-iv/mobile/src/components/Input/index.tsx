import React, { useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { TextInputProps, View } from 'react-native';

import { useTheme } from 'styled-components';
import { Container, IconContainer, InputText } from './styled';

interface IInput extends TextInputProps {
  iconName: React.ComponentProps<typeof Feather>['name'];
  value?: string;
}

export function Input({ iconName, value, ...rest }: IInput) {
  const theme = useTheme();
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
          {...rest}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
        />
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
