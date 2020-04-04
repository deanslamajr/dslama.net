import { NextPage } from 'next';
import Head from 'next/head';

import {
  BackgroundImage,
  BioCard,
  Container,
  LinkAnchor,
  LinkItem,
  LinksContainer,
  LogoContainer,
} from './About.styles';

import { LoadingErrorOrRender } from '../../components/LoadingErrorOrRender';
import { Header } from '../../components/header';

import { withApollo } from '../../graphql/with-apollo';
import {
  useFetchAboutQuery,
  FetchAboutQuery,
  Link,
} from '../../graphql/queries/fetchAbout.graphql';

const Home: NextPage = () => {
  const { data, loading, error } = useFetchAboutQuery();

  return (
    <LoadingErrorOrRender<FetchAboutQuery>
      error={error}
      isLoading={loading}
      queryResult={data}
      render={({ queryResult }) => {
        const {
          aboutPage: { bio, pictureURL, links, title },
        } = queryResult;

        return (
          <div>
            <Head>
              <title>dslama.net</title>
            </Head>
            <Container>
              <Header summary={title || ''} />
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
      }}
    />
  );
};

export default withApollo(Home);
