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

import {appTitle} from '../constants';

import { LoadingErrorOrRender } from '../components/LoadingErrorOrRender';
import { Header } from '../components/header';
import {AboutPageEditModal} from '../components/editModals/about';

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
    <>
      <Head>
        <title>{appTitle}</title>
      </Head>
      <LoadingErrorOrRender<FetchAboutQuery>
        error={error}
        isLoading={loading}
        queryResult={data}
        render={({ queryResult }) => {
          return (
            <div>
              <Container>
                <Header summary={queryResult.aboutPage.title || ''} />
                <LogoContainer>
                  <BackgroundImage imageUrl={queryResult.aboutPage.pictureURL || ''} />
                </LogoContainer>
                <LinksContainer>
                  {
                    (queryResult.aboutPage.links?.length
                      ? (
                        (queryResult.aboutPage.links as Link[])
                          .map(({ name, url }) => (
                            <LinkItem key={name || ''}>
                              <LinkAnchor href={url || ''} target="_blank">
                                {name}
                              </LinkAnchor>
                            </LinkItem>
                          ))
                      )
                      : (
                        <LinkItem key={''}>
                          <LinkAnchor href={''} target="_blank">
                          </LinkAnchor>
                        </LinkItem>
                      )
                    )
                  }
                </LinksContainer>
                <BioCard dangerouslySetInnerHTML={{ __html: queryResult.aboutPage.bio || '' }} />
              </Container>

              {editModeState.showModal && (
                <AboutPageEditModal
                  initialValues={queryResult}
                />
              )}
            </div>
          );
        }}
      />
    </>
  );
};

export const getServerSideProps = getServerSidePropsFactory(FetchAboutDocument);

export default Home;