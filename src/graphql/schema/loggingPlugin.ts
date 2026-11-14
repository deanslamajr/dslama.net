import { randomBytes } from 'crypto';
import { ApolloServerPlugin } from 'apollo-server-plugin-base';

import { logger } from '../../logger';
import { ContextInterface } from './context';

// Messages for these codes are written by this app and are safe to show.
export const PUBLIC_ERROR_CODES = [
  'BAD_USER_INPUT',
  'UNAUTHENTICATED',
  'RATE_LIMITED',
  'GRAPHQL_VALIDATION_FAILED',
];

// The Google load balancer sends "TRACE_ID/SPAN_ID;o=1". The trace id ties
// this log line to the load balancer's request log.
const requestIdFrom = (traceHeader?: string | null): string =>
  (traceHeader && traceHeader.split('/')[0]) || randomBytes(8).toString('hex');

// One log line per GraphQL operation, and one per unexpected error.
// Writes (mutations) also log the account id of the session, by owner decision.
export const loggingPlugin: ApolloServerPlugin<ContextInterface> = {
  requestDidStart(requestContext) {
    const startedAt = Date.now();
    const requestId = requestIdFrom(
      requestContext.request.http?.headers.get('x-cloud-trace-context')
    );

    return {
      didEncounterErrors({ errors, operationName }) {
        errors
          .filter(
            error => PUBLIC_ERROR_CODES.indexOf(error.extensions?.code) === -1
          )
          .forEach(error => {
            logger.error(
              {
                requestId,
                operationName: operationName || null,
                code: error.extensions?.code || null,
                path: error.path || null,
                stack: (error.originalError || error).stack,
              },
              error.message
            );
          });
      },
      willSendResponse({ context, errors, operation, operationName }) {
        const isWrite = operation?.operation === 'mutation';
        logger.info(
          {
            requestId,
            operationName: operationName || null,
            durationMs: Date.now() - startedAt,
            errorCodes: errors
              ? errors.map(error => error.extensions?.code || null)
              : [],
            ...(isWrite
              ? { accountId: context.session?.get()?.accountId || null }
              : {}),
          },
          'graphql operation'
        );
      },
    };
  },
};
