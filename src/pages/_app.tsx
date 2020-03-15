import App from 'next/app';
import React from 'react';
import { ThemeProvider } from 'styled-components';

import { OuterContainer } from '../components/OuterContainer';

import { theme } from '../theme';

export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <ThemeProvider theme={theme}>
        <OuterContainer>
          <Component {...pageProps} />
        </OuterContainer>
      </ThemeProvider>
    );
  }
}
