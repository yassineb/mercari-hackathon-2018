const express = require('express')
const app = express()
const port = 3000
const db = require('./db.js')
const knex = db.knex
const distance = require('./distance.js').distance

var bodyParser = require('body-parser')

app.use(bodyParser.json())

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Methods", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization")
  next()
})


app.get('/items', async (req, res) => {
    var userLocation = {latitude: req.query.latitude, longitude: req.query.longitude}
    let items = await knex.select('items.*', 'users.name AS owner_name')
        .from('items')
        .leftJoin('users', 'users.id', '=', 'items.owner_id')
        .map(function(item) {
        return {
            'id': item.id,
            'title': item.title,
            'image': item.image,
            'owner': item.owner_name,
            'latitude': item.latitude,
            'longitude': item.longitude,
            'distance': distance(userLocation, item)
        }
    });

    items.sort(function(first, second) {
        return first.distance > second.distance
    })

    res.json(items)
})

app.get('/items/:id', async (req, res) => {
    let items = await knex.select('items.*', 'users.name AS owner_name')
        .from('items')
        .leftJoin('users', 'users.id', '=', 'items.owner_id')
        .where({"items.id": req.params.id})
        .first()
        .then(function (item) {
            return {
                'id': item.id,
                'title': item.title,
                'images': [item.image, item.image, item.image],
                'owner': item.owner_name,
                'reviews': [{'comment': 'This was a warm jacket', "rating": true}],
                'latitude': item.latitude,
                'longitude': item.longitude
            }
        })
    res.json(items)
})

app.post('/items', async (req, res) => {
    body = req.body
    image = body.images[0]

    await knex('items').insert({
        title: body.title,
        image: image,
        size: body.size,
        category: body.category,
        color: body.color,
        brand: body.brand,
        description: body.description,
        owner_id: 1
    })
    res.json("ok")
})

app.listen(port, () => console.log(`App listening on port ${port}!`))