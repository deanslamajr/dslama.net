import { GraphQLError } from 'graphql';

// Apollo Server 4 and later have no error classes. These errors carry the
// same codes that Apollo Server 2's classes set, so clients see no change.
const withCode =
  (code: string) =>
  (message: string, extensions: Record<string, unknown> = {}): GraphQLError =>
    new GraphQLError(message, { extensions: { ...extensions, code } });

export const userInputError = withCode('BAD_USER_INPUT');
export const authenticationError = withCode('UNAUTHENTICATED');
export const rateLimitedError = withCode('RATE_LIMITED');

export const hasErrorCode = (error: unknown, code: string): boolean =>
  error instanceof GraphQLError && error.extensions.code === code;
