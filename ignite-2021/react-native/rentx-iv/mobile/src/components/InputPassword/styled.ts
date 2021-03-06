import { BorderlessButton } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex-direction: row;
`;

export const IconContainer = styled.View`
  background-color: ${({ theme }) => theme.colors.background_secondary};
  height: 55px;
  width: 55px;
  align-items: center;
  justify-content: center;
  margin-right: 8px;
`;

export const InputText = styled.TextInput`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background_secondary};
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.primary_400};
  font-size: ${RFValue(15)}px;
  padding: 0 23px;
`;

export const ToggleVisiblePassword = styled(BorderlessButton)`
  background-color: ${({ theme }) => theme.colors.background_secondary};
  height: 55px;
  width: 55px;
  align-items: center;
  justify-content: center;
`;
