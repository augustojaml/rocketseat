import styled from 'styled-components';

export const Container = styled.div`
  background: ${({ theme }) => theme.colors.textBody};
  width: 40px;
  height: 20px;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  position: absolute;
  span {
    font-size: 0.9rem;
  }
  div {
    width: 20px;
    height: 20px;
    border-radius: 10px;
    background: ${({ theme }) => theme.colors.inputBorder};
    position: absolute;
    top: 0;
    cursor: pointer;
    transition: transform 0.3s linear;
    &.active {
      transform: translateX(100%);
    }
  }
`;
