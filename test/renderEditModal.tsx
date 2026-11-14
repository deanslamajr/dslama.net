import React from 'react';
import { render } from '@testing-library/react';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { Grommet } from 'grommet';
import { NextRouter } from 'next/router';
import { RouterContext } from 'next/dist/next-server/lib/router-context';

import { Provider as EditModeProvider } from '../src/contexts/EditModeState';

const router = ({ query: {} } as unknown) as NextRouter;

// Without mocks, any mutation the modal sends fails and shows a
// "Save failed" alert.
export const renderEditModal = (
  modal: React.ReactElement,
  mocks: MockedResponse[] = []
) =>
  render(
    <RouterContext.Provider value={router}>
      <MockedProvider mocks={mocks} addTypename={false}>
        <Grommet>
          <EditModeProvider>{modal}</EditModeProvider>
        </Grommet>
      </MockedProvider>
    </RouterContext.Provider>
  );
