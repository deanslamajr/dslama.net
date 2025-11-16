// environment variables
const dotenv = require('dotenv')
const dotenvExpand = require('dotenv-expand')

dotenvExpand.expand(dotenv.config())

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

module.exports = {
  serverEnvironment,
  serverSecrets,
  clientEnvironment,
};
