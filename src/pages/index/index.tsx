import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';

import { Styled } from './index.styles';

import { Header } from '../../components/Header';
import { withApollo } from '../../graphql/with-apollo';

import { useFetchHomeMainQuery } from '../../graphql/queries/fetchHomeMain.graphql';

const Home: NextPage = () => {
  const { data } = useFetchHomeMainQuery();

  return (
    <div>
      <Head>
        <title>dslama.net</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Styled.Container>
        <Header summary={data?.homeQuery.title || ''}></Header>
      </Styled.Container>
      <Link href="/posts">
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a>posts</a>
      </Link>{' '}
    </div>
  );
};

export default withApollo(Home);
