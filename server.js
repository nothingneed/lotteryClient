const request = require('request')
const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')

const app = new (require('express'))()
var express = require('express');
const serverPort = 3000
app.use(express.static('public'));

const config = require('./webpack-hot-dev-server.config')
const webserverPort = config.webserverPort
config.entry.main.unshift("webpack-dev-server/client?http://0.0.0.0:" + webserverPort + "/", "webpack/hot/dev-server")
config.plugins.push(new webpack.HotModuleReplacementPlugin())

let entryHtml
//console.log('***********************--webpack.config--***************************')
//console.log(config)
//console.log('***********************--webpack.config--***************************')
const compiler = webpack(config)
//启动webpackDev服务,以提供hotload环境,此服务提供动态生成的入口html文件和js文件服务
new WebpackDevServer(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath,
    hot: true,
    stats: {
        colors: true,
    }
}).listen(webserverPort, '0.0.0.0', function (err, result) {
    if (err) {
        return console.log(err)
    }
    request('http://localhost:' + webserverPort + '/dist/', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            //   console.log('***********************--dynamic index.html--***************************')
            //   console.log(body)
            //   console.log('***********************--dynamic index.html--***************************')
            entryHtml = body
        }
    })
    console.log('webpack served at http://localhost:' + webserverPort + '/')
})


app.get('/', function (req, res) {
    console.log(req.headers.host)
    var ipReg = /\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/g
    var reqIp = ipReg.exec(req.headers.host)
    console.log(reqIp)
    if (reqIp) {

        res.send(entryHtml.replace(ipReg, reqIp))
    }
    else {
        res.send(entryHtml)
    }


//	res.sendFile(__dirname + '/index.html')
})
//
// var bodyParser = require('body-parser')
// app.use(bodyParser.urlencoded({extended: false}))
// app.use(bodyParser.json())
//
// app.get('/getGameList', function (req, res) { //这里模拟一个真实的应答服务器
//     console.info(req.query)
//     var startTime = new Date().getTime()
//     while (new Date().getTime() < startTime + 1000)
//         var game = require('./src/api')
//     res.send(game[req.query.id])
// })
//
// app.post('/test', function (req, res) {
//     console.log(req.query)
//     console.log(req.body)
// })
//这里启动的express服务提供了webpackdevserver的转发,此步的目的是在前段自行调试时,可在express server自定义返回调试数据
app.listen(serverPort, function (error) {
    if (error) {
        console.error(error)
    } else {
        console.info('==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.', serverPort, serverPort)
    }
})

