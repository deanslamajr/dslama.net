import { AppProps } from 'next/app';
import Head from 'next/head';
import Router from 'next/router';
import React from 'react';
import { Grommet } from 'grommet';
import { ApolloProvider } from '@apollo/client';
import { createGlobalStyle } from 'styled-components';

import { useApollo } from '../graphql/useApollo';
import { Provider as EditModeProvider } from '../contexts/EditModeState';
import { MainLayout } from '../components/MainLayout';

import defaultTheme from '../defaultTheme';

const ReducedMotion = createGlobalStyle`
  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
`;

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  const apolloClient = useApollo(pageProps.initialApolloState);
  const [isChangingRoute, setIsChangingRoute] = React.useState(false);

  React.useEffect(() => {
    Router.events.on('routeChangeStart', () => setIsChangingRoute(true));
    Router.events.on('routeChangeComplete', () => setIsChangingRoute(false));
    Router.events.on('routeChangeError', () => setIsChangingRoute(false));
    setIsChangingRoute(false);
  }, []);

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/png" sizes="64x64" href="/favicon.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </Head>
      <Grommet full theme={defaultTheme}>
        <ReducedMotion />
        <ApolloProvider client={apolloClient}>
          <EditModeProvider>
            <MainLayout isChangingRoute={isChangingRoute}>
              <Component {...pageProps} />
            </MainLayout>
          </EditModeProvider>
        </ApolloProvider>
      </Grommet>
    </>
  );
};

export default MyApp;
