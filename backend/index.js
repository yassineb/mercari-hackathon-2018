require('dotenv').config()
const express = require('express')
const mqtt = require('mqtt')
const app = express()
const port = 3000
const db = require('./db.js').knex
const distance = require('./distance.js').distance
var mqttClient  = mqtt.connect(process.env.MQTT_HOST)

async function notifyBookingUpdate() {
    mqttClient.publish('mercari', 'update')
}

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
    let items = await db.select('items.*', 'users.name AS owner_name')
        .from('items')
        .leftJoin('users', 'users.id', '=', 'items.owner_id')
        .leftJoin('bookings', 'bookings.item_id', '=', 'items.id')
        .whereRaw('bookings.id is null')
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
    let items = await db.select('items.*', 'users.name AS owner_name')
        .from('items')
        .leftJoin('users', 'users.id', '=', 'items.owner_id')
        .where({"items.id": req.params.id})
        .first()
        .then(function (item) {
            var availableDates = ['2018-10-21', '2018-10-22', '2018-10-23', '2018-10-24', '2018-10-25']
            return {
                'id': item.id,
                'title': item.title,
                'images': [item.image, item.image, item.image],
                'owner': item.owner_name,
                'reviews': [{'comment': 'This was a warm jacket', "rating": true}],
                'latitude': item.latitude,
                'longitude': item.longitude,
                'availableDates': availableDates
            }
        })
    res.json(items)
})

app.post('/items', async (req, res) => {
    body = req.body
    image = body.images[0]

    await db('items').insert({
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

app.post('/bookings', async (req, res) => {
    body = req.body
    booking = await db.select().from('bookings').where({item_id: body.item_id})
        .andWhere('start', '<=', body.start)
        .andWhere('end', '>=', body.end)

    if (booking.length > 0) {
        throw new Error("Booking exists")
    }

    await db('bookings').insert({
        item_id: body.item_id,
        start: body.start,
        end: body.end,
        creation_time: new Date()
    })
    notifyBookingUpdate()
    res.json({})
})

app.listen(port, () => console.log(`App listening on port ${port}!`))