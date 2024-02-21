module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:tailwindcss/recommended',
    'prettier',
  ],
  ignorePatterns: [
    'dist',
    '.eslintrc.cjs',
    'node_modules',
    '*.config.ts',
    '*.config.js',
    'generated',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    project: true,
    tsconfigRootDir: __dirname,
    warnOnUnsupportedTypeScriptVersion: false,
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: [
    'react-refresh',
    'simple-import-sort',
    'react',
    'typescript-sort-keys',
    'sort-destructure-keys',
    'react-hooks',
    'prettier',
  ],
  settings: {
    react: {
      pragma: 'React',
      version: '18.0',
    },
  },
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'no-dupe-args': 'error',
    'no-dupe-else-if': 'error',
    'no-dupe-keys': 'error',

    //Typescript
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/no-unnecessary-condition': 'error',
    '@typescript-eslint/sort-type-constituents': 'error',
    '@typescript-eslint/sort-type-constituents': 'error',

    //Simple-import-sort
    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          // Packages `react` related packages come first.
          ['^react', '^@?w'],
          // Internal packages.
          ['^(@|src)(/.*|$)'],
          // Side effect imports.
          ['^u0000'],
          // Parent imports. Put `..` last.
          ['^..(?!/?$)', '^../?$'],
          // Other relative imports. Put same-folder imports and `.` last.
          ['^./(?=.*/)(?!/?$)', '^.(?!/?$)', '^./?$'],
          // Style imports.
          ['^.+.?(css)$'],
        ],
      },
    ],
    'simple-import-sort/exports': 'error',

    //Format
    'prettier/prettier': 'error',
    'typescript-sort-keys/interface': 'error',
    'typescript-sort-keys/string-enum': 'error',
    'sort-destructure-keys/sort-destructure-keys': 'error',

    //React
    'react/react-in-jsx-scope': 'off',
    'react/boolean-prop-naming': 'error',
    'react/hook-use-state': 'error',
    'react/jsx-sort-props': 'error',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'error',
    'tailwindcss/no-custom-classname': 'off',
  },
}
