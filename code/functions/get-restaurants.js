const { DynamoDBClient, ScanCommand } = require("@aws-sdk/client-dynamodb");
const { marshall, unmarshall } = require("@aws-sdk/util-dynamodb");

const client = new DynamoDBClient({ region: 'us-east-2' }); // Replace 'us-east-1' with your desired AWS region
const defaultResults = process.env.defaultResults || 8;
const tableName = process.env.restaurants_table;

const getRestaurants = async (count) => {
  console.log(`fetching ${count} restaurants from ${tableName}...`);
  
  const params = {
    TableName: tableName,
    Limit: count
  };
  const command = new ScanCommand(params);

  try {
    const response = await client.send(command);
    console.log(`found ${response.Items.length} restaurants`);
    
    // Unmarshall the DynamoDB response to get JavaScript objects
    const restaurants = response.Items.map(item => unmarshall(item));

    return restaurants;
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    throw error;
  }
};

exports.handler = async (event, context) => {
  try {
    const restaurants = await getRestaurants(defaultResults);
    const response = {
      statusCode: 200,
      body: JSON.stringify(restaurants)
    };
    return response;
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal Server Error" })
    };
  }
};





// const DocumentClient = require('aws-sdk/clients/dynamodb').DocumentClient
// const dynamodb = new DocumentClient()

// const defaultResults = process.env.defaultResults || 8
// const tableName = process.env.restaurants_table

// const getRestaurants = async (count) => {
//   console.log(`fetching ${count} restaurants from ${tableName}...`)
//   const req = {
//     TableName: tableName,
//     Limit: count
//   }
//   console.log('tableName ',tableName)

//   const resp = await dynamodb.scan(req).promise()
//   console.log(`found ${resp.Items.length} restaurants`)
//   return resp.Items
// }

// module.exports.handler = async (event, context) => {  
//   const restaurants = await getRestaurants(defaultResults)
//   const response = {
//     statusCode: 200,
//     body: JSON.stringify(restaurants)
//   }

//   return response
// }