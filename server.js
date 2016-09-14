var express = require('express');
var http = require('http');
var reload = require('reload')
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var router = express.Router();
//替换webpack-dev-server
var webpackMiddleware = require("webpack-dev-middleware");
var webpackHotMiddleware = require("webpack-hot-middleware");
var webpackConf = require('./webpack.config');
var webpack = require("webpack");

var app = express();
// 开发环境和生产环境对应不同的目录
var debug = process.env.NODE_ENV !== 'production';
var viewDir = debug? 'build': 'public';

app.set('port', process.env.PORT || 1000);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, viewDir)));

/*webpack服务配置*/
app.use(webpackMiddleware(webpack(webpackConf), {
	contentBase: webpackConf.output.path,
	publicPath: webpackConf.output.publicPath,
	hot: true,
	stats: { colors: true },
}));
//---浏览器刷新
app.use(webpackHotMiddleware(webpack(webpackConf)));
app.get('/', function (req, res) {
	res.send('Hello world');
	res.json({
		user: 'yangyunxin'
	})
});
var server = http.createServer(app);
reload(server, app);
app.listen(app.get('port'), function () {
	console.log('Express server listen on port ' + app.get('port'));
});