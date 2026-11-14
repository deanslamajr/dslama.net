/**
 * @jest-environment jsdom
 */
import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { Grommet } from 'grommet';
import Router from 'next/router';

import {
  AttemptLoginDocument,
  FetchViewerDocument,
} from '../graphql/generated/ops';
import { LoginPage } from './LoginPage';

jest.mock('next/router', () => ({
  __esModule: true,
  default: { push: jest.fn() },
}));

const input = { username: 'owner', password: 'test-only-password' };

const viewer = (value: { id: string; username: string } | null) => ({
  request: { query: FetchViewerDocument },
  result: { data: { viewer: value } },
});

const login = (wasSuccessful: boolean): MockedResponse => ({
  request: { query: AttemptLoginDocument, variables: { input } },
  result: { data: { attemptLogin: { wasSuccessful } } },
});

const renderLogin = (mocks: MockedResponse[]) =>
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <Grommet>
        <LoginPage />
      </Grommet>
    </MockedProvider>
  );

const submit = async () => {
  fireEvent.change(await screen.findByLabelText('username'), {
    target: { value: input.username },
  });
  fireEvent.change(screen.getByLabelText('password'), {
    target: { value: input.password },
  });
  fireEvent.click(screen.getByRole('button', { name: 'login' }));
};

beforeEach(() => {
  (Router.push as jest.Mock).mockClear();
});

it('goes to the home page after a successful login', async () => {
  renderLogin([
    viewer(null),
    login(true),
    viewer({ id: '1', username: 'owner' }),
  ]);

  await submit();

  await waitFor(() => expect(Router.push).toHaveBeenCalledWith('/'));
});

it('stays on the page after a failed login', async () => {
  renderLogin([viewer(null), login(false), viewer(null)]);

  await submit();

  expect(await screen.findByText('Login Failed! Try Again.')).toBeTruthy();
  expect(Router.push).not.toHaveBeenCalled();
});

it('offers logout to a logged-in account', async () => {
  renderLogin([viewer({ id: '1', username: 'owner' })]);

  expect(await screen.findByText('Logged in as owner.')).toBeTruthy();
  expect(screen.getByText('logout')).toBeTruthy();
  expect(screen.queryByLabelText('password')).toBeNull();
});
