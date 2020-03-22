// environment variables
require('dotenv').config();

const fromProcessEnv = name => {
  return process.env[name];
};

const clientEnvironment = {
  FAVICON_ROOT_URL: fromProcessEnv('FAVICON_ROOT_URL'),
};

const serverSecrets = {
  DYNAMO_ACCESS_KEY_ID: fromProcessEnv('DYNAMO_ACCESS_KEY_ID'),
  DYNAMO_SECRET_ACCESS_KEY: fromProcessEnv('DYNAMO_SECRET_ACCESS_KEY'),
  DYNAMO_REGION: fromProcessEnv('DYNAMO_REGION'),
  DYNAMO_TABLE_ABOUT: fromProcessEnv('DYNAMO_TABLE_ABOUT'),
  DYNAMO_TABLE_READINGS: fromProcessEnv('DYNAMO_TABLE_READINGS'),
  DYNAMO_TABLE_USERS: fromProcessEnv('DYNAMO_TABLE_USERS'),
  DYNAMO_TABLE_PROJECTS: fromProcessEnv('DYNAMO_TABLE_PROJECTS'),
  MEDIUM_USERNAME: fromProcessEnv('MEDIUM_USERNAME'),
};

const serverEnvironment = Object.assign({}, clientEnvironment, serverSecrets);

module.exports = {
  serverEnvironment,
  serverSecrets,
  clientEnvironment,
};
