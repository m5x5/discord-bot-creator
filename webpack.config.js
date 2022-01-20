const path = require('path');
const webpack = require('webpack');

const cwd = process.cwd();
const externals = require(path.join(cwd, 'package.json')).dependencies;

const config = {
  target: 'electron-main',
  entry: './main/background.ts',
  node: {
    __dirname: false,
    __filename: false,
  },
  externals: [...Object.keys(externals || {})],
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
    modules: [path.join(cwd, 'app'), 'node_modules'],
  },
  output: {
    path: path.join(cwd, 'app'),
    filename: 'background.js',
    libraryTarget: 'commonjs2',
  },
  module: {
    rules: [
      {
        test: /\.(js|ts)x?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
            },
          },
          {
            loader: 'ts-loader',
          },
        ],
        exclude: [/node_modules/, path.join(cwd, 'renderer')],
      },
    ],
  },
};

module.exports = (env) => {
  const NODE_ENV = env.production ? 'production' : 'development';

  if (NODE_ENV === 'production') {
    require('dotenv').config({ path: '.env.production' });
  } else {
    require('dotenv').config({ path: '.env.development' });
  }

  config.mode = NODE_ENV;
  config.plugins = [new webpack.EnvironmentPlugin({ NODE_ENV })];

  return config;
};
