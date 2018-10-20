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
  let items = await knex.select().from('items').map(function(item) {
    return {
        'id': item.id,
        'title': item.title,
        'image': item.image
    }
  });

  res.json(items)
})

app.get('/items/:id', async (req, res) => {
    let items = await knex.select().from('items').where({id: req.params.id})
        .first()
        .then(function (item) {
            return {
                'id': item.id,
                'title': item.title,
                'images': [item.image, item.image, item.image],
                'owner': 'Yassine',
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
