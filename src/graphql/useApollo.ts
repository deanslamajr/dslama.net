import { useMemo } from 'react';
import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';

let apolloClient: ApolloClient<NormalizedCacheObject> | undefined;

// getStaticProps passes a SchemaLink. The server render of a page only reads
// the cache that getStaticProps filled, so it gets a link that sends nothing.
// The browser fetches through the API.
function createLink(serverLink?: ApolloLink): ApolloLink {
  if (typeof window === 'undefined') {
    return serverLink ?? ApolloLink.empty();
  }
  return new HttpLink({
    uri: '/api/graphql',
    credentials: 'same-origin',
  });
}

function createApolloClient(serverLink?: ApolloLink) {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: createLink(serverLink),
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
  serverLink?: ApolloLink;
  initialState?: any;
}) => ApolloClient<NormalizedCacheObject>;

export const initializeApollo: InitializeApollo = ({
  initialState = null,
  serverLink,
}) => {
  const _apolloClient = apolloClient ?? createApolloClient(serverLink);

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
  const store = useMemo(
    () => initializeApollo({ initialState }),
    [initialState]
  );
  return store;
}
