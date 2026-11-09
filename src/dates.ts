const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

// Dates are calendar dates. Read them in UTC so that the server and every visitor agree.
export const formatDate = (epochDate?: number | null): string => {
  if (epochDate === null || epochDate === undefined) {
    return '';
  }
  const date = new Date(epochDate);
  if (Number.isNaN(date.getTime())) {
    return '';
  }
  return `${date.getUTCDate()} ${
    MONTHS[date.getUTCMonth()]
  } ${date.getUTCFullYear()}`;
};

// DateInput shows local dates, so hand it local midnight of the stored UTC calendar date.
export const transformGqlDateForDateInput = (gqlDate: number): string => {
  const date = new Date(gqlDate);
  return new Date(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate()
  ).toISOString();
};

// Store UTC noon of the calendar date the editor picked.
export const transformDateInputValueToGqlDate = (
  value: string | number
): number => {
  const date = new Date(value);
  return Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), 12);
};
