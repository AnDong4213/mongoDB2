var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var url = "mongodb://localhost:27017/mydb";

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.all('/zhuce', function(req, res) {
  let subflag = req.body['subflag'];
  if (subflag == undefined) {
    res.render('zhuce', { title: 'Express' });
  } else {
    res.send('收到参数: ' + req.body['email']);

    /* MongoClient.connect(url, {useNewUrlParser: true}, (err, db) => {
      if (err) throw err;
      let dbo = db.db('mydb');
      var userObj = {
        email: req.body['email'],
        pwd: req.body['pwd']
      }
      dbo.collection('user').insertOne(userObj, (err, res) => {
        if (err) throw err;
        console.log(res)
        console.log(`插入的文档数量为: ${res.insertedCount}`);
        db.close()
      })
    }) */

    MongoClient.connect(url, {useNewUrlParser: true}, (err, db) => {
      if (err) throw err;
      let dbo = db.db('mydb');

      let obj_id = mongodb.ObjectID.createFromHexString('5c31b57a31fefc3c80c1aeed'); 
      let whereStr = {"_id": obj_id};
      // let whereStr = {"pwd":'ddddd'};  // 查询条件
      let updateStr = {$set: { "email": req.body['email']}};
      dbo.collection('user').updateOne(whereStr, updateStr, (err, res) => {
        if (err) throw err;
        console.log("文档更新成功");
        db.close();
      })
    })

  }
})

router.get('/find', function(req, res) {
  MongoClient.connect(url, {useNewUrlParser: true}, (err, db) => {
    if (err) throw err;
    let dbo = db.db('mydb');

    let whereStr = {pwd: 'ddddd'};  // 查询条件
    dbo.collection("user").find(whereStr).toArray(function(err, result) { // 返回集合中所有数据
      if (err) throw err;
      console.log('查询成功...');
      res.send(result);
      db.close();
    });
  })
});

module.exports = router;
