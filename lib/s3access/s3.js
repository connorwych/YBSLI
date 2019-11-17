var aws             = require("aws-sdk");
var s3config        = require(__rootpath + '/conf/s3config.json');
var logger          = require(__rootpath + '/lib/logging/errorLogger');

aws.config.update({region: s3config.REGION});
class s3 {
  constructor(){
    logger.info("Creating s3 object")
    try {
      const s3 = new aws.S3();
    } catch (err) {
      logger.error(err);
    }
  }
}

class s3singleton {
  constructor() {
    if (!s3singleton.instance) {
      s3singleton.instance = new s3();
    }
  }

  getInstance() {
    logger.info("In function s3singleton, returning s3")
    return s3singleton.instance;
  }

}

module.exports = s3singleton;
