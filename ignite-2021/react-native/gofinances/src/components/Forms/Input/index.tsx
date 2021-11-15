import React from 'react';
import { TextInputProps } from 'react-native';
import { Container } from './styled';

interface IInputProps extends TextInputProps {}

export function Input({ ...rest }: IInputProps) {
  return (
    <>
      <Container {...rest} />
    </>
  );
}
