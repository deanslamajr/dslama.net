import React from 'react';
import { Box, Spinner, Layer } from 'grommet';

type FullPageLoadSpinnerProps = {
  show: boolean;
};

export const FullPageLoadSpinner: React.FC<FullPageLoadSpinnerProps> = ({
  show
}) => {

  return (
    show
      ? (
        <Layer
          plain
          full
        >
          <Box
            direction="row"
            align="center"
            pad="medium"
            justify="center"
            fill
            background={{opacity: 0 }}
          >
            <Spinner size="xlarge"/>
          </Box>
        </Layer>
      )
      : null
  );
};