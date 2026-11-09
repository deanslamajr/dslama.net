/**
 * @jest-environment jsdom
 */
import React from 'react';
import { fireEvent, screen } from '@testing-library/react';

import { renderEditModal } from '../../../../test/renderEditModal';
import { PostsPageEditModal } from '.';

it('shows field errors and sends nothing for an invalid new post', async () => {
  renderEditModal(
    <PostsPageEditModal initialValues={{ summary: 's', posts: [] }} />
  );

  fireEvent.click(screen.getByText('Add Post'));
  fireEvent.change(screen.getByPlaceholderText('https://www.deansblog.com'), {
    target: { value: 'not a url' },
  });
  fireEvent.click(screen.getByText('Save'));

  expect(
    await screen.findByText(/Must be a valid http or https URL/)
  ).toBeTruthy();
  // title and snippet
  expect(screen.getAllByText('This field is required.')).toHaveLength(2);
  expect(screen.queryByRole('alert')).toBeNull();
});
