const OrderService = require('../services/OrderService');

class OrderController {

  checkoutPage(req, res) {
    const cart = req.session.cart || [];

    if (cart.length === 0) {
      return res.redirect('/cart');
    }

    const total = OrderService.calculateTotal(cart);

    res.render('checkout', { cart, total });
  }

  async checkout(req, res) {
    const cart = req.session.cart || [];

    if (cart.length === 0) {
      return res.redirect('/cart');
    }

    const userId = req.session.user ? req.session.user.id : null;

    try {
      const order = await OrderService.createOrder(userId, cart);

      req.session.cart = [];

      return res.redirect(`/order-success/${order.id}`);

    } catch (err) {
      console.error(err);
      res.status(500).send("Checkout failed.");
    }
  }

  orderSuccess(req, res) {
    res.render('order-success', { orderId: req.params.id });
  }

  async myOrders(req, res) {
    if (!req.session.user) {
      return res.redirect('/login');
    }

    const orders = await OrderService.getUserOrders(req.session.user.id);

    res.render('my-orders', { orders });
  }

  async orderDetails(req, res) {
    if (!req.session.user) {
      return res.redirect('/user');
    }

    const orderId = req.params.id;
    const userId = req.session.user.id;

    const order = await OrderService.getOrderDetails(orderId);

    if (!order || order.user_id !== userId) {
      return res.status(403).send("Access denied");
    }

    res.render('order-details', {
      order,
      items: order.items
    });
  }


  async adminOrders(req, res) {
    const orders = await OrderService.getAdminOrders();
    res.render('admin-orders', { orders });
  }

}

module.exports = new OrderController();
