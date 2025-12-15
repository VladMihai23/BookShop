exports.up = pgm => {
  pgm.addColumn('books', {
    slug: { type: 'text' }
  });


  pgm.sql(`
    UPDATE books
    SET slug = LOWER(REGEXP_REPLACE(title, '[^a-zA-Z0-9]+', '-', 'g'))
    WHERE slug IS NULL;
  `);
};

exports.down = pgm => {
  pgm.dropColumn('books', 'slug');
};
