module.exports = {
  root: true,
  extends: '@react-native',
  parser: 'babel-eslint',

  env: {
    es6: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['react', 'react-native'],
  rules: {
    // Add custom rules here
  },
};
