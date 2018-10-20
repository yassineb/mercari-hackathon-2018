require('dotenv').config()

var knex = require('knex')({
  client: 'mysql',
  connection: {
    host : process.env.DB_HOST,
    user : process.env.DB_USER,
    password : process.env.D_PASS,
    database : process.env.DB_NAME
  }
});
