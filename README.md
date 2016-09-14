babel-node命令需要安装babel-cli
npm install -g babel-cli
npm install --save-dev babel-cli

express为后端服务器进行模拟数据
判断开发模式和生产模式对应不同的目录
var debug = process.env.NODE_ENV !== 'production';
var viewDir = debug? 'app': 'public';