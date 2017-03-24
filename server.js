const request = require('request')
const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
var express = require('express');
const serverPort = 4000
const app = new (require('express'))()

const config = require('./webpack-hot-dev-server.config')
const webserverPort = config.webserverPort
config.entry.main.unshift("webpack-dev-server/client?http://0.0.0.0:" + webserverPort + "/", "webpack/hot/dev-server")
config.plugins.push(new webpack.HotModuleReplacementPlugin())

let entryHtml

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
            entryHtml = body
        }
    })
    console.log('webpack served at http://localhost:' + webserverPort + '/')
})


app.get('*', function (req, res) {
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

})


app.listen(serverPort, function (error) {
    if (error) {
        console.error(error)
    } else {
        console.info('==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.', serverPort, serverPort)
    }
})

