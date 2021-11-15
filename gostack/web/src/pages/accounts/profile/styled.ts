import { shade } from 'polished';
import styled from 'styled-components';
import { breakPointMobile } from '../../../global/theme';

export const Header = styled.header`
  height: 9rem;
  display: flex;
  background: ${({ theme }) => theme.colors.primary900};
  width: 100%;
  display: flex;
  align-items: center;
  > div {
    width: 100%;
    max-width: 70rem;
    margin: 0 auto;
    padding: 0 1.5rem;
    display: flex;
    justify-content: space-between;
    svg {
      color: #999591;
      width: 1.5rem;
      height: 1.5rem;
    }
  }
`;

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  form {
    width: 100%;
    max-width: 21.25rem;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    margin-top: -5.81rem;
    @media (max-width: ${breakPointMobile}) {
      margin-top: -4rem;
    }
    h1 {
      font-size: 1.25rem;
      width: 100%;
      margin: 2rem 0 1.5rem 0;
    }

    .profile {
      width: 100%;
      margin-bottom: 1.5rem;
    }
  }
`;

export const AvatarInput = styled.div`
  position: relative;
  align-self: center;
  > img {
    width: 11.625rem;
    height: 11.625rem;
    border-radius: 50%;
    @media (max-width: ${breakPointMobile}) {
      width: 8rem;
      height: 8rem;
    }
  }
  label {
    position: absolute;
    width: 3rem;
    height: 3rem;
    background: ${({ theme }) => theme.colors.secondary200};
    border-radius: 50%;
    right: 0;
    bottom: 0;
    border: 0;
    cursor: pointer;
    transition: background-color 0.2s;
    @media (max-width: ${breakPointMobile}) {
      width: 3rem;
      height: 3rem;
    }

    display: flex;
    align-items: center;
    justify-content: center;

    input {
      display: none;
    }

    svg {
      width: 20px;
      height: 20px;
      color: #312e38;
    }

    &:hover {
      background: ${({ theme }) => shade(0.2, theme.colors.secondary200)};
    }
  }
`;
