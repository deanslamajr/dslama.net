import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginLandingPageDisabled } from '@apollo/server/plugin/disabled';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import getConfig from 'next/config';
import { GraphQLFormattedError } from 'graphql';
import nextConnect from 'next-connect';
import { NextApiRequest, NextApiResponse } from 'next';

import { graphqlRequestGuard } from '../../graphql/requestGuard';
import schema from '../../graphql/schema';
import { maxFieldsRule } from '../../graphql/schema/validationRules';
import {
  ContextInterface,
  IncomingMessageWithSession,
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

const formatError = (
  formattedError: GraphQLFormattedError
): GraphQLFormattedError => {
  if (NODE_ENV !== 'production') {
    return formattedError;
  }
  const code = formattedError.extensions?.code;
  if (PUBLIC_ERROR_CODES.indexOf(code as string) !== -1) {
    return { message: formattedError.message, extensions: { code } };
  }
  // loggingPlugin already logged the error with its request id.
  return { message: 'Internal server error', extensions: { code } };
};

const apolloServer = new ApolloServer<ContextInterface>({
  schema,
  formatError,
  // The API serves JSON only, never an HTML landing page.
  plugins: [loggingPlugin, ApolloServerPluginLandingPageDisabled()],
  validationRules: [maxFieldsRule],
});

const apolloHandler = startServerAndCreateNextHandler<
  NextApiRequest,
  ContextInterface
>(apolloServer, {
  context: async req =>
    resolveContext({
      req: req as unknown as IncomingMessageWithSession,
    }),
});

// graphqlRequestGuard reads and checks the body, so Next must not parse it.
export const config = {
  api: {
    bodyParser: false,
  },
};

export default nextConnect<NextApiRequest, NextApiResponse>()
  .use(graphqlRequestGuard)
  .use(sessionMiddleware)
  .use(apolloHandler);
