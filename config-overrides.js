const webpack = require('webpack');

module.exports = function override(config) {
  config.resolve.fallback = {
    stream: require.resolve('stream-browserify'),
    crypto: require.resolve('crypto-browserify'),
    buffer: require.resolve('buffer/'),
    process: require.resolve('process/browser'),
  };
  config.plugins = (config.plugins || []).concat([
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
      process: 'process/browser',
    }),
  ]);
  return config;
};