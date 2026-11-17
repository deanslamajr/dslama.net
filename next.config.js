/* eslint-disable @typescript-eslint/no-var-requires */
const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

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

// server.js does not load this file. It uses the copy that next build writes
// to .next/required-server-files.json, and it checks the session secret.
module.exports = phase => {
  return {
    poweredByHeader: false,
    // The image copies .next/standalone, which holds only the files the server
    // loads, instead of all production dependencies. The image replaces the
    // generated server.js with ours, which loads env-config.js and dotenv.
    output: 'standalone',
    outputFileTracingIncludes: {
      '/*': ['./node_modules/dotenv/**'],
    },
    // Next's own server traces these for image optimization and TypeScript
    // config files, which this app does not use. The key '*' also matches
    // 'next-server'.
    outputFileTracingExcludes: {
      '*': [
        '**/node_modules/@img/**/*',
        '**/node_modules/sharp/**/*',
        '**/node_modules/typescript/**/*',
      ],
    },
    // SSR class names and display names, which babel-plugin-styled-components added before.
    compiler: { styledComponents: true },
    // Load packages on the server through require, not import(). With import(),
    // a module that uses an ES module package (like @graphql-tools/schema)
    // turns async, and the require of the schema in useApollo.ts gets undefined.
    // It also keeps one copy of graphql in the process instead of two.
    experimental: { esmExternals: false },
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
                    key: 'Content-Security-Policy',
                    value: CONTENT_SECURITY_POLICY,
                  },
                ]),
          ],
        },
      ];
    },
    // next dev and next build use Turbopack by default. The scripts pass
    // --webpack, because Turbopack ignores this function and esmExternals.
    webpack(config) {
      config.module.rules.push({
        test: /\.graphql$/,
        exclude: /node_modules/,
        use: [{ loader: 'graphql-tag/loader' }],
      });
      return config;
    },
  };
};
