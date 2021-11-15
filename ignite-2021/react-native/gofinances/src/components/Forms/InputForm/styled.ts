import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
`;

export const ErrorContainer = styled.View`
  width: 100%;
  height: 30px;
`;

export const Error = styled.Text`
  color: ${({ theme }) => theme.colors.attention};
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(12)}px;
  margin: -5px 0 7px 0;
`;
