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
} from '../components/About.styles';

import { LoadingErrorOrRender } from '../components/LoadingErrorOrRender';
import { Header } from '../components/header';
import {AboutPageEditModal} from '../components/AboutPageEditModal';

import {useState as useEditModeState} from '../contexts/EditModeState';

import getServerSidePropsFactory from '../graphql/getServerSidePropsFactory';
import {
  useFetchAboutQuery,
  FetchAboutQuery,
  Link,
  FetchAboutDocument
} from '../graphql/generated/ops';

const Home: NextPage = () => {
  const { data, loading, error } = useFetchAboutQuery();
  const [editModeState] = useEditModeState();

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
            {editModeState.showModal && <AboutPageEditModal />}
          </div>
        );
      }}
    />
  );
};

export const getServerSideProps = getServerSidePropsFactory(FetchAboutDocument);

export default Home;