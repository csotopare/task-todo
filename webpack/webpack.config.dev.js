const Path = require("path");
const Webpack = require("webpack");
const { merge } = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const common = require("./webpack.common.js");

module.exports = merge(common, {
	mode: "development",
	devtool: "cheap-eval-source-map",
	output: {
		chunkFilename: "js/[name].chunk.js",
	},
	devServer: {
		inline: true,
		hot: true,
	},
	plugins: [
		new Webpack.DefinePlugin({
			"process.env.NODE_ENV": JSON.stringify("development"),
		}),
		new MiniCssExtractPlugin({
			filename: "bundle.css",
		}),
	],
	module: {
		rules: [
			{
				test: /\.js$/,
				include: Path.resolve(__dirname, "../src"),
				enforce: "pre",
				loader: "eslint-loader",
				options: {
					emitWarning: true,
				},
			},
			{
				test: /\.html$/i,
				loader: "html-loader",
			},
			{
				test: /\.js$/,
				include: Path.resolve(__dirname, "../src"),
				loader: "babel-loader",
			},
			{
				test: /\.s?css/i,
				use: [MiniCssExtractPlugin.loader, "css-loader?sourceMap=true"], //"scss-loader", "postcss-loader"
			},
			{
				test: /\.css$/, // /\.s?css$/i,
				exclude: /.s?css$/,
				use: ["style-loader", "css-loader?sourceMap=true"], //"scss-loader",  "postcss-loader"
			},
		],
	},
});
