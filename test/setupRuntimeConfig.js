// Tests spy on the logger. Real log lines would only add noise.
process.env.LOG_LEVEL = 'silent';

// The server reads its settings from process.env. Tests set them here instead
// of reading .env. Jest sets NODE_ENV to 'test'.
const { parts } = require('./database');

Object.assign(process.env, parts, {
  SESSION_COOKIE_SECRET: 'test-only-session-secret-with-32-characters',
});

// Some components use JSX without importing React, which Next's Babel allows.
global.React = require('react');
