import { GraphQLScalarType, Kind } from 'graphql';

import { userInputError } from '../errors';

const toDate = (value: unknown): Date => {
  const date =
    value instanceof Date
      ? new Date(value.getTime())
      : typeof value === 'number' && Number.isFinite(value)
      ? new Date(value)
      : new Date(NaN);
  if (Number.isNaN(date.getTime())) {
    throw userInputError(`Invalid Date value: ${String(value)}`);
  }
  return date;
};

export const scalars = {
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Epoch milliseconds',
    parseValue: toDate,
    serialize: (value: unknown): number => toDate(value).getTime(),
    // ast.value is a string, so parse it as a base-10 integer first.
    parseLiteral: ast =>
      ast.kind === Kind.INT ? toDate(parseInt(ast.value, 10)) : null,
  }),
};
