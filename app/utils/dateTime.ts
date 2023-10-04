const SECONDS_IN_AN_HOUR = 3600;

export const secondsToTime = (seconds: number) => {
  if (seconds < SECONDS_IN_AN_HOUR) {
    // if seconds are less than 1 hour and you only need mm:ss
    return new Date(seconds * 1000).toISOString().slice(14, 19);
  }
  // get hh:mm:ss string
  return new Date(seconds * 1000).toISOString().slice(11, 19);
};

export const addOneYear = (date: Date) => {
  const localDate = new Date(date);

  localDate.setFullYear(localDate.getFullYear() + 1);

  return localDate;
};
