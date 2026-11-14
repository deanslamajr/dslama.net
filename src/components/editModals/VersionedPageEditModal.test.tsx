/**
 * @jest-environment jsdom
 */
import React from 'react';
import { act, fireEvent, screen, waitFor } from '@testing-library/react';

import { renderEditModal } from '../../../test/renderEditModal';
import {
  transformDateInputValueToGqlDate,
  transformGqlDateForDateInput,
} from '../../utils';
import {
  UpdateAboutPageDocument,
  UpdatePostsPageDocument,
} from '../../graphql/generated/ops';
import { AboutPageEditModal } from './about';
import { PostsPageEditModal } from './posts';
import {
  PageConfig,
  toFormValues,
  toMutationInput,
} from './VersionedPageEditModal';

const DAY = Date.UTC(2017, 11, 4, 12);
const roundTrip = (date: number) =>
  transformDateInputValueToGqlDate(transformGqlDateForDateInput(date));

const config: PageConfig = {
  mutation: UpdatePostsPageDocument,
  fieldsBeforeList: [{ name: 'summary', kind: 'text' }],
  list: {
    name: 'posts',
    itemLabel: 'Post',
    consoleKey: 'posts',
    fields: [
      { name: 'title', kind: 'text' },
      { name: 'originalPublishDate', kind: 'date' },
    ],
  },
  fieldsAfterList: [],
};

describe('toFormValues and toMutationInput', () => {
  it('converts dates, drops unknown fields, and keeps console items', () => {
    const values = toFormValues(
      config,
      {
        summary: 's',
        posts: [{ id: 'x', title: 'a', originalPublishDate: DAY }],
      },
      {
        posts: [
          {
            title: 'b',
            url: '',
            snippet: '',
            originalPublishDate: transformGqlDateForDateInput(DAY),
          },
        ],
      }
    );

    expect(values.existingItems).toEqual([
      { title: 'a', originalPublishDate: transformGqlDateForDateInput(DAY) },
    ]);
    expect(values.newItems).toHaveLength(1);

    expect(toMutationInput(config, values)).toEqual({
      summary: 's',
      posts: [
        { title: 'a', originalPublishDate: roundTrip(DAY) },
        { title: 'b', originalPublishDate: roundTrip(DAY) },
      ],
    });
  });

  it('fills missing page fields with empty strings', () => {
    const values = toFormValues(config, { summary: null, posts: null }, null);
    expect(toMutationInput(config, values)).toEqual({
      summary: '',
      posts: [],
    });
  });
});

const post = {
  id: 'p1',
  url: 'https://example.com/a',
  originalPublishDate: DAY,
  title: 'a',
  snippet: 'b',
};

it('saves the posts page with the edited summary', async () => {
  const newData = jest.fn(() => ({
    data: { updatePostsPage: { summary: 'new', posts: [post] } },
  }));
  renderEditModal(
    <PostsPageEditModal initialValues={{ summary: 'old', posts: [post] }} />,
    [
      {
        request: {
          query: UpdatePostsPageDocument,
          variables: {
            input: {
              summary: 'new',
              posts: [
                {
                  title: 'a',
                  url: 'https://example.com/a',
                  snippet: 'b',
                  originalPublishDate: roundTrip(DAY),
                },
              ],
            },
          },
        },
        newData,
      },
    ]
  );

  fireEvent.change(screen.getByDisplayValue('old'), {
    target: { value: 'new' },
  });
  fireEvent.click(screen.getByText('Save'));

  await waitFor(() => expect(newData).toHaveBeenCalled());
  // Let onCompleted close the modal before the test unmounts it.
  await act(() => new Promise(resolve => setTimeout(resolve, 0)));
  expect(screen.queryByRole('alert')).toBeNull();
});

it('saves the about page with links and the fields after them', async () => {
  const link = { id: 'l1', name: 'github', url: 'https://github.com/x' };
  const newData = jest.fn(() => ({
    data: {
      updateAboutPage: {
        version: 2,
        title: 't',
        bio: 'new bio',
        pictureURL: '',
        links: [link],
      },
    },
  }));
  renderEditModal(
    <AboutPageEditModal
      initialValues={{
        aboutPage: {
          version: 1,
          title: 't',
          bio: 'old bio',
          pictureURL: '',
          links: [link],
        },
      }}
    />,
    [
      {
        request: {
          query: UpdateAboutPageDocument,
          variables: {
            input: {
              title: 't',
              pictureURL: '',
              bio: 'new bio',
              links: [{ name: 'github', url: 'https://github.com/x' }],
            },
          },
        },
        newData,
      },
    ]
  );

  fireEvent.change(screen.getByDisplayValue('old bio'), {
    target: { value: 'new bio' },
  });
  // The previous test's layer can still be closing, so take the newest Save.
  const saveButtons = screen.getAllByText('Save');
  fireEvent.click(saveButtons[saveButtons.length - 1]);

  await waitFor(() => expect(newData).toHaveBeenCalled());
  // Let onCompleted close the modal before the test unmounts it.
  await act(() => new Promise(resolve => setTimeout(resolve, 0)));
  expect(screen.queryByRole('alert')).toBeNull();
});
