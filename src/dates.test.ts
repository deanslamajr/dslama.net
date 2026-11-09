import {
  formatDate,
  transformDateInputValueToGqlDate,
  transformGqlDateForDateInput,
} from './dates';

describe('formatDate', () => {
  it('shows the UTC calendar date', () => {
    expect(formatDate(Date.UTC(2017, 11, 4, 12))).toBe('4 December 2017');
    expect(formatDate(Date.UTC(2017, 11, 5, 1, 14))).toBe('5 December 2017');
    expect(formatDate(Date.UTC(2020, 0, 1, 23, 59))).toBe('1 January 2020');
  });

  it('returns an empty string for a missing or invalid date', () => {
    expect(formatDate(null)).toBe('');
    expect(formatDate(undefined)).toBe('');
    expect(formatDate(NaN)).toBe('');
  });
});

describe('date input conversion', () => {
  it('hands the date input local midnight of the stored UTC date', () => {
    const local = new Date(
      transformGqlDateForDateInput(Date.UTC(2017, 0, 29, 12))
    );
    expect([local.getFullYear(), local.getMonth(), local.getDate()]).toEqual([
      2017,
      0,
      29,
    ]);
    expect([local.getHours(), local.getMinutes()]).toEqual([0, 0]);
  });

  it('stores UTC noon of the picked local date', () => {
    expect(
      transformDateInputValueToGqlDate(new Date(2017, 0, 29).getTime())
    ).toBe(Date.UTC(2017, 0, 29, 12));
    expect(
      transformDateInputValueToGqlDate(
        new Date(2017, 0, 29, 23, 30).toISOString()
      )
    ).toBe(Date.UTC(2017, 0, 29, 12));
  });

  it('keeps a stored date the same through the editor and back', () => {
    [
      Date.UTC(2017, 0, 29, 12),
      Date.UTC(2017, 11, 5, 1, 14),
      Date.UTC(2021, 5, 30, 23, 0),
    ].forEach(stored => {
      const roundTrip = transformDateInputValueToGqlDate(
        transformGqlDateForDateInput(stored)
      );
      expect(formatDate(roundTrip)).toBe(formatDate(stored));
    });
  });
});
