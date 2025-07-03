import js from '@eslint/js';
import globals from 'globals';
import daStyle from 'eslint-config-dicodingacademy'; // this is custom eslint config

export default [
  daStyle, // you can use standard, google, or rnb version
  js.configs.recommended,
  {
    files: ['**/*.js'],
    languageOptions: {
      sourceType: 'commonjs',
    },
  },
  {
    files: ['**/*.{js,mjs,cjs}'],
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
  },
];