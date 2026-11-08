import { NextPage } from 'next';
import Markdown from 'markdown-to-jsx';

import {
  BackgroundImage,
  BioCard,
  Container,
  LinkAnchor,
  LinkItem,
  LinksContainer,
  LogoContainer,
} from '../components/About.styles';

import { appTitle } from '../constants';
import { toPlainText } from '../text';
import { HTTP_PROTOCOLS, LINK_PROTOCOLS, isAllowedUrl } from '../contentPolicy';

import { LoadingErrorOrRender } from '../components/LoadingErrorOrRender';
import { SeoHead } from '../components/SeoHead';
import { Header } from '../components/header';
import { AboutPageEditModal } from '../components/editModals/about';

import { useState as useEditModeState } from '../contexts/EditModeState';

import getServerSidePropsFactory from '../graphql/getServerSidePropsFactory';
import {
  useFetchAboutQuery,
  FetchAboutQuery,
  Link,
  FetchAboutDocument,
} from '../graphql/generated/ops';

// Relative paths and URLs with an allowed protocol pass. Anything else is dropped.
const isSafe = (value: string | undefined, protocols: string[]): boolean =>
  Boolean(value) &&
  (((value as string).startsWith('/') && !(value as string).startsWith('//')) ||
    isAllowedUrl(value as string, protocols));

const SafeLink: React.FC<{ href?: string; title?: string }> = ({
  href,
  title,
  children,
}) => (
  <a
    href={isSafe(href, LINK_PROTOCOLS) ? href : undefined}
    title={title}
    target="_blank"
    rel="noopener noreferrer">
    {children}
  </a>
);

const SafeImage: React.FC<{ src?: string; alt?: string; title?: string }> = ({
  src,
  alt,
  title,
}) =>
  isSafe(src, HTTP_PROTOCOLS) ? (
    <img src={src} alt={alt || ''} title={title} />
  ) : null;

const markdownOptions = {
  disableParsingRawHTML: true,
  forceBlock: true,
  overrides: { a: { component: SafeLink }, img: { component: SafeImage } },
};

const Home: NextPage = () => {
  const { data, loading, error } = useFetchAboutQuery();
  const [editModeState] = useEditModeState();

  return (
    <>
      <SeoHead
        title={appTitle}
        description={toPlainText(data?.aboutPage.bio || '')}
        path="/"
      />
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
                  <BackgroundImage
                    imageUrl={queryResult.aboutPage.pictureURL || ''}
                  />
                </LogoContainer>
                <LinksContainer>
                  {queryResult.aboutPage.links?.length ? (
                    (queryResult.aboutPage.links as Link[]).map(
                      ({ name, url }) => (
                        <LinkItem key={name || ''}>
                          <LinkAnchor
                            href={url || ''}
                            target="_blank"
                            rel="noopener noreferrer">
                            {name}
                          </LinkAnchor>
                        </LinkItem>
                      )
                    )
                  ) : (
                    <LinkItem key={''}>
                      <LinkAnchor href={''} target="_blank"></LinkAnchor>
                    </LinkItem>
                  )}
                </LinksContainer>
                <BioCard>
                  <Markdown options={markdownOptions}>
                    {queryResult.aboutPage.bio || ''}
                  </Markdown>
                </BioCard>
              </Container>

              {editModeState.showModal && (
                <AboutPageEditModal initialValues={queryResult} />
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
