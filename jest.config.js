// Unit and component tests. Integration tests need Postgres: see jest.integration.config.js.
module.exports = {
  testEnvironment: 'node',
  setupFiles: ['<rootDir>/test/setupRuntimeConfig.js'],
  transform: {
    '^.+\\.[jt]sx?$': 'ts-jest',
    '^.+\\.graphql$': '<rootDir>/test/graphqlTransform.js',
  },
  globals: {
    'ts-jest': {
      // Transpile only. `npm run typecheck` checks the types.
      isolatedModules: true,
      tsconfig: { jsx: 'react', module: 'commonjs', allowJs: true },
    },
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json', 'graphql'],
  testMatch: ['<rootDir>/src/**/*.test.ts?(x)'],
  testPathIgnorePatterns: ['/node_modules/', '\\.integration\\.test\\.'],
};
