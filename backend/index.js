const express = require('express')
const app = express()
const port = 3000
const db = require('./db.js')

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

app.listen(port, () => console.log(`App listening on port ${port}!`))
