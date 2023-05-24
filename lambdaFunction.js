var AWS = require("aws-sdk");
require('dotenv').config();
AWS.config.update({
	region: process.env.AWS_REGION,
	accessKeyId: process.env.AWS_ACCESS_KEY,
	secretAccessKey: process.env.AWS_SECRET,
});

var globalTableName = "purebetEvents";

const dynamoClient = new AWS.DynamoDB.DocumentClient();

async function update(pbid, attr, val){
	var params = {
		TableName: globalTableName,
		Key: {
			"purebetId": pbid
		},
		UpdateExpression: "set #attr = :val",
		ExpressionAttributeNames: {
			"#attr": attr
		},
		ExpressionAttributeValues: {
			":val": val
		}
	};
	await dynamoClient.update(params).promise();   
}
