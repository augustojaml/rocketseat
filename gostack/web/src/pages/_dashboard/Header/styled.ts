import styled from 'styled-components';
import { breakPointMobile } from '../../../global/theme';

export const HeaderContainer = styled.header`
  position: fixed;
  width: 100%;
  height: 9rem;
  display: flex;
  background: ${({ theme }) => theme.colors.primary900};
  width: 100%;
  display: flex;
  align-items: center;
  z-index: 100;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 70rem;
  margin: 0 auto;
  padding: 0 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  > div {
    display: flex;
    align-items: center;
    > img {
      width: 8.6rem;
      height: 5rem;
      margin-right: 5rem;
      @media (max-width: ${breakPointMobile}) {
        margin-right: 1rem;
      }
    }
  }
  .themePower {
    display: flex;
    align-items: center;
    button {
      background: transparent;
      outline: 0;
      border: 0;
      color: ${({ theme }) => theme.colors.primary300};
      transition: color 0.3;
      margin-left: 1rem;
      svg {
        margin-top: 0.3rem;
      }
      &:hover {
        color: ${({ theme }) => theme.colors.primary400};
      }
    }
  }
`;

export const UserProfile = styled.div`
  display: flex;
  align-items: center;
  img {
    width: 3.5rem;
    height: 3.5rem;
    border-radius: 50%;
    margin-right: 0.9rem;
  }
  > div {
    display: flex;
    flex-direction: column;
    font-size: 1rem;
    span {
      color: ${({ theme }) => theme.colors.primary300};
    }
    strong {
      color: ${({ theme }) => theme.colors.secondary200};
    }
  }
`;
