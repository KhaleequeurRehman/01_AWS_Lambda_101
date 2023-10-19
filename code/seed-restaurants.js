const AWS = require("aws-sdk")
const dynamodb = new AWS.DynamoDB.DocumentClient()

exports.handler = async (event, context) => {
  const restaurants = [
    {
      name: "Fangtasia",
      image: "https://d2qt42rcwzspd6.cloudfront.net/manning/fangtasia.png",
      themes: ["true blood"],
    },
    {
      name: "Shoney's",
      image: "https://d2qt42rcwzspd6.cloudfront.net/manning/shoney's.png",
      themes: ["cartoon", "rick and morty"],
    },
    {
      name: "Freddy's BBQ Joint",
      image:
        "https://d2qt42rcwzspd6.cloudfront.net/manning/freddy's+bbq+joint.png",
      themes: ["netflix", "house of cards"],
    },
    {
      name: "Pizza Planet",
      image: "https://d2qt42rcwzspd6.cloudfront.net/manning/pizza+planet.png",
      themes: ["netflix", "toy story"],
    },
    {
      name: "Leaky Cauldron",
      image: "https://d2qt42rcwzspd6.cloudfront.net/manning/leaky+cauldron.png",
      themes: ["movie", "harry potter"],
    },
    {
      name: "Lil' Bits",
      image: "https://d2qt42rcwzspd6.cloudfront.net/manning/lil+bits.png",
      themes: ["cartoon", "rick and morty"],
    },
    {
      name: "Fancy Eats",
      image: "https://d2qt42rcwzspd6.cloudfront.net/manning/fancy+eats.png",
      themes: ["cartoon", "rick and morty"],
    },
    {
      name: "Don Cuco",
      image: "https://d2qt42rcwzspd6.cloudfront.net/manning/don%20cuco.png",
      themes: ["cartoon", "rick and morty"],
    }
  ]

  const putRequests = restaurants.map((restaurant) => ({
    PutRequest: {
      Item: restaurant,
    },
  }))

  const requestItems = {
    RestaurantsTable: putRequests,
  }

  const params = {
    RequestItems: requestItems,
  }

  try {
    await dynamodb.batchWrite(params).promise()
    console.log("Successfully added data to DynamoDB table.")
    return {
      statusCode: 200,
      body: JSON.stringify("Data added to DynamoDB"),
    }
  } catch (err) {
    console.error("Error writing to DynamoDB: ", err)
    return {
      statusCode: 500,
      body: JSON.stringify("Error adding data to DynamoDB"),
    }
  }
}
