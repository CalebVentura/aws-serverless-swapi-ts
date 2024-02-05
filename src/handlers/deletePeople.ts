const AWS = require("aws-sdk");

module.exports.handler = async (event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();
  const { id } = event.pathParameters;

  await dynamodb
    .delete({
      TableName: "StarWarsPeople2",
      Key: {
        id,
      },
    })
    .promise();

  return {
    status: 200,
    body: JSON.stringify(
      {
        message: "DELETE one people successful",
        data: [],
      },
      null,
      2
    ),
  };
};
