const express = require('express');
const app = express();
const port = 3000
const session = require('express-session');

app.set('view engine', 'ejs')



app.get('/navbar', (req, res) => {
  res.render('navbar');
})

app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 }
}));

app.use((req, res, next) => {
  res.locals.session = req.session;
  res.locals.request = req;
  next();
});



app.use(express.static('public'))


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const userRoutes = require('./routes/userRoutes');
app.use(userRoutes);

const bookRoutes = require('./routes/bookRoutes');
app.use('/', bookRoutes);

const orderRoutes = require('./routes/orderRoutes');
app.use(orderRoutes);

const cartRoutes = require('./routes/cartRoutes');
app.use(cartRoutes);

const sitemapRoutes = require('./routes/sitemap');
app.use('/', sitemapRoutes);

app.use(require('./routes/wishlistRoutes'));

