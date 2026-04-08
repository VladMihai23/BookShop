const BookRepository = require('../repositories/BookRepository');
const computeBM25 = require('../utils/bm25');
const autocompleteBooks = require('../utils/autocomplete');
const getSimilarBooks = require('../utils/recommendations');

class BookService {

  async getAllBooks() {
    return await BookRepository.getAll();
  }

  async getAutoCompleteSuggestions(query) {
    const books = await BookRepository.getAll();
    return autocompleteBooks(books, query);
  }

  async getBookById(id) {
    return await BookRepository.getById(id);
  }

  async createBook(data) {
    return await BookRepository.create(data);
  }

  async updateBook(id, data) {
    return await BookRepository.update(id, data);
  }

  async deleteBook(id) {
    return await BookRepository.delete(id);
  }

  async searchBooks(query) {
    const books = await BookRepository.getAll();
    return computeBM25(books, query);
  }

  async getBookBySlug(slug) {
    return await BookRepository.getBySlug(slug);
  }

  async getSimilarBooks(bookId) {
    const books = await BookRepository.getAll();
    const targetBook = books.find(book => String(book.id) === String(bookId));

    if (!targetBook) return [];

    return getSimilarBooks(targetBook, books, 3);
  }
}


module.exports = new BookService();
