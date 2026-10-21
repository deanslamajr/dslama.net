// environment variables
const dotenv = require('dotenv').config()
// const dotenvExpand = require('dotenv-expand')

// dotenvExpand.expand(dotenv.config())

const fromProcessEnv = name => {
  return process.env[name];
};

const clientEnvironment = {
  FAVICON_ROOT_URL: fromProcessEnv('FAVICON_ROOT_URL'),
};

const serverSecrets = {
  NODE_ENV: fromProcessEnv('NODE_ENV'),
  SESSION_COOKIE_SECRET: fromProcessEnv('SESSION_COOKIE_SECRET'),
  DB_USER: fromProcessEnv('DB_USER'),
  DB_PASS: fromProcessEnv('DB_PASS'),
  DB_HOST: fromProcessEnv('DB_HOST'),
  DB_NAME: fromProcessEnv('DB_NAME'),
};

const serverEnvironment = Object.assign({}, clientEnvironment, serverSecrets);

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

module.exports = {
  serverEnvironment,
  serverSecrets,
  clientEnvironment,
  assertSessionSecret,
};
