import styled from 'styled-components';

export const Container = styled.div`
  margin-top: 4rem;

  > span {
    color: ${({ theme }) => theme.colors.primary300};
    font-size: 1.25rem;
    margin-bottom: 1.5rem;
    display: block;
  }
  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: ${({ theme }) => theme.colors.primary600};
    height: 7rem;
    border-radius: 0.625rem;
    padding: 0 1.375rem;
    position: relative;

    &::after {
      position: absolute;
      content: '';
      height: 5rem;
      width: 2px;
      background: ${({ theme }) => theme.colors.secondary200};
      border-radius: 0 1.5rem 1.5rem 0;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
    }

    div:first-child {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 1.25rem;
      img {
        width: 5rem;
        height: 5rem;
        border-radius: 50%;
        margin-right: 1.5rem;
      }
    }
    div:last-child {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 1.25rem;
      svg {
        color: ${({ theme }) => theme.colors.secondary200};
        margin-right: 0.625rem;
      }
      span {
        display: block;
      }
    }
  }
`;
