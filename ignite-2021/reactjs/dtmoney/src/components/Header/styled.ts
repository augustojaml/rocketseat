import styled from 'styled-components';

export const Container = styled.header`
  background: ${({ theme }) => theme.colors.blue};
`;

export const ChangeThemeContent = styled.div`
  max-width: 1120px;
  margin: 0 auto;
  display: flex;
  justify-content: flex-end;
  padding: 0.5rem 1rem;
`;

export const Content = styled.div`
  max-width: 1120px;
  margin: 0 auto;
  padding: 2rem 1rem 10rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  button {
    font-size: 1rem;
    color: ${({ theme }) => theme.colors.shape};
    background: ${({ theme }) => theme.colors.blueLight};
    border: 0;
    padding: 0 2rem;
    border-radius: 0.25rem;
    height: 3rem;
  }
`;
