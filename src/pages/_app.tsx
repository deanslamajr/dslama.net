import {AppProps} from 'next/app';
import Head from 'next/head';
import React from 'react';
import { Grid, Grommet, Main } from 'grommet';
import { ApolloProvider } from '@apollo/client'

import { useApollo } from '../graphql/useApollo';
import {Provider as EditModeProvider} from '../contexts/EditModeState'
import { Navbar } from '../components/navbar';
import defaultTheme from '../defaultTheme';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  const apolloClient = useApollo(pageProps.initialApolloState);

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="shortcut icon" href="/favicon.png" />
      </Head>
      <Grommet full theme={defaultTheme}>
        <ApolloProvider client={apolloClient}>
          <EditModeProvider>
            <Grid fill rows={["auto", "flex"]}>
              <Navbar />
              <Main>
                <Component {...pageProps} />
              </Main>
            </Grid>
          </EditModeProvider>
        </ApolloProvider>
      </Grommet>
    </>
  );
};

export default MyApp;
