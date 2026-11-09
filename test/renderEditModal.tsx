import React from 'react';
import { render } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { Grommet } from 'grommet';
import { NextRouter } from 'next/router';
import { RouterContext } from 'next/dist/next-server/lib/router-context';

import { Provider as EditModeProvider } from '../src/contexts/EditModeState';

const router = ({ query: {} } as unknown) as NextRouter;

// MockedProvider has no mocks, so any mutation the modal sends fails
// and shows a "Save failed" alert.
export const renderEditModal = (modal: React.ReactElement) =>
  render(
    <RouterContext.Provider value={router}>
      <MockedProvider mocks={[]}>
        <Grommet>
          <EditModeProvider>{modal}</EditModeProvider>
        </Grommet>
      </MockedProvider>
    </RouterContext.Provider>
  );
