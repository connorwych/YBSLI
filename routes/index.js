var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
  res.render('index');
});

router.get('/interpreters/', function (req, res) {
  res.render('interpreters');
});

router.get('/contact/', function (req, res) {
  res.render('contact');
});

router.get('/fees/', function (req, res) {
  res.render('fees');
});

router.get('/qualifications/', function (req, res) {
  res.render('qualifications');
});

router.get('/information/', function (req, res) {
  res.render('information');
});

router.get('/links/', function (req, res) {
  res.render('links');
});

router.get('/interpreter/', function (req, res) {
  res.render('interpreter');
});

router.get('/cookie-policy/', function (req, res) {
  res.render('cookie-policy');
});


module.exports = router;
