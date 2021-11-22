import { Dimensions } from 'react-native';
import styled from 'styled-components/native';

interface IImageIndex {
  active: boolean;
}

export const Container = styled.View`
  width: 100%;
`;

export const ImageIndexes = styled.View`
  flex-direction: row;
  align-self: flex-end;
  padding-right: 24px;
`;

export const ImageIndex = styled.View<IImageIndex>`
  width: 6px;
  height: 6px;
  border-radius: 3px;
  margin-left: 8px;
  background: ${({ theme, active }) =>
    active ? theme.colors.title : theme.colors.shape};
`;

export const CarImageWrapper = styled.View`
  width: ${Dimensions.get('window').width}px;
  height: 132px;
  justify-content: center;
  align-items: center;
`;

export const CarImage = styled.Image.attrs({
  resizeMode: 'contain',
})`
  width: 280px;
  height: 132px;
`;
