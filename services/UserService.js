const bcrypt = require('bcryptjs');
const UserRepository = require('../repositories/UserRepository');

class UserService {
  async register({ username, email, password }) {
    const existing = await UserRepository.findByEmail(email);
    if (existing) throw new Error('Email already in use');

    const hashedPassword = await bcrypt.hash(password, 10);

    return await UserRepository.createUser({ username, email, password: hashedPassword });
  }
}

module.exports = new UserService();
