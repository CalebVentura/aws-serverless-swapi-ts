import { dynamoDBClient } from '../shared/db';

module.exports.handler = async (event) => {

  const result = await dynamoDBClient
    .scan({ TableName: "StarWarsPeople" })
    .promise();

  const data = result.Items;

  return {
    status: 200,
    message: "GET people successful",
    data,
  };
};
