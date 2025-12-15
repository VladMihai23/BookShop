const WishlistRepository = require('../repositories/WishlistRepository');

class WishlistService {

  addToWishlist(userId, bookId) {
    return WishlistRepository.add(userId, bookId);
  }

  removeFromWishlist(userId, bookId) {
    return WishlistRepository.remove(userId, bookId);
  }

  getWishlist(userId) {
    return WishlistRepository.getByUser(userId);
  }
}

module.exports = new WishlistService();
