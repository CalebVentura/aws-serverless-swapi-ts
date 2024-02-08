import { dynamoDBClient } from "../../../db/dynamo";

export const handler = async (event) => {
  try {
    const result = await dynamoDBClient.scan({ TableName: "StarWarsPeople" }).promise();
    const data = result.Items;

    return {
      status: 200,
      message: "GET people successful",
      data,
    };
  } catch (error) {
    console.error("Error:", error);
    return {
      status: 500,
      message: "Internal Server Error",
    };
  }
};
