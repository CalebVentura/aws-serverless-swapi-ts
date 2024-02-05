import { AWS } from "../utils/awsConfig";

module.exports.handler = async (event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();

  const { id } = event.pathParameters;

  const result = await dynamodb
    .get({
      TableName: "StarWarsPeople2",
      Key: {
        id,
      },
    })
    .promise();

  const data = result.Item;

  return {
    status: 200,
    message: "GET one people successful",
    data,
  };
};
