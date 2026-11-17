// Server settings come from process.env: DB_USER, DB_PASS, DB_HOST, DB_NAME,
// SESSION_COOKIE_SECRET, and NODE_ENV. In production the pod sets them.
// Locally, this file loads .env for server.js. next dev and next build load
// .env themselves. Add a new variable to .env.example.
require('dotenv').config();

const MIN_SESSION_SECRET_LENGTH = 32;
const PLACEHOLDER_SESSION_SECRET = 'CHANGE_ME_32_RANDOM_BYTES';

const assertSessionSecret = secret => {
  if (
    !secret ||
    secret.length < MIN_SESSION_SECRET_LENGTH ||
    secret === PLACEHOLDER_SESSION_SECRET
  ) {
    throw new Error(
      `SESSION_COOKIE_SECRET must be at least ${MIN_SESSION_SECRET_LENGTH} characters and must not be the example value. Generate one with: openssl rand -base64 32`
    );
  }
};

module.exports = { assertSessionSecret };
