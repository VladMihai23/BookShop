exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable('order_items', {
    id: {
      type: 'serial',
      primaryKey: true
    },

    order_id: {
      type: 'integer',
      notNull: true,
      references: '"orders"',
      onDelete: 'cascade'
    },

    book_id: {
      type: 'integer',
      notNull: true,
      references: '"books"'
    },

    quantity: {
      type: 'integer',
      notNull: true
    },

    price: {
      type: 'numeric(10,2)',
      notNull: true
    }
  });
};

exports.down = (pgm) => {
  pgm.dropTable('order_items');
};
