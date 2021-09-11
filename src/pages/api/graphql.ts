import { ApolloServer } from 'apollo-server-micro';
import getConfig from 'next/config';
import { GraphQLError, GraphQLFormattedError } from 'graphql';
import nextConnect from 'next-connect';
import { NextApiRequest, NextApiResponse } from "next";

import schema from '../../graphql/schema';
import {resolveContext, sessionMiddleware} from '../../graphql/schema/context';

const {
  serverRuntimeConfig: { NODE_ENV },
} = getConfig();

const formatError = (error: GraphQLError): GraphQLFormattedError => {
  // In production, return generic errors
  // forward only the code for the client to use
  if (NODE_ENV === 'production') {
    // @TODO better logging
    console.error(error);

    return new GraphQLError(
      'Internal server error',
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      { code: error?.extensions?.code }
    );
  }
  return error;
};

const apolloServer = new ApolloServer({
  context: resolveContext,
  schema,
  formatError
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default nextConnect<NextApiRequest, NextApiResponse>()
  .use(sessionMiddleware)
  .use(apolloServer.createHandler({ path: '/api/graphql' }));