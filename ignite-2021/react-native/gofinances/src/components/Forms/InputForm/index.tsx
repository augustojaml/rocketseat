import React from 'react';
import { Control, Controller } from 'react-hook-form';
import { TextInputProps } from 'react-native';
import { Input } from '../Input';
import { Container, ErrorContainer, Error } from './styled';

interface IInputForm extends TextInputProps {
  control: Control;
  name: string;
  error: string;
}

export function InputForm({ control, name, error, ...rest }: IInputForm) {
  return (
    <>
      <Container>
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <Input onChangeText={onChange} value={value} {...rest} />
          )}
          name={name}
        />
        <ErrorContainer>
          <Error>{error && error}</Error>
        </ErrorContainer>
      </Container>
    </>
  );
}
