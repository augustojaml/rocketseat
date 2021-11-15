import dayjs from 'dayjs';

import { IIsDayBeforeDTO } from '@modules/appointments/dtos/IIsDayBeforeDTO';
import { IIsMonthBeforeDTO } from '@modules/appointments/dtos/IIsMonthBeforeDTO';
import { IListAvailableDaysInMonthDTO } from '@modules/appointments/dtos/IListAvailableDaysInMonthDTO';
import { IListAvailableHoursInDayDTO } from '@modules/appointments/dtos/IListAvailableHoursInDayDTO';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';

class DayJsProvider implements IDateProvider {
  public startHours(date: Date): Date {
    return dayjs(date).startOf('hour').toDate();
  }

  addHours(hours: number): Date {
    return dayjs(new Date()).add(hours, 'hour').toDate();
  }

  compareIfBefore(start_date: Date, end_date: Date): boolean {
    return dayjs(start_date).isBefore(end_date);
  }

  listAvailableDaysInMonth(month: number, year: number): IListAvailableDaysInMonthDTO[] {
    const quantityDaysInMoth = dayjs(new Date(year, month - 1)).daysInMonth();
    const daysInMonth: IListAvailableDaysInMonthDTO[] = [];
    for (let i = 1; i <= quantityDaysInMoth; i++) {
      daysInMonth.push({ day: new Date(year, month, i).getDate(), available: false });
    }
    return daysInMonth;
  }

  listAvailableHoursInDay(hours: number): IListAvailableHoursInDayDTO[] {
    const quantityHoursInMoth = hours;
    const hoursInDay: IListAvailableHoursInDayDTO[] = [];
    for (let i = 8; i < quantityHoursInMoth + 10; i++) {
      hoursInDay.push({ hour: i, available: false });
    }
    return hoursInDay;
  }

  IsDayAfter({ hour, day, month, year }: IIsDayBeforeDTO): boolean {
    const currentDate = new Date(Date.now());
    const dateAvailable = new Date(year, month - 1, day, hour);
    return dayjs(dateAvailable).isAfter(currentDate);
  }

  IsMonthAfter({ day, month, year }: IIsMonthBeforeDTO): boolean {
    const currentDate = new Date(Date.now());
    const dateAvailable = new Date(year, month - 1, day, 23, 59, 59);
    return dayjs(dateAvailable).isAfter(currentDate);
  }
}

export { DayJsProvider };
