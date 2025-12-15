const db = require('../db');

class WishlistRepository {

  add(userId, bookId) {
    return db.none(
      'INSERT INTO wishlist (user_id, book_id) VALUES ($1, $2) ON CONFLICT DO NOTHING',
      [userId, bookId]
    );
  }

  remove(userId, bookId) {
    return db.none(
      'DELETE FROM wishlist WHERE user_id = $1 AND book_id = $2',
      [userId, bookId]
    );
  }

  getByUser(userId) {
    return db.any(`
      SELECT b.*
      FROM wishlist w
      JOIN books b ON b.id = w.book_id
      WHERE w.user_id = $1
    `, [userId]);
  }
}

module.exports = new WishlistRepository();
