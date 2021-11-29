import styled from 'styled-components/native';

interface IImageIndex {
  active: boolean;
}

export const Container = styled.View<IImageIndex>`
  width: 6px;
  height: 6px;
  border-radius: 3px;
  margin-left: 8px;
  background: ${({ theme, active }) =>
    active ? theme.colors.title : theme.colors.shape};
`;
