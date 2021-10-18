import React from 'react';
import { Box, Grid, Main } from 'grommet';

import { Navbar } from './navbar';
import {FullPageLoadSpinner} from './FullPageLoadSpinner';

type MainLayoutProps = {
  isChangingRoute: boolean;
};

export const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  isChangingRoute
}) => {
  return (
    <Grid
      fill
      rows={["auto", "flex"]}
    >
      <Navbar />
      <Main align="center" overflow="overlay">
        <Box
          direction="column"
          align="center"
          alignContent="center"
          width="xxlarge"
        >
          {children}
        </Box>
      </Main>
      <FullPageLoadSpinner show={isChangingRoute} />
    </Grid>
  );
};