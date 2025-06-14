import { FlatCompat } from '@eslint/eslintrc';
import eslint from '@eslint/js';
import * as tsParser from '@typescript-eslint/parser';
import prettierConfig from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import markdownPlugin from 'eslint-plugin-markdown';
import nPlugin from 'eslint-plugin-n';
import prettierPlugin from 'eslint-plugin-prettier';
import promisePlugin from 'eslint-plugin-promise';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import simpleImportSortPlugin from 'eslint-plugin-simple-import-sort';
import unusedImportsPlugin from 'eslint-plugin-unused-imports';
import globals from 'globals';

const compat = new FlatCompat({
    // import.meta.dirname is available after Node.js v20.11.0
    baseDirectory: import.meta.dirname,
});

const eslintConfig = [
    eslint.configs.recommended,
    ...compat.config({
        extends: ['next', 'next/core-web-vitals', 'next/typescript', 'prettier'],
    }),
    {
        ignores: ['.next/**', '**/node_modules/**', '**/dist/**', '**/build/**', '.git/**'],
    },
    {
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
            },
            globals: {
                ...globals.browser,
            },
        },
    },
    // Markdown files
    {
        files: ['**/*.md'],
        plugins: {
            markdown: markdownPlugin,
        },
    },
    // JS/JSX configuration
    {
        files: ['**/*.js', '**/*.jsx', '**/*.mjs'],
        plugins: {
            react: reactPlugin,
            'jsx-a11y': jsxA11yPlugin,
            'react-hooks': reactHooksPlugin,
            'simple-import-sort': simpleImportSortPlugin,
            prettier: prettierPlugin,
            import: importPlugin,
            'unused-imports': unusedImportsPlugin,
            n: nPlugin,
            promise: promisePlugin,
        },
        languageOptions: {
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
            },
        },
        settings: {
            react: {
                version: 'detect',
            },
            'import/resolver': {
                typescript: {},
            },
        },
        rules: {
            ...reactHooksPlugin.configs.recommended.rules,
            ...jsxA11yPlugin.configs.recommended.rules,
            ...reactPlugin.configs.recommended.rules,
            ...prettierConfig.rules,

            'react/react-in-jsx-scope': 'off',
            'jsx-a11y/anchor-is-valid': 'off',
            'jsx-a11y/heading-has-content': 'off',
            'no-unused-vars': 'off',
            'unused-imports/no-unused-imports': 'error',
            'import/no-duplicates': 'error',
            'unused-imports/no-unused-vars': [
                'warn',
                { vars: 'all', varsIgnorePattern: '^_', args: 'after-used', argsIgnorePattern: '^_' },
            ],
            'prettier/prettier': ['error', { endOfLine: 'auto' }],
            'simple-import-sort/imports': 'error',
            'simple-import-sort/exports': 'error',
            'no-console': 'warn',
        },
    },
    // TypeScript configuration
    {
        files: ['**/*.ts', '**/*.tsx'],
        plugins: {
            react: reactPlugin,
            'jsx-a11y': jsxA11yPlugin,
            'react-hooks': reactHooksPlugin,
            'simple-import-sort': simpleImportSortPlugin,
            prettier: prettierPlugin,
            import: importPlugin,
            'unused-imports': unusedImportsPlugin,
            // '@typescript-eslint': tseslint,
        },
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
                ecmaVersion: 'latest',
                sourceType: 'module',
            },
            globals: {
                ...globals.browser,
            },
        },
        settings: {
            react: {
                version: 'detect',
            },
            'import/resolver': {
                typescript: {},
            },
        },
        rules: {
            ...reactHooksPlugin.configs.recommended.rules,
            ...jsxA11yPlugin.configs.recommended.rules,
            ...reactPlugin.configs.recommended.rules,
            ...prettierConfig.rules,

            'react/prop-types': 'off',
            'react/react-in-jsx-scope': 'off',
            'jsx-a11y/anchor-is-valid': 'off',
            'jsx-a11y/heading-has-content': 'off',
            'no-unused-vars': 'off',
            '@typescript-eslint/no-unused-vars': 'off', // We're using unused-imports instead
            'unused-imports/no-unused-imports': 'error',
            'unused-imports/no-unused-vars': [
                'warn',
                { vars: 'all', varsIgnorePattern: '^_', args: 'after-used', argsIgnorePattern: '^_' },
            ],
            '@typescript-eslint/ban-ts-comment': 'warn',
            'new-cap': ['error', { capIsNewExceptions: ['Inter'] }],
            'simple-import-sort/imports': [
                'error',
                {
                    groups: [
                        ['server-only'],
                        // Style imports
                        ['^.+\\.s?css$'],
                        // `react` first, `next` second, then packages starting with a character
                        ['^react$', '^next', '^[a-z]'],
                        // Packages starting with `@`
                        ['^@'],
                        // Packages starting with `~`
                        ['^~'],
                        // Imports starting with `../`
                        ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
                        // Imports starting with `./`
                        ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
                        // Side effect imports
                        ['^\\u0000'],
                    ],
                },
            ],
            'simple-import-sort/exports': 'error',
            'prettier/prettier': ['error', { endOfLine: 'auto' }],
            'no-console': 'warn',
        },
    },
];

export default eslintConfig;
