/**
 * @jest-environment jsdom
 */
import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { GraphQLError } from 'graphql';
import { Grommet } from 'grommet';

import {
  FetchPostsDocument,
  PageType,
  PageVersionsDocument,
  RestorePageVersionDocument,
} from '../../graphql/generated/ops';
import { HistoryPanel } from './HistoryPanel';

const list: MockedResponse = {
  request: { query: PageVersionsDocument, variables: { page: 'POSTS' } },
  result: {
    data: {
      pageVersions: [
        { version: 3, createdAt: Date.UTC(2026, 10, 3) },
        { version: 2, createdAt: Date.UTC(2026, 10, 2) },
      ],
    },
  },
};

const restoreRequest = {
  query: RestorePageVersionDocument,
  variables: { page: 'POSTS', version: 2 },
};

const refetchPosts: MockedResponse = {
  request: { query: FetchPostsDocument },
  result: { data: { postsPage: { summary: 's', posts: [] } } },
};

const renderPanel = (mocks: MockedResponse[]) => {
  const onRestored = jest.fn();
  const onNeedsLogin = jest.fn();
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <Grommet>
        <HistoryPanel
          pageType={PageType.Posts}
          pageQuery={FetchPostsDocument}
          describeError={error => error.message}
          onNeedsLogin={onNeedsLogin}
          onRestored={onRestored}
        />
      </Grommet>
    </MockedProvider>
  );
  return { onRestored, onNeedsLogin };
};

const openAndConfirm = async () => {
  fireEvent.click(screen.getByText('Show history'));
  expect(await screen.findByText(/Version 3/)).toBeTruthy();
  expect(screen.getByText('current')).toBeTruthy();
  fireEvent.click(screen.getByLabelText('Restore version 2'));
  expect(screen.getByText('Save it as a new version?')).toBeTruthy();
  fireEvent.click(screen.getByText('Restore'));
};

it('restores a version only after confirmation', async () => {
  const newData = jest.fn(() => ({
    data: { restorePageVersion: { version: 4, createdAt: 0 } },
  }));
  const { onRestored } = renderPanel([
    list,
    { request: restoreRequest, newData },
    refetchPosts,
  ]);

  fireEvent.click(screen.getByText('Show history'));
  await screen.findByText(/Version 2/);
  fireEvent.click(screen.getByLabelText('Restore version 2'));
  fireEvent.click(screen.getByText('No'));
  expect(newData).not.toHaveBeenCalled();
  fireEvent.click(screen.getByText('Hide history'));

  await openAndConfirm();

  await waitFor(() => expect(onRestored).toHaveBeenCalled());
  expect(newData).toHaveBeenCalledTimes(1);
});

it('asks for a login when the restore is unauthenticated', async () => {
  const { onNeedsLogin, onRestored } = renderPanel([
    list,
    {
      request: restoreRequest,
      result: {
        errors: [
          new GraphQLError(
            'Not logged in',
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            {
              code: 'UNAUTHENTICATED',
            }
          ),
        ],
      },
    },
  ]);

  await openAndConfirm();

  await waitFor(() => expect(onNeedsLogin).toHaveBeenCalled());
  expect(onRestored).not.toHaveBeenCalled();
});
