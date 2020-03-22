import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';

import { LoadingErrorOrRender } from '../../components/LoadingErrorOrRender';

import { withApollo } from '../../graphql/with-apollo';

import {
  useFetchPostsQuery,
  FetchPostsQuery,
} from '../../graphql/queries/fetchPosts.graphql';

const Posts: NextPage = () => {
  const { data, loading, error } = useFetchPostsQuery();

  return (
    <LoadingErrorOrRender<FetchPostsQuery>
      error={error}
      isLoading={loading}
      queryResult={data}
      render={({ queryResult }) => {
        const {
          postsQuery: { posts },
        } = queryResult;

        return (
          <div>
            <Head>
              <title>dslama.net - posts</title>
            </Head>
            {JSON.stringify(posts)}
            <Link href="/">
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a>home</a>
            </Link>{' '}
          </div>
        );
      }}
    />
  );
};

export default withApollo(Posts);
