import { ApolloServer } from 'apollo-server-micro';
import getConfig from 'next/config';
import { GraphQLError, GraphQLFormattedError } from 'graphql';
import nextConnect from 'next-connect';
import { NextApiRequest, NextApiResponse } from "next";

import { graphqlRequestGuard } from '../../graphql/requestGuard';
import schema from '../../graphql/schema';
import {resolveContext, sessionMiddleware} from '../../graphql/schema/context';

const {
  serverRuntimeConfig: { NODE_ENV },
} = getConfig();

// Messages for these codes are written by this app and are safe to show.
const PUBLIC_ERROR_CODES = ['BAD_USER_INPUT', 'UNAUTHENTICATED', 'RATE_LIMITED', 'GRAPHQL_VALIDATION_FAILED'];

const formatError = (error: GraphQLError): GraphQLFormattedError => {
  if (NODE_ENV !== 'production') {
    return error;
  }
  const code = error?.extensions?.code;
  if (PUBLIC_ERROR_CODES.indexOf(code) !== -1) {
    return { message: error.message, extensions: { code } };
  }
  // @TODO better logging (L-08)
  console.error(error);
  return { message: 'Internal server error', extensions: { code } };
};

const apolloServer = new ApolloServer({
  context: resolveContext,
  schema,
  formatError,
  // The site never accepts files. This keeps multipart requests away from the upload parser.
  uploads: false,
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