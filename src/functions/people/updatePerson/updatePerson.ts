import { dynamoDBClient } from "../shared/db";

module.exports.handler = async (event) => {

  const { id } = event.pathParameters;
  const payload = JSON.parse(event.body);
  const keys = Object.keys(payload);
  const UpdateExpression =
    "set " + keys.map((item) => `${item} = :${item}`).join(",");
  const ExpressionAttributeValues = {};
  keys.forEach((key) => (ExpressionAttributeValues[`:${key}`] = payload[key]));

  await dynamoDBClient
    .update({
      TableName: "StarWarsPeople",
      Key: { id },
      UpdateExpression,
      ExpressionAttributeValues,
      ReturnValues: "ALL_NEW",
    })
    .promise();

  return {
    status: 200,
    message: "PUT update people successfully",
    data: [],
  };
};
