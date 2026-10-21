/* eslint-disable @typescript-eslint/no-var-requires */
const { PHASE_PRODUCTION_SERVER } = require('next/constants');
const {
  clientEnvironment,
  serverEnvironment,
  assertSessionSecret,
} = require('./env-config');

module.exports = phase => {
  // `next start` loads this file in the production server phase.
  // `next build` uses a different phase, so the image build does not need the secret.
  if (phase === PHASE_PRODUCTION_SERVER) {
    assertSessionSecret(serverEnvironment.SESSION_COOKIE_SECRET);
  }

  return {
    webpack(config) {
      config.module.rules.push({
        test: /\.graphql$/,
        exclude: /node_modules/,
        use: [{ loader: 'graphql-tag/loader' }],
      });
      return config;
    },
    // Only available on the server side
    serverRuntimeConfig: serverEnvironment,
    // Available on both server and client
    publicRuntimeConfig: clientEnvironment,
  };
};
