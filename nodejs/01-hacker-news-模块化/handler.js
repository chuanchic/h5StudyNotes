var storage = require('./storage');
var mime = require('mime');
var fs = require('fs');
var path = require('path');
var querystring = require('querystring')

module.exports = {
    indexHandler: function (req, res) {
        //1. 读数据
        storage.getAllNews(function (newsList) {
            //2. 渲染返回结果
            res.render('index', { list: newsList });
        })
    },
    detailsHandler: function (req, res) {
        // 1. 读数据
        storage.getNewsById(req.urlObj.query.id, function (news) {
            // 2. 渲染 返回结果
            res.render('details', { item: news });
        })
    },
    submitHandler: function (req, res) {
        // 直接渲染返回结果
        res.render('submit');
    },
    staticHandler: function (req, res) {
        res.setHeader("Content-Type", mime.getType(req.url));
        fs.readFile(path.join(__dirname, req.url), function (err, data) {
            res.end(data);
        })
    },
    getAddHandler: function (req, res) {
        storage.addNews(req.urlObj.query, function () { 
            res.redirect('/')
        })
    },
    postAddHandler: function (req, res) {
        var bufferList = []
        req.on("data", function(chunk){
            bufferList.push(chunk)
        })
        req.on("end", function(){
            var result = Buffer.concat(bufferList)
            result = result.toString()
            var news = querystring.parse(result)
            storage.addNews(news, function () { 
                res.redirect('/')
            })
        })
    },
    notFoundHandler: function (req, res) {
        res.statusCode = 404;
        res.statusMessage = "Not Found";
        res.end("Not Found");
    }
}