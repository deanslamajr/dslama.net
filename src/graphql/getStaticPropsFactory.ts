import {DocumentNode} from '@apollo/client';
import { initializeApollo } from '../graphql/useApollo';

const factory = (queryDocument: DocumentNode) => {
  return async function getStaticProps() {
    const apolloClient = initializeApollo()
  
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