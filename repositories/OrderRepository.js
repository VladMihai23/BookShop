const db = require('../db');
const OrderModel = require('../models/OrderModel');
const OrderItemModel = require('../models/OrderItemModel');

class OrderRepository {

  async createOrder(userId, total) {
    const order = await db.one(
      `INSERT INTO orders(user_id, total)
             VALUES($1, $2)
             RETURNING *`,
      [userId, total]
    );

    return new OrderModel(order);
  }

  async addOrderItem(orderId, bookId, qty, price) {
    const item = await db.one(
      `INSERT INTO order_items(order_id, book_id, quantity, price)
             VALUES($1, $2, $3, $4)
             RETURNING *`,
      [orderId, bookId, qty, price]
    );

    return new OrderItemModel(item);
  }

  async getOrderById(id) {
    const order = await db.oneOrNone(
      "SELECT * FROM orders WHERE id = $1",
      [id]
    );
    return order ? new OrderModel(order) : null;
  }

  async getItemsByOrder(orderId) {
    const items = await db.manyOrNone(
      "SELECT * FROM order_items WHERE order_id = $1",
      [orderId]
    );
    return items.map(i => new OrderItemModel(i));
  }

  async getOrdersByUser(userId) {
    const orders = await db.manyOrNone(
      "SELECT * FROM orders WHERE user_id = $1 ORDER BY id DESC",
      [userId]
    );
    return orders.map(o => new OrderModel(o));
  }

  async getAllOrders() {
    const orders = await db.manyOrNone(
      "SELECT * FROM orders ORDER BY id DESC"
    );
    return orders.map(o => new OrderModel(o));
  }
}

module.exports = new OrderRepository();
