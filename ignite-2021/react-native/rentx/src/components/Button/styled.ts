import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

interface IRectButton extends RectButtonProps {
  color: string | undefined;
}

export const Container = styled(RectButton)<IRectButton>`
  width: 100%;
  padding: 19px;
  align-items: center;
  justify-content: center;
  background: ${({ theme, color }) => (color ? color : theme.colors.main)};
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.primary_500};
  color: ${({ theme }) => theme.colors.shape};
  font-size: ${RFValue(15)}px;
`;
