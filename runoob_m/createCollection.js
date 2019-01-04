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
        { name: '菜鸟教程', url: 'https://c.runoob.com', type: 'cn'},
        { name: 'Google', url: 'https://www.google.com', type: 'en'},
        { name: 'Facebook', url: 'https://www.google.com', type: 'aen'}
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

/* MongoClient.connect(url, (err,db) => {
    if (err) throw err;
    let dbo = db.db('runoob');
    var whereStr = {"name":'菜鸟教程'};
    var updateStr = {$set: { "url" : "https://www.runoob_HAHA.com" }};
    dbo.collection('site').updateOne(whereStr, updateStr, (err,res) => {
        if (err) throw err;
        console.log("文档更新成功");
        db.close();
    })
}) */
// 更新多条数据
/* MongoClient.connect(url, (err,db) => {
    if (err) throw err;
    let dbo = db.db('runoob');
    let whereStr = {"type":'en'};  // 查询条件
    let updateStr = {$set: { "url" : "https://www.runoob_HE.com" }};
    dbo.collection('site').updateMany(whereStr, updateStr, (err, res) => {
        if (err) throw err;
        console.log(res.result.nModified + " 条文档被更新");
        db.close();
    })
}) */


// 删除一条数据
/* MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("runoob");
    var whereStr = {"name":'菜鸟教程'};  // 查询条件
    dbo.collection("site").deleteOne(whereStr, function(err, obj) {
        if (err) throw err;
        console.log("文档删除成功");
        db.close();
    });
}); */
// 删除多条数据  deleteMany()
/* MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("runoob");
    var whereStr = { type: "en" };  // 查询条件
    dbo.collection("site").deleteMany(whereStr, function(err, obj) {
        if (err) throw err;
        console.log(obj.result.n + " 条文档被删除");
        db.close();
    });
}); */


// 排序
/* MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("runoob");
    var mysort = { type: 1 };
    dbo.collection('site').find().sort(mysort).toArray((err, res) => {
        if (err) throw err;
        console.log(res);
        db.close();
    })
}); */


// 查询分页
/* MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("runoob");
    dbo.collection("site").find().limit(2).toArray(function(err, result) {
        if (err) throw err;
        console.log(result);
        db.close();
  });
}); */
// 如果要指定跳过的条数，可以使用 skip() 方法。
MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("runoob");
    dbo.collection("site").find().skip(2).limit(2).toArray(function(err, result) {
        if (err) throw err;
        console.log(result);
        db.close();
  });
});
























