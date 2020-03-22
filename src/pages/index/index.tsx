import { NextPage } from 'next';
import Head from 'next/head';
// import getConfig from 'next/config';

import {
  BackgroundImage,
  BioCard,
  Container,
  LinkAnchor,
  LinkItem,
  LinksContainer,
  LogoContainer,
} from './About.styles';

import { Spinner } from '../../components/spinner';
import { Header } from '../../components/header';

import { withApollo } from '../../graphql/with-apollo';
import {
  useFetchHomeMainQuery,
  FetchHomeMainQuery,
  Link,
} from '../../graphql/queries/fetchHomeMain.graphql';

// const { publicRuntimeConfig } = getConfig();
// publicRuntimeConfig.FAVICON_ROOT_URL

const Home: NextPage = () => {
  const { data, loading, error } = useFetchHomeMainQuery();

  if (loading) {
    return <Spinner />;
  }

  if (error || !data) {
    return null;
  }

  const {
    homeQuery: { bio, pictureURL, links, title },
  } = data as FetchHomeMainQuery;

  return (
    <div>
      <Head>
        <title>dslama.net</title>
      </Head>
      <Container>
        <Header summary={title || ''}></Header>
        <LogoContainer>
          <BackgroundImage imageUrl={pictureURL || ''} />
        </LogoContainer>
        <LinksContainer>
          {(links as Link[]).map(({ name, url }) => (
            <LinkItem key={name || ''}>
              <LinkAnchor href={url || ''} target="_blank">
                {name}
              </LinkAnchor>
            </LinkItem>
          ))}
        </LinksContainer>
        <BioCard dangerouslySetInnerHTML={{ __html: bio || '' }} />
      </Container>
    </div>
  );
};

export default withApollo(Home);
