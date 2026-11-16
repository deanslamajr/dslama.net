module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
    ecmaFeatures: { jsx: true },
  },
  env: { browser: true, node: true, es2022: true, jest: true },
  settings: { react: { version: 'detect' } },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:prettier/recommended',
  ],
  rules: {
    // Pages use the automatic JSX runtime. Tests compile JSX with ts-jest's
    // classic runtime, so their React imports stay and count as used.
    'react/react-in-jsx-scope': 'off',
    // TypeScript checks props.
    'react/prop-types': 'off',
    // Same options as the earlier react-app config: resolver arguments,
    // rest siblings, and caught errors may go unused.
    '@typescript-eslint/no-unused-vars': [
      'error',
      { args: 'none', ignoreRestSiblings: true, caughtErrors: 'none' },
    ],
    // Same level as before the ESLint 8 upgrade.
    '@typescript-eslint/no-explicit-any': 'warn',
    // next/link passes href to its <a> child, so only check hrefs that are written.
    'jsx-a11y/anchor-is-valid': [
      'error',
      { components: ['Link'], aspects: ['invalidHref', 'preferButton'] },
    ],
  },
};
