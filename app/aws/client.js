const { S3 } = require('aws-sdk');
const  aws = require ('aws-sdk');
const  fs = require('fs');

const  s3 = new  aws.S3({
	region:process.env.AWS_BUCKET_REGION,
	accessKeyId:  process.env.AWS_ACCESS_KEY,
	secretAccessKey:process.env.AWS_SECRET_KEY
});

module.exports = s3;