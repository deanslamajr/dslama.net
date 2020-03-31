import { DefaultTheme } from 'styled-components';

export const theme: DefaultTheme = {
  fonts:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'",
  colors: {
    text: 'white',
    background: '#e7eeed',
    red: '#b21a27',
  },
  zIndex: {
    highest: 999,
    middle: 0,
    lowest: -999,
  },
};
