const db = require('../db');
const Book = require('../models/BookModel');
const slugify = require('../utils/slugify');

class BookRepository {

  async getAll() {
    const result = await db.manyOrNone("SELECT * FROM books ORDER BY id DESC");
    return result.map(r => new Book(r));
  }

  async getById(id) {
    const result = await db.oneOrNone("SELECT * FROM books WHERE id = $1", [id]);
    return result ? new Book(result) : null;
  }

  async create(data) {
    const generatedSlug = slugify(data.title); // corect

    const result = await db.one(
      `INSERT INTO books (title, author, price, genre, image_url, description, slug)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [
        data.title,
        data.author,
        data.price,
        data.genre,
        data.image_url,
        data.description || null,
        generatedSlug
      ]
    );

    return new Book(result);
  }

  async update(id, data) {
    const generatedSlug = slugify(data.title); // corect

    const result = await db.one(
      `UPDATE books
       SET title=$1, author=$2, price=$3, genre=$4,
           image_url=$5, description=$6, slug=$7
       WHERE id=$8
       RETURNING *`,
      [
        data.title,
        data.author,
        data.price,
        data.genre,
        data.image_url,
        data.description || null,
        generatedSlug,
        id
      ]
    );

    return new Book(result);
  }

  async delete(id) {
    await db.none("DELETE FROM books WHERE id = $1", [id]);
  }

  async searchBooks(query) {
    return await db.manyOrNone(
      `SELECT * FROM books
       WHERE LOWER(title) LIKE LOWER('%' || $1 || '%')
          OR LOWER(author) LIKE LOWER('%' || $1 || '%')
          OR LOWER(genre) LIKE LOWER('%' || $1 || '%')`,
      [query]
    );
  }

  async getBySlug(slug) {
    const result = await db.oneOrNone("SELECT * FROM books WHERE slug = $1", [slug]);
    return result ? new Book(result) : null;
  }
}

module.exports = new BookRepository();
