const fs = require("fs")
const Mustache = require('mustache')
const http = require('axios')

const restaurantsApiRoot = process.env.restaurants_api
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

let html

function loadHtml () {
  if (!html) {
    console.log('loading index.html...')
    html = fs.readFileSync('static/index.html', 'utf-8')
    console.log('loaded')
  }
  
  return html
}

const getRestaurants = async () => {
  // const httpReq = await http.get(restaurantsApiRoot)
  // return (await httpReq).data
  
  const {data} = await http.get(`${restaurantsApiRoot}`)
  console.log('restaurantsApiRoot ',restaurantsApiRoot)
  console.log('restaurant data --> ',data)
  return data
}

module.exports.handler = async (event, context) => {
  const template = loadHtml()
  const restaurants = await getRestaurants()
  console.log('restaurants -> ',restaurants)
  const dayOfWeek = days[new Date().getDay()]
  const html = Mustache.render(template, { dayOfWeek, restaurants: restaurants })
  const response = {
    statusCode: 200,
    headers: {
      'Content-Type': 'text/html; charset=UTF-8'
    },
    body: html
  }

  return response
}



