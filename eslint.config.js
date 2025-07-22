import eslint from '@eslint/js';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import astro from 'eslint-plugin-astro';
import astroEslintParser from 'astro-eslint-parser';
import perfectionist from 'eslint-plugin-perfectionist';
import regexp from 'eslint-plugin-regexp';
import markdown from 'eslint-plugin-markdown';
import globals from 'globals';

export default [
  // Ignore patterns
  {
    ignores: [
      'node_modules/**',
      'dist/**',
      '.astro/**',  // Auto-generated Astro files
      'public/**/*.md',  // Markdown with code blocks
      'src/pages/og-image/**',  // Image generation files with JSX syntax
    ],
  },

  // Pure JavaScript files - ONLY basic ESLint rules
  {
    files: ['**/*.{js,mjs,cjs}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.node,
        ...globals.browser,
      },
    },
    rules: {
      ...eslint.configs.recommended.rules,
      'no-unused-vars': 'warn',
      'prefer-const': 'warn',
    },
  },

  // TypeScript files - TypeScript ESLint rules
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        project: './tsconfig.json',
      },
      globals: {
        ...globals.node,
        ...globals.browser,
      },
    },
    plugins: {
      '@typescript-eslint': typescriptEslint,
      perfectionist,
      regexp,
    },
    rules: {
      ...eslint.configs.recommended.rules,
      ...typescriptEslint.configs.recommended.rules,
      ...typescriptEslint.configs.strict.rules,
      ...typescriptEslint.configs.stylistic.rules,
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { ignoreRestSiblings: true, varsIgnorePattern: 'Props' },
      ],
      // Relax some overly strict rules
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/array-type': 'off',
      '@typescript-eslint/consistent-type-definitions': 'off',
      '@typescript-eslint/no-empty-object-type': 'warn',
    },
  },

  // Astro files
  {
    files: ['**/*.astro'],
    languageOptions: {
      parser: astroEslintParser,
      parserOptions: {
        parser: typescriptParser,
        extraFileExtensions: ['.astro'],
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      '@typescript-eslint': typescriptEslint,
      astro,
    },
    rules: {
      ...astro.configs.recommended.rules,
      ...astro.configs['jsx-a11y-recommended'].rules,
      'astro/jsx-a11y/no-redundant-roles': [
        'error',
        {
          ol: ['list'],
          ul: ['list'],
        },
      ],
      'no-unused-vars': 'off',
      'no-undef': 'off',
    },
  },

  // TypeScript declaration files
  {
    files: ['**/*.d.ts'],
    languageOptions: {
      parser: typescriptParser,
    },
    plugins: {
      '@typescript-eslint': typescriptEslint,
    },
    rules: {
      '@typescript-eslint/no-extraneous-class': 'off',
      '@typescript-eslint/triple-slash-reference': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
    },
  },

  // Remark/utility files with relaxed rules
  {
    files: ['**/remark-*.ts', '**/utils/*.ts'],
    languageOptions: {
      parser: typescriptParser,
    },
    plugins: {
      '@typescript-eslint': typescriptEslint,
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },

  // Markdown files
  {
    files: ['**/*.md'],
    plugins: {
      markdown,
    },
    processor: 'markdown/markdown',
    rules: {
      ...markdown.configs.recommended.rules,
    },
  },
];
