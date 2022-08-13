const config = require('./config.web');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

const port = parseInt(process.env.PORT) || 5555;

config.entry.app = [
  `webpack-dev-server/client?http://localhost:${port}/`,
  'webpack/hot/dev-server',
];

const compiler = webpack(config);
const server = new WebpackDevServer(compiler, { hot: true });

server.listen(port);
