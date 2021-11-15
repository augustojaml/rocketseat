import styled, { css } from 'styled-components';

interface ContainerInputProps {
  isFocused: boolean;
  isFilled: boolean;
}

export const ContainerInput = styled.div<ContainerInputProps>`
  display: flex;
  align-items: center;
  width: 100%;
  background: ${({ theme }) => theme.colors.secondary100};
  padding: 1rem;
  overflow: hidden;
  border-radius: 8px;
  border: 2px solid ${({ theme }) => theme.colors.secondary100};
  color: ${({ theme }) => theme.colors.primary400};
  margin-bottom: 1rem;

  input {
    background: transparent;
    outline: 0;
    border: 0;
    flex: 1;
    color: ${({ theme }) => theme.colors.primary100};
    &::placeholder {
      color: #707070;
    }
    &::placeholder {
      color: ${({ theme }) => theme.colors.primary400};
    }
  }

  ${props =>
    props.isFocused &&
    css`
      border-color: ${props.theme.colors.secondary200};
      color: ${props.theme.colors.secondary200};
    `}

  ${props =>
    props.isFilled &&
    css`
      color: ${props.theme.colors.secondary200};
    `}

  svg {
    margin-right: 1rem;
    margin-top: -2px;
  }
`;

export const Message = styled.div`
  display: flex;
  align-items: center;
  text-align: left;
  width: 100%;
  margin: 0 0 0.5rem 0;
  font-size: 0.9rem;
  height: 1.5rem;
  color: ${({ theme }) => theme.colors.secondary300};
  svg {
    margin-top: 1px;
    margin-right: 0.5rem;
  }
`;
