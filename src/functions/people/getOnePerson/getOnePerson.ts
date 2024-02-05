import { dynamoDBClient } from "../shared/db";

module.exports.handler = async (event) => {

  const { id } = event.pathParameters;

  const result = await dynamoDBClient
    .get({
      TableName: "StarWarsPeople",
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
