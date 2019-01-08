var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');

var mongoose = require('mongoose');
// mongoose.Promise = global.Promise;  //初始化    
var db = mongoose.connect('mongodb://localhost/mydb');

var User = mongoose.model('users', new mongoose.Schema({
  email: String,   
  pwd: String,   
  nicheng: String,   
},{_id:true}));

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
    var user = new User({});
    user.email = req.body['email'];
    user.pwd = req.body['pwd'];
    user.save(function(err) {
      console.log(err);
      res.send(user._id);
      db.disconnect();
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
