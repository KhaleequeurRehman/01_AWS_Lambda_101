const { DynamoDBClient, ScanCommand } = require("@aws-sdk/client-dynamodb");
const { marshall, unmarshall } = require("@aws-sdk/util-dynamodb");

const client = new DynamoDBClient({ region: 'us-east-2' });
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
