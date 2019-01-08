var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');   
mongoose.connect('mongodb://localhost/mydb', {useNewUrlParser: true});
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // console.log('连接成功啦...');
  var kittySchema = new mongoose.Schema({
    name: String
  });
  kittySchema.methods.speak = function() {
    var greeting = this.name ? "Meow name is " + this.name : "I don't have a name";
    console.log(greeting);
  };
  var Kitten = mongoose.model('Kitten', kittySchema);
  var fluffy = new Kitten({name: 'Hellokitty555'});
  //console.log(fluffy.name);
  //fluffy.speak();

  fluffy.save(function(err,rs) {
    if (err) return console.error(err);
    console.log(rs) // { _id: 5c34578522475407fcca14b9, name: 'Hellokitty555', __v: 0 }
    rs.speak();
  })

  /* Kitten.find(function (err, kittens) {
    if (err) return console.error(err);
    console.log(kittens);
  }) */

  /* Kitten.find({name: /^Hel/}, function(err, kittens) {
    if (err) return console.error(err);
    console.log(kittens);
  }) */

})


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
