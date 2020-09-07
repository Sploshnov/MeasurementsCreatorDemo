const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
	mode: 'development',
	devtool: 'inline-source-map',
	// Enables dev server to be accessed by computers in local network
	devServer: {
		host: "127.0.0.1",
		port: 8000,
		publicPath: "/",
		contentBase: "./web",
		hot: true,
		disableHostCheck: true
	},
});