require("@rushstack/eslint-patch/modern-module-resolution")

module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-essential',
    '@vue/eslint-config-typescript',
    'plugin:vue/vue3-recommended'
  ],
  rules: {
    'no-multiple-empty-lines': "error",
    'object-curly-spacing': ["error", "always"],
    "indent": ["error", "tab"],
    'no-trailing-spaces': "error",
    semi: ["error", "never"],
    'space-before-function-paren': 'off',
    '@typescript-eslint/explicit-function-return-type': ['warn'],
    quotes: ["error", "single"]
  }
}
