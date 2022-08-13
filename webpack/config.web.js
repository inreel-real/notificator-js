const path = require('path');
const { merge } = require('webpack-merge');
const configShared = require('./config.shared');

const filename = configShared.optimization.minimize
  ? 'notificator.min.js'
  : 'notificator.js';

const entry = './src/notificator.ts';

module.exports = merge({}, configShared, {
  entry: {
    notificator: entry,
  },
  output: {
    filename: filename,
    library: 'Notificator',
    path: path.join(__dirname, '../dist'),
    libraryTarget: 'umd',
    globalObject: 'this',
  }
});
