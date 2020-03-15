import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import styled from 'styled-components';

import { Header } from '../components/Header';
import { withApollo } from '../graphql/with-apollo';

import { useFetchHomeMainQuery } from '../graphql/queries/fetchHomeMain.graphql';

const AboutContainer = styled.div`
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica,
    Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
`;

const Home: NextPage = () => {
  const { data } = useFetchHomeMainQuery();

  return (
    <div>
      <Head>
        <title>dslama.net</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <AboutContainer>
        <Header summary={data?.homeQuery.title || ''}></Header>
      </AboutContainer>

      <Link href="/posts">
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a>posts</a>
      </Link>{' '}
    </div>
  );
};

export default withApollo(Home);
