exports.up = pgm => {
  pgm.createTable('wishlist', {
    id: 'id',
    user_id: {
      type: 'integer',
      notNull: true,
      references: 'users',
      onDelete: 'cascade'
    },
    book_id: {
      type: 'integer',
      notNull: true,
      references: 'books',
      onDelete: 'cascade'
    },
    created_at: {
      type: 'timestamp',
      default: pgm.func('current_timestamp')
    }
  });

  pgm.addConstraint('wishlist', 'unique_user_book', {
    unique: ['user_id', 'book_id']
  });
};

exports.down = pgm => {
  pgm.dropTable('wishlist');
};
