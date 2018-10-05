const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')

module.exports = {
  entry: ['@babel/polyfill', './src/index.js'],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 1,
    }),
    new CopyWebpackPlugin([
        {
            context: path.resolve(__dirname, 'src', 'infrastructure', 'settings'),
            from: 'settings.json',
            to: path.resolve('dist')
        }
    ])
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  target: 'node',
	node: {
		__dirname: false,
		__filename: false
  },
  // externals: [nodeExternals()]
  externals: {
    pubsub: "@google-cloud"
  }
};