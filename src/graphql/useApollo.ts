import { IncomingMessage, ServerResponse } from 'http';
import { useMemo } from 'react';
import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';

let apolloClient: ApolloClient<NormalizedCacheObject> | undefined;

export type ResolverContext = {
  req?: IncomingMessage;
  res?: ServerResponse;
};

function createIsomorphLink(context: ResolverContext = {}) {
  if (typeof window === 'undefined') {
    // Server-only code must stay out of the client bundle, so it loads with require.
    /* eslint-disable @typescript-eslint/no-var-requires */
    const { SchemaLink } = require('@apollo/client/link/schema');
    const schema = require('./schema').default;
    /* eslint-enable @typescript-eslint/no-var-requires */
    return new SchemaLink({ schema, context });
  } else {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { HttpLink } = require('@apollo/client');
    return new HttpLink({
      uri: '/api/graphql',
      credentials: 'same-origin',
    });
  }
}

function createApolloClient(context?: ResolverContext) {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: createIsomorphLink(context),
    cache: new InMemoryCache({
      typePolicies: {
        AboutPage: {
          keyFields: [],
        },
        PostsPage: {
          keyFields: [],
        },
        ProjectsPage: {
          keyFields: [],
        },
        ReadingsPage: {
          keyFields: [],
        },
      },
    }),
  });
}

type InitializeApollo = (params: {
  context?: ResolverContext;
  initialState?: any;
}) => ApolloClient<NormalizedCacheObject>;

export const initializeApollo: InitializeApollo = ({
  initialState = null,
  // Pages with Next.js data fetching methods, like `getStaticProps`, can send
  // a custom context which will be used by `SchemaLink` to server render pages
  context,
}) => {
  const _apolloClient = apolloClient ?? createApolloClient(context);

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // get hydrated here
  if (initialState) {
    _apolloClient.cache.restore(initialState);
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return _apolloClient;
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
};

export function useApollo(initialState: any) {
  const store = useMemo(() => initializeApollo({ initialState }), [
    initialState,
  ]);
  return store;
}
