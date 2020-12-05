const Webpack = require('webpack');
const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const common = require('./webpack.common.js');

module.exports = merge(common, {
	mode: 'production',
	// devtool: "source-map",
	stats: 'errors-only',
	bail: true,
	output: {
		filename: 'main.[chunkhash:10].js',
		chunkFilename: 'main.[chunkhash:10].chunk.js',
	},
	plugins: [
		new Webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('production'),
		}),
		new MiniCssExtractPlugin({
			filename: 'main.[chunkhash:8].css',
			chunkFilename: 'main.[chunkhash:8].chunk.css',
			ignoreOrder: false,
		}),
	],
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: 'babel-loader',
			},
			{
				test: /\.s?css/i,
				use: [MiniCssExtractPlugin.loader, 'css-loader?sourceMap=true'], //"scss-loader",  "postcss-loader"
			},
		],
	},
});
