var express					= require('express');
var router					= express.Router();
var squel						= require('squel');
var nodemailer			= require('nodemailer');
var log							= require(__rootpath + '/lib/logging/errorLogger');
var XMLHttpRequest	= require('xmlhttprequest').XMLHttpRequest;
var captcha					= require(__rootpath + '/lib/captcha/checkCaptcha');
var mailer					= require(__rootpath + '/lib/sendemail/mail');

/*
*	Group Emailing .
*	Creates and SQL query, submits to google
*	Sends email to resulting group
*/
router.post('/sendGroupEmail', function(req, res) {
	var logger = log.child({method: "sendGroupEmail"});

	var captchaResponse = req.body['g-recaptcha-response'];
	var ipAddress = req.ip;

	var validRequest = JSON.parse( captcha.checkCaptcha( captchaResponse, ipAddress ) );
	var successToken = validRequest['success'];

	if ( successToken ) {
		logger.info("Request is from a human - sending email");
		try {
			logger.info("sending email");
			mailer.sendEmail(req);
			res.end("Success");
			logger.info("email sent");
		} catch(err) {
			logger.error("Could not send email: see below for error");
			logger.error(err);
			res.status(500);
			res.end();
		}
	} else {
		res.status(403);
		res.end();
	}
});

module.exports = router;
