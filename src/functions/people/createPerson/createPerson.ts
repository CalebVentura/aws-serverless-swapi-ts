const { v4 } = require("uuid");
import { Person } from "../shared/types";
import { dynamoDBClient } from "../shared/db";

module.exports.handler = async (event) => {
  try {
    const payload: Person = JSON.parse(event.body);

    // nombre obligatorio
    if (!payload.nombre) {
      return {
        status: 400,
        message: "Bad Request: Missing required field nombre",
      };
    }

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
  } catch (error) {
    console.error("Error:", error);
    return {
      status: 500,
      message: "Internal Server Error",
    };
  }
};
