import { DocumentNode } from '@apollo/client';
import { SchemaLink } from '@apollo/client/link/schema';
import { GetStaticProps } from 'next';
import { PHASE_PRODUCTION_BUILD } from 'next/constants';
// Next removes getStaticProps and the imports that only it uses from the
// browser bundle, so the schema and the resolvers stay on the server.
import schema from './schema';
import { initializeApollo } from './useApollo';

// A visitor sees a save after at most this many seconds.
export const REVALIDATE_SECONDS = 60;

const factory = (queryDocument: DocumentNode): GetStaticProps => {
  return async () => {
    // The image build has no database. The build writes an empty page that is
    // stale after 1 second, and server.js replaces it with real data at startup.
    // In the browser, an empty page fetches its data through /api/graphql.
    if (process.env.NEXT_PHASE === PHASE_PRODUCTION_BUILD) {
      return { props: { initialApolloState: null }, revalidate: 1 };
    }

    // The query runs against the schema in this process, with no HTTP call.
    // Page queries do not depend on the viewer, so the context is empty.
    const apolloClient = initializeApollo({
      serverLink: new SchemaLink({ schema, context: {} }),
    });

    await apolloClient.query({
      query: queryDocument,
    });

    return {
      props: {
        initialApolloState: apolloClient.cache.extract(),
      },
      revalidate: REVALIDATE_SECONDS,
    };
  };
};

export default factory;
