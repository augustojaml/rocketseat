import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

interface IContainer {
  color: string;
}

export const Container = styled.View<IContainer>`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.shape};
  flex-direction: row;
  justify-content: space-between;
  padding: 13px 24px;
  border-radius: 5px;
  border-left-width: 4px;
  border-color: ${({ color }) => color};
  margin-bottom: 8px;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.text_dark};
  font-size: ${RFValue(18)}px;
`;

export const Amount = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
  color: ${({ theme }) => theme.colors.text_dark};
  font-size: ${RFValue(18)}px;
`;
