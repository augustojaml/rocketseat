import DayPicker, { DayModifiers } from 'react-day-picker';
import { useCallback } from 'react';
import { Container } from './styled';
import 'react-day-picker/lib/style.css';
import { useAppointments } from '../../../hooks/useAppointments';

export function Calendar() {
  const { selectedDate, setSelectedDate, setCurrentMonth, disabledDay } =
    useAppointments();

  const handleDateChange = useCallback(
    (day: Date, modifiers: DayModifiers) => {
      if (modifiers.available && !modifiers.disabled) {
        setSelectedDate(day);
      }
    },
    [setSelectedDate],
  );

  const handleMonthChange = useCallback(
    (month: Date) => {
      setCurrentMonth(month);
    },
    [setCurrentMonth],
  );
  return (
    <>
      <Container>
        <DayPicker
          fromMonth={new Date()}
          disabledDays={[{ daysOfWeek: [0, 6] }, ...disabledDay]}
          weekdaysShort={['D', 'S', 'T', 'Q', 'Q', 'S', 'S']}
          selectedDays={selectedDate}
          modifiers={{
            available: { daysOfWeek: [1, 2, 3, 4, 5] },
          }}
          onMonthChange={handleMonthChange}
          onDayClick={handleDateChange}
        />
      </Container>
    </>
  );
}
