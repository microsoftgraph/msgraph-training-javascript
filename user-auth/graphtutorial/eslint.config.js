// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// cSpell:ignore ganchev

import { defineConfig } from 'eslint/config';

import eslintPrettierRecommended from 'eslint-plugin-prettier/recommended';
import header from '@tony.ganchev/eslint-plugin-header';

export default defineConfig(eslintPrettierRecommended, {
  files: ['**/**.js'],

  languageOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },

  plugins: {
    header,
  },

  rules: {
    'header/header': [
      'error',
      'line',
      [
        ' Copyright (c) Microsoft Corporation.',
        ' Licensed under the MIT license.',
      ],
      2,
    ],
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        endOfLine: 'auto',
        printWidth: 80,
      },
    ],
  },
});
