import { eachDayOfInterval, format } from 'date-fns';

import { IMarkedDates, IDayProps } from '.';
import { theme } from '../../styles/theme';
import { Util } from '../../utils';

export function generateInterval(start: IDayProps, end: IDayProps) {
  let interval: IMarkedDates = {};

  eachDayOfInterval({
    start: new Date(start.timestamp),
    end: new Date(end.timestamp),
  }).forEach((item) => {
    const date = format(Util.getPlatformDate(item), 'yyyy-MM-dd');

    interval = {
      ...interval,
      [date]: {
        color:
          start.dateString === date || end.dateString === date
            ? theme.colors.main
            : theme.colors.main_light,

        textColor:
          start.dateString === date || end.dateString === date
            ? theme.colors.main_light
            : theme.colors.main,
      },
    };
  });

  return interval;
}
