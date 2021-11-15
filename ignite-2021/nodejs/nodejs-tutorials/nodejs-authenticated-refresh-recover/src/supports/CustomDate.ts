import dayjs from 'dayjs';

class CustomDate {
  public static dateNow(): Date {
    const date = new Date();
    const newDate = new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000);
    const offset = date.getTimezoneOffset() / 60;
    const hours = date.getHours();
    newDate.setHours(hours - offset);
    return newDate;
  }

  public static addDays(days: number): Date {
    return dayjs(CustomDate.dateNow()).add(days, 'days').toDate();
  }

  public static addHours(hours: number): Date {
    return dayjs(CustomDate.dateNow()).add(hours, 'hour').toDate();
  }

  public static compareIfBefore(start_date: Date, end_date: Date): boolean {
    return dayjs(start_date).isBefore(end_date);
  }
}

export { CustomDate };
