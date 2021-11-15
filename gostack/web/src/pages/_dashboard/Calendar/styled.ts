import { shade } from 'polished';
import styled from 'styled-components';
import { breakPointMobile } from '../../../global/theme';

export const Container = styled.div`
  display: flex;
  justify-content: flex-end;
  @media (max-width: ${breakPointMobile}) {
    justify-content: center;
  }

  .DayPicker {
    border-radius: 0.6rem;
    width: 100%;
    max-width: 21.25rem;
  }

  .DayPicker-wrapper {
    padding-bottom: 0;
    background: ${({ theme }) => theme.colors.primary600};
    border-radius: 0.6rem;
  }

  .DayPicker,
  .DayPicker-Month {
    width: 100%;
  }

  .DayPicker-NavButton {
    color: ${({ theme }) => theme.colors.primary300} !important;
  }

  .DayPicker-NavButton--prev {
    background: url('../assets/ArrowLeftIcon.svg') no-repeat center;
    right: auto;
    left: 1.5em;
    margin-right: 0;
  }

  .DayPicker-NavButton--next {
    background: url('../assets/ArrowRightIcon.svg') no-repeat center;
  }

  .DayPicker-Month {
    border-collapse: separate;
    border-spacing: 8px;
    margin: 1rem 0 0 0;
    padding: 16px;
    background-color: ${({ theme }) => theme.colors.primary900};
    border-radius: 0 0 10px 10px;
  }

  .DayPicker-Caption {
    margin-bottom: 1rem;
    padding: 0 1rem;
    color: ${({ theme }) => theme.colors.primary100};

    > div {
      text-align: center;
    }
  }

  .DayPicker-Weekday {
    color: ${({ theme }) => theme.colors.primary400};
  }

  .DayPicker-Day {
    width: 2.5rem;
    height: 2.5rem;
  }

  .DayPicker-Day--available:not(.DayPicker-Day--outside) {
    background: ${({ theme }) => theme.colors.primary600};
    border-radius: 0.6rem;
  }

  .DayPicker:not(.DayPicker--interactionDisabled)
    .DayPicker-Day:not(.DayPicker-Day--disabled):not(.DayPicker-Day--selected):not(.DayPicker-Day--outside):hover {
    background: ${({ theme }) => shade(0.2, theme.colors.primary600)};
  }

  .DayPicker-Day--today {
    font-weight: normal;
    color: ${({ theme }) => theme.colors.primary100};
  }

  .DayPicker-Day--disabled {
    color: ${({ theme }) => theme.colors.primary400};
    background: transparent !important;
  }

  .DayPicker-Day--selected {
    background: ${({ theme }) => theme.colors.secondary200} !important;
    border-radius: 0.6rem;
    color: ${({ theme }) => theme.colors.secondary100} !important;
  }
`;
