const express = require('express')
const app = express()
const port = 3000
const db = require('./db.js')

var bodyParser = require('body-parser')

app.use(bodyParser.json())

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Methods", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization")
  next()
})

app.get('/items', async (req, res) => {
  let items = await db.knex.select().from('items').map(function(item) {
    return {
        'id': item.id,
        'title': item.title,
        'image': item.image
    }
  });

  res.json(items)
})

app.post('/items', function (req, res){
  console.log(req.body);
  res.json("ok")
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
