var webpack = require('webpack');
var path = require('path');
var hotMiddlewareScript = 'webpack-hot-middleware/client?reload=true';
//分离第三方
var node_modules = path.resolve(__dirname, 'node_modules');

// ---开发环境还是生产环境
console.log(process.env.NODE_ENV);
var debug = process.env.NODE_ENV !== 'production';
console.log(debug);

module.exports = {
	devtool: 'source-map',
	entry: {
		app: [path.resolve(__dirname, 'app/index.js'), hotMiddlewareScript],
		vendors: ['react', hotMiddlewareScript]
	},
	output: {
		path: path.resolve(__dirname, debug? 'build': 'public'),
		filename: debug? '[name].js': 'js/[chunkhash:8].name.min.js',
		chunkfilename: debug? '[chunkhash:8].chunk.js': 'js/[chunkhash:8].name.min.js',
		publicPath: debug? '/build': ''
	},
	resolve: {
		root: [process.cwd() + '/app', process.cwd() + '/node_modules'],
		alias: {},
		extensions: ['', '.js', '.css', '.scss', '.less', 'ejs', '.png', '.jpg']
	},
	module: {
		loaders: [
			{
				test: /\.jsx?$/, // 用正则来匹配文件路径，这段意思是匹配 js 或者 jsx
				exclude: /(node_modules|bower_components)/,
				loaders: ['babel','babel?presets[]=react,presets[]=es2015'], // 加载模块 "babel" 是 "babel-loader" 的,react-hot热加载模块
			},
			{
				test: /(\.css|.scss)$/,
				loaders: ["style", "css?sourceMap", "sass?sourceMap"]
			},
			{
				test: /\.(jpe?g|png|gif|svg)$/i,
				loaders: [
					'url?limit=100&name=img/[hash:8].[name].[ext]',
					'image-webpack?{progressive:true, optimizationLevel: 7, interlaced: false, pngquant:{quality: "65-90", speed: 4}}'
				]
			}
			
		],
	},
	plugins: [
		new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js', Infinity),
		new webpack.HotModuleReplacementPlugin(),
    	new webpack.NoErrorsPlugin()
	],
}