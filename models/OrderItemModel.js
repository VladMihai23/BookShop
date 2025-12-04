class OrderItemModel {
  constructor({id, order_id, book_id, quantity, price}) {
    this.id = id;
    this.order_id = order_id;
    this.book_id = book_id;
    this.quantity = quantity;
    this.price = price;
  }
}

module.exports = OrderItemModel;