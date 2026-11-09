/**
 * @jest-environment jsdom
 */
import React from 'react';
import { fireEvent, screen } from '@testing-library/react';

import { renderEditModal } from '../../../../test/renderEditModal';
import { ProjectsPageEditModal } from '.';

it('shows field errors and sends nothing for an invalid new project', async () => {
  renderEditModal(
    <ProjectsPageEditModal initialValues={{ summary: 's', projects: [] }} />
  );

  fireEvent.click(screen.getByText('Add Project'));
  fireEvent.change(screen.getByPlaceholderText('https://someApp.dslama.net'), {
    target: { value: 'ftp://someApp.dslama.net' },
  });
  fireEvent.click(screen.getByText('Save'));

  expect(
    await screen.findByText(/Must be a valid http or https URL/)
  ).toBeTruthy();
  // name, description, and summary. sourceUrl is optional.
  expect(screen.getAllByText('This field is required.')).toHaveLength(3);
  expect(screen.queryByRole('alert')).toBeNull();
});
