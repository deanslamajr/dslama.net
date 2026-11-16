import { ApolloServer } from '@apollo/server';

import { logger } from '../../logger';
import { ContextInterface } from './context';
import { userInputError } from './errors';
import { loggingPlugin } from './loggingPlugin';

const server = new ApolloServer<ContextInterface>({
  typeDefs: `
    type Query {
      ok: Boolean
      broken: Boolean
      invalid: Boolean
    }
    type Mutation {
      save: Boolean
    }
  `,
  resolvers: {
    Query: {
      ok: () => true,
      broken: () => {
        throw new Error('database down');
      },
      invalid: () => {
        throw userInputError('bad url');
      },
    },
    Mutation: { save: () => true },
  },
  plugins: [loggingPlugin],
});

const contextValue = ({
  session: { get: () => ({ accountId: 'account-1' }) },
} as unknown) as ContextInterface;

const execute = (query: string) =>
  server.executeOperation({ query }, { contextValue });

let info: jest.SpyInstance;
let error: jest.SpyInstance;

beforeEach(() => {
  info = jest.spyOn(logger, 'info').mockImplementation(() => undefined);
  error = jest.spyOn(logger, 'error').mockImplementation(() => undefined);
});

afterEach(() => jest.restoreAllMocks());

it('logs one line per query without the account id', async () => {
  await execute('query Home { ok }');

  expect(info).toHaveBeenCalledTimes(1);
  const [fields, message] = info.mock.calls[0];
  expect(message).toBe('graphql operation');
  expect(fields).toMatchObject({ operationName: 'Home', errorCodes: [] });
  expect(typeof fields.durationMs).toBe('number');
  expect(fields.requestId).toMatch(/^[0-9a-f]{16}$/);
  expect(fields).not.toHaveProperty('accountId');
});

it('logs the account id on a write', async () => {
  await execute('mutation Save { save }');

  expect(info.mock.calls[0][0]).toMatchObject({
    operationName: 'Save',
    accountId: 'account-1',
  });
});

it('logs unexpected errors, but not user input errors', async () => {
  await execute('{ invalid }');
  expect(error).not.toHaveBeenCalled();
  expect(info.mock.calls[0][0].errorCodes).toEqual(['BAD_USER_INPUT']);

  await execute('{ broken }');
  expect(error).toHaveBeenCalledTimes(1);
  expect(error.mock.calls[0][1]).toBe('database down');
  expect(error.mock.calls[0][0].stack).toContain('database down');
});
