import { dynamoDBClient } from "../../../db/dynamo";

export const handler = async (event) => {
  try {
    const { id } = event.pathParameters;

    // Se verifica si se proporciona un ID válido
    if (!id || typeof id !== "string" || id.trim() === "") {
      return {
        status: 400,
        message: "Bad Request: Invalid ID",
      };
    }

    const response = await dynamoDBClient
      .delete({
        TableName: "StarWarsPeople",
        Key: {
          id,
        },
        ReturnValues: "ALL_OLD", // Devolver el elemento eliminado
      })
      .promise();

    // Verificar si se eliminó algún elemento
    if (!response.Attributes) {
      return {
        status: 404,
        message: "Not Found: No element found with the provided ID",
      };
    }

    return {
      status: 200,
      message: "DELETE one people successful",
      data: [],
    };
  } catch (error) {
    console.error("Error:", error);
    return {
      status: 500,
      message: "Internal Server Error",
    };
  }
};
