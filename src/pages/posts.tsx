import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import styled from 'styled-components';

import { withApollo } from '../graphql/with-apollo';

import { useFetchPostsQuery } from '../graphql/queries/fetchPosts.graphql';

const Posts: NextPage = () => {
  const { data } = useFetchPostsQuery();

  return (
    <div>
      <Head>
        <title>dslama.net - posts</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      {JSON.stringify(data?.postsQuery?.posts)}
      <Link href="/">
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a>home</a>
      </Link>{' '}
    </div>
  );
};

export default withApollo(Posts);
