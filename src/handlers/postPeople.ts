const { v4 } = require("uuid");
import { PayloadData } from "../interfaces/PayloadData";
import { AWS } from "../utils/awsConfig";

module.exports.handler = async (event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();
  const payload: PayloadData = JSON.parse(event.body);

  const id = v4();
  const createdAt = new Date();
  const newPeople = { id, ...payload, createdAt };

  await dynamodb
    .put({
      TableName: "StarWarsPeople2",
      Item: newPeople,
    })
    .promise();

  return {
    status: 200,
    message: "POST people successful",
    data: [newPeople],
  };
};
