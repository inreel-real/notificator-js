'use strict';

module.exports = {
  mode: process.env.MODE || 'production',
  optimization: {
    minimize: !(process.env.MINIMIZE === 'false')
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.webpack.js', '.web.js', '.ts', '.js'],
    modules: ['src', 'node_modules']
  },
  module: {
    rules: [
      { test: /\.ts$/, loader: 'ts-loader' },
      {
        test: /\.js$/,
        enforce: 'pre',
        use: ['source-map-loader']
      }
    ]
  },
};
