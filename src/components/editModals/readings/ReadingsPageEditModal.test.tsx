/**
 * @jest-environment jsdom
 */
import React from 'react';
import { fireEvent, screen } from '@testing-library/react';

import { renderEditModal } from '../../../../test/renderEditModal';
import { ReadingsPageEditModal } from '.';

it('shows field errors and sends nothing for an invalid new reading', async () => {
  renderEditModal(
    <ReadingsPageEditModal initialValues={{ summary: 's', readings: [] }} />
  );

  fireEvent.click(screen.getByText('Add Reading'));
  fireEvent.change(screen.getByPlaceholderText('https://www.blogsRus.com'), {
    target: { value: 'www.blogsRus.com' },
  });
  fireEvent.click(screen.getByText('Save'));

  expect(
    await screen.findByText(/Must be a valid http or https URL/)
  ).toBeTruthy();
  // title, author, quote, and publication
  expect(screen.getAllByText('This field is required.')).toHaveLength(4);
  expect(screen.queryByRole('alert')).toBeNull();
});
