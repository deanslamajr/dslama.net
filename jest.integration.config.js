// Resolver tests against a real Postgres. See test/database.js for the target database.
const base = require('./jest.config');

module.exports = {
  ...base,
  globalSetup: '<rootDir>/test/integrationGlobalSetup.js',
  testMatch: ['<rootDir>/src/**/*.integration.test.ts'],
  testPathIgnorePatterns: ['/node_modules/'],
};
