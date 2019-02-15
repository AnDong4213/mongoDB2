var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');   
mongoose.connect('mongodb://localhost/mydb', {useNewUrlParser: true});
var db = mongoose.connection;

var infoSchema = new mongoose.Schema({
	email: String,
	pwd: String
});
var Infome = mongoose.model('infome', infoSchema);

/* db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  var kittySchema = new mongoose.Schema({
    name: String
  });
  var Kitten = mongoose.model('Kitten', kittySchema);
  var fluffy = new Kitten({name: 'Hellokitty666'});
  fluffy.save(function(err,rs) {
    if (err) return console.error(err);
  })
}) */

/* db.on('error', console.error.bind(console, 'connection error:'));  
db.once('open', function() {
  var infoSchema = new mongoose.Schema({
    email: String,
    pwd: String
  });
  var Infome = mongoose.model('infome', infoSchema);
  // var fluffy = new Infome({
    // email: '4378@qq.com',
    // pwd: '123456'
  // });
  var fluffy = new Infome();
  fluffy.email = 'qqq';
  fluffy.pwd = 'qqqq';
  
  fluffy.save(function(err, rs) {
    if (err) return console.error(err);
  })
  console.log(fluffy._id);
}) */


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.all('/zhuce', function(req, res) {
  let subflag = req.body['subflag'];
  if (subflag == undefined) {
    res.render('zhuce', { title: 'Express' });
  } else {
	  
		var fluffy = new Infome({
			email: req.body['email'],
			pwd:req.body['pwd']
		});
  
	  fluffy.save(function(err, rs) {
		if (err) return console.error(err);
	  })
	  console.log(fluffy._id);
	  res.send('收到参数: ' + fluffy._id);
  }
})


module.exports = router;


  // <Input placeholder="passenger name" style={{ width: '60%', marginRight: 8 }} />
            // <TextArea rows={3} style={{resize: 'none'}} />
