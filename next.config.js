/* eslint-disable @typescript-eslint/no-var-requires */
const {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_SERVER,
} = require('next/constants');
const {
  clientEnvironment,
  serverEnvironment,
  assertSessionSecret,
} = require('./env-config');

// The pages are static, so a per-request nonce cannot work. Inline scripts are
// allowed by hash instead. Add 'sha256-...' entries here when a page needs one;
// `npm run check:csp` prints the hash of every inline script that is not listed.
// Next puts page data in a type="application/json" script, which never runs.
const SCRIPT_HASHES = [];

const CONTENT_SECURITY_POLICY = [
  "default-src 'self'",
  ["script-src 'self'", ...SCRIPT_HASHES].join(' '),
  // styled-components and Grommet write <style> elements and style attributes.
  "style-src 'self' 'unsafe-inline'",
  // The about picture and Markdown images can come from any https host.
  "img-src 'self' https: data:",
  "font-src 'self'",
  "connect-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
].join('; ');

module.exports = phase => {
  // `next start` loads this file in the production server phase.
  // `next build` uses a different phase, so the image build does not need the secret.
  if (phase === PHASE_PRODUCTION_SERVER) {
    assertSessionSecret(serverEnvironment.SESSION_COOKIE_SECRET);
  }

  return {
    poweredByHeader: false,
    async headers() {
      return [
        {
          source: '/(.*)',
          headers: [
            { key: 'Strict-Transport-Security', value: 'max-age=31536000' },
            { key: 'X-Frame-Options', value: 'DENY' },
            { key: 'X-Content-Type-Options', value: 'nosniff' },
            {
              key: 'Referrer-Policy',
              value: 'strict-origin-when-cross-origin',
            },
            // The dev server uses eval and inline scripts, so it gets no policy.
            ...(phase === PHASE_DEVELOPMENT_SERVER
              ? []
              : [
                  {
                    key: 'Content-Security-Policy-Report-Only',
                    value: CONTENT_SECURITY_POLICY,
                  },
                ]),
          ],
        },
      ];
    },
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
