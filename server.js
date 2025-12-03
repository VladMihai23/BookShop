const express = require('express');
const app = express();
const port = 3000

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
  console.log('testing')
  res.render('index');
})

app.get('/index', (req, res) => {
  res.render('index');
})

app.get('/navbar', (req, res) => {
  res.render('navbar');
})

app.get('/user', (req, res) => {
  res.render('user');
})

app.use(express.static('public'))


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const userRoutes = require('./routes/userRoutes');
app.use(userRoutes);

