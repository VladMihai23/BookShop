exports.up = (pgm) => {
  pgm.createTable("users", {
    id: "id",
    username: { type: "text", notNull: true },
    email: { type: "text", unique: true, notNull: true },
    password: { type: "text", notNull: true },
    created_at: { type: "timestamp", default: pgm.func("current_timestamp") }
  });
};

exports.down = (pgm) => {
  pgm.dropTable("users");
};