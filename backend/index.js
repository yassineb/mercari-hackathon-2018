const express = require('express')
const axios = require('axios')
const app = express()
const port = 3000
require('./db.js')

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Methods", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization")
  next()
})

app.get('/items', async (req, res) => {
  let productsAmount = 10;
  let response = await axios
    .get(`http://names.drycodes.com/${productsAmount}?nameOptions=objects`)
  let products = response.data
    .map(name => ({
      name,
      image: "https://picsum.photos/200?random&"+name
    }));
  res.json(products)
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
