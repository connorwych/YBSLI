var log							= require(__rootpath + '/lib/logging/errorLogger');
var XMLHttpRequest	= require('xmlhttprequest').XMLHttpRequest;
var captchaConfig		= require(__rootpath + '/conf/captcha.json');

var captcha = {
	/*
	*	function checkCaptcha
	*	Uses site's private key to reqeuest google verification
	*	returns google's respoonse
	*/
	checkCaptcha: function( captcha, ipAddress ) {
		var logger = log.child({method: "checkCaptcha"});

		var PRIVATE_KEY = captchaConfig.PRIVATE_KEY;
		var gURL				= 'https://www.google.com/recaptcha/api/siteverify';

		gURL = gURL + "?secret=" + PRIVATE_KEY + "&response=" + captcha;
		var xhr = new XMLHttpRequest();
		xhr.open("GET", gURL, false);
		xhr.send();
		return xhr.responseText;
	}
}

module.exports = captcha;
