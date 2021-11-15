import { IIsDayBeforeDTO } from '@modules/appointments/dtos/IIsDayBeforeDTO';
import { IIsMonthBeforeDTO } from '@modules/appointments/dtos/IIsMonthBeforeDTO';
import { IListAvailableDaysInMonthDTO } from '@modules/appointments/dtos/IListAvailableDaysInMonthDTO';
import { IListAvailableHoursInDayDTO } from '@modules/appointments/dtos/IListAvailableHoursInDayDTO';

interface IDateProvider {
  startHours(date: Date): Date;
  addHours(hours: number): Date;
  compareIfBefore(start_date: Date, end_date: Date): boolean;
  listAvailableDaysInMonth(month: number, year: number): IListAvailableDaysInMonthDTO[];
  listAvailableHoursInDay(hours: number): IListAvailableHoursInDayDTO[];
  IsDayAfter({ hour, day, month, year }: IIsDayBeforeDTO): boolean;
  IsMonthAfter({ day, month, year }: IIsMonthBeforeDTO): boolean;
}

export { IDateProvider };
