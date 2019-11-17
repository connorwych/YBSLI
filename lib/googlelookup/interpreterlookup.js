var squel						= require('squel');
var XMLHttpRequest	= require('xmlhttprequest').XMLHttpRequest;
var logger					= require(__rootpath + '/lib/logging/errorLogger');
var ftConfig				= require(__rootpath + '/conf/fusiontable.json')

var interpreterLookup = {
  getAllInterpreters: function(callback) {
    logger.info("in interpreterListing function")
    var gQueryBuilder = squel.select().field('ROWID').field('FIRST_NAME').field('SECOND_NAME').field('GENDER').field('MENTAL_HEALTH_WORK').field('LEGAL_WORK').field('IMG_URL').from(ftConfig.FT_DOC_ID);
    var gAPIkey = ftConfig.FT_API_KEY;
    var gQueryURL	= "https://www.googleapis.com/fusiontables/v2/query";
    gQuery	= encodeURIComponent(gQueryBuilder.toString());
    var gURL = gQueryURL + "?sql=" + gQuery + "&key=" + gAPIkey;
    logger.info(gURL);

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if ( xhr.readyState == 4 ) {
        if ( xhr.status == 200 ) {
            logger.info("XMLHttpRequest complete, returning JSON");
            var gResponse = JSON.parse(xhr.responseText);
            gResponse['kind']='JSON';
            callback(gResponse, "");
        } else {
            logger.error(xhr.status, gResponse);
            callback("", xhr.status)
          }
        }
      }
    xhr.open("GET", gURL, true);
    xhr.send();
  },

  getInterpreterByID: function(id, callback){
    var ROWIDSTRING = 'ROWID=' + id;
    var gQueryBuilder = squel.select().field('FIRST_NAME').field('SECOND_NAME').field('RSLI').field('MASLI').field('MVLP').field('MOBILE').field('GENDER').field('MENTAL_HEALTH_WORK').field('LEGAL_WORK').field('IMG_URL').field('BIO').field('VIDEO_URL').field('YEAR_QUALIFIED');
    gQueryBuilder.from(ftConfig.FT_DOC_ID).where(ROWIDSTRING);
    var gAPIkey = ftConfig.FT_API_KEY;
    var gQueryURL	= "https://www.googleapis.com/fusiontables/v2/query";
    gQuery	= encodeURIComponent(gQueryBuilder.toString());
    gQuery = gQuery.replace(/[\(\)]/g,"")
    var gURL = gQueryURL + "?sql=" + gQuery + "&key=" + gAPIkey;

    logger.info(gURL);

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if ( xhr.readyState == 4 ) {
        if ( xhr.status == 200 ) {
            logger.info("XMLHttpRequest complete, returning JSON");
            var gResponse = JSON.parse(xhr.responseText);
            gResponse['kind']='JSON';
            callback( gResponse, "" );
        } else {
            logger.error(xhr.status);
            logger.error(xhr.responseText);
            callback( "" , xhr.status );
          }
        }
      }
    xhr.open("GET", gURL, true);
    xhr.send();
  }
}

module.exports = interpreterLookup;
