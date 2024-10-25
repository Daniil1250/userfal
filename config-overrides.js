// config-overrides.js
const webpack = require('webpack');

module.exports = {
  // Ваши настройки Webpack
  webpack: function (config, env) {
    config.plugins.push(
      new webpack.ProvidePlugin({
        process: 'process/browser',
        Buffer: ['buffer', 'Buffer'],
      })
    );
    return config;
  },
};
