const WishlistService = require('../services/WishlistService');

class WishlistController {

  async add(req, res) {
    if (!req.session.user) {
      return res.redirect('/user');
    }

    await WishlistService.addToWishlist(
      req.session.user.id,
      req.params.bookId
    );

    const redirectTo = req.body.redirectTo || '/';
    res.redirect(redirectTo);
  }



  async remove(req, res) {
    if (!req.session.user) {
      return res.redirect('/user');
    }

    await WishlistService.removeFromWishlist(
      req.session.user.id,
      req.params.bookId
    );

    res.redirect('/wishlist');
  }

  async view(req, res) {
    if (!req.session.user) {
      return res.redirect('/user');
    }

    const books = await WishlistService.getWishlist(req.session.user.id);
    res.render('wishlist', { books });
  }
}

module.exports = new WishlistController();
