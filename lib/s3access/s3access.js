const s3config        = require(__rootpath + '/conf/s3config.json');
var   s3params        = require(__rootpath + '/conf/s3file');
const s3object        = require(__rootpath + '/lib/s3access/s3');
const logger					= require(__rootpath + '/lib/logging/errorLogger');
const aws             = require("aws-sdk");

aws.config.update({region: s3config.REGION});

const s3access = {
  getDataUsingS3Select: async function(queryBuilder) {

    logger.info("In getDataUsingS3Select");
    // s3 = new s3object().getInstance();

    s3params["Expression"] = queryBuilder + " FROM s3object";

    const s3 = new aws.S3();
    logger.info("Retrived s3 instance");
    logger.info("Requesting data fom s3");
    return new Promise((resolve, reject) => {
      try {
        s3.selectObjectContent(s3params, (err, data) => {
          if (err) { reject(err); }
          if (null == data) {
            logger.error("Empty data object")
            reject('Empty data object');
          };
          const records = []
          data.Payload.on('data', (event) => {
            if (event.Records) {
              records.push(event.Records.Payload);
            }
          })
          .on('error', (err) => {
            logger.error("Error in retriveing data");
            logger.error(err)
            reject(err);
          })
          .on('end', () => {
            let dataString = Buffer.concat(records).toString('utf8');
            dataString = dataString.replace(/\,$/, '');
            dataString = `[${dataString}]`;
            try {
              const jsonData = JSON.parse(dataString);
              resolve(jsonData);
            }
            catch (e) {
              reject(new Error(`Unable to convert S3 data to JSON object. S3 Select Query: ${s3params.Expression}`));
            }
          });
        });
      } catch (err) {
        logger.error("Caught error");
        console.log(err);
        reject(err);
      }
    });
  }
}
module.exports = s3access;
