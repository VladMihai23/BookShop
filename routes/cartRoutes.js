const express = require('express');
const router = express.Router();
const BookService = require('../services/BookService');

router.post('/cart/add/:id', async (req, res) => {
  if (!req.session.cart) req.session.cart = [];

  const book = await BookService.getBookById(req.params.id);
  if (!book) return res.status(404).send("Book not found");

  const existing = req.session.cart.find(item => item.id == book.id);

  if (existing) {
    existing.qty++;
  } else {
    req.session.cart.push({
      id: book.id,
      title: book.title,
      price: book.price,
      image_url: book.image_url,
      qty: 1
    });
  }

  res.redirect('/cart');
});

router.get('/cart', (req, res) => {
  const cart = req.session.cart || [];
  let total = 0;

  cart.forEach(item => total += item.price * item.qty);

  res.render('cart', { cart, total });
});

router.post('/cart/remove/:id', (req, res) => {
  if (!req.session.cart) req.session.cart = [];

  req.session.cart = req.session.cart.filter(item => item.id != req.params.id);

  res.redirect('/cart');
});

module.exports = router;
