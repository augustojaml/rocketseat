const FormatDate = {
  hours(value: string | number | Date) {
    return `${new Date(value)
      .getHours()
      .toString()
      .padStart(2, '0')}:${new Date(value)
      .getMinutes()
      .toString()
      .padStart(2, '0')}`;
  },
};

export { FormatDate };
