import styled, { css } from 'styled-components/native';
import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';
import { rgba } from 'polished';
import { RectButton } from 'react-native-gesture-handler';

interface IIcons {
  type: 'up' | 'down';
}

interface IContainer {
  isActive: boolean;
  type: 'up' | 'down';
}

export const Container = styled.View<IContainer>`
  width: 48%;
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: 5px;

  border-width: ${({ isActive }) => (isActive ? 0 : '1.5')}px;
  border-style: solid;
  border-color: ${({ theme }) => theme.colors.text};

  ${({ isActive, type, theme }) =>
    isActive &&
    type === 'up' &&
    css`
      background-color: ${rgba(theme.colors.success, 0.3)};
    `}

  ${({ isActive, type, theme }) =>
    isActive &&
    type === 'down' &&
    css`
      background-color: ${rgba(theme.colors.attention, 0.3)};
    `}
`;
export const Button = styled(RectButton)`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 16px;
`;

export const Icon = styled(Feather)<IIcons>`
  font-size: ${RFValue(24)}px;
  margin-right: 12px;
  color: ${({ theme, type }) =>
    type === 'up' ? theme.colors.success : theme.colors.attention};
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;
`;
