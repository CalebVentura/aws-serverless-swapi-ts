const { v4 } = require("uuid");
import { Person } from "../shared/types";
import { dynamoDBClient } from "../shared/db";

module.exports.handler = async (event) => {
  const payload: Person = JSON.parse(event.body);

  const id = v4();
  const createdAt = new Date();
  const newPeople = { id, ...payload, createdAt };

  await dynamoDBClient
    .put({
      TableName: "StarWarsPeople",
      Item: newPeople,
    })
    .promise();

  return {
    status: 200,
    message: "POST people successful",
    data: [newPeople],
  };
};
