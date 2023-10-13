// const AWS = require('aws-sdk')
// AWS.config.region = 'us-east-2'
// const dynamodb = new AWS.DynamoDB.DocumentClient()
// require('dotenv').config()

// const restaurants = [
//   { 
//     name: "Fangtasia", 
//     image: "https://d2qt42rcwzspd6.cloudfront.net/manning/fangtasia.png", 
//     themes: ["true blood"] 
//   },
//   { 
//     name: "Shoney's", 
//     image: "https://d2qt42rcwzspd6.cloudfront.net/manning/shoney's.png", 
//     themes: ["cartoon", "rick and morty"] 
//   },
//   { 
//     name: "Freddy's BBQ Joint", 
//     image: "https://d2qt42rcwzspd6.cloudfront.net/manning/freddy's+bbq+joint.png", 
//     themes: ["netflix", "house of cards"] 
//   },
//   { 
//     name: "Pizza Planet", 
//     image: "https://d2qt42rcwzspd6.cloudfront.net/manning/pizza+planet.png", 
//     themes: ["netflix", "toy story"] 
//   },
//   { 
//     name: "Leaky Cauldron", 
//     image: "https://d2qt42rcwzspd6.cloudfront.net/manning/leaky+cauldron.png", 
//     themes: ["movie", "harry potter"] 
//   },
//   { 
//     name: "Lil' Bits", 
//     image: "https://d2qt42rcwzspd6.cloudfront.net/manning/lil+bits.png", 
//     themes: ["cartoon", "rick and morty"] 
//   },
//   { 
//     name: "Fancy Eats", 
//     image: "https://d2qt42rcwzspd6.cloudfront.net/manning/fancy+eats.png", 
//     themes: ["cartoon", "rick and morty"] 
//   },
//   { 
//     name: "Don Cuco", 
//     image: "https://d2qt42rcwzspd6.cloudfront.net/manning/don%20cuco.png", 
//     themes: ["cartoon", "rick and morty"] 
//   },
// ];

// const putReqs = restaurants.map(x => ({
//   // PutRequest: {
//     TableName: 'yancui-session-task-khaleeque-dev-RestaurantsTable-PJLBTCSDEXAT',
//     Item: x
//   // }
// }))

// // const req = {
// //   RequestItems: {
// //     // [process.env.restaurants_table]: putReqs
// //     ['yancui-session-task-khaleeque-dev-RestaurantsTable-PJLBTCSDEXAT']: putReqs
// //   }
// // }
// // dynamodb.batchWrite(req).promise()
// dynamodb.batchWrite({RequestItems: putReqs}).promise()
//   .then(() => console.log("all done"))
//   .catch(err => console.error(err))
  



const AWS = require('aws-sdk');
AWS.config.region = 'us-east-2';
const dynamodb = new AWS.DynamoDB.DocumentClient();
require('dotenv').config();

const restaurants = [
  {
    name: "Fangtasia",
    image: "https://d2qt42rcwzspd6.cloudfront.net/manning/fangtasia.png",
    themes: ["true blood"]
  },
  {
    name: "Shoney's",
    image: "https://d2qt42rcwzspd6.cloudfront.net/manning/shoney's.png",
    themes: ["cartoon", "rick and morty"]
  },
  {
    name: "Freddy's BBQ Joint",
    image: "https://d2qt42rcwzspd6.cloudfront.net/manning/freddy's+bbq+joint.png",
    themes: ["netflix", "house of cards"]
  },
  {
    name: "Pizza Planet",
    image: "https://d2qt42rcwzspd6.cloudfront.net/manning/pizza+planet.png",
    themes: ["netflix", "toy story"]
  },
  {
    name: "Leaky Cauldron",
    image: "https://d2qt42rcwzspd6.cloudfront.net/manning/leaky+cauldron.png",
    themes: ["movie", "harry potter"]
  },
  {
    name: "Lil' Bits",
    image: "https://d2qt42rcwzspd6.cloudfront.net/manning/lil+bits.png",
    themes: ["cartoon", "rick and morty"]
  },
  {
    name: "Fancy Eats",
    image: "https://d2qt42rcwzspd6.cloudfront.net/manning/fancy+eats.png",
    themes: ["cartoon", "rick and morty"]
  },
  {
    name: "Don Cuco",
    image: "https://d2qt42rcwzspd6.cloudfront.net/manning/don%20cuco.png",
    themes: ["cartoon", "rick and morty"]
  },
];

const putReqs = restaurants.map(x => ({
  PutRequest: {
    Item: x
  }
}));

const requestItems = {
  'yancui-session-task-khaleeque-dev-RestaurantsTable-PJLBTCSDEXAT': putReqs
};

dynamodb.batchWrite({ RequestItems: requestItems }).promise()
  .then(() => console.log("all done"))
  .catch(err => console.error(err));








  



  