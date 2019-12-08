var log					  	= require(__rootpath + '/lib/logging/errorLogger');
var nodemailer			= require('nodemailer');
var mailConfig			= require(__rootpath + '/conf/mail.json');

const gmail = {
  sendEmail: function ( message ) {
    logger = log.child({method: "email"});
    logger.info("Inside gmail.sendEmail")
    return new Promise( (resolve, reject) => {
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
      transporter.sendMail(message, function(error, info){
        if( error ){
          logger.error("Failed to send mail");
          logger.error(error)
          return reject(error);
        } else {
          logger.info('Message sent');
          resolve();
        }
      });
    });
  }
}

module.exports = gmail;
