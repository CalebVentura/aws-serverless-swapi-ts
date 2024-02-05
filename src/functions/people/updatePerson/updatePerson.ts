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

    const payload = JSON.parse(event.body);
    const keys = Object.keys(payload);
    const UpdateExpression =
      "set " + keys.map((item) => `${item} = :${item}`).join(",");
    const ExpressionAttributeValues = {};
    keys.forEach((key) => (ExpressionAttributeValues[`:${key}`] = payload[key]));

    const result = await dynamoDBClient
      .update({
        TableName: "StarWarsPeople",
        Key: { id },
        UpdateExpression,
        ExpressionAttributeValues,
        ReturnValues: "ALL_NEW",
      })
      .promise();

    // Verificar si se ha actualizado un elemento (si el ID existe en la base de datos)
    if (!result.Attributes) {
      return {
        status: 404,
        message: "Not Found: No person found with the provided ID",
      };
    }

    return {
      status: 200,
      message: "PUT update people successfully",
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
