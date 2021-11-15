/* eslint-disable prettier/prettier */
import { rgba } from 'polished';
import styled from 'styled-components';
import { breakPointMobile } from '../../global/theme';

interface IBackgroundProps {
  image: string;
}

export const Container = styled.section`
  height: 100vh;
  display: flex;
  align-items: stretch;
`;

export const Background = styled.div<IBackgroundProps>`
  flex: 1;
  background: ${({ theme, image }) =>
    `linear-gradient(to right bottom, ${rgba(
      theme.colors.primary800,
      0.5,
    )}, ${rgba(theme.colors.primary900, 0.6)}), url('../assets/${image}.png')`};
  background-size: cover;
  @media (max-width: ${breakPointMobile}) {
    display: none;
  }
`;

export const ContentForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100%;
  max-width: 45%;
  @media (max-width: ${breakPointMobile}) {
    width: 100%;
    max-width: 100%;
  }

  form {
    margin: 5rem 0;
    width: 21.25rem;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    h1 {
      margin: 1.5rem;
    }
  }
  > a {
    color: ${({ theme }) => theme.colors.secondary200};
    display: block;
    margin-top: 1.5rem;

    display: flex;
    align-items: center;
    svg {
      margin-right: 1rem;
    }
  }
`;

export const Perfil = styled.div`
  margin: 3rem 0;
  font-size: 1.5rem;
  line-height: 1.978rem;
  font-weight: 500;
  > button {
    background: transparent;
    border: 0;
    outline: 0;
    color: ${({ theme }) => theme.colors.primary300};
    position: relative;
    height: 3rem;

    &.active {
      color: ${({ theme }) => theme.colors.primary100};
      border-bottom: 3px solid ${({ theme }) => theme.colors.secondary200};
      font-weight: 700;
    }
  }

  > button:first-child {
    margin-right: 2rem;
  }
`;
