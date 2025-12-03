const db = require('../db'); 
const User = require('../models/UserModel');

class UserRepository {
  async findByEmail(email) {
    const result = await db.oneOrNone(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );
    return result ? new User(result) : null;
  }

  async createUser({ username, email, password }) {
    const result = await db.one(
      'INSERT INTO users(username, email, password) VALUES($1, $2, $3) RETURNING *',
      [username, email, password]
    );
    return new User(result);
  }
}

module.exports = new UserRepository();
