import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';

dayjs.extend(utc);

class DayjsDateProvider implements IDateProvider {
  public compareInHours(start_date: Date, end_date: Date): number {
    const end_date_utc = this.convertToUTC(end_date);
    const start_date_utc = this.convertToUTC(start_date);
    return dayjs(end_date_utc).diff(start_date_utc, 'hours');
  }

  public convertToUTC(date: Date): string {
    return dayjs(date).utc().local().format();
  }
  public dateNow(): Date {
    return dayjs().toDate();
  }

  public compareInDays(start_date: Date, end_date: Date): number {
    const end_date_utc = this.convertToUTC(end_date);
    const start_date_utc = this.convertToUTC(start_date);
    return dayjs(end_date_utc).diff(start_date_utc, 'days') + 1;
  }

  public addDays(days: number): Date {
    return dayjs().add(days, 'days').toDate();
  }

  public addHours(hours: number): Date {
    return dayjs().add(hours, 'hour').toDate();
  }

  public compareIfBefore(start_date: Date, end_date: Date): boolean {
    return dayjs(start_date).isBefore(end_date);
  }
}

export { DayjsDateProvider };
