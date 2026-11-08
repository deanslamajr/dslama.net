import { NextPage } from 'next';
import Link from 'next/link';

import { Header } from '../components/header';
import { SeoHead } from '../components/SeoHead';
import { Container } from '../components/About.styles';

const ErrorComponent: NextPage = () => (
  <>
    <SeoHead
      title="dslama.net - page not found"
      description="Page not found"
      path="/404"
      noIndex
    />
    <Container>
      <Header summary="Page not found" />
      <Link href="/">
        <a>Go to the home page</a>
      </Link>
    </Container>
  </>
);

export default ErrorComponent;
