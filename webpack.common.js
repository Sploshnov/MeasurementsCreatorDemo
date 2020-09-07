const path = require("path");
const webpack = require("webpack");

module.exports = {
	entry:{
		main: "./src/index.ts",
	},

	// Outputs compiled bundle to `./web/js/main.js`
	output:{
		path: __dirname + "/web/",
		filename: "js/[name].js",
		library: 'Bundle'
	},

	module:{
		// Test file extension to run loader
		rules: [
			{
				test: /\.(glsl|vs|fs)$/, 
				loader: "ts-shader-loader"
			},
			{
				test: /\.tsx?$/, 
				exclude: [/node_modules/, /tsOld/],
				loader: "ts-loader"
			},
			{
				test: /\.*BluetoothSpeaker.jpg$/,
				loader: 'file-loader?name=/cad/[name].[ext]',
			},
			{
				test: /\.(png|jpe?g|gif)$/i,
				exclude: /\.*BluetoothSpeaker.jpg$/,
				loader: 'file-loader?name=/images/[name].[ext]',
			},
			{
				test: /\.(obj|mtl)$/i,
				loader: 'file-loader?name=/cad/[name].[ext]',
			}
		]
	},

	resolve: {
		extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js"],
		modules: ['node_modules'],
		alias: {
			"three-examples": path.resolve(__dirname, "./node_modules/three/examples/jsm/"),
		},
	},

	plugins:[
		new webpack.ProvidePlugin({
			'THREE': 'three'
        })
	],
}