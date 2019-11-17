var express = require('express');
var router = express.Router();

// Redirects from Business Directory Manager
router.get("/interpreters/interpreter/" , function (req, res) {
  res.redirect( 301, "/interpreters/" );
});
router.get("/126/alan-haythornthwaite/" , function (req, res) {
  res.redirect( 301, "/interpreter/?interpreterID=4022" );
});
router.get("/127/alexandra-carr-malcolm/" , function (req, res) {
  res.redirect( 301, "/interpreter/?interpreterID=4021" );
});
router.get("/128/alexia-blohm-pain/" , function (req, res) {
  res.redirect( 301, "/interpreter/?interpreterID=4020" );
});
router.get("/129/ann-marie-bracchi/" , function (req, res) {
  res.redirect( 301, "/interpreter/?interpreterID=4019" );
});
router.get("/132/carolyn-caton/" , function (req, res) {
  res.redirect( 301, "/interpreter/?interpreterID=4011" );
});
router.get("/135/david-hutchinson/" , function (req, res) {
  res.redirect( 301, "/interpreter/?interpreterID=4013" );
});
router.get("/136/david-wycherley/" , function (req, res) {
  res.redirect( 301, "/interpreter/?interpreterID=4014" );
});
router.get("/137/helen-tagg/" , function (req, res) {
  res.redirect( 301, "/interpreter/?interpreterID=4023" );
});
router.get("/139/jane-higgins/" , function (req, res) {
  res.redirect( 301, "/interpreter/?interpreterID=4015" );
});
router.get("/140/jane-kelsall/" , function (req, res) {
  res.redirect( 301, "/interpreter/?interpreterID=4016" );
});
router.get("/143/jill-searson/" , function (req, res) {
  res.redirect( 301, "/interpreter/?interpreterID=4017" );
});
router.get("/144/jo-ansell/" , function (req, res) {
  res.redirect( 301, "/interpreter/?interpreterID=4018" );
});
router.get("/145/jo-lindley/" , function (req, res) {
  res.redirect( 301, "/interpreter/?interpreterID=4024" );
});
router.get("/148/julie-fletcher/" , function (req, res) {
  res.redirect( 301, "/interpreter/?interpreterID=4027" );
});
router.get("/149/julie-thompson/" , function (req, res) {
  res.redirect( 301, "/interpreter/?interpreterID=4028" );
});
router.get("/150/karen-gillespie/" , function (req, res) {
  res.redirect( 301, "/interpreter/?interpreterID=4025" );
});
router.get("/151/karen-mettam/" , function (req, res) {
  res.redirect( 301, "/interpreter/?interpreterID=4009" );
});
router.get("/153/kelly-divers/" , function (req, res) {
  res.redirect( 301, "/interpreter/?interpreterID=4031" );
});
router.get("/155/lisa-green/" , function (req, res) {
  res.redirect( 301, "/interpreter/?interpreterID=4042" );
});
router.get("/156/lucy-allison/" , function (req, res) {
  res.redirect( 301, "/interpreter/?interpreterID=4036" );
});
router.get("/158/mavis-rhodes/" , function (req, res) {
  res.redirect( 301, "/interpreter/?interpreterID=4038" );
});
router.get("/160/rachel-schorah/" , function (req, res) {
  res.redirect( 301, "/interpreter/?interpreterID=4039" );
});
router.get("/162/sarah-gaunt/" , function (req, res) {
  res.redirect( 301, "/interpreter/?interpreterID=4033" );
});
router.get("/163/shireen-joshi/" , function (req, res) {
  res.redirect( 301, "/interpreter/?interpreterID=4035" );
});
router.get("/165/van-holtom/" , function (req, res) {
  res.redirect( 301, "/interpreter/?interpreterID=4032" );
});
router.get("/166/vicci-ackroyd/" , function (req, res) {
  res.redirect( 301, "/interpreter/?interpreterID=4041" );
});
router.get("/259/victoria-crawley/" , function (req, res) {
  res.redirect( 301, "/interpreter/?interpreterID=4008" );
});
router.get("/260/claireturnbull/" , function (req, res) {
  res.redirect( 301, "/interpreter/?interpreterID=4007" );
});
router.get("/264/laura-ormandy/" , function (req, res) {
  res.redirect( 301, "/interpreter/?interpreterID=4006" );
});
router.get("/275/simon-bristoll/" , function (req, res) {
  res.redirect( 301, "/interpreter/?interpreterID=4005" );
});
router.get("/293/matt-dixon/" , function (req, res) {
  res.redirect( 301, "/interpreter/?interpreterID=4004" );
});
router.get("/310/stacey-marshall/" , function (req, res) {
  res.redirect( 301, "/interpreter/?interpreterID=4003" );
});
router.get("/320/emma-lipton/" , function (req, res) {
  res.redirect( 301, "/interpreter/?interpreterID=4001" );
});
module.exports = router;
