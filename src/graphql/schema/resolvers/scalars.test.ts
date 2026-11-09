import { Kind, ValueNode } from 'graphql';
import { UserInputError } from 'apollo-server-micro';

import { scalars } from './scalars';

const { Date: DateScalar } = scalars;
const stamp = Date.UTC(2017, 11, 4, 12);

describe('Date scalar', () => {
  it('serializes a Date or a number to epoch milliseconds', () => {
    expect(DateScalar.serialize(new Date(stamp))).toBe(stamp);
    expect(DateScalar.serialize(stamp)).toBe(stamp);
  });

  it('parses an epoch millisecond variable into a Date', () => {
    const parsed = DateScalar.parseValue(stamp);
    expect(parsed).toBeInstanceOf(Date);
    expect(parsed.getTime()).toBe(stamp);
  });

  it('refuses strings, NaN, and Infinity', () => {
    ['2017-12-04', NaN, Infinity, null, {}].forEach(value => {
      expect(() => DateScalar.parseValue(value)).toThrow(UserInputError);
    });
  });

  it('parses an integer literal and ignores other literals', () => {
    const intNode: ValueNode = { kind: Kind.INT, value: String(stamp) };
    const stringNode: ValueNode = { kind: Kind.STRING, value: '2017-12-04' };
    expect(DateScalar.parseLiteral(intNode, {}).getTime()).toBe(stamp);
    expect(DateScalar.parseLiteral(stringNode, {})).toBeNull();
  });
});
