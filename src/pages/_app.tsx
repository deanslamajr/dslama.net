import {AppProps} from 'next/app';
import Head from 'next/head';
import React from 'react';
import { ThemeProvider } from 'styled-components';

import {Provider as EditModeProvider} from '../contexts/EditModeState'

import { GlobalStyles, OuterContainer } from '../components/layouts';
import { Navbar } from '../components/navbar';

import { theme } from '../theme';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="shortcut icon" href="/favicon.png" />
      </Head>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <EditModeProvider>
          <OuterContainer>
            <Navbar />
            <Component {...pageProps} />
          </OuterContainer>
        </EditModeProvider>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
