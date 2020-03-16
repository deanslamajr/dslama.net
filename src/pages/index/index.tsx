import { NextPage } from 'next';
import Head from 'next/head';

import { Container } from './About.styles';

import { Header } from '../../components/header';
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
      <Container>
        <Header summary={data?.homeQuery.title || ''}></Header>
      </Container>
    </div>
  );
};

export default withApollo(Home);
