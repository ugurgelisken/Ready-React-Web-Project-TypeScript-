module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  settings: {
    react: {
      version: '999.999.999',
    },
  },
  extends: ['plugin:react/recommended', 'standard'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react/jsx-quotes': 0,
    'jsx-quotes': [2, 'prefer-single'],
    'space-before-function-paren': [0],
    semi: [1, 'always'],
    'comma-dangle': 'off',
  },
};
