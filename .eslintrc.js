// .eslintrc.js
module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint', 'prettier'],
    extends: [
      'eslint:recommended',
      '@typescript-eslint/recommended',
      'plugin:prettier/recommended', // 启用 prettier 作为 eslint 规则
      'prettier' // 确保关闭所有可能冲突的规则
    ],
    parserOptions: {
      ecmaVersion: 2020,
      sourceType: 'module'
    },
    env: {
      browser: true,
      es2021: true,
      node: true
    },
    rules: {
      // 可根据需要自定义规则
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'prettier/prettier': 'error'
    }
  };