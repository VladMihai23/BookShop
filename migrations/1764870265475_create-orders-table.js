exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable('orders', {
    id: {
      type: 'serial',
      primaryKey: true
    },

    user_id: {
      type: 'integer',
      notNull: false
    },

    total: {
      type: 'numeric(10,2)',
      notNull: true
    },

    created_at: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp')
    }
  });
};

exports.down = (pgm) => {
  pgm.dropTable('orders');
};
