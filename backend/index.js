const express = require('express')
const app = express()
const port = 3000
const db = require('./db.js')
const knex = db.knex

var bodyParser = require('body-parser')

app.use(bodyParser.json())

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Methods", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization")
  next()
})

app.get('/items', async (req, res) => {
  let items = await knex.select('items.*', 'users.name AS owner_name')
      .from('items')
      .leftJoin('users', 'users.id', '=', 'items.owner_id')
      .map(function(item) {
    return {
        'id': item.id,
        'title': item.title,
        'image': item.image,
        'owner': item.owner_name
    }
  });

  res.json(items)
})

app.get('/items/:id', async (req, res) => {
    let items = await knex.select('items.*', 'users.name AS owner_name')
        .from('items')
        .leftJoin('users', 'users.id', '=', 'items.owner_id')
        .where({"users.id": req.params.id})
        .first()
        .then(function (item) {
            return {
                'id': item.id,
                'title': item.title,
                'images': [item.image, item.image, item.image],
                'owner': item.owner_name,
                'reviews': [{'comment': 'This was a warm jacket', "rating": true}]
            }
        })
    res.json(items)
})

app.post('/items', async (req, res) => {
  title = req.body.title
  images = req.body.images

  console.log(title, images)
  await db.knex('items').insert({title, image: images[0]})
  res.json("ok")
})

app.listen(port, () => console.log(`App listening on port ${port}!`))
