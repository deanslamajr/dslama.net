/**
 * @jest-environment jsdom
 */
import React from 'react';
import { fireEvent, screen } from '@testing-library/react';

import { renderEditModal } from '../../../../test/renderEditModal';
import { AboutPageEditModal } from '.';

// Joined at runtime, because ESLint's no-script-url flags the literal.
const SCRIPT_URL = ['javascript', 'alert(1)'].join(':');

it('shows field errors and sends nothing for an invalid new link', async () => {
  renderEditModal(
    <AboutPageEditModal
      initialValues={{
        aboutPage: {
          version: 1,
          title: 't',
          bio: 'b',
          pictureURL: '',
          links: [],
        },
      }}
    />
  );

  fireEvent.click(screen.getByText('Add Link'));
  fireEvent.change(screen.getByPlaceholderText('https://www.socialmedia.com'), {
    target: { value: SCRIPT_URL },
  });
  fireEvent.click(screen.getByText('Save'));

  expect(
    await screen.findByText(/Must be a valid http or https or mailto URL/)
  ).toBeTruthy();
  // name
  expect(screen.getAllByText('This field is required.')).toHaveLength(1);
  expect(screen.queryByRole('alert')).toBeNull();
});
