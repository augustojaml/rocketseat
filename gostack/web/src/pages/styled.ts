import { rgba } from 'polished';
import styled from 'styled-components';
import { breakPointMobile } from '../global/theme';

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  height: 100vh;
`;

export const ContentScroll = styled.div`
  width: 100%;
  overflow-y: scroll;
  margin-top: 9rem;
  &::-webkit-scrollbar {
    width: 0.8rem;
    top: 16rem;
    cursor: pointer;
  }

  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px ${({ theme }) => theme.colors.primary400};
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => rgba(theme.colors.secondary200, 0.6)};
    transition: background 0.3s;
    border-radius: 0.5rem;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => rgba(theme.colors.secondary200, 1)};
  }
`;

export const Content = styled.div`
  width: 100%;
  max-width: 70rem;
  margin: 0 auto;
  padding: 4rem 1.5rem 0 1.5rem;
  height: 100%;
  display: flex;
  @media (max-width: ${breakPointMobile}) {
    flex-direction: column;
  }
`;

export const ScheduleContent = styled.div`
  width: 100%;
  max-width: 40rem;
  @media (max-width: ${breakPointMobile}) {
    order: 2;
    text-align: center;
    padding-bottom: 4rem;
    max-width: 100%;
  }
  > h1 {
    font-size: 2.25rem;
    color: ${({ theme }) => theme.colors.primary100};
    margin-bottom: 0.75rem;
    font-weight: 500;
  }
  .currentDay {
    color: ${({ theme }) => theme.colors.secondary200};
    font-weight: 500;
    span:first-child {
      padding-right: 1rem;
    }
    span + span {
      padding: 0 1rem;
      border-left: 2px solid ${({ theme }) => theme.colors.secondary200};
    }
  }
`;

export const CalendarContent = styled.div`
  flex: 1;
  @media (max-width: ${breakPointMobile}) {
    flex-direction: column;
    order: 1;
    margin-bottom: 3rem;
  }
`;
