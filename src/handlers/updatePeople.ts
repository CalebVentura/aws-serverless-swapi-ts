import { AWS } from "../utils/awsConfig";

module.exports.handler = async (event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();

  const { id } = event.pathParameters;
  const payload = JSON.parse(event.body);
  const keys = Object.keys(payload);
  const UpdateExpression =
    "set " + keys.map((item) => `${item} = :${item}`).join(",");
  const ExpressionAttributeValues = {};
  keys.forEach((key) => (ExpressionAttributeValues[`:${key}`] = payload[key]));

  await dynamodb
    .update({
      TableName: "StarWarsPeople2",
      Key: { id },
      UpdateExpression,
      ExpressionAttributeValues,
      ReturnValues: "ALL_NEW",
    })
    .promise();

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "PUT update people successfully",
      data: [],
    },
    null,
    2),
  };
};
