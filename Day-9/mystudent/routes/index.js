var express = require('express');
var mysql  = require('mysql');
var router = express.Router();


/*DB connection*/ 
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'nodedemo'
});

/*For chek mconnection */
connection.connect(function(err){
  if(!err){
    console.log("DB connected")
  }else{
    console.log("DB connected isuue")
  }
});


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/edd', function(req, res, next) {
  res.render('sd', { title: 'Express' });
});

router.post('/edd-process', function(req, res, next) {
  console.log(req.body);

  const mysdata = {
    enrolment : req.body.txt1,
    name : req.body.txt2,
    number : req.body.txt3,
    email : req.body.txt4,
    clg : req.body.txt5
  }

   connection.query("insert into tbl_student set ?",mysdata,function(err,result){
     if(err) throw err;
     res.redirect('/edd')

   });
});

/*Display route */
router.get('/display2', function(req, res, next) {
  connection.query("select * from tbl_student ",function(err,db_rows){
    if(err) throw err;
    console.log(db_rows);
    res.render('display2', {db_rows_array:db_rows});

  });
});


/*Delete route */
router.get('/delete/:id', function(req, res, next) {
  var deleteid = req.params.id;
  console.log(deleteid);
  connection.query("delete from tbl_student where id = ? ",[deleteid],function(err,db_rows){
    if(err) throw err;
    console.log(db_rows);
    res.redirect('/display2');

  });
});


/*Edit route get */
router.get('/edit/:id', function(req, res, next) {
  var editid = req.params.id;
  console.log(editid);
  connection.query("select * from tbl_student where id = ? ",[editid],function(err,db_rows){
    if(err) throw err;
    console.log(db_rows);
    res.render('edit',{db_rows_array:db_rows});

  });
});

/*route post */

router.post('/edit/:id', function(req, res, next) {
  var editid = req.params.id;
  var senrolment = req.body.txt1;
  var sname = req.body.txt2;
  var snumber = req.body.txt3;
  var semail = req.body.txt4;
  var sclg = req.body.txt5;

  connection.query("update tbl_student set enrolment=?, name=?, number=?, email=?, clg=?, where id = ?",[senrolment,sname,snumber,semail,sclg,editid],function(err,db_rows){
    if(err) throw err;
    res.redirect('/display2');

  });
});

module.exports = router;
