import { AWS } from "../utils/awsConfig";

module.exports.handler = async (event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();

  const result = await dynamodb
    .scan({ TableName: "StarWarsPeople2" })
    .promise();

  const data = result.Items;

  return {
    status: 200,
    body: JSON.stringify({
      message: "GET people successful",
      data,
    },
    null,
    2),
  };
};
