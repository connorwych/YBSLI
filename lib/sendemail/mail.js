var log							= require(__rootpath + '/lib/logging/errorLogger');
var squel						= require('squel');
var s3access        = require(__rootpath + "/lib/s3access/s3access");
var gmail						= require(__rootpath + "/lib/gmail/gmail");

var mailer = {}
mailer.mail = function( request ) {
	logger = log.child({method: "mail"});
	logger.info("In mail function")
	var message = {
		cc: request.body.senderEmail,
		bcc: "",
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
	var query = mailer.getMailRecipients( request );
	var s3data = s3access.getDataUsingS3Select( query );
	s3data.then( result => {
		var interpreterEmailList = [];
		for (var i=0; i<result.length; i++){
			interpreterEmailList.push(result[i].EMAIL);
		}
		interpreterEmailList = interpreterEmailList.join(";");
		message.bcc = interpreterEmailList;
		gmail.sendEmail(message).then().catch( err => {
			logger.error("caught gmail error");
			throw err;
		})
	}).catch( function (err) {
		logger.error("caught s3 error");
		throw err;
	});

}

mailer.getMailRecipients =  function( request ) {
	logger = log.child({method: "mail"});
	logger.info("in getMailRecipients")
	var queryBuilder = squel.select().field('EMAIL').where("EMAIL_ALL=''").from("location");
		if ( request.body.interpreterID != null ) {
			var interpreterIDString = "ROWID='"+ request.body.interpreterID + "'";
			queryBuilder.where(interpreterIDString);
		}
		if ( request.body.genderFilter == "male" ) {
			queryBuilder.where("GENDER='M'");
		}
		if ( request.body.genderFilter == "female" ) {
			queryBuilder.where("GENDER='F'");
		}
		if( request.body.legalWorkFilter == "on" ) {
			queryBuilder.where("LEGAL_WORK='Y'");
		}
		if( request.body.mentalHealthWorkFilter == "on" ) {
			queryBuilder.where("MENTAL_HEALTH_WORK='Y'");
		}
		return queryBuilder.toString();
}

module.exports = mailer;
