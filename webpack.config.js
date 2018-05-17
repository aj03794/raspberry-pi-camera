const path = require('path')
const webpack = require('webpack')
// const nodeExternals = require('webpack-node-externals');
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
	entry: './src/index',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js',
	},
	plugins: [
		new CleanWebpackPlugin(['./dist'])
	],
	module: {
		'rules': [
			{
				'loader': 'babel-loader',
				'test': /\.js$/,
				'exclude': /node_modules/,
				'options': {
					'plugins': [
						require('babel-plugin-syntax-dynamic-import'),
						require('babel-plugin-transform-async-to-generator'),
						require('babel-plugin-transform-object-rest-spread')
					],
					'presets': [
						'env'
					],
					babelrc: false,
					compact: false
				}
			}
		]
	},
	target: 'node',
	// externals: [nodeExternals()]
}
