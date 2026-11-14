/**
 * @jest-environment jsdom
 */
import React from 'react';
import { act, render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { NextRouter } from 'next/router';
import { RouterContext } from 'next/dist/next-server/lib/router-context';

import { Provider as EditModeProvider } from '../../contexts/EditModeState';
import { ThemeModeProvider } from '../../contexts/ThemeMode';
import defaultTheme from '../../defaultTheme';
import { FetchViewerDocument } from '../../graphql/generated/ops';
import { Navbar } from '.';

const router = ({ pathname: '/', query: {} } as unknown) as NextRouter;

const renderNavbar = (viewer: { id: string; username: string } | null) =>
  render(
    <RouterContext.Provider value={router}>
      <MockedProvider
        addTypename={false}
        mocks={[
          {
            request: { query: FetchViewerDocument },
            result: { data: { viewer } },
          },
        ]}>
        <ThemeModeProvider theme={defaultTheme}>
          <EditModeProvider>
            <Navbar />
          </EditModeProvider>
        </ThemeModeProvider>
      </MockedProvider>
    </RouterContext.Provider>
  );

it('shows logout to a logged-in account without ?edit', async () => {
  renderNavbar({ id: '1', username: 'owner' });

  expect(await screen.findByLabelText('log out owner')).toBeTruthy();
});

it('shows no logout to a visitor', async () => {
  renderNavbar(null);

  // Let the viewer query answer before checking.
  await act(() => new Promise(resolve => setTimeout(resolve, 0)));
  expect(screen.queryByText('logout')).toBeNull();
  expect(screen.getByText('dean slama')).toBeTruthy();
});
