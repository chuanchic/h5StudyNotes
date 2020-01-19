
/**
 * 数据库分类：
 * 1.关系型数据库
 * MYSQL  MSSQL  Oracle
 * 2.文档型数据库(非关系型数据库 更灵活 效率更高)
 * MongoDB  Redis  Memecache
 * 
 * 数据库对比：
 * 关系型：数据库(db) -> 表(table)       -> 记录/行(record) -> 字段
 * 文档型：数据库(db) -> 集合(collection) -> 文档(document) -> 字段
 * 关系型数据库使用时，需要创建数据库、表结构(表中列的数据类型 大小 等)、每张表和其他表之间的关系
 * MongoDB使用时，因为MongoDB中没有表只有集合，不需要创建表结构，集合和集合之间也没有关系
 * 
 * MongoDB简介：
 * 官网：https://www.mongodb.com/cn
 * 对 JavaScript 兼容较好，和 Node.js 结合最好
 * Node全栈：MEAN(MongoDB Express Angular Nodejs)
 * 
 * MongoDB安装与使用：
 * 下载地址：https://www.mongodb.com/download-center/community
 * 将压缩包解压到 /usr/local 目录下，命名为 mongodb (也可以解压到其他目录、命名为其他名字)
 * 在 mongodb 目录下新建文件夹 data 和 log，在 data 目录下新建文件夹 db
 * 进入 mongodb 目录下的 bin 目录，新建 mongodb.conf 配置文件 配置MongoDB例如：
      #端口 
      port=27017
      #数据库文件存放目录
      dbpath=/usr/local/mongodb/data/
      #日志文件存放目录
      logpath=/usr/local/mongodb/log/mongodb.log
      #使用追加的方式写日志
      logappend=true
      #不以守护程序的方式启用，即不在后台运行
      fork=true
      #最大同时连接数
      maxConns=100
      #不启用验证
      auth=true
      #每次写入会记录一条操作日志（通过journal可以重新构造出写入的数据）
      #即使宕机，启动时wiredtiger会先将数据恢复到最近一次的checkpoint点，然后重放后续的journal日志来恢复
      journal=true
      #存储引擎有mmapv1、wiretiger、mongorocks
      storageEngine=mmapv1 
      #这样就可外部访问了，例如从win10中去连虚拟机中的MongoDB
      bind_ip = 0.0.0.0
   配置环境变量：export PATH=${PATH}:/usr/local/mongodb/bin
   查看版本号：mongod --version
   启动数据库服务：命令行到 /usr/local/mongodb 下，sudo mongod --dbpath ./data
   操作数据库(进入mongodb环境)：任何目录下输入都行
      连接本地数据库：mongo
      连接远程数据库：mongo --host 服务器地址 --port 端口号  
      查看数据库列表：show databases;
      使用数据库：   use 数据库名称;
      查看当前数据库的所有集合(表)：show collections;
      关闭数据库：   1. use admin; 切换到admin
                   2. db.shutdownServer();
      使用新的数据库：use test; (这时候test还没有创建，当存入第一条数据的时候才会创建)
      操作集合：(全局对象 db 代表当前正在使用的数据库)
        增：db.users.insert({name:'川驰',age:18})  如果集合(表) users 没有会自动创建
           db.users.insertOne(...)
           db.users.insertMany([{name:'haha',age:30},{name:'hehe',age:50}])
        查：db.users.find()         查询所有
           db.users.find({name:'川驰',age:18})  查询单个(多个条件)
           db.users.find({age:{$gte:19}})      查询大于等于19的
           db.users.find({age:{$in:[18,21]}})  查询为18,21的，不是范围
           $lt    小于
           $gt    大于
           $eq    等于
           $lte   小于等于
           $gte   大于等于
           $ne    不等于
           $in    $in:[18,21] 查询为18,21的，不是范围
           $nin   $nin:[18,21] 查询不是18,21的，不是范围
        删：db.users.deleteOne({age:21})  即使有多条符合也只删除一条
           db.users.deleteMany({age:22})  删除多条
        改：db.users.updateOne(条件对象,操作对象)
           db.users.updateMany(条件对象,操作对象)
           db.users.updateMany({name:'川驰'},{$set:{age:31,sex:1}}) 
              将 name 为川驰的 age 全部修改为31，sex 全部修改为1

   图形化工具操作MongoDB：(很少使用，了解即可)
   Robo 3T 下载：https://robomongo.org/download
   
   使用nodejs操作MongoDB：
   1.安装：npm install mongodb (在 npm 官网搜索 mongodb 就能找到安装命令)
   2.使用如下 ...

 */

const MongoClient = require("mongodb").MongoClient
const url = "mongodb://127.0.0.1:27017"
const options = { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
}
const dbName = "test"
const collectionName = "user"

// 插入一条数据
// insertOne()
function insertOne() {
  // 一条数据
  var data = {
    name: "hehe", 
    age: 18
  }
  try {
    MongoClient.connect(url, options, function(err, client){
      if(err){
        throw err
      }else {
        // 获取db对象(哪一个数据库)
        const db = client.db(dbName);
        // 获取集合(数据库里的哪一个表)
        let collection = db.collection(collectionName);
        // 插入一条数据
        collection.insertOne(data, function(err, dbResult){
          console.log(dbResult.result);
          // 最后要关闭数据库连接
          client.close();
        })
      }
    })
  } catch (e) {
    console.log(e.stack);
  }
}

// 查询数据
find()
function find() {
  try {
    MongoClient.connect(url, options, function(err, client){
      if(err){
        throw err
      }else {
        // 获取db对象(哪一个数据库)
        const db = client.db(dbName);
        // 获取集合(数据库里的哪一个表)
        let collection = db.collection(collectionName);
        // 根据条件查询数据
        collection.find({age: 18}).toArray(function(err, arr){
          console.log(arr)
          // 最后要关闭数据库连接
          client.close();
        })
      }
    })
  } catch (e) {
    console.log(e.stack);
  }
}

// 删除一条数据
// deleteOne()
function deleteOne() {
  try {
    MongoClient.connect(url, options, function(err, client){
      if(err){
        throw err
      }else {
        // 获取db对象(哪一个数据库)
        const db = client.db(dbName);
        // 获取集合(数据库里的哪一个表)
        let collection = db.collection(collectionName);
        // 删除一条数据
        collection.deleteOne({age: 18}, function(err, dbResult){
          console.log(dbResult.result);
          // 最后要关闭数据库连接
          client.close();
        })
      }
    })
  } catch (e) {
    console.log(e.stack);
  }
}

// 修改一条数据
// updateOne()
function updateOne() {
  try {
    MongoClient.connect(url, options, function(err, client){
      if(err){
        throw err
      }else {
        // 获取db对象(哪一个数据库)
        const db = client.db(dbName);
        // 获取集合(数据库里的哪一个表)
        let collection = db.collection(collectionName);
        // 修改一条数据
        collection.updateOne({age: 18}, {$set: {name:"卧槽"}}, function(err, dbResult){
          console.log(dbResult.result);
          // 最后要关闭数据库连接
          client.close();
        })
      }
    })
  } catch (e) {
    console.log(e.stack);
  }
}