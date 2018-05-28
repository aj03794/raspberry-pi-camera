const path = require('path')
const webpack = require('webpack')
// const nodeExternals = require('webpack-node-externals');
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
	entry: './src/index',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js',
	},
	resolve: {
		alias: {
			'hiredis': path.join(__dirname, 'aliases/hiredis.js')
		}
	},
	plugins: [
		new CleanWebpackPlugin(['./dist']),
		new CopyWebpackPlugin([path.resolve(__dirname, 'src', 'settings', 'settings.json')])
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
	node: {
		__dirname: false,
		__filename: false
	}
}
