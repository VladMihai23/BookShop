class OrderModel {
  constructor({id, user_id, total, created_at}) {
    this.id = id;
    this.user_id = user_id;
    this.total = total;
    this.created_at = created_at;
  }
}

module.exports = OrderModel;