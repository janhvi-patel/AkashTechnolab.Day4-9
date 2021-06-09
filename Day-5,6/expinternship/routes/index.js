var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/home', function(req, res, next) {
  res.render('home', { title: 'Express' });
});

router.get('/about', function(req, res, next) {
  res.render('about', { title: 'Express' });
});

router.get('/contact', function(req, res, next) {
  res.render('contact', { title: 'Express' });
});

router.get('/training/js/nodejs', function(req, res, next) {
  res.send("Sure we will provide you");
});

router.get('/master', function(req, res, next) {
  res.render('master', { title: 'Express' });
});

router.get('/myform', function(req, res, next) {
  res.render('form');
});

router.post('/form-process', function(req, res, next) {
  var a = (req.body.name);
  var b = (req.body.email);
  var c = (req.body.subject);
  var d = (req.body.mygender);
  var e = parseInt(req.body.age);
  var f = parseInt(req.body.mno);
  var g = parseInt(req.body.pwd);

  var msg = "";
  var mycolor = "";
  if(e>50)
  {
    msg = "You are Out of age";
    mycolor = "cyan";
  }else{
    msg = "You are under age";
    mycolor = "light pink";
  }

    console.log(req.body);
    console.log("Your name is" + a + "Your Email is" + b + "your age is" + e + "your No is " + f );

  res.render('ans',{mya:a,myb:b,mye:e,myf:f,mymsg:msg,mycolor:mycolor});
});

module.exports = router;
