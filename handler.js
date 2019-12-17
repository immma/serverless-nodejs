console.log('Loading function');

var AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-1' });
var s3 = new AWS.S3();

exports.handler = (event, context, callback) => {
  let encodedImage = JSON.parse(event.body).filedata;
  let decodedImage = Buffer.from(encodedImage, 'base64');
  var filePath = "upload/" + JSON.parse(event.body).filename + ".png"

  var params = {
    "Body": decodedImage,
    "Bucket": "input-code",
    "Key": filePath,
    "ContentType " : "mime/png"
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