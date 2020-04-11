import { NextPage } from 'next';
import Head from 'next/head';

import { Header } from '../components/header';
import { Container } from '../components/About.styles';

const Error: NextPage = () => (
  <>
    <Head>
      <title>dslama.net - page error</title>
    </Head>
    <Container>
      <Header summary="There was an error while processing this page request." />
    </Container>
  </>
);

export default Error;
