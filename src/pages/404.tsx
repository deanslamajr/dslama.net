import Head from 'next/head';
import { NextPage } from 'next';

import { Header } from '../components/header';
import { Container } from '../components/About.styles';

const ErrorComponent: NextPage = () => (
  <>
    <Head>
      <title>dslama.net - page not found</title>
    </Head>
    <Container>
      <Header summary="Page not found" />
    </Container>
  </>
);

export default ErrorComponent;
