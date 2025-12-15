const express = require('express');
const router = express.Router();
const WishlistController = require('../controllers/WishlistController');

router.post('/wishlist/add/:bookId', WishlistController.add);
router.post('/wishlist/remove/:bookId', WishlistController.remove);
router.get('/wishlist', WishlistController.view);

module.exports = router;
