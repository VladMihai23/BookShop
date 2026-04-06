exports.up = (pgm) => {
  pgm.addColumn('books', {
    pdf_url: {
      type:"text",
      notNull: false
    }
  });
};

exports.down = pgm => {
  pgm.dropColumn('books', 'pdf_url');
}