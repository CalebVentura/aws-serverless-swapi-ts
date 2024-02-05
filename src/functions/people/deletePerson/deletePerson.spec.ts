import { dynamoDBClient } from "../shared/db";

module.exports.handler = async (event) => {
  const { id } = event.pathParameters;

  await dynamoDBClient
    .delete({
      TableName: "StarWarsPeople",
      Key: {
        id,
      },
    })
    .promise();

  return {
    status: 200,
    message: "DELETE one people successful",
    data: [],
  };
};
