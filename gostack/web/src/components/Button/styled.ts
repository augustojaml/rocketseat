import styled from 'styled-components';

export const Container = styled.button`
  width: 100%;
  border: 0;
  background: ${({ theme }) => theme.colors.secondary200};
  color: ${({ theme }) => theme.colors.primary800};
  height: 3.5rem;
  border-radius: 0.625rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
`;
