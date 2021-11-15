import styled from 'styled-components';
import { darken, transparentize } from 'polished';

export const Container = styled.form`
  h2 {
    color: ${({ theme }) => theme.colors.textTitle};
    font-style: 1.5rem;
    margin-bottom: 2rem;
  }

  input {
    width: 100%;
    padding: 0 1.5rem;
    height: 4rem;
    border-radius: 0.25rem;
    border: 1px solid ${({ theme }) => theme.colors.inputBorder};
    background: ${({ theme }) => theme.colors.backgroundInput};
    font-weight: 400;
    font-size: 1rem;

    &::placeholder {
      color: ${({ theme }) => theme.colors.textBody};
    }

    & + input {
      margin-top: 1rem;
    }
  }
  button[type='submit'] {
    width: 100%;
    padding: 0 1.5rem;
    height: 4rem;
    background: ${({ theme }) => theme.colors.green};
    color: ${({ theme }) => theme.colors.shape};
    border-radius: 0.25rem;
    border: 0;
    font-size: 1rem;
    font-weight: 600;
    margin-top: 1.5rem;
  }
`;

export const TransactionTypeContainer = styled.div`
  margin: 1rem 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
`;

interface RadioBoxProps {
  isActive: boolean;
  activeColor: string;
}

export const RadioBox = styled.button<RadioBoxProps>`
  height: 4rem;
  border: 1px solid ${({ theme }) => theme.colors.inputBorder};
  border-radius: 0.25rem;
  background: ${({ isActive, activeColor }) =>
    isActive ? transparentize(0.9, activeColor) : 'transparent'};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: border-color 0.3s;

  &:hover {
    border-color: ${({ theme }) => darken(0.1, theme.colors.inputBorder)};
  }

  img {
    width: 20px;
    height: 20px;
  }
  span {
    display: inline-block;
    margin-left: 1rem;
    font-size: 1rem;
    color: ${({ theme }) => theme.colors.textTitle};
  }
`;
