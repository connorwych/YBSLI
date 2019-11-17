var squel						= require('squel');
var XMLHttpRequest	= require('xmlhttprequest').XMLHttpRequest;
var logger					= require(__rootpath + '/lib/logging/errorLogger');
var s3access        = require(__rootpath + '/lib/s3access/s3access');

const interpreterLookup = {
  getAllInterpreters: function(callback) {
    logger.info("in interpreterListing function")
    const queryBuilder = squel.select().field('ROWID').field('FIRST_NAME').field('SECOND_NAME').field('GENDER').field('MENTAL_HEALTH_WORK').field('LEGAL_WORK').field('IMG_URL');
    const query	= queryBuilder.toString();

    logger.info(query);
    var s3data = s3access.getDataUsingS3Select(query);
    s3data.then(
      result => callback(result),
      error => callback(error)
    );
  },

  getInterpreterByID: function(id, callback){
    var ROWIDSTRING = 'ROWID=' + id;
    var queryBuilder = squel.select().field('FIRST_NAME').field('SECOND_NAME').field('RSLI').field('MASLI').field('MVLP').field('MOBILE').field('GENDER').field('MENTAL_HEALTH_WORK').field('LEGAL_WORK').field('IMG_URL').field('BIO').field('VIDEO_URL').field('YEAR_QUALIFIED').where(ROWIDSTRING);
    var query = encodeURIComponent(s3QueryBuilder.toString());

    var data = s3access.getS3Data(query, callback);

  }
}

module.exports = interpreterLookup;
