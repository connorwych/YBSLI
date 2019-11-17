var log							= require(__rootpath + '/lib/logging/errorLogger');
var nodemailer			= require('nodemailer');
var mailConfig			= require(__rootpath + '/conf/mail.json');
var ftConfig				= require(__rootpath + '/conf/fusiontable.json')
var squel						= require('squel');
var XMLHttpRequest	= require('xmlhttprequest').XMLHttpRequest;


var mailer = {

	/*
	*	function parseMessage .
	*	Parses the request object into mail message for nodemailer
	*	returns message obect
	*/

	sendEmail: function( request ) {

		var message = mailer.parseMessage( request );

		logger = log.child({method: "sendEmail"});
		logger.info(message.to);
	//	message.bcc = "connorwych@googlemail.com";

		var smtpConfig = {
			host: mailConfig.MAIL_HOST,
			port: mailConfig.MAIL_PORT,
			secure: mailConfig.MAIL_USE_SECURE,
			auth: {
				user: mailConfig.MAIL_USERNAME,
				pass: mailConfig.MAIL_PASSWORD
			}
		};

		var transporter = nodemailer.createTransport(smtpConfig);
		logger.info("Created mailing transporter")
		logger.debug(message.toString);
		transporter.sendMail(message, function(error, info){
			if( error ){
				console.log(error);
				return
			}
			console.log('Message sent: ' + info.response);
		});
	},



	parseMessage: function( request ) {
		var logger = log.child({method: "parseMessage"});
		var message = {
			cc: request.body.senderEmail,
			bcc: mailer.getMailRecipients(request),
			subject: request.body.subject,
			text: request.body.emailBody + '\n\n----\nThis email was sent from Yorkshire BSL Interpreters',
			from: {
				name: 		request.body.senderName,
				address: 	request.body.senderEmail
			},
			replyTo: {
				name: 		request.body.senderName,
				address: 	request.body.senderEmail
			}
		};

		logger.info("Returning mail object");
		return message;
	},

	/*
	*	function getMailRecipients .
	*	Parses the request object into mail message and requests mailing list from google
	*	returns mailing list
	*/
	getMailRecipients: function( request ) {
		var logger = log.child({method: "getMailRecipients"});
		var queryBuilder = squel.select().field('EMAIL').where("EMAIL_ALL=''").from(ftConfig.FT_DOC_ID);

		if ( request.body.interpreterID != null ) {
			logger.info("searching for interpretrID: " + request.body.interpreterID);
			var interpreterIDString = "rowid=\'"+request.body.interpreterID+"\'";
			queryBuilder.where(interpreterIDString);
		} else {
			if ( request.body.genderFilter == "male" ) {
				logger.info("searching for male interpreters")
				queryBuilder.where("GENDER='M'");
			} else if ( request.body.genderFilter == "female" ) {
				logger.info("searching for male interpreters")
				queryBuilder.where("GENDER='F'");
			}
			if( request.body.legalWorkFilter == "on" ) {
				logger.info("searching for legal work")
				queryBuilder.where("LEGAL_WORK='Y'");
			}
			if( request.body.mentalHealthWorkFilter == "on" ) {
				logger.info("searching for mental health work")
				queryBuilder.where("MENTAL_HEALTH_WORK='Y'");
			}
		}

		//TODO Get results from S3 and process into results for mail


		return mailingList['rows'].join();
	}
}
module.exports = mailer;
