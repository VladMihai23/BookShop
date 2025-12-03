const UserService = require('../services/UserService');

class UserController {

  showRegisterPage(req, res) {
    res.render('user', {
      success: null,
      error: null,
      username: '',
      email: ''
    });
  }

  async register(req, res) {
    try {
      await UserService.register(req.body);

      res.render('user', {
        success: 'You can now log in!',
        error: null,
        username: '',
        email: ''
      });
    } catch (err) {
      res.render('user', {
        success: null,
        error: err.message,
        username: req.body.username,
        email: req.body.email
      });
    }
  }
}

module.exports = new UserController();
