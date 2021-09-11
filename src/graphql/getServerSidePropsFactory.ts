import {DocumentNode} from '@apollo/client';
import {GetServerSideProps} from 'next';
import { initializeApollo } from './useApollo';

const factory = (queryDocument: DocumentNode): GetServerSideProps => {
  return async (context) => {
    const resolveContext = require('./schema/context')
          .resolveContextDuringNextSSR;
    const resolvedContext = await resolveContext({
      req: context.req,
      res: context.res,
    });

    const apolloClient = initializeApollo({context: resolvedContext})
  
    await apolloClient.query({
      query: queryDocument,
    })
  
    return {
      props: {
        initialApolloState: apolloClient.cache.extract(),
      },
    }
  }
};

export default factory;