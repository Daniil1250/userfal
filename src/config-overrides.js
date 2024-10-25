// config-overrides.js
const { override, addWebpackAlias, addWebpackPlugin } = require('customize-cra');
const webpack = require('webpack');

module.exports = override(
  // Ваши настройки Webpack
  addWebpackPlugin(new webpack.ProvidePlugin({
    process: 'process/browser',
    Buffer: ['buffer', 'Buffer'],
  })),
  addWebpackAlias({
    // Другие алиасы, если нужно
  })
);
