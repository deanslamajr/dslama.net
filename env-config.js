// environment variables
require('dotenv').config();

const fromProcessEnv = name => {
  return process.env[name];
};

const clientEnvironment = {
  FAVICON_ROOT_URL: fromProcessEnv('FAVICON_ROOT_URL'),
};

const serverSecrets = {
  NODE_ENV: fromProcessEnv('NODE_ENV'),
  SESSION_COOKIE_SECRET: fromProcessEnv('SESSION_COOKIE_SECRET'),
};

const serverEnvironment = Object.assign({}, clientEnvironment, serverSecrets);

module.exports = {
  serverEnvironment,
  serverSecrets,
  clientEnvironment,
};
