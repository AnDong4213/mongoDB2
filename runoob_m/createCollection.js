let MongoClient = require('mongodb').MongoClient;
let url = "mongodb://localhost:27017/runoob";

/* MongoClient.connect(url, (err, db) => {
    if (err) throw err;
    console.log('数据库已创建!');
    let dbase = db.db('runoob');
    dbase.createCollection('site', (err, res) => {
        if (err) throw err;
        console.log('创建集合');
        db.close()
    })
}) */

/* MongoClient.connect(url, (err, db) => {
    if (err) throw err;
    let dbase = db.db('runoob');
    let myobj = { name: "菜鸟教程", url: "www.runoob" };
    dbase.collection('site').insertOne(myobj, (err, res) => {
        if (err) throw err;
        console.log("文档插入成功");
        db.close();
    })
}) */

/* MongoClient.connect(url, (err, db) => {
    if (err) throw err;
    let dbo = db.db('runoob');
    var myobj =  [
        { name: '菜鸟工具', url: 'https://c.runoob.com', type: 'cn'},
        { name: 'Google', url: 'https://www.google.com', type: 'en'},
        { name: 'Facebook', url: 'https://www.google.com', type: 'en'}
    ];
    dbo.collection('site').insertMany(myobj, (err, res) => {
        if (err) throw err;
        console.log(`插入的文档数量为: ${res.insertedCount}`);
        db.close()
    })
}) */

/* MongoClient.connect(url, (err,db) => {
    if (err) throw err;
    let dbo = db.db('runoob');
    // dbo.collection('site').find({}).toArray((err,result) => {
    dbo.collection('site').find({'type':'cn'}).toArray((err,result) => {
        if (err) throw err;
        console.log(result);
        db.close()
    })
}) */

MongoClient.connect(url, (err,db) => {
    if (err) throw err;
    let dbo = db.db('runoob');
    var whereStr = {"name":'菜鸟工具'};
    var updateStr = {$set: { "url" : "https://www.runoob_baidu.com" }};
    dbo.collection('site').updateOne(whereStr, updateStr, (err,res) => {
        if (err) throw err;
        console.log("文档更新成功");
        db.close();
    })
})









