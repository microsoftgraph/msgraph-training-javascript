// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import globals from 'globals';
import js from '@eslint/js';
import eslintPluginPrettier from 'eslint-plugin-prettier';
import eslintPrettierRecommended from 'eslint-plugin-prettier/recommended';
import header from 'eslint-plugin-header';
header.rules.header.meta.schema = false;

export default [
  js.configs.recommended,
  eslintPrettierRecommended,
  {
    languageOptions: {
      globals: {
        ...globals.commonjs,
        ...globals.node,
      },

      ecmaVersion: 'latest',
      sourceType: 'module',
    },

    plugins: {
      header,
      eslintPluginPrettier,
    },

    rules: {
      'header/header': [
        'error',
        'line',
        [
          ' Copyright (c) Microsoft Corporation.',
          ' Licensed under the MIT license.',
        ],
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
  },
];
