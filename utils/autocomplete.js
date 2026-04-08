const levenshtein = require('./levenshtein');

function normalize(text) {
  return (text || '')
    .toLowerCase()
    .trim();
}

function autocompleteBooks(books, query) {
  const q = normalize(query);
  if (!q) return [];

  const exactMatches = books.filter(book => {
    const title = normalize(book.title);
    return title.startsWith(q) || title.includes(q);
  });

  const fuzzyMatches = books.filter(book => {
    const title = normalize(book.title);

    if (title.startsWith(q) || title.includes(q)) {
      return false;
    }

    const words = title.split(/\s+/);
    return words.some(word => levenshtein(word, q) <= 1);
  });

  return [...exactMatches, ...fuzzyMatches]
    .slice(0, 5)
    .map(book => ({
      id: book.id,
      title: book.title,
      slug: book.slug
    }));
}

module.exports = autocompleteBooks;