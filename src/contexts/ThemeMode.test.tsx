/**
 * @jest-environment jsdom
 */
import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import { ThemeModeProvider, useThemeMode } from './ThemeMode';
import defaultTheme from '../defaultTheme';

const Probe = () => {
  const { mode, toggle } = useThemeMode();
  return (
    <button type="button" onClick={toggle}>
      {mode}
    </button>
  );
};

const renderProbe = () =>
  render(
    <ThemeModeProvider theme={defaultTheme}>
      <Probe />
    </ThemeModeProvider>
  );

const mockSystemDark = (matches: boolean) => {
  window.matchMedia = jest.fn().mockReturnValue({
    matches,
    addListener: jest.fn(),
    removeListener: jest.fn(),
  });
};

beforeEach(() => {
  window.localStorage.clear();
  mockSystemDark(false);
});

it('follows the system setting when there is no stored choice', () => {
  mockSystemDark(true);
  renderProbe();
  expect(screen.getByRole('button').textContent).toBe('dark');
});

it('stores the toggled mode and prefers it over the system setting', () => {
  mockSystemDark(true);
  renderProbe();
  fireEvent.click(screen.getByRole('button'));

  expect(screen.getByRole('button').textContent).toBe('light');
  expect(window.localStorage.getItem('themeMode')).toBe('light');
});

it('uses a stored choice on the next visit', () => {
  window.localStorage.setItem('themeMode', 'dark');
  renderProbe();
  expect(screen.getByRole('button').textContent).toBe('dark');
});

it('still toggles when storage throws', () => {
  const setItem = jest
    .spyOn(Storage.prototype, 'setItem')
    .mockImplementation(() => {
      throw new Error('blocked');
    });
  renderProbe();
  fireEvent.click(screen.getByRole('button'));

  expect(screen.getByRole('button').textContent).toBe('dark');
  setItem.mockRestore();
});
