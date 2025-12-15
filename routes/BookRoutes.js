const express = require('express');
const BookController = require('../controllers/BookController');
const isAdmin = require('../middleware/isAdmin');

const router = express.Router();

router.get('/', BookController.homepage);
router.get('/book/:id', BookController.details);

router.get('/search', BookController.searchBooks);


router.get('/admin/books', isAdmin, BookController.adminList);
router.get('/admin/books/edit/:id', isAdmin, BookController.edit);
router.post('/admin/books/edit/:id', isAdmin, BookController.update);
router.post('/admin/books/delete/:id', isAdmin, BookController.delete);
router.post('/admin/books/create', isAdmin, BookController.create);

router.get('/books/:slug', BookController.bookPage);

module.exports = router;
