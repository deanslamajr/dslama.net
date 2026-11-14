import { ApolloServer } from 'apollo-server-micro';
import getConfig from 'next/config';
import { GraphQLError, GraphQLFormattedError } from 'graphql';
import nextConnect from 'next-connect';
import { NextApiRequest, NextApiResponse } from 'next';

import { graphqlRequestGuard } from '../../graphql/requestGuard';
import schema from '../../graphql/schema';
import { maxFieldsRule } from '../../graphql/schema/validationRules';
import {
  resolveContext,
  sessionMiddleware,
} from '../../graphql/schema/context';
import {
  loggingPlugin,
  PUBLIC_ERROR_CODES,
} from '../../graphql/schema/loggingPlugin';

const {
  serverRuntimeConfig: { NODE_ENV },
} = getConfig();

const formatError = (error: GraphQLError): GraphQLFormattedError => {
  if (NODE_ENV !== 'production') {
    return error;
  }
  const code = error?.extensions?.code;
  if (PUBLIC_ERROR_CODES.indexOf(code) !== -1) {
    return { message: error.message, extensions: { code } };
  }
  // loggingPlugin already logged the error with its request id.
  return { message: 'Internal server error', extensions: { code } };
};

const apolloServer = new ApolloServer({
  context: resolveContext,
  schema,
  formatError,
  plugins: [loggingPlugin],
  // The site never accepts files. This keeps multipart requests away from the upload parser.
  uploads: false,
  validationRules: [maxFieldsRule],
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default nextConnect<NextApiRequest, NextApiResponse>()
  .use(graphqlRequestGuard)
  .use(sessionMiddleware)
  .use(apolloServer.createHandler({ path: '/api/graphql' }));
