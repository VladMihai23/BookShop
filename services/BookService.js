const BookRepository = require('../repositories/BookRepository');

class BookService {

  async getAllBooks() {
    return await BookRepository.getAll();
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
    return await BookRepository.searchBooks(query);
  }

  async getBookBySlug(slug) {
    return await BookRepository.getBySlug(slug);
  }

}


module.exports = new BookService();
