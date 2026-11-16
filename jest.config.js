// Unit and component tests. Integration tests need Postgres: see jest.integration.config.js.
module.exports = {
  testEnvironment: 'node',
  setupFiles: ['<rootDir>/test/setupRuntimeConfig.js'],
  transform: {
    '^.+\\.[jt]sx?$': [
      'ts-jest',
      {
        // isolatedModules makes ts-jest transpile only.
        // `npm run typecheck` checks the types.
        tsconfig: {
          jsx: 'react',
          module: 'commonjs',
          allowJs: true,
          isolatedModules: true,
        },
      },
    ],
    '^.+\\.graphql$': '<rootDir>/test/graphqlTransform.js',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json', 'graphql'],
  testMatch: ['<rootDir>/src/**/*.test.ts?(x)'],
  testPathIgnorePatterns: ['/node_modules/', '\\.integration\\.test\\.'],
};
