var express = require('express');
var router = express.Router();

// Redirects from Complete Gallery Manager
router.get("/interpreters/" , function (req, res) {
  res.redirect( 301, "/interpreters/" );
});
router.get("/interpreters/alan-haythornthwaite-2/" , function (req, res) {
  res.redirect( 301, "/interpreter/?interpreterID=4022" );
});
router.get("/interpreters/alex-2009" , function (req, res) {
  res.redirect( 301, "/interpreter/?interpreterID=4021" );
});
router.get("/interpreters/alexia/" , function (req, res) {
  res.redirect( 301, "/interpreter/?interpreterID=4020" );
});
router.get("/interpreters/ann-marie-bracchi/" , function (req, res) {
  res.redirect( 301, "/interpreter/?interpreterID=4019" );
});
router.get("/interpreters/carolyncaton/" , function (req, res) {
  res.redirect( 301, "/interpreter/?interpreterID=4011" );
});
router.get("/interpreters/david-wycherley/" , function (req, res) {
  res.redirect( 301, "/interpreter/?interpreterID=4014" );
});
router.get("/interpreters/helen-tagg/" , function (req, res) {
  res.redirect( 301, "/interpreter/?interpreterID=4023" ); });
router.get("/interpreters/jane-kelsall/" , function (req, res) {
  res.redirect( 301, "/interpreter/?interpreterID=4016" );
});
router.get("/interpreters/janehiggins/" , function (req, res) {
  res.redirect( 301, "/interpreter/?interpreterID=4015" );
});
router.get("/interpreters/jen-rhodes/" , function (req, res) {
  res.redirect( 301, "/interpreter/?interpreterID=4043" );
});
router.get("/interpreters/jill-searson/" , function (req, res) {
  res.redirect( 301, "/interpreter/?interpreterID=4017" );
});
router.get("/interpreters/jo_lindley/" , function (req, res) {
  res.redirect( 301, "/interpreter/?interpreterID=4024" );
});
router.get("/interpreters/joansell/" , function (req, res) {
  res.redirect( 301, "/interpreter/?interpreterID=4018" );
});
router.get("/interpreters/juliethompson/" , function (req, res) {
  res.redirect( 301, "/interpreter/?interpreterID=4028" );
});
router.get("/interpreters/laura-ormandy/" , function (req, res) {
  res.redirect( 301, "/interpreter/?interpreterID=4006" );
});
router.get("/interpreters/lucyallison/" , function (req, res) {
  res.redirect( 301, "/interpreter/?interpreterID=4036" );
});
router.get("/interpreters/rachel-schorah/" , function (req, res) {
  res.redirect( 301, "/interpreter/?interpreterID=4039" );
});
router.get("/interpreters/sarahgaunt/" , function (req, res) {
  res.redirect( 301, "/interpreter/?interpreterID=4033" );
});
router.get("/interpreters/shireen_joshi/" , function (req, res) {
  res.redirect( 301, "/interpreter/?interpreterID=4035" );
});
router.get("/interpreters/van-holtom/" , function (req, res) {
  res.redirect( 301, "/interpreter/?interpreterID=4032" );
});
router.get("/interpreters/vicci_ackroyd/" , function (req, res) {
  res.redirect( 301, "/interpreter/?interpreterID=4041" );
});
router.get("/interpreters/victoriacrawley/" , function (req, res) {
  res.redirect( 301, "/business-directory/259/victoria-crawley/" );
});
module.exports = router;
