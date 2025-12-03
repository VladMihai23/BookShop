const pgp = require('pg-promise')(/* options */)
const db = pgp('postgres://postgres:Vlad5432@localhost:5432/BookShop')

module.exports = db;