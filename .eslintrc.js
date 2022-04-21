module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  globals: {
    config: true
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx']
      }
    }
  },
  extends: [
    'plugin:vue/vue3-essential',
    'plugin:import/recommended',
    'airbnb-base',
    'plugin:prettier/recommended'
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['vue'],
  rules: {
    'no-console': 'off',
    'no-restricted-syntax': 'off',
    'vue/multi-word-component-names': 'off', // 组件名为multi-word,关闭
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never'
      }
    ]
  }
}
