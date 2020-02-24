console.log('Loading function');

var AWS = require('aws-sdk');
AWS.config.update({ region: 'us-west-1' });
var s3 = new AWS.S3();



exports.handler = (event, context, callback) => {
  let ts = Date.now();
  let encodedImage = JSON.parse(event.body).filedata;
  let decodedImage = Buffer.from(encodedImage, 'base64');
  var filePath = JSON.parse(event.body).filename + "_" + ts + ".jpg"

  var params = {
    "Body": decodedImage,
    "Bucket": [BUCKET-NAME],
    "Key": filePath,
    "ContentType " : "mime/jpg"
  };
  s3.upload(params, function (err, data) {
    if (err) {
      callback(err, null);
    } else {
      let response = {
        "statusCode": 200,
        "body": JSON.stringify(data),
        "isBase64Encoded": false
      };
      callback(null, response);
    }
  });
};
