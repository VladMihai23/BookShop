const OrderRepository = require('../repositories/OrderRepository');

class OrderService {

  calculateTotal(cart) {
    let total = 0;
    cart.forEach(item => total += item.price * item.qty);
    return total;
  }

  async createOrder(userId, cart) {
    const total = this.calculateTotal(cart);

    const order = await OrderRepository.createOrder(userId, total);

    for (const item of cart) {
      await OrderRepository.addOrderItem(order.id, item.id, item.qty, item.price);
    }

    return order;
  }

  getUserOrders(userId) {
    return OrderRepository.getOrdersByUser(userId);
  }

  getAdminOrders() {
    return OrderRepository.getAllOrders();
  }

  getOrderDetails(orderId) {
    return OrderRepository.getItemsByOrder(orderId);
  }
}

module.exports = new OrderService();
