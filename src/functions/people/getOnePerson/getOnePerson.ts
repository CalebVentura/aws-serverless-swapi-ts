import { dynamoDBClient } from "../shared/db";

module.exports.handler = async (event) => {
  try {
    const { id } = event.pathParameters;

    // Verificar si se proporciona un ID válido
    if (!id || typeof id !== "string" || id.trim() === "") {
      return {
        status: 400,
        message: "Bad Request: Invalid ID",
      };
    }

    const result = await dynamoDBClient
      .get({
        TableName: "StarWarsPeople",
        Key: {
          id,
        },
      })
      .promise();

    const data = result.Item;

    // Verificar si se encontró alguna persona con el ID proporcionado
    if (!data) {
      return {
        status: 404,
        message: "Not Found: No person found with the provided ID",
      };
    }

    return {
      status: 200,
      message: "GET one people successful",
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
