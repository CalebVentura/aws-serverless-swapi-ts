import { DynamoDB } from 'aws-sdk'

export const dynamoDBClient = new DynamoDB.DocumentClient()