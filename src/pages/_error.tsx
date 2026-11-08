import { NextPage } from 'next';
import Link from 'next/link';

import { Header } from '../components/header';
import { SeoHead } from '../components/SeoHead';
import { Container } from '../components/About.styles';

type ErrorProps = {
  statusCode: number;
};

const Error: NextPage<ErrorProps> = ({ statusCode }) => (
  <>
    <SeoHead
      title="dslama.net - page error"
      description="Page error"
      path="/"
      noIndex
    />
    <Container>
      <Header
        summary={`Error ${statusCode}: there was an error while processing this page request.`}
      />
      <Link href="/">
        <a>Go to the home page</a>
      </Link>
    </Container>
  </>
);

Error.getInitialProps = ({ res, err }) => ({
  statusCode: res
    ? res.statusCode
    : err && err.statusCode
    ? err.statusCode
    : 404,
});

export default Error;
