const eslintrc = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    'standard-with-typescript',
    'plugin:react/recommended',
    'plugin:prettier/recommended'
  ],
  globals: {
    JSX: 'readonly'
  },
  parserOptions: {
    ecmaVersion: 'latest',
    project: 'tsconfig.json',
    sourceType: 'module'
  },
  plugins: ['react', 'import', 'sort-keys-fix'],
  root: true,
  rules: {
    'arrow-parens': 'warn',
    'import/order': [
      'warn',
      {
        alphabetize: {
          caseInsensitive: true,
          order: 'asc'
        },
        groups: [
          ['external', 'builtin'],
          'internal',
          ['sibling', 'parent'],
          'index'
        ],
        'newlines-between': 'always',
        pathGroups: [
          {
            group: 'external',
            pattern: '@(react|react-native)',
            position: 'before'
          },
          {
            group: 'internal',
            pattern: '@src/**'
          }
        ],
        pathGroupsExcludedImportTypes: ['internal', 'react']
      }
    ],
    'multiline-ternary': ['error', 'never'],
    'no-alert': 'error',
    'no-console': 'warn',
    'no-unused-vars': [
      'warn',
      { args: 'after-used', ignoreRestSiblings: false, vars: 'all' }
    ],
    quotes: ['warn', 'single'],
    'react/display-name': 'off',
    'react/jsx-sort-props': 1,
    semi: ['warn', 'always'],
    'sort-imports': ['warn', { ignoreCase: true, ignoreDeclarationSort: true }],
    'sort-keys': [
      'warn',
      'asc',
      {
        allowLineSeparatedGroups: false,
        caseSensitive: true,
        minKeys: 2,
        natural: true
      }
    ],
    'sort-keys-fix/sort-keys-fix': 'warn'
  },
  settings: {
    react: {
      version: 'detect'
    }
  }
};

module.exports = eslintrc;
