// Next fills next/config at startup. Tests fill it here instead of reading .env.
const { parts } = require('./database');

require('next/config').setConfig({
  publicRuntimeConfig: {},
  serverRuntimeConfig: {
    ...parts,
    SESSION_COOKIE_SECRET: 'test-only-session-secret-with-32-characters',
    NODE_ENV: 'test',
  },
});

// Some components use JSX without importing React, which Next's Babel allows.
global.React = require('react');
