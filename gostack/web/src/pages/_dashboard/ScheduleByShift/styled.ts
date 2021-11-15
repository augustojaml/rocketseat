import styled from 'styled-components';

export const Container = styled.div`
  margin-top: 3rem;
  & + div {
    margin-top: 3rem;
  }
  > span {
    color: ${({ theme }) => theme.colors.primary300};
    font-size: 1.25rem;
    display: block;
    padding-bottom: 1rem;
    border-bottom: 1px solid ${({ theme }) => theme.colors.primary600};
    margin-bottom: 1.5rem;
  }
`;

export const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  & + div {
    margin-top: 1rem;
  }

  > svg {
    width: 1.25rem;
    height: 1.25rem;
    margin-right: 0.625rem;
    color: ${({ theme }) => theme.colors.secondary200};
  }
  > span {
    display: block;
    margin-right: 1.625rem;
  }

  > div {
    height: 100%;
    display: flex;
    align-items: center;
    width: 100%;
    background: ${({ theme }) => theme.colors.primary600};
    border-radius: 0.625rem;
    padding: 1rem;
    img {
      width: 3.5rem;
      height: 3.5rem;
      border-radius: 50%;
      margin-right: 1rem;
    }
  }
`;
