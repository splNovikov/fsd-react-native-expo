module.exports = {
  root: true,
  extends: ['universe/native', '@feature-sliced'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        'import/no-internal-modules': [
          'warn',
          {
            allow: [
              '**/ui/*',
              'pages/*',
              'processes/*',
              'widgets/*',
              'features/*',
              'entities/*',
              'shared/*',
            ],
          },
        ],
      },
    },
  ],
};
