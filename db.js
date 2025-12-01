const pgp = require('pg-promise')(/* options */)
const db = pgp('postgres://postgres:Vlad5432@localhost:5432/BookShop')

db.one('SELECT $1 AS value', 123)
  .then((data) => {
    console.log('DATA:', data.value)
  })
  .catch((error) => {
    console.log('ERROR:', error)
  })